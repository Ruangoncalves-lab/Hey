import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, CheckCircle, CreditCard, Layout, RefreshCw } from 'lucide-react';
import AlertBox from '../../components/AlertBox';

const MetaAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('meta_ad_accounts')
                .select('*')
                .order('name');

            if (error) throw error;
            setAccounts(data);
        } catch (err) {
            console.error('Error fetching accounts:', err);
            setError('Falha ao carregar contas.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAccount = async (account) => {
        try {
            const newValue = !account.is_selected;

            // Optimistic update
            setAccounts(prev => prev.map(a =>
                a.account_id === account.account_id ? { ...a, is_selected: newValue } : a
            ));

            const { error } = await supabase
                .from('meta_ad_accounts')
                .update({ is_selected: newValue })
                .eq('account_id', account.account_id);

            if (error) throw error;

        } catch (err) {
            console.error('Error updating account:', err);
            setError('Erro ao atualizar preferência.');
            fetchAccounts(); // Revert on error
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const { data, error } = await supabase.functions.invoke('meta-sync');
            if (error) throw error;
            // Maybe show a toast or alert
        } catch (err) {
            console.error('Sync error:', err);
            setError('Erro ao sincronizar dados.');
        } finally {
            setSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contas de Anúncio</h1>
                    <p className="text-sm text-gray-500">Gerencie quais contas são sincronizadas.</p>
                </div>
                <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
                    Sincronizar Agora
                </button>
            </div>

            {error && <AlertBox type="error" message={error} />}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {accounts.map((account) => (
                        <div key={account.account_id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${account.is_selected ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{account.name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>ID: {account.account_id}</span>
                                        <span>•</span>
                                        <span>{account.currency}</span>
                                        {account.business_name && (
                                            <>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Layout size={12} />
                                                    {account.business_name}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={account.is_selected || false}
                                    onChange={() => handleToggleAccount(account)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    ))}
                    {accounts.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            Nenhuma conta encontrada. Conecte o Meta Ads na página de Integrações.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetaAccounts;
