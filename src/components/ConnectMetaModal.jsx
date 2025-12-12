import React, { useState, useEffect } from 'react';
import { X, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ConnectMetaModal = ({ isOpen, onClose, tenantId, userId }) => {
    const [authUrl, setAuthUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && tenantId) {
            const fetchUrl = async () => {
                setLoading(true);
                setError(null);
                try {
                    // Use passed userId or fallback to Supabase user
                    let currentUserId = userId;
                    if (!currentUserId) {
                        const { data: { user } } = await supabase.auth.getUser();
                        currentUserId = user?.id;
                    }

                    if (!currentUserId) {
                        throw new Error('User ID not found');
                    }

                    const { data, error } = await supabase.functions.invoke('meta-auth-start', {
                        body: { tenantId, userId: currentUserId }
                    });

                    if (error) throw error;
                    if (data.error) throw new Error(data.error);

                    setAuthUrl(data.url);
                } catch (err) {
                    console.error('Error fetching auth URL:', err);
                    setError('Erro ao carregar link de conexão');
                } finally {
                    setLoading(false);
                }
            };
            fetchUrl();
        }
    }, [isOpen, tenantId, userId]);

    const handleCopy = () => {
        if (!authUrl) return;
        navigator.clipboard.writeText(authUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConnect = () => {
        if (!authUrl) return;
        const width = 600, height = 700;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(authUrl, 'Meta Login', `width=${width},height=${height},top=${top},left=${left}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-gray-900">Conectar Meta Ads</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600 transition-colors" /></button>
                </div>
                <div className="p-8 text-center">
                    <p className="text-sm text-gray-500 mb-6">Escolha como deseja conectar sua conta.</p>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <Loader2 className="animate-spin text-emerald-600 mb-2" size={32} />
                            <p className="text-sm text-gray-400">Gerando link seguro...</p>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 mb-4 text-sm">{error}</div>
                    ) : (
                        <>
                            <button
                                onClick={handleConnect}
                                disabled={!authUrl}
                                className="btn-primary w-full mb-3 shadow-lg hover:shadow-emerald-500/30"
                            >
                                <ExternalLink size={18} /> Continuar neste navegador
                            </button>

                            <button
                                onClick={handleCopy}
                                disabled={!authUrl}
                                className="btn-secondary w-full shadow-md"
                            >
                                <Copy size={18} /> {copied ? 'Link Copiado!' : 'Copiar link de conexão'}
                            </button>
                            <p className="text-xs text-gray-400 mt-2">Use o link para conectar em outro navegador ou enviar ao cliente.</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConnectMetaModal;
