import React, { useState } from 'react';
import {
    Wand2,
    Target,
    Users,
    DollarSign,
    Image as ImageIcon,
    Check,
    AlertTriangle,
    Lightbulb,
    ChevronRight,
    Sparkles,
    ArrowRight
} from 'lucide-react';

const SmartCampaignCreator = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        objective: '',
        platform: [],
        budget: '',
        audience: '',
        creativeType: 'auto'
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/30 mb-4">
                    <Wand2 size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Criador Inteligente</h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Deixe nossa IA analisar seu histórico e criar a campanha perfeita em segundos.
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex items-center gap-2 ${step >= s ? 'text-emerald-700 font-bold' : 'text-gray-300'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${step >= s ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-gray-100'
                                }`}>
                                {s}
                            </div>
                            <span className="hidden sm:inline">
                                {s === 1 && 'Objetivos'}
                                {s === 2 && 'Configuração IA'}
                                {s === 3 && 'Revisão'}
                            </span>
                            {s < 3 && <div className={`w-12 h-1 rounded-full mx-2 ${step > s ? 'bg-emerald-200' : 'bg-gray-100'}`}></div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 1: Objectives */}
            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="card-premium p-8 hover:border-emerald-500/50 cursor-pointer group transition-all" onClick={() => { setFormData({ ...formData, objective: 'sales' }); handleNext(); }}>
                        <div className="p-4 bg-emerald-50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                            <Target size={32} className="text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Maximizar Vendas</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Foco total em conversão. A IA buscará usuários com maior probabilidade de compra no menor custo possível.
                        </p>
                    </div>

                    <div className="card-premium p-8 hover:border-blue-500/50 cursor-pointer group transition-all" onClick={() => { setFormData({ ...formData, objective: 'leads' }); handleNext(); }}>
                        <div className="p-4 bg-blue-50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                            <Users size={32} className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Gerar Leads Qualificados</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Encontre pessoas interessadas no seu serviço. Ideal para captura de contatos e agendamentos.
                        </p>
                    </div>

                    <div className="card-premium p-8 hover:border-purple-500/50 cursor-pointer group transition-all" onClick={() => { setFormData({ ...formData, objective: 'traffic' }); handleNext(); }}>
                        <div className="p-4 bg-purple-50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                            <Sparkles size={32} className="text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Reconhecimento de Marca</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Alcance o máximo de pessoas possível para tornar sua marca conhecida e lembrada.
                        </p>
                    </div>

                    <div className="card-premium p-8 hover:border-orange-500/50 cursor-pointer group transition-all" onClick={() => { setFormData({ ...formData, objective: 'app' }); handleNext(); }}>
                        <div className="p-4 bg-orange-50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                            <DollarSign size={32} className="text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Promoção de Oferta</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Impulsione uma oferta específica ou desconto sazonal para queimar estoque rapidamente.
                        </p>
                    </div>
                </div>
            )}

            {/* Step 2: Configuration */}
            {step === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Parâmetros da Campanha</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Orçamento Diário Sugerido</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                                        <input type="number" className="input-premium pl-12" placeholder="0,00" defaultValue="50.00" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <Sparkles size={12} className="text-emerald-500" />
                                        IA recomenda entre R$ 45 - R$ 80 para este objetivo.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Plataformas</label>
                                    <div className="flex gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <input type="checkbox" className="peer sr-only" defaultChecked />
                                            <div className="p-4 rounded-xl border-2 border-gray-100 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all text-center font-bold text-gray-600 peer-checked:text-emerald-700">
                                                Meta Ads
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer">
                                            <input type="checkbox" className="peer sr-only" defaultChecked />
                                            <div className="p-4 rounded-xl border-2 border-gray-100 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all text-center font-bold text-gray-600 peer-checked:text-blue-700">
                                                Google Ads
                                            </div>
                                        </label>
                                        <label className="flex-1 cursor-pointer">
                                            <input type="checkbox" className="peer sr-only" />
                                            <div className="p-4 rounded-xl border-2 border-gray-100 peer-checked:border-black peer-checked:bg-gray-100 transition-all text-center font-bold text-gray-600 peer-checked:text-black">
                                                TikTok
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Público-Alvo</label>
                                    <select className="input-premium appearance-none">
                                        <option>Automático (IA Advantage+)</option>
                                        <option>Lookalike 1% Compradores</option>
                                        <option>Interesses: Moda & Beleza</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* AI Suggestions */}
                        <div className="card-premium p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                            <div className="flex items-center gap-2 mb-4 text-indigo-700">
                                <Lightbulb size={20} />
                                <h3 className="font-bold">Sugestões da IA</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 text-sm text-indigo-900">
                                    <strong className="block mb-1">Criativo Dinâmico</strong>
                                    Recomendamos usar 3 imagens e 2 vídeos. A IA irá alternar para encontrar o melhor.
                                </div>
                                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 text-sm text-indigo-900">
                                    <strong className="block mb-1">Copywriting</strong>
                                    Use gatilhos de "Escassez" para este público. A taxa de conversão tende a ser 15% maior.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="card-premium p-8 bg-white border-emerald-100 shadow-xl shadow-emerald-500/10">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Resumo da Campanha</h2>
                                <p className="text-gray-500">Sua campanha está pronta para ser lançada.</p>
                            </div>
                            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm flex items-center gap-2">
                                <Sparkles size={16} /> Otimizada por IA
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-2">Estimativa de Alcance</span>
                                <div className="text-3xl font-bold text-gray-900">140K - 280K</div>
                                <span className="text-xs text-emerald-600 font-bold">Pessoas/dia</span>
                            </div>
                            <div>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-2">Conversões Estimadas</span>
                                <div className="text-3xl font-bold text-gray-900">45 - 80</div>
                                <span className="text-xs text-emerald-600 font-bold">Vendas/dia</span>
                            </div>
                            <div>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-2">ROAS Projetado</span>
                                <div className="text-3xl font-bold text-gray-900">4.5x - 6.2x</div>
                                <span className="text-xs text-emerald-600 font-bold">Retorno sobre investimento</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                            <h4 className="font-bold text-gray-900 mb-4">Detalhes da Configuração</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Objetivo</span>
                                    <span className="font-bold text-gray-900">Maximizar Vendas</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Orçamento</span>
                                    <span className="font-bold text-gray-900">R$ 50,00 / dia</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Plataformas</span>
                                    <span className="font-bold text-gray-900">Meta Ads, Google Ads</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Estratégia</span>
                                    <span className="font-bold text-emerald-600">Bid Cap (Custo Menor)</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button onClick={handleBack} className="btn-secondary">Voltar</button>
                            <button className="btn-primary px-8 py-3 text-base shadow-emerald-500/30">
                                <Wand2 size={20} /> Lançar Campanha Agora
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons (for steps 1 and 2) */}
            {step < 3 && (
                <div className="flex justify-between pt-8 border-t border-gray-200">
                    <button
                        onClick={handleBack}
                        className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}
                    >
                        Voltar
                    </button>
                    <button onClick={handleNext} className="btn-primary px-8">
                        Continuar <ArrowRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SmartCampaignCreator;
