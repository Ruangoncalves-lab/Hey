import React from 'react';
import MetricCard from '../components/MetricCard';
import SectionCard from '../components/SectionCard';
import StatusPill from '../components/StatusPill';
import { Target, DollarSign, TrendingUp, Eye } from 'lucide-react';

const TrafficPage = ({ platform }) => {
    const campaigns = [
        { name: 'Campanha Verão 2025', status: 'Ativa', roas: '4.5x', cpc: 'R$ 0,45', cpm: 'R$ 12,00', spent: 'R$ 1.240', statusVariant: 'success' },
        { name: 'Retargeting - Carrinho', status: 'Ativa', roas: '6.2x', cpc: 'R$ 0,80', cpm: 'R$ 15,50', spent: 'R$ 850', statusVariant: 'success' },
        { name: 'Brand Awareness', status: 'Pausada', roas: '1.2x', cpc: 'R$ 0,15', cpm: 'R$ 5,00', spent: 'R$ 300', statusVariant: 'warning' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">{platform} Ads</h1>
                <p className="text-sm text-gray-500 mt-1">Gerencie suas campanhas de {platform}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="ROAS Médio" value="4.8x" change="+12%" changeType="increase" icon={Target} iconBg="bg-green-50" iconColor="text-green-600" />
                <MetricCard title="CPC Médio" value="R$ 0,52" change="-8%" changeType="increase" icon={DollarSign} iconBg="bg-blue-50" iconColor="text-blue-600" />
                <MetricCard title="CPM Médio" value="R$ 11,20" change="+3%" changeType="decrease" icon={TrendingUp} iconBg="bg-purple-50" iconColor="text-purple-600" />
                <MetricCard title="Gasto Total" value="R$ 2.390" change="+15%" changeType="decrease" icon={DollarSign} iconBg="bg-orange-50" iconColor="text-orange-600" />
            </div>

            <SectionCard title="Campanhas Ativas">
                <div className="overflow-x-auto">
                    <table className="table-clean">
                        <thead>
                            <tr>
                                <th>Nome da Campanha</th>
                                <th>Status</th>
                                <th>ROAS (Plat.)</th>
                                <th>ROI Real 🚀</th>
                                <th>Vendas (Rastreadas)</th>
                                <th>CPC</th>
                                <th>CPM</th>
                                <th>Gasto</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign, i) => (
                                <tr key={i}>
                                    <td><span className="font-medium text-gray-900">{campaign.name}</span></td>
                                    <td><StatusPill status={campaign.status} variant={campaign.statusVariant} /></td>
                                    <td><span className="font-semibold text-gray-600">{campaign.roas}</span></td>
                                    <td><span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">5.2x</span></td>
                                    <td><span className="font-medium text-gray-900">142</span></td>
                                    <td>{campaign.cpc}</td>
                                    <td>{campaign.cpm}</td>
                                    <td><span className="font-medium">{campaign.spent}</span></td>
                                    <td>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Eye size={16} className="text-gray-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
        </div>
    );
};

export default TrafficPage;
