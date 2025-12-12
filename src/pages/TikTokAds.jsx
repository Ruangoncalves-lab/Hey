import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    Zap,
    Eye,
    Users,
    AlertTriangle,
    Lightbulb,
    Plus,
    X,
    ChevronRight,
    Check,
    Video
} from 'lucide-react';

const TikTokAds = () => {
    const navigate = useNavigate();
    const [showWizard, setShowWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedObjective, setSelectedObjective] = useState('');

    // --- Mock Data ---
    const metrics = [
        { title: 'ROAS Total', value: '3.2', trend: '+5%', isUp: true },
        { title: 'Gasto Total', value: 'R$ 1.150', trend: '+25%', isUp: false },
        { title: 'CPC Médio', value: 'R$ 0,35', trend: '-12%', isUp: true },
        { title: 'CPM Médio', value: 'R$ 8,40', trend: '+1%', isUp: false },
        { title: 'CTR Média', value: '1.1%', trend: '-0.1%', isUp: false },
        { title: 'Frequência', value: '1.2', trend: '0%', isUp: true },
        { title: 'Custo/Conv.', value: 'R$ 18,20', trend: '-8%', isUp: true },
        { title: 'Conversões', value: '62', trend: '+20%', isUp: true },
        { title: 'Alcance', value: '85.2K', trend: '+15%', isUp: true },
        { title: 'Impressões', value: '102K', trend: '+18%', isUp: true },
    ];

    const campaigns = [
        { id: 1, name: 'Desafio Hashtag', status: 'Ativa', roas: '3.5', ctr: '1.5%', cpc: 'R$ 0,30', cpm: 'R$ 8,00', cpa: 'R$ 15,00', conv: 35, spent: 'R$ 525' },
        { id: 2, name: 'Vídeo Viral Produto X', status: 'Ativa', roas: '2.8', ctr: '0.9%', cpc: 'R$ 0,40', cpm: 'R$ 9,50', cpa: 'R$ 22,50', conv: 18, spent: 'R$ 405' },
        { id: 3, name: 'Spark Ads Influencer', status: 'Pausada', roas: '1.5', ctr: '0.7%', cpc: 'R$ 0,55', cpm: 'R$ 12,00', cpa: 'R$ 35,00', conv: 5, spent: 'R$ 175' },
    ];

    // --- Wizard Logic ---
    const handleNextStep = () => {
        if (wizardStep < 5) setWizardStep(wizardStep + 1);
    };

    const handlePrevStep = () => {
        if (wizardStep > 1) setWizardStep(wizardStep - 1);
    };

    const closeWizard = () => {
        setShowWizard(false);
        setWizardStep(1);
        setSelectedObjective('');
    };

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between mb-6 lg:mb-8 text-white relative z-10">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                        <span className="p-2 bg-black rounded-lg"><Video size={24} className="text-white" /></span>
                        TikTok Ads
                    </h1>
                    <p className="text-emerald-100/80 font-medium">Crie campanhas virais e alcance a Geração Z.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                        <select className="bg-transparent text-white text-sm font-medium focus:outline-none [&>option]:text-gray-800">
                            <option>Últimos 7 dias</option>
                            <option>Últimos 30 dias</option>
                        </select>
                    </div>
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

            {/* AI Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-premium p-6">
                    <div className="flex items-center gap-2 mb-6 text-yellow-600">
                        <AlertTriangle size={20} />
                        <h3 className="font-bold text-lg">Alertas</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex gap-3 items-start">
                            <Zap size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Fadiga de Criativo:</strong> O vídeo "Desafio Hashtag" está perdendo retenção.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-premium p-6">
                    <div className="flex items-center gap-2 mb-6 text-green-600">
                        <Lightbulb size={20} />
                        <h3 className="font-bold text-lg">Oportunidades</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex gap-3 items-start">
                            <TrendingUp size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Trend Alert:</strong> Use o áudio "Summer Vibes" para aumentar o alcance orgânico em 40%.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campaign Ranking */}
            <div className="card-premium p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Campanhas Ativas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Nome</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Status</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">ROAS</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">CTR</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">CPC</th>
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
                                    <td className="py-4 px-4 text-green-600 font-bold">{camp.roas}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.ctr}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.cpc}</td>
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

            {/* Wizard Modal (Simplified) */}
            {showWizard && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-3xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Nova Campanha TikTok</h2>
                            <button onClick={closeWizard}><X size={24} /></button>
                        </div>
                        <p className="text-gray-500">O wizard de criação do TikTok Ads será implementado aqui.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TikTokAds;
