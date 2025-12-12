import React, { useState } from 'react';
import {
    X,
    ChevronRight,
    ChevronLeft,
    Check,
    Target,
    Users,
    Image as ImageIcon,
    CreditCard,
    Rocket,
    Facebook,
    Youtube,
    Video,
    MapPin,
    Search,
    Wand2,
    Upload,
    Smartphone,
    Monitor,
    Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CampaignWizard = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        platform: '',
        objective: '',
        audience: {
            ageRange: [18, 65],
            gender: 'all',
            location: [],
            interests: []
        },
        budget: {
            type: 'daily',
            amount: '',
            startDate: '',
            endDate: ''
        },
        creatives: []
    });

    const steps = [
        { id: 1, title: 'Plataforma', icon: Layout },
        { id: 2, title: 'Objetivo', icon: Target },
        { id: 3, title: 'Público', icon: Users },
        { id: 4, title: 'Criativos', icon: ImageIcon },
        { id: 5, title: 'Orçamento', icon: CreditCard },
        { id: 6, title: 'Revisão', icon: Rocket },
    ];

    const handleNext = () => setStep(prev => Math.min(prev + 1, 6));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    // --- Step Components ---

    const StepPlatform = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { id: 'meta', name: 'Meta Ads', icon: Facebook, color: 'bg-blue-600' },
                { id: 'google', name: 'Google Ads', icon: Search, color: 'bg-red-500' },
                { id: 'tiktok', name: 'TikTok Ads', icon: Video, color: 'bg-black' }
            ].map((p) => (
                <div
                    key={p.id}
                    onClick={() => setFormData({ ...formData, platform: p.id })}
                    className={`cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-center gap-4 transition-all ${formData.platform === p.id
                        ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500 ring-offset-2'
                        : 'border-gray-100 hover:border-emerald-200 hover:bg-gray-50'
                        }`}
                >
                    <div className={`w-16 h-16 rounded-full ${p.color} text-white flex items-center justify-center shadow-lg`}>
                        <p.icon size={32} />
                    </div>
                    <span className="font-bold text-lg text-gray-900">{p.name}</span>
                </div>
            ))}
        </div>
    );

    const StepObjective = () => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                'Vendas', 'Leads', 'Tráfego', 'Engajamento',
                'Mensagens', 'Alcance', 'Visualização de Vídeo', 'Instalação de App'
            ].map((obj) => (
                <button
                    key={obj}
                    onClick={() => setFormData({ ...formData, objective: obj })}
                    className={`p-4 rounded-xl border text-left transition-all ${formData.objective === obj
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                        }`}
                >
                    {obj}
                </button>
            ))}
        </div>
    );

    const StepAudience = () => (
        <div className="space-y-6">
            {/* Location */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Localização</label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Adicionar país, estado ou cidade..." className="input-premium pl-10" />
                    </div>
                    <button className="btn-secondary">Mapa Interativo</button>
                </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Idade</label>
                    <div className="flex items-center gap-2">
                        <input type="number" className="input-premium w-20 text-center" defaultValue={18} />
                        <span className="text-gray-400">-</span>
                        <input type="number" className="input-premium w-20 text-center" defaultValue={65} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Gênero</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['Todos', 'Homens', 'Mulheres'].map(g => (
                            <button key={g} className="flex-1 py-2 rounded-md text-sm font-medium hover:bg-white hover:shadow-sm transition-all">{g}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interests */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Interesses e Comportamentos</label>
                <div className="input-premium min-h-[100px] flex flex-wrap gap-2 content-start">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        Marketing Digital <X size={12} className="cursor-pointer" />
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        E-commerce <X size={12} className="cursor-pointer" />
                    </span>
                    <input type="text" placeholder="Buscar interesses..." className="bg-transparent outline-none text-sm flex-1 min-w-[120px]" />
                </div>
                <div className="flex gap-2 text-xs text-emerald-600 font-bold cursor-pointer">
                    <Wand2 size={14} /> Sugestões da IA
                </div>
            </div>
        </div>
    );

    const StepCreatives = () => (
        <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Upload size={24} />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-gray-900">Upload de Mídia</h3>
                    <p className="text-gray-500 text-sm">Arraste ou clique para selecionar</p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Biblioteca Selecionada</h3>
                <button className="text-emerald-600 text-sm font-bold">Escolher da Biblioteca</button>
            </div>

            {/* Mock Selected Creative with AI Analysis Badge */}
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                    <div className="font-bold text-gray-900 text-sm">Video_Promo_v1.mp4</div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <Wand2 size={10} /> Score IA: 92
                        </span>
                    </div>
                </div>
                <button className="text-red-500 hover:bg-red-50 p-2 rounded-full"><X size={16} /></button>
            </div>
        </div>
    );

    const StepBudget = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-emerald-500 bg-emerald-50 rounded-xl text-center">
                    <div className="font-bold text-emerald-700">Diário</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-xl text-center hover:bg-gray-50">
                    <div className="font-bold text-gray-600">Vitalício</div>
                </button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Valor</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">R$</span>
                    <input type="number" className="input-premium pl-10 text-lg font-bold" placeholder="0,00" />
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                <Wand2 className="text-blue-600 mt-1 shrink-0" size={18} />
                <div>
                    <h4 className="font-bold text-blue-800 text-sm">Sugestão Inteligente</h4>
                    <p className="text-sm text-blue-700 mt-1">Com base no seu objetivo de Vendas, recomendamos um orçamento diário entre <span className="font-bold">R$ 50 - R$ 120</span> para otimizar o aprendizado da IA.</p>
                </div>
            </div>
        </div>
    );

    const StepReview = () => (
        <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Plataforma</span>
                    <span className="font-bold text-gray-900 flex items-center gap-2"><Facebook size={16} /> Meta Ads</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Objetivo</span>
                    <span className="font-bold text-gray-900">Vendas</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Público</span>
                    <span className="font-bold text-gray-900 text-right">Brasil, 25-45 anos<br />Interesse em Marketing</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Orçamento</span>
                    <span className="font-bold text-gray-900">R$ 100,00 / dia</span>
                </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                    <Rocket size={18} /> Estimativa de Performance (IA)
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-xs text-emerald-600 uppercase font-bold">Alcance</div>
                        <div className="font-bold text-emerald-900">12k - 45k</div>
                    </div>
                    <div>
                        <div className="text-xs text-emerald-600 uppercase font-bold">Conversões</div>
                        <div className="font-bold text-emerald-900">15 - 42</div>
                    </div>
                    <div>
                        <div className="text-xs text-emerald-600 uppercase font-bold">ROAS Est.</div>
                        <div className="font-bold text-emerald-900">3.5x - 5.2x</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-4xl h-[90vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Nova Campanha</h2>
                        <p className="text-gray-500 text-sm">Crie e publique campanhas otimizadas com IA.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-2xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {step === 1 && <StepPlatform />}
                                {step === 2 && <StepObjective />}
                                {step === 3 && <StepAudience />}
                                {step === 4 && <StepCreatives />}
                                {step === 5 && <StepBudget />}
                                {step === 6 && <StepReview />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-gray-100 flex justify-between items-center bg-white">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} /> Voltar
                    </button>

                    <button
                        onClick={step === 6 ? onClose : handleNext}
                        className="btn-primary"
                    >
                        {step === 6 ? (
                            <>Publicar Campanha <Rocket size={18} /></>
                        ) : (
                            <>Próximo <ChevronRight size={18} /></>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CampaignWizard;
