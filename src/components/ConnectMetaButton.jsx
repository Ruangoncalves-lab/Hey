import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Facebook, Check, AlertCircle, Loader2 } from 'lucide-react';

const ConnectMetaButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleConnect = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.functions.invoke('meta-auth-start');

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            // Open popup
            const width = 600;
            const height = 700;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            const popup = window.open(
                data.url,
                'Connect Meta Ads',
                `width=${width},height=${height},top=${top},left=${left}`
            );

            // Listen for success message from popup
            const messageHandler = (event) => {
                if (event.data.type === 'META_AUTH_SUCCESS') {
                    window.removeEventListener('message', messageHandler);
                    // Refresh or redirect
                    window.location.href = '/meta/onboarding';
                }
            };
            window.addEventListener('message', messageHandler);

        } catch (err) {
            console.error('Error starting auth:', err);
            setError('Falha ao iniciar conexão com Meta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start">
            <button
                onClick={handleConnect}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors disabled:opacity-70"
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Facebook size={20} />}
                Conectar Meta Ads
            </button>
            {error && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle size={14} />
                    {error}
                </div>
            )}
        </div>
    );
};

export default ConnectMetaButton;
