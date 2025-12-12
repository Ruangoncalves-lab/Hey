import React, { useState } from 'react';
import {
    BarChart2,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    Filter,
    PieChart,
    Activity,
    DollarSign,
    Users,
    ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const DeepAnalytics = () => {
    const [dateRange, setDateRange] = useState('Últimos 30 dias');

    // --- Mock Data ---
    const performanceData = [
        { name: '01 Nov', meta: 4000, google: 2400, tiktok: 2400 },
        { name: '05 Nov', meta: 3000, google: 1398, tiktok: 2210 },
        { name: '10 Nov', meta: 2000, google: 9800, tiktok: 2290 },
        { name: '15 Nov', meta: 2780, google: 3908, tiktok: 2000 },
        { name: '20 Nov', meta: 1890, google: 4800, tiktok: 2181 },
        { name: '25 Nov', meta: 2390, google: 3800, tiktok: 2500 },
        { name: '30 Nov', meta: 3490, google: 4300, tiktok: 2100 },
    ];

    const comparisonData = [
        { channel: 'Meta Ads', spend: 'R$ 12.450', roas: '4.8', cpa: 'R$ 22,50', conv: 542, ctr: '2.1%' },
        { channel: 'Google Ads', spend: 'R$ 8.230', roas: '5.2', cpa: 'R$ 18,40', conv: 410, ctr: '4.5%' },
        { channel: 'TikTok Ads', spend: 'R$ 3.100', roas: '3.1', cpa: 'R$ 15,20', conv: 180, ctr: '1.2%' },
        { channel: 'E-mail Mkt', spend: 'R$ 450', roas: '12.5', cpa: 'R$ 2,50', conv: 120, ctr: '15.4%' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between mb-6 lg:mb-8 text-white relative z-10">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Analytics Profundo</h1>
                    <p className="text-emerald-100/80 font-medium">Análise detalhada de performance cross-channel.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-transparent text-white text-sm font-medium focus:outline-none [&>option]:text-gray-800"
                        >
                            <option>Últimos 7 dias</option>
                            <option>Últimos 30 dias</option>
                            <option>Este Mês</option>
                            <option>Mês Passado</option>
                            <option>Este Ano</option>
                        </select>
                    </div>
                    <button className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                        <Filter size={18} /> Filtros Avançados
                    </button>
                    <button className="btn-primary bg-white text-[#113C3C] hover:bg-emerald-50 border-none shadow-lg shadow-black/5 flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all">
                        <Download size={18} />
                        <span>Exportar Relatório</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-premium p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Receita Total</div>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign size={20} /></div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">R$ 142.350</div>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <TrendingUp size={14} /> +12.5% vs período anterior
                    </div>
                </div>
                <div className="card-premium p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">ROAS Global</div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity size={20} /></div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">5.4x</div>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <TrendingUp size={14} /> +0.4 vs período anterior
                    </div>
                </div>
                <div className="card-premium p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Conversões</div>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Users size={20} /></div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">1,252</div>
                    <div className="flex items-center gap-1 text-xs font-bold text-red-600">
                        <TrendingDown size={14} /> -2.1% vs período anterior
                    </div>
                </div>
                <div className="card-premium p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Custo Total</div>
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><PieChart size={20} /></div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">R$ 26.350</div>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                        Dentro do orçamento previsto
                    </div>
                </div>
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card-premium p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Comparativo de Canais</h3>
                            <p className="text-sm text-gray-500">Receita gerada por canal de tráfego</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-xs font-bold text-gray-500"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Meta</span>
                            <span className="flex items-center gap-1 text-xs font-bold text-gray-500"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Google</span>
                            <span className="flex items-center gap-1 text-xs font-bold text-gray-500"><span className="w-2 h-2 rounded-full bg-black"></span> TikTok</span>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="meta" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorMeta)" />
                                <Area type="monotone" dataKey="google" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorGoogle)" />
                                <Area type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={3} fillOpacity={0.05} fill="#000000" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-premium p-8 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Distribuição de Verba</h3>
                    <div className="flex-1 flex items-center justify-center relative">
                        {/* Placeholder for Donut Chart */}
                        <div className="w-48 h-48 rounded-full border-[16px] border-emerald-100 border-t-emerald-500 border-r-blue-500 border-b-purple-500 rotate-45 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-xs text-gray-400 font-bold uppercase">Total</div>
                                <div className="text-xl font-bold text-gray-900">R$ 24K</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="text-sm font-medium text-gray-600">Meta Ads</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">45%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-sm font-medium text-gray-600">Google Ads</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">30%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                                <span className="text-sm font-medium text-gray-600">TikTok Ads</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">25%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Performance por Canal</h3>
                    <button className="text-emerald-700 font-bold text-sm hover:underline flex items-center gap-1">
                        Ver relatório completo <ArrowRight size={16} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-clean">
                        <thead>
                            <tr>
                                <th>Canal</th>
                                <th>Investimento</th>
                                <th>Receita (Est.)</th>
                                <th>ROAS</th>
                                <th>CPA</th>
                                <th>Conversões</th>
                                <th>CTR</th>
                                <th>Tendência</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, index) => (
                                <tr key={index}>
                                    <td className="font-bold text-gray-900 flex items-center gap-2">
                                        {row.channel === 'Meta Ads' && <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">f</div>}
                                        {row.channel === 'Google Ads' && <div className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-900 text-[10px] font-bold">G</div>}
                                        {row.channel === 'TikTok Ads' && <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white text-[10px] font-bold">T</div>}
                                        {row.channel === 'E-mail Mkt' && <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">@</div>}
                                        {row.channel}
                                    </td>
                                    <td>{row.spend}</td>
                                    <td className="font-medium text-gray-900">R$ {(parseFloat(row.roas) * parseFloat(row.spend.replace('R$ ', '').replace('.', ''))).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${parseFloat(row.roas) > 4 ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {row.roas}x
                                        </span>
                                    </td>
                                    <td>{row.cpa}</td>
                                    <td>{row.conv}</td>
                                    <td>{row.ctr}</td>
                                    <td>
                                        <div className="w-24 h-8">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={[
                                                    { v: Math.random() * 10 }, { v: Math.random() * 10 }, { v: Math.random() * 10 }, { v: Math.random() * 10 }, { v: Math.random() * 10 }
                                                ]}>
                                                    <Area type="monotone" dataKey="v" stroke={parseFloat(row.roas) > 4 ? "#10B981" : "#F59E0B"} strokeWidth={2} fillOpacity={0.1} fill={parseFloat(row.roas) > 4 ? "#10B981" : "#F59E0B"} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DeepAnalytics;
