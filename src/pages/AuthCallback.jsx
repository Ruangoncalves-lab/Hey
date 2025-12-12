import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
    const [status, setStatus] = useState('Processando...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const processAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get('access_token');
            const longLivedToken = params.get('long_lived_token');
            const userId = params.get('user_id');
            const errorMsg = params.get('error');

            if (errorMsg) {
                setError(errorMsg);
                notifyOpener('META_AUTH_ERROR', { message: errorMsg });
                return;
            }

            if (!accessToken || !userId) {
                setError('Dados de autenticação incompletos.');
                return;
            }

            try {
                setStatus('Salvando conexão...');

                // Save tokens to Supabase directly from frontend
                const { error: dbError } = await supabase
                    .from('meta_tokens')
                    .upsert({
                        user_id: userId,
                        access_token: accessToken,
                        long_lived_token: longLivedToken,
                        expires_at: params.get('expires_at') || null,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' });

                if (dbError) throw dbError;

                // Trigger initial sync
                setStatus('Sincronizando contas...');
                await supabase.functions.invoke('meta-sync', {
                    body: { user_id: userId }
                });

                setStatus('Concluído!');
                notifyOpener('META_AUTH_SUCCESS', { userId });

                setTimeout(() => window.close(), 1500);

            } catch (err) {
                console.error('Auth Callback Error:', err);
                setError('Erro ao salvar conexão: ' + err.message);
                notifyOpener('META_AUTH_ERROR', { message: err.message });
            }
        };

        processAuth();
    }, []);

    const navigate = useNavigate();

    const notifyOpener = (type, data) => {
        if (window.opener) {
            window.opener.postMessage({ type, ...data }, '*');
        } else {
            // If no opener (same window flow), redirect back to app
            if (type === 'META_AUTH_SUCCESS') {
                setTimeout(() => navigate('/integrations'), 1500);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="card-premium p-8 max-w-sm w-full text-center">
                {error ? (
                    <>
                        <div className="text-red-500 font-bold text-xl mb-2">Erro</div>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button onClick={() => window.close()} className="btn-secondary w-full justify-center">
                            Fechar
                        </button>
                    </>
                ) : (
                    <>
                        <Loader2 className="animate-spin text-emerald-600 w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{status}</h2>
                        <p className="text-sm text-gray-500">Não feche esta janela ainda.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthCallback;
