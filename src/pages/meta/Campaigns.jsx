import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, TrendingUp, DollarSign, MousePointer, Eye, Filter } from 'lucide-react';
import SectionCard from '../../components/SectionCard';

const MetaCampaigns = () => {
    const { id: accountId } = useParams(); // Optional: filter by account if ID provided
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCampaigns();
    }, [accountId]);

    const fetchCampaigns = async () => {
        try {
            let query = supabase
                .from('meta_campaigns')
                .select(`
                    *,
                    meta_ad_accounts (name, currency)
                `)
                .order('updated_at', { ascending: false });

            if (accountId) {
                query = query.eq('account_id', accountId);
            }

            const { data, error } = await query;

            if (error) throw error;
            setCampaigns(data);
        } catch (err) {
            console.error('Error fetching campaigns:', err);
            setError('Falha ao carregar campanhas.');
        } finally {
            setLoading(false);
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
                <h1 className="text-2xl font-bold text-gray-900">Campanhas Meta Ads</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                        <Filter size={16} />
                        Filtrar
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Nome</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Objetivo</th>
                                <th className="px-6 py-3">Tipo de Compra</th>
                                <th className="px-6 py-3">Início</th>
                                <th className="px-6 py-3">Término</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {campaign.name}
                                        <div className="text-xs text-gray-400">{campaign.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                            campaign.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{campaign.objective}</td>
                                    <td className="px-6 py-4">{campaign.buying_type}</td>
                                    <td className="px-6 py-4">
                                        {campaign.start_time ? new Date(campaign.start_time).toLocaleDateString('pt-BR') : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {campaign.stop_time ? new Date(campaign.stop_time).toLocaleDateString('pt-BR') : '-'}
                                    </td>
                                </tr>
                            ))}
                            {campaigns.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        Nenhuma campanha encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MetaCampaigns;
