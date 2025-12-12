import React from 'react';
import SectionCard from '../components/SectionCard';
import { Star, TrendingUp, Zap } from 'lucide-react';

const ProductDetails = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Detalhes do Produto</h1>
                    <p className="text-gray-500">Gerencie as informações e visualize a performance</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary">Editar Produto</button>
                    <button className="btn-primary">Ver Análises</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SectionCard>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden shadow-inner">
                                    <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80" alt="Product" className="w-full h-full object-cover mix-blend-multiply" />
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="aspect-square rounded-xl bg-gray-50 cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all border border-gray-100"></div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="mb-4">
                                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">Em Estoque</span>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Apple Watch Series 7</h2>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex text-yellow-400 gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">(124 avaliações)</span>
                                </div>
                                <h3 className="text-4xl font-bold text-emerald-600 mb-8">R$ 2.699</h3>

                                <div className="space-y-6 mb-8">
                                    <p className="text-gray-600 leading-relaxed">
                                        O maior display Always-On Retina já criado torna tudo que você faz com seu Apple Watch Series 7 maior e melhor. A interface foi otimizada para aproveitar ao máximo a tela maior.
                                    </p>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            Caixa de 41mm ou 45mm
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            Display Always-On Retina
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            Resistente à poeira IP6X
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            Resistente à água 50m
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </SectionCard>
                </div>

                <div className="space-y-8">
                    <div className="card-premium p-6 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white border-none shadow-xl shadow-emerald-900/20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Zap size={24} className="text-yellow-300" />
                            </div>
                            <h2 className="text-xl font-bold">Insights da IA</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="flex items-start gap-3 mb-2">
                                    <TrendingUp size={18} className="text-green-300 mt-0.5" />
                                    <h4 className="font-bold text-white text-sm">Performance Alta</h4>
                                </div>
                                <p className="text-xs text-emerald-100 leading-relaxed">Este produto está performando <span className="font-bold text-white">15% melhor</span> que na semana passada. Considere aumentar investimento em anúncios.</p>
                            </div>
                            <div className="p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="flex items-start gap-3 mb-2">
                                    <Zap size={18} className="text-blue-300 mt-0.5" />
                                    <h4 className="font-bold text-white text-sm">Recomendação</h4>
                                </div>
                                <p className="text-xs text-emerald-100 leading-relaxed">Crie um bundle com "AirPods Pro" para aumentar o ticket médio em <span className="font-bold text-white">12%</span>.</p>
                            </div>
                        </div>
                    </div>

                    <SectionCard title="Estatísticas">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-sm font-medium text-gray-600">Total de Vendas</span>
                                <span className="font-bold text-gray-900 text-lg">1.245</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-sm font-medium text-gray-600">Receita</span>
                                <span className="font-bold text-gray-900 text-lg">R$ 334.905</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-sm font-medium text-gray-600">Taxa de Retorno</span>
                                <span className="font-bold text-red-600 text-lg">2,1%</span>
                            </div>
                        </div>
                    </SectionCard>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
