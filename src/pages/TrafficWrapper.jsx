import React from 'react';
import MetricCard from '../components/MetricCard';
import SectionCard from '../components/SectionCard';
import StatusPill from '../components/StatusPill';
import { TrendingUp, DollarSign, Target, Zap } from 'lucide-react';

const TrafficPage = ({ platform }) => {
    const campaigns = [
        { name: 'Campanha Verão 2025', status: 'Ativa', roas: '4.5', cpc: 'R$ 0,45', cpm: 'R$ 12,00', spent: 'R$ 1.240' },
        { name: 'Retargeting - Carrinho', status: 'Ativa', roas: '6.2', cpc: 'R$ 0,80', cpm: 'R$ 15,50', spent: 'R$ 850' },
        { name: 'Brand Awareness', status: 'Pausada', roas: '1.2', cpc: 'R$ 0,15', cpm: 'R$ 5,00', spent: 'R$ 300' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">{platform} Ads</h1>
                <p className="text-sm text-gray-500 mt-1">Gerencie suas campanhas de {platform}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="ROAS Médio" value="4.8" change="+12%" icon={TrendingUp} iconBg="bg-green-50" iconColor="text-green-600" />
                <MetricCard title="CPC Médio" value="R$ 0,52" change="-5%" changeType="decrease" icon={DollarSign} iconBg="bg-blue-50" iconColor="text-blue-600" />
                <MetricCard title="CPM Médio" value="R$ 11,20" change="+3%" icon={Target} iconBg="bg-purple-50" iconColor="text-purple-600" />
                <MetricCard title="Gasto Total" value="R$ 2.390" change="+18%" icon={Zap} iconBg="bg-orange-50" iconColor="text-orange-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SectionCard title="Campanhas Ativas">
                        <div className="overflow-x-auto">
                            <table className="table-clean">
                                <thead>
                                    <tr>
                                        <th>Nome da Campanha</th>
                                        <th>Status</th>
                                        <th>ROAS</th>
                                        <th>CPC</th>
                                        <th>CPM</th>
                                        <th>Gasto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigns.map((campaign, i) => (
                                        <tr key={i}>
                                            <td><span className="font-medium text-gray-900">{campaign.name}</span></td>
                                            <td><StatusPill status={campaign.status} variant={campaign.status === 'Ativa' ? 'success' : 'default'} /></td>
                                            <td><span className="font-semibold text-green-600">{campaign.roas}</span></td>
                                            <td>{campaign.cpc}</td>
                                            <td>{campaign.cpm}</td>
                                            <td><span className="font-semibold">{campaign.spent}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>
                </div>

                <SectionCard title="Análise IA">
                    <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <div className="flex items-start gap-2 mb-2">
                                <Zap size={16} className="text-yellow-600 mt-0.5" />
                                <h4 className="font-semibold text-yellow-900 text-sm">Alerta de Orçamento</h4>
                            </div>
                            <p className="text-xs text-yellow-800">Campanha "Brand Awareness" tem CPM alto. Considere refinar o público.</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-start gap-2 mb-2">
                                <TrendingUp size={16} className="text-green-600 mt-0.5" />
                                <h4 className="font-semibold text-green-900 text-sm">Oportunidade</h4>
                            </div>
                            <p className="text-xs text-green-800">Aumentar orçamento em "Retargeting" em 20% pode gerar R$ 400 extras com base no ROAS atual.</p>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export const TrafficMeta = () => <TrafficPage platform="Meta" />;
export const TrafficGoogle = () => <TrafficPage platform="Google" />;
export const TrafficTikTok = () => <TrafficPage platform="TikTok" />;
