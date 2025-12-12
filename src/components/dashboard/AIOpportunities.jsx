import React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

const AIOpportunities = ({ opportunities: rawOpportunities }) => {
    const defaultOpportunities = [
        {
            title: 'Sem Oportunidades',
            description: 'Nenhuma oportunidade de otimização detectada no momento.',
            impact: 'Baixo Impacto'
        }
    ];

    const opportunities = rawOpportunities && rawOpportunities.length > 0 ? rawOpportunities.map(o => ({
        title: o.title,
        description: o.message,
        impact: o.impact_level === 'high' ? 'Alto Impacto' : 'Médio Impacto'
    })) : defaultOpportunities;

    return (
        <div className="card-premium p-5 bg-emerald-900 text-white border-none relative overflow-hidden h-full flex flex-col">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles size={180} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
                        <Sparkles size={20} className="text-emerald-300" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Oportunidades de Crescimento</h3>
                        <p className="text-emerald-200 text-xs">Sugestões geradas por IA</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-[250px] pr-1 custom-scrollbar-dark">
                    {opportunities.map((opp, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm">{opp.title}</h4>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                                    {opp.impact}
                                </span>
                            </div>
                            <p className="text-emerald-100 text-xs leading-relaxed mb-3">
                                {opp.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 group-hover:text-white transition-colors">
                                <span>Aplicar Sugestão</span>
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AIOpportunities;
