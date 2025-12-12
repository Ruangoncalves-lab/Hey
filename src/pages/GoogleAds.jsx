import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    Zap,
    Eye,
    Search,
    ShoppingBag,
    Users,
    BarChart2,
    AlertTriangle,
    Lightbulb,
    Plus,
    X,
    ChevronRight,
    Check
} from 'lucide-react';

const GoogleAds = () => {
    const navigate = useNavigate();
    const [showWizard, setShowWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedObjective, setSelectedObjective] = useState('');

    // --- Mock Data ---
    const metrics = [
        { title: 'Impressões', value: '125K', trend: '+8%', isUp: true },
        { title: 'Cliques', value: '4.2K', trend: '+12%', isUp: true },
        { title: 'CTR', value: '3.4%', trend: '+0.5%', isUp: true },
        { title: 'CPC Médio', value: 'R$ 1,85', trend: '-2%', isUp: true },
        { title: 'Custo Total', value: 'R$ 7.850', trend: '+15%', isUp: false },
        { title: 'Conversões', value: '320', trend: '+18%', isUp: true },
        { title: 'CPA', value: 'R$ 24,50', trend: '-5%', isUp: true },
        { title: 'Taxa Conv.', value: '7.6%', trend: '+1.2%', isUp: true },
        { title: 'Valor Conv.', value: 'R$ 45K', trend: '+22%', isUp: true },
        { title: 'ROAS', value: '5.8', trend: '+10%', isUp: true },
    ];

    const campaigns = [
        { id: 1, name: 'Pesquisa - Institucional', type: 'Pesquisa', status: 'Ativa', impr: '45K', clicks: '2.1K', ctr: '4.6%', cpc: 'R$ 0,90', conv: 150, cpa: 'R$ 12,50', roas: '8.5', spent: 'R$ 1.890' },
        { id: 2, name: 'PMax - E-commerce Geral', type: 'PMax', status: 'Ativa', impr: '60K', clicks: '1.5K', ctr: '2.5%', cpc: 'R$ 2,10', conv: 120, cpa: 'R$ 26,00', roas: '6.2', spent: 'R$ 3.150' },
        { id: 3, name: 'Display - Remarketing', type: 'Display', status: 'Pausada', impr: '15K', clicks: '300', ctr: '2.0%', cpc: 'R$ 0,50', conv: 15, cpa: 'R$ 35,00', roas: '2.5', spent: 'R$ 525' },
        { id: 4, name: 'YouTube - Awareness', type: 'Video', status: 'Ativa', impr: '5K', clicks: '300', ctr: '6.0%', cpc: 'R$ 0,40', conv: 35, cpa: 'R$ 15,00', roas: '4.5', spent: 'R$ 2.285' },
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
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                        <span className="text-blue-400">G</span>
                        <span className="text-red-400">o</span>
                        <span className="text-yellow-400">o</span>
                        <span className="text-blue-400">g</span>
                        <span className="text-green-400">l</span>
                        <span className="text-red-400">e</span>
                        <span className="ml-2">Ads</span>
                    </h1>
                    <p className="text-emerald-100/80 font-medium">Gerencie, otimize e crie campanhas inteligentes para Google.</p>
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
                        className="btn-primary bg-[#4285f4] text-white hover:bg-[#3367d6] border-none shadow-lg shadow-blue-500/20 flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all"
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
                            <DollarSign size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>CPC Alto:</strong> Seu CPC está 25% acima da média do setor em "PMax - E-commerce".
                            </div>
                        </div>
                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex gap-3 items-start">
                            <Zap size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Índice de Qualidade:</strong> A campanha de Pesquisa - Compradores está com IQ baixo (4/10).
                            </div>
                        </div>
                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl flex gap-3 items-start">
                            <Target size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Gasto Ineficiente:</strong> Palavra-chave "comprar tênis barato" está gastando muito e convertendo pouco.
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
                            <TrendingDown size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Reduzir Desperdício:</strong> Adicionar palavras negativas sugeridas pode reduzir até 18% do gasto.
                            </div>
                        </div>
                        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex gap-3 items-start">
                            <Eye size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Melhor Anúncio:</strong> Seu melhor anúncio está com CTR de 9.4%. Replique-o para outros grupos.
                            </div>
                        </div>
                        <div className="bg-green-50 text-green-800 p-4 rounded-xl flex gap-3 items-start">
                            <TrendingUp size={18} className="mt-0.5 shrink-0" />
                            <div className="text-sm">
                                <strong>Escalar PMax:</strong> Campanhas Performance Max próximas ao limite. Aumentar budget pode aumentar conversões.
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
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Tipo</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Status</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Impr.</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Cliques</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">CTR</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">CPC</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Conv.</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">CPA</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">ROAS</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Gasto</th>
                                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider py-4 px-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((camp) => (
                                <tr key={camp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-gray-900">{camp.name}</td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                                            {camp.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${camp.status === 'Ativa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">{camp.impr}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.clicks}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.ctr}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.cpc}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.conv}</td>
                                    <td className="py-4 px-4 text-gray-600">{camp.cpa}</td>
                                    <td className="py-4 px-4 text-green-600 font-bold">{camp.roas}</td>
                                    <td className="py-4 px-4 font-medium text-gray-900">{camp.spent}</td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => navigate(`/traffic/google/campaign/${camp.id}`)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-bold hover:underline"
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
                            <h2 className="text-xl font-bold text-gray-900">Criar Nova Campanha Google Ads</h2>
                            <button onClick={closeWizard} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex px-6 py-4 bg-white border-b border-gray-100 gap-4 overflow-x-auto">
                            {[1, 2, 3, 4, 5].map(step => (
                                <div key={step} className={`flex items-center gap-2 text-sm whitespace-nowrap ${wizardStep === step ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${wizardStep === step ? 'bg-blue-600 text-white' : 'bg-gray-100'
                                        }`}>
                                        {step}
                                    </div>
                                    <span>
                                        {step === 1 && 'Objetivo'}
                                        {step === 2 && 'Tipo'}
                                        {step === 3 && 'Configuração'}
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
                                        {['Vendas', 'Leads', 'Tráfego do Site', 'Consideração'].map(obj => (
                                            <div
                                                key={obj}
                                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedObjective === obj
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
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

                            {wizardStep === 2 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Selecione o Tipo de Campanha</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['Pesquisa', 'Performance Max', 'Display', 'Shopping', 'Vídeo', 'Discovery'].map(type => (
                                            <div key={type} className="border border-slate-200 p-4 rounded-lg hover:border-blue-400 cursor-pointer text-center">
                                                <div className="font-medium">{type}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {wizardStep === 3 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Configurações da Campanha</h3>
                                    <div className="ga-form-group">
                                        <label>Nome da Campanha</label>
                                        <input type="text" placeholder="Ex: Promoção de Natal 2025" />
                                    </div>
                                    <div className="ga-form-group">
                                        <label>Locais</label>
                                        <input type="text" defaultValue="Brasil" />
                                    </div>
                                    <div className="ga-form-group">
                                        <label>Idiomas</label>
                                        <input type="text" defaultValue="Português, Inglês" />
                                    </div>
                                </div>
                            )}

                            {wizardStep === 4 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Orçamento e Lances</h3>
                                    <div className="ga-form-group">
                                        <label>Orçamento Diário (R$)</label>
                                        <input type="number" defaultValue="100.00" />
                                    </div>
                                    <div className="ga-form-group">
                                        <label>Estratégia de Lances</label>
                                        <select>
                                            <option>Maximizar Conversões</option>
                                            <option>Maximizar Cliques</option>
                                            <option>ROAS Desejado</option>
                                            <option>CPA Desejado</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {wizardStep === 5 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold mb-4">Revisão da Campanha</h3>
                                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Objetivo:</span>
                                            <span className="font-medium">{selectedObjective || 'Não selecionado'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Tipo:</span>
                                            <span className="font-medium">Performance Max</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Orçamento:</span>
                                            <span className="font-medium">R$ 100,00 / dia</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <Check size={20} />
                                        <span className="text-sm font-medium">Tudo pronto para publicar! A IA otimizou sua configuração.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="ga-wizard-footer">
                            <button
                                onClick={handlePrevStep}
                                className={`px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 ${wizardStep === 1 ? 'invisible' : ''}`}
                            >
                                Voltar
                            </button>
                            {wizardStep < 5 ? (
                                <button onClick={handleNextStep} className="ga-btn-primary">
                                    Próximo <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button onClick={closeWizard} className="ga-btn-primary">
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

export default GoogleAds;
