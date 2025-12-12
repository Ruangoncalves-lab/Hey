import React, { useState, useEffect } from 'react';
import SectionCard from '../components/SectionCard';
import { Loader2 } from 'lucide-react';
import AlertBox from '../components/AlertBox';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import MetaIntegrationCard from '../components/MetaIntegrationCard';
import ConnectMetaModal from '../components/ConnectMetaModal';

const Integrations = () => {
    const [loading, setLoading] = useState(true);
    const [connections, setConnections] = useState([]);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [tenantId, setTenantId] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // Try to recover session or just stop
                setLoading(false);
                return;
            }

            setUserId(user.id);
            setTenantId(user.user_metadata?.tenant_id || 'default');

            // Check Meta Connection
            const { data: tokenData } = await supabase
                .from('meta_tokens')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            const { data: accounts } = await supabase
                .from('meta_ad_accounts')
                .select('*')
                .eq('user_id', user.id);

            const newConnections = [];

            if (tokenData) {
                // Try to find a name to display
                const profileName = tokenData.meta_user_name || accounts?.[0]?.business_name || "Meta User";

                newConnections.push({
                    _id: tokenData.id || 'meta-conn',
                    platform: 'meta',
                    status: 'active',
                    account_name: profileName,
                    ad_accounts: accounts || []
                });
            }

            setConnections(newConnections);

        } catch (err) {
            console.error('Error fetching connections:', err);
            setError('Erro ao carregar conexões: ' + (err.message || err));
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não logado');

            const { error } = await supabase.functions.invoke('meta-sync', {
                body: { user_id: user.id }
            });

            if (error) throw error;

            setSuccess('Sincronização concluída com sucesso!');
            fetchConnections();
        } catch (err) {
            console.error('Sync error:', err);
            setError('Erro na sincronização: ' + err.message);
        } finally {
            setSyncing(false);
        }
    };

    const handleDisconnect = async () => {
        if (!window.confirm('Tem certeza que deseja desconectar sua conta do Meta Ads?')) return;

        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Delete tokens
            const { error } = await supabase
                .from('meta_tokens')
                .delete()
                .eq('user_id', user.id);

            if (error) throw error;

            // Optional: Clear ad accounts or keep them? 
            // Usually better to keep them but mark as disconnected, but for now let's just refresh.
            // If we delete tokens, the connection check in fetchConnections will fail, which is what we want.

            setSuccess('Conta desconectada com sucesso.');
            fetchConnections();
        } catch (err) {
            console.error('Error disconnecting:', err);
            setError('Erro ao desconectar: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAccount = async (account) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const newStatus = !account.is_selected;

            const { error } = await supabase
                .from('meta_ad_accounts')
                .update({ is_selected: newStatus })
                .eq('account_id', account.account_id)
                .eq('user_id', user.id);

            if (!error) {
                fetchConnections();
            } else {
                console.error('Error updating account:', error);
            }
        } catch (err) {
            console.error('Error toggling account:', err);
        }
    };

    const handleConnectMeta = () => {
        setShowConnectModal(true);
    };

    useEffect(() => {
        const messageHandler = (event) => {
            if (event?.data?.type === 'META_AUTH_SUCCESS') {
                setSuccess('Conta Meta Ads conectada com sucesso!');
                setShowConnectModal(false);
                // Add delay to ensure DB propagation
                setTimeout(() => {
                    fetchConnections();
                }, 1000);
            } else if (event?.data?.type === 'META_AUTH_ERROR') {
                setError('Erro na autenticação Meta: ' + (event.data.message || 'Desconhecido'));
                setShowConnectModal(false);
            }
        };

        window.addEventListener('message', messageHandler);
        return () => window.removeEventListener('message', messageHandler);
    }, []);

    const metaConnection = connections.find(c => c.platform === 'meta');

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Integrações</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie suas conexões com plataformas externas</p>
                </div>
            </div>

            {error && <AlertBox type="error" message={error} />}
            {success && <AlertBox type="success" message={success} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetaIntegrationCard
                    isConnected={!!metaConnection}
                    profileName={metaConnection?.account_name}
                    adAccounts={metaConnection?.ad_accounts || []} // Assuming ad_accounts are populated
                    onConnect={handleConnectMeta}
                    onSync={handleSync}
                    onDisconnect={handleDisconnect}
                    onToggleAccount={handleToggleAccount}
                />

                {/* Placeholders for other integrations */}
                <div className={`card-premium p-6 flex flex-col items-center text-center h-full ${connections.find(c => c.platform === 'google') ? "border-blue-200 bg-blue-50/30" : ""}`}>
                    <div className="flex flex-col items-center w-full flex-1">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" alt="Google Ads" className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-gray-900">Google Ads</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {connections.find(c => c.platform === 'google')
                                ? 'Conectado e sincronizando'
                                : 'Gerencie campanhas de pesquisa e display'}
                        </p>
                    </div>

                    {connections.find(c => c.platform === 'google') ? (
                        <div className="w-full space-y-2 mt-auto">
                            <button
                                onClick={() => navigate('/google/onboarding')}
                                className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Gerenciar Contas
                            </button>
                            <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Ativo
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={async () => {
                                try {
                                    const { data: { user } } = await supabase.auth.getUser();
                                    if (!user) return alert('Faça login primeiro');

                                    // Call backend to get auth URL
                                    const res = await fetch(`/api/auth/google/login?userId=${user.id}`);
                                    const { url } = await res.json();

                                    const popup = window.open(url, 'Connect Google', 'width=600,height=700');

                                    const handler = (e) => {
                                        if (e.data.type === 'GOOGLE_AUTH_SUCCESS') {
                                            window.removeEventListener('message', handler);
                                            fetchConnections(); // Refresh list
                                            navigate('/google/onboarding'); // Go to selection
                                        }
                                    };
                                    window.addEventListener('message', handler);
                                } catch (e) {
                                    console.error(e);
                                    alert('Erro ao iniciar conexão Google');
                                }
                            }}
                            className="btn-primary w-full mt-auto"
                        >
                            Conectar Google Ads
                        </button>
                    )}
                </div>
            </div>

            <ConnectMetaModal
                isOpen={showConnectModal}
                onClose={() => setShowConnectModal(false)}
                tenantId={tenantId}
                userId={userId}
            />
        </div>
    );
};

export default Integrations;
