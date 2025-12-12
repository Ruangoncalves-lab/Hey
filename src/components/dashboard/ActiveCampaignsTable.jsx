import React from 'react';
import { Edit2, MoreHorizontal } from 'lucide-react';

const ActiveCampaignsTable = () => {
    const campaigns = [
        {
            name: 'Verão 2025 - Conversão',
            roas: '4.2',
            ctr: '2.1%',
            cpc: 'R$ 1,45',
            cpm: 'R$ 18,20',
            status: 'Ativo'
        },
        {
            name: 'Remarketing - Catálogo',
            roas: '6.8',
            ctr: '3.5%',
            cpc: 'R$ 0,90',
            cpm: 'R$ 12,50',
            status: 'Ativo'
        },
        {
            name: 'Institucional - Branding',
            roas: '1.2',
            ctr: '0.8%',
            cpc: 'R$ 3,20',
            cpm: 'R$ 25,00',
            status: 'Pausado'
        },
        {
            name: 'Lançamento - Leads',
            roas: '3.5',
            ctr: '1.9%',
            cpc: 'R$ 2,10',
            cpm: 'R$ 22,10',
            status: 'Ativo'
        },
        {
            name: 'Black Friday - Antecipação',
            roas: '5.5',
            ctr: '2.8%',
            cpc: 'R$ 1,10',
            cpm: 'R$ 15,50',
            status: 'Ativo'
        },
        {
            name: 'Natal - Ofertas',
            roas: '4.8',
            ctr: '2.4%',
            cpc: 'R$ 1,30',
            cpm: 'R$ 19,00',
            status: 'Programado'
        },
        {
            name: 'Dia das Mães - Kits',
            roas: '3.9',
            ctr: '1.7%',
            cpc: 'R$ 1,80',
            cpm: 'R$ 20,50',
            status: 'Pausado'
        },
        {
            name: 'Liquidação de Inverno',
            roas: '2.5',
            ctr: '1.5%',
            cpc: 'R$ 0,75',
            cpm: 'R$ 10,00',
            status: 'Ativo'
        }
    ];

    return (
        <div className="card-premium p-8 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Campanhas Ativas</h3>
                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Ver Todas</button>
            </div>

            <div className="overflow-x-auto overflow-y-auto max-h-[300px] custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-500 text-sm border-b border-gray-100">
                            <th className="pb-4 font-medium pl-2 sticky top-0 bg-white z-10">Campanha</th>
                            <th className="pb-4 font-medium sticky top-0 bg-white z-10">ROAS</th>
                            <th className="pb-4 font-medium sticky top-0 bg-white z-10">CTR</th>
                            <th className="pb-4 font-medium sticky top-0 bg-white z-10">CPC</th>
                            <th className="pb-4 font-medium sticky top-0 bg-white z-10">CPM</th>
                            <th className="pb-4 font-medium sticky top-0 bg-white z-10">Status</th>
                            <th className="pb-4 font-medium text-right pr-2 sticky top-0 bg-white z-10">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-sm font-semibold">
                        {campaigns.map((campaign, index) => (
                            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                <td className="py-4 pl-2">
                                    <div className="font-bold text-gray-900">{campaign.name}</div>
                                </td>
                                <td className="py-4 text-emerald-600">{campaign.roas}x</td>
                                <td className="py-4">{campaign.ctr}</td>
                                <td className="py-4">{campaign.cpc}</td>
                                <td className="py-4">{campaign.cpm}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${campaign.status === 'Ativo'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right pr-2">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-emerald-600 transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveCampaignsTable;
