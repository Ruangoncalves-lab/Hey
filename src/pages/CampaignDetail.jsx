import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    Zap,
    Eye,
    MousePointer,
    ShoppingBag,
    Users,
    BarChart2,
    AlertTriangle,
    Lightbulb,
    X,
    Copy,
    PauseCircle,
    Edit,
    Download,
    ArrowLeft,
    PieChart,
    Settings,
    Image as ImageIcon
} from 'lucide-react';

const CampaignDetail = () => {
    const { id } = useParams();

    // --- Mock Data ---
    const metrics = [
        { title: 'ROAS', value: '4.5', trend: '+12%', isUp: true },
        { title: 'Gasto Total', value: 'R$ 1.240', trend: '+18%', isUp: false },
        { title: 'CPC Médio', value: 'R$ 0,45', trend: '-5%', isUp: true },
        { title: 'CPM Médio', value: 'R$ 12,00', trend: '+3%', isUp: false },
        { title: 'CTR', value: '2.1%', trend: '+0.2%', isUp: true },
        { title: 'Frequência', value: '1.2', trend: '0%', isUp: true },
        { title: 'Custo/Compra', value: 'R$ 22,00', trend: '-10%', isUp: true },
        { title: 'Conversões', value: '45', trend: '+15%', isUp: true },
        { title: 'Alcance', value: '22.5K', trend: '+8%', isUp: true },
        { title: 'Impressões', value: '34.2K', trend: '+10%', isUp: true },
    ];

    const creatives = [
        { id: 1, name: 'Vídeo Promo 01', type: 'video', ctr: '2.5%', cpc: 'R$ 0,40', cpm: 'R$ 11,50', freq: '1.2', roas: '5.1' },
        { id: 2, name: 'Imagem Carrossel', type: 'image', ctr: '1.8%', cpc: 'R$ 0,55', cpm: 'R$ 13,00', freq: '1.1', roas: '3.8' },
        { id: 3, name: 'Story Estático', type: 'image', ctr: '1.2%', cpc: 'R$ 0,60', cpm: 'R$ 10,00', freq: '1.3', roas: '2.5' },
    ];

    const audiences = [
        { name: 'Interesse: Moda', type: 'Interesse', size: '2.5M', reach: '12K', cpc: 'R$ 0,42', cpm: 'R$ 11,00', ctr: '2.2%', conv: 25, roas: '4.8' },
        { name: 'LAL 1% Compradores', type: 'Lookalike', size: '1.8M', reach: '8K', cpc: 'R$ 0,50', cpm: 'R$ 14,00', ctr: '1.9%', conv: 15, roas: '4.2' },
        { name: 'Remarketing Site 30D', type: 'Custom', size: '50K', reach: '2.5K', cpc: 'R$ 0,80', cpm: 'R$ 25,00', ctr: '3.5%', conv: 5, roas: '6.5' },
    ];

    return (
        <div className="space-y-8">
            {/* 1. Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link to="/traffic/meta" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Campanha Verão 2025</h1>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">Ativa</span>
                    </div>
                    <p className="text-gray-500 ml-14">Análise completa da performance da sua campanha</p>
                </div>
                <div className="flex items-center gap-3 ml-14 lg:ml-0">
                    <button className="btn-secondary px-4 py-2 text-sm"><Edit size={16} /> Editar</button>
                    <button className="btn-secondary px-4 py-2 text-sm"><Copy size={16} /> Duplicar</button>
                    <button className="btn-secondary px-4 py-2 text-sm"><PauseCircle size={16} /> Pausar</button>
                    <Link to="/traffic/meta" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><X size={24} /></Link>
                </div>
            </div>

            {/* 2. Resumo Geral (Metrics) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="card-premium p-5 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{metric.title}</div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
                        <div className={`flex items-center gap-1 text-xs font-bold ${metric.isUp ? 'text-emerald-600' : 'text-red-600'}`}>
                            {metric.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span>{metric.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Gráficos Principais & 4. Insights IA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Chart 1: ROAS */}
                    <div className="card-premium p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">ROAS por Dia</h3>
                            <select className="text-sm border-none bg-transparent text-gray-500 font-medium focus:ring-0 cursor-pointer"><option>Últimos 7 dias</option></select>
                        </div>
                        <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">
                            <TrendingUp size={48} className="opacity-20" />
                            <span className="ml-2 font-medium">Gráfico de Linha ROAS</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Chart 2: CTR */}
                        <div className="card-premium p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900">CTR por Dia</h3>
                            </div>
                            <div className="h-48 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">
                                <MousePointer size={32} className="opacity-20" />
                                <span className="ml-2 font-medium">Gráfico de Linha CTR</span>
                            </div>
                        </div>

                        {/* Chart 3: Spend */}
                        <div className="card-premium p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Gasto por Dia</h3>
                            </div>
                            <div className="h-48 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">
                                <BarChart2 size={32} className="opacity-20" />
                                <span className="ml-2 font-medium">Gráfico de Barras Gasto</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="card-premium p-6 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white border-none shadow-xl shadow-emerald-900/20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Zap size={24} className="text-yellow-300" />
                        </div>
                        <h2 className="text-xl font-bold">Análise da IA</h2>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider mb-4">Alertas Críticos</h4>
                        <div className="space-y-3">
                            <div className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <AlertTriangle size={18} className="text-red-300 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-emerald-50 leading-relaxed">Frequência alta demais (1.8) nos últimos 3 dias. <span className="text-white font-bold">Sugestão: rotacionar criativos.</span></div>
                            </div>
                            <div className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                <Target size={18} className="text-orange-300 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-emerald-50 leading-relaxed">CPM acima do normal (R$ 15,00). Público pode estar saturado.</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider mb-4">Oportunidades</h4>
                        <div className="space-y-3">
                            <div className="flex gap-3 p-3 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                                <DollarSign size={18} className="text-green-300 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-white leading-relaxed">Aumentar orçamento em 15% pode gerar <span className="font-bold text-green-300">+R$ 300</span> em vendas estimadas.</div>
                            </div>
                            <div className="flex gap-3 p-3 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                                <Eye size={18} className="text-blue-300 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-white leading-relaxed">Criativo 02 tem melhor CTR (2.5%). Replique esse estilo.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Criativos */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Criativos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creatives.map(creative => (
                        <div key={creative.id} className="card-premium p-0 overflow-hidden group">
                            <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                                <ImageIcon size={48} className="text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
                                    {creative.type === 'video' ? 'Vídeo' : 'Imagem'}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="font-bold text-gray-900 mb-4">{creative.name}</div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">CTR</span>
                                        <span className="text-lg font-bold text-blue-600">{creative.ctr}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">ROAS</span>
                                        <span className="text-lg font-bold text-emerald-600">{creative.roas}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">CPC</span>
                                        <span className="text-sm font-bold text-gray-700">{creative.cpc}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 block mb-1">CPM</span>
                                        <span className="text-sm font-bold text-gray-700">{creative.cpm}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button className="flex-1 btn-secondary py-2 text-xs h-9">Substituir</button>
                                    <button className="flex-1 btn-secondary py-2 text-xs h-9">Duplicar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. Públicos & 7. Distribuição */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Públicos Utilizados</h2>
                    <div className="card-premium overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table-clean">
                                <thead>
                                    <tr>
                                        <th>Nome do Público</th>
                                        <th>Tipo</th>
                                        <th>Tamanho</th>
                                        <th>Alcance</th>
                                        <th>CPC</th>
                                        <th>CTR</th>
                                        <th>ROAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {audiences.map((aud, i) => (
                                        <tr key={i}>
                                            <td className="font-bold text-gray-900">{aud.name}</td>
                                            <td><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{aud.type}</span></td>
                                            <td>{aud.size}</td>
                                            <td>{aud.reach}</td>
                                            <td>{aud.cpc}</td>
                                            <td>{aud.ctr}</td>
                                            <td className="text-emerald-600 font-bold">{aud.roas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Distribuição de Gasto</h2>
                    <div className="card-premium p-6 h-[300px] flex flex-col items-center justify-center">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <PieChart size={64} className="text-gray-200" />
                            {/* Placeholder for real chart */}
                        </div>
                        <p className="text-sm font-medium text-gray-500 mt-4">Gasto por Conjunto de Anúncios</p>
                    </div>
                </div>
            </div>

            {/* 8. Configurações */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Configurações da Campanha</h2>
                <div className="card-premium p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Objetivo</span>
                            <span className="font-bold text-gray-900">Vendas (Conversão)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Orçamento</span>
                            <span className="font-bold text-gray-900">R$ 50,00 / dia</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Início</span>
                            <span className="font-bold text-gray-900">01/11/2025</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Posicionamentos</span>
                            <span className="font-bold text-gray-900">Automático (Advantage+)</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Expansão de Público</span>
                            <span className="font-bold text-emerald-600">Ativado</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <span className="text-gray-500 font-medium">Pixel</span>
                            <span className="font-bold text-gray-900">Pixel Principal (ID: 12345)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 9. Footer */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                <button className="btn-secondary"><Settings size={18} /> Editar Configurações</button>
                <button className="btn-secondary"><Download size={18} /> Gerar Relatório PDF</button>
                <Link to="/traffic/meta" className="btn-primary">
                    Voltar para Meta Ads
                </Link>
            </div>
        </div>
    );
};

export default CampaignDetail;
