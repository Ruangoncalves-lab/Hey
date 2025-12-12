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
    Check
} from 'lucide-react';

const MetaAds = () => {
    const navigate = useNavigate();
    const [showWizard, setShowWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedObjective, setSelectedObjective] = useState('');

    // --- Mock Data ---
    const metrics = [
        { title: 'ROAS Total', value: '4.8', trend: '+12%', isUp: true },
        { title: 'Gasto Total', value: 'R$ 2.390', trend: '+18%', isUp: false },
        { title: 'CPC Médio', value: 'R$ 0,52', trend: '-5%', isUp: true },
        { title: 'CPM Médio', value: 'R$ 11,20', trend: '+3%', isUp: false },
        { title: 'CTR Média', value: '1.8%', trend: '+0.2%', isUp: true },
        { title: 'Frequência', value: '1.4', trend: '0%', isUp: true },
        { title: 'Custo/Compra', value: 'R$ 24,50', trend: '-10%', isUp: true },
        { title: 'Conversões', value: '98', trend: '+15%', isUp: true },
        { title: 'Alcance', value: '45.2K', trend: '+8%', isUp: true },
        { title: 'Impressões', value: '68.5K', trend: '+10%', isUp: true },
    ];

    const campaigns = [
        { id: 1, name: 'Campanha Verão 2025', status: 'Ativa', roas: '4.5', ctr: '2.1%', cpc: 'R$ 0,45', cpm: 'R$ 12,00', cpa: 'R$ 22,00', conv: 45, spent: 'R$ 1.240' },
        { id: 2, name: 'Retargeting - Carrinho', status: 'Ativa', roas: '6.2', ctr: '3.5%', cpc: 'R$ 0,80', cpm: 'R$ 15,50', cpa: 'R$ 18,50', conv: 32, spent: 'R$ 850' },
        { id: 3, name: 'Brand Awareness', status: 'Pausada', roas: '1.2', ctr: '0.9%', cpc: 'R$ 0,15', cpm: 'R$ 5,00', cpa: 'R$ 45,00', conv: 5, spent: 'R$ 300' },
        { id: 4, name: 'Lookalike 1% Compradores', status: 'Ativa', roas: '3.8', ctr: '1.5%', cpc: 'R$ 0,60', cpm: 'R$ 14,00', cpa: 'R$ 28,00', conv: 16, spent: 'R$ 450' },
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
            {/* Header - White text for contrast on Green Background */}
            <div className="flex items-end justify-between mb-6 lg:mb-8 text-white relative z-10">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Meta Ads</h1>
                    <p className="text-emerald-100/80 font-medium">Gerencie e otimize suas campanhas da Meta com IA.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                        <select className="bg-transparent text-white text-sm font-medium focus:outline-none [&>option]:text-gray-800">
                            <option>Últimos 7 dias</option>
                            <option>Últimos 30 dias</option>
                            <option>Últimos 90 dias</option>
                            <option>Mês Atual</option>
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
                {/* Alerts */}
                <div className="card-premium p-6">
                    <div className="flex items-center gap-2 mb-6 text-yellow-600">
                        <AlertTriangle size={20} />
                        <h3 className="font-bold text-lg">Alertas e Atenção</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-red-50 text-red-800 p-4 rounded-xl flex gap-3 items-start">
                            <TrendingDown size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Queda de ROAS:</strong> A campanha "Brand Awareness" caiu -22% nos últimos 7 dias.
                            </div>
                        </div>
                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex gap-3 items-start">
                            <Zap size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Frequência Alta:</strong> A frequência está alta demais em "Retargeting - Carrinho".
                            </div>
                        </div>
                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex gap-3 items-start">
                            <Target size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>CPM Elevado:</strong> Seu CPM está acima do normal. Sugestão: ampliar o público.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Opportunities */}
                <div className="card-premium p-6">
                    <div className="flex items-center gap-2 mb-6 text-green-600">
                        <Lightbulb size={20} />
                        <h3 className="font-bold text-lg">Oportunidades de Crescimento</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex gap-3 items-start">
                            <DollarSign size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Escalar Orçamento:</strong> Aumentar orçamento em "Retargeting" pode gerar +R$ 400 em lucro.
                            </div>
                        </div>
                        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex gap-3 items-start">
                            <Eye size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Criativo Campeão:</strong> Criativo 03 está com CTR excelente (3.5%).
                            </div>
                        </div>
                        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex gap-3 items-start">
                            <Users size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Novo Público:</strong> Criar um lookalike de compradores 180 dias tem potencial de alto ROAS.
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
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">CPM</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Custo/Compra</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Conv.</th>
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
                                    <td className="py-4 px-4 text-gray-600">{camp.cpm}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.cpa}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.conv}</td>
                                    <td className="py-4 px-4 font-medium text-gray-900">{camp.spent}</td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => navigate(`/campaigns/${camp.id}`)}
                                            className="text-emerald-700 hover:text-emerald-900 text-sm font-bold hover:underline"
                                        >
                                            Ver detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Campaign Wizard Modal */}
            {showWizard && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-900">Criar Nova Campanha</h2>
                            <button onClick={closeWizard} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex px-6 py-4 bg-white border-b border-gray-100 gap-4 overflow-x-auto">
                            {[1, 2, 3, 4, 5].map(step => (
                                <div key={step} className={`flex items-center gap-2 text-sm whitespace-nowrap ${wizardStep === step ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${wizardStep === step ? 'bg-emerald-700 text-white' : 'bg-gray-100'
                                        }`}>
                                        {step}
                                    </div>
                                    <span>
                                        {step === 1 && 'Objetivo'}
                                        {step === 2 && 'Público'}
                                        {step === 3 && 'Criativos'}
                                        {step === 4 && 'Orçamento'}
                                        {step === 5 && 'Revisão'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 overflow-y-auto flex-1">
                            {wizardStep === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900">Qual é o objetivo da sua campanha?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {['Vendas', 'Tráfego', 'Engajamento', 'Leads'].map(obj => (
                                            <div
                                                key={obj}
                                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedObjective === obj
                                                    ? 'border-emerald-600 bg-emerald-50'
                                                    : 'border-gray-100 hover:border-emerald-200 hover:bg-gray-50'
                                                    }`}
                                                onClick={() => setSelectedObjective(obj)}
                                            >
                                                <h4 className="font-bold text-gray-900 mb-1">{obj}</h4>
                                                <p className="text-sm text-gray-500">Otimizar para {obj.toLowerCase()}.</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* ... (Other steps would follow similar styling updates) ... */}
                            {wizardStep === 5 && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900">Revisão da Campanha</h3>
                                    <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Objetivo:</span>
                                            <span className="font-bold text-gray-900">{selectedObjective || 'Não selecionado'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Público:</span>
                                            <span className="font-bold text-gray-900">Brasil, 18-65+</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Orçamento:</span>
                                            <span className="font-bold text-gray-900">R$ 50,00 / dia</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                                        <Check size={20} />
                                        <span className="font-medium">Tudo pronto para publicar! A IA otimizou sua configuração.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-between bg-gray-50/50">
                            <button
                                onClick={handlePrevStep}
                                className={`px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors ${wizardStep === 1 ? 'invisible' : ''}`}
                            >
                                Voltar
                            </button>
                            {wizardStep < 5 ? (
                                <button onClick={handleNextStep} className="bg-[#113C3C] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#0d2e2e] transition-colors flex items-center gap-2">
                                    Próximo <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button onClick={closeWizard} className="bg-[#113C3C] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#0d2e2e] transition-colors">
                                    Publicar Campanha
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MetaAds;
