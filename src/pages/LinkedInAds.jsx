import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    Zap,
    Briefcase,
    Users,
    AlertTriangle,
    Lightbulb,
    Plus,
    X,
    Linkedin
} from 'lucide-react';

const LinkedInAds = () => {
    const [showWizard, setShowWizard] = useState(false);

    // --- Mock Data ---
    const metrics = [
        { title: 'Leads Qualificados', value: '145', trend: '+10%', isUp: true },
        { title: 'Gasto Total', value: 'R$ 4.500', trend: '+5%', isUp: false },
        { title: 'CPC Médio', value: 'R$ 12,50', trend: '-2%', isUp: true },
        { title: 'CPM Médio', value: 'R$ 45,00', trend: '+1%', isUp: false },
        { title: 'Taxa de Conv.', value: '8.5%', trend: '+1.2%', isUp: true },
    ];

    const campaigns = [
        { id: 1, name: 'B2B Enterprise - Q4', status: 'Ativa', leads: 45, cpl: 'R$ 85,00', spent: 'R$ 3.825' },
        { id: 2, name: 'Webinar Inscrições', status: 'Ativa', leads: 82, cpl: 'R$ 45,00', spent: 'R$ 3.690' },
        { id: 3, name: 'Recrutamento Tech', status: 'Pausada', leads: 12, cpl: 'R$ 120,00', spent: 'R$ 1.440' },
    ];

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between mb-6 lg:mb-8 text-white relative z-10">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                        <span className="p-2 bg-[#0077B5] rounded-lg"><Linkedin size={24} className="text-white" /></span>
                        LinkedIn Ads
                    </h1>
                    <p className="text-emerald-100/80 font-medium">Alcance decisores e profissionais qualificados.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowWizard(true)}
                        className="btn-primary bg-white text-[#113C3C] hover:bg-emerald-50 border-none shadow-lg shadow-black/5 flex items-center gap-2"
                    >
                        <Plus size={18} />
                        <span>Criar Campanha</span>
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                {metrics.map((metric, index) => (
                    <div key={index} className="card-premium p-6 flex flex-col justify-between">
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{metric.title}</div>
                            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold mt-3 ${metric.isUp ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span>{metric.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Campaign Ranking */}
            <div className="card-premium p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Campanhas B2B Ativas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Nome</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Status</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Leads</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Custo/Lead</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Gasto</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((camp) => (
                                <tr key={camp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-gray-900">{camp.name}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${camp.status === 'Ativa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-bold text-gray-900">{camp.leads}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.cpl}</td>
                                    <td className="py-4 px-4 font-medium text-gray-900">{camp.spent}</td>
                                    <td className="py-4 px-4">
                                        <button className="text-emerald-700 hover:text-emerald-900 text-sm font-bold hover:underline">
                                            Ver detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Wizard Modal Placeholder */}
            {showWizard && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-3xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Nova Campanha LinkedIn</h2>
                            <button onClick={() => setShowWizard(false)}><X size={24} /></button>
                        </div>
                        <p className="text-gray-500">O wizard de criação do LinkedIn Ads será implementado aqui.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkedInAds;
