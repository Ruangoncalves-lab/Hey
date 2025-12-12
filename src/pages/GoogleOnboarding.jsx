import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle, ChevronRight, Monitor, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../components/AlertBox';

const GoogleOnboarding = () => {
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
                return;
            }

            // Call our backend proxy
            const response = await fetch('/api/google/accounts', {
                headers: {
                    'x-user-id': user.id // Pass user ID for backend to find token
                }
            });

            if (!response.ok) throw new Error('Falha ao buscar contas Google.');

            const data = await response.json();
            setAccounts(data);
        } catch (err) {
            console.error('Error fetching Google accounts:', err);
            setError('Falha ao carregar contas. Verifique se você conectou o Google Ads.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAccount = (account) => {
        setSelectedAccounts(prev => {
            const exists = prev.find(a => a.id === account.id);
            if (exists) {
                return prev.filter(a => a.id !== account.id);
            } else {
                return [...prev, account];
            }
        });
    };

    const handleSave = async () => {
        if (selectedAccounts.length === 0) {
            setError('Selecione pelo menos uma conta.');
            return;
        }

        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const response = await fetch('/api/google/accounts/select', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    accounts: selectedAccounts
                })
            });

            if (!response.ok) throw new Error('Falha ao salvar seleção.');

            navigate('/integrations');
        } catch (err) {
            console.error('Save error:', err);
            setError('Erro ao salvar configurações.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900">Carregando contas Google Ads...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Configurar Google Ads</h1>
                    <p className="mt-2 text-gray-600">Selecione as contas que deseja gerenciar.</p>
                </div>

                {error && <AlertBox type="error" message={error} className="mb-6" />}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Contas Encontradas</h3>
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                            {accounts.length} contas
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {accounts.map((account) => {
                            const isSelected = selectedAccounts.find(a => a.id === account.id);
                            return (
                                <div
                                    key={account.id}
                                    onClick={() => handleToggleAccount(account)}
                                    className={`p-4 flex items-center justify-between cursor-pointer transition-colors hover:bg-gray-50 ${isSelected ? 'bg-blue-50/50' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <Monitor size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{account.descriptiveName}</h4>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span>ID: {account.id}</span>
                                                <span>•</span>
                                                <span>{account.currencyCode}</span>
                                                <span>•</span>
                                                <span>{account.timeZone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                                        {isSelected && <CheckCircle size={14} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                        <button
                            onClick={() => navigate('/integrations')}
                            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving || selectedAccounts.length === 0}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    Confirmar
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleOnboarding;
