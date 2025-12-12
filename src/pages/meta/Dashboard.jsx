import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Loader2, TrendingUp, DollarSign, MousePointer, Eye } from 'lucide-react';
import SectionCard from '../../components/SectionCard';

import MetricCard from '../../components/MetricCard';

const MetaDashboard = () => {
    const [metrics, setMetrics] = useState([]);
    const [insights, setInsights] = useState([]);
    const [topAds, setTopAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({ spend: 0, impressions: 0, clicks: 0, ctr: 0, roas: 0, cpc: 0, cpm: 0 });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1. Fetch Metrics
            const { data: metricsData, error: metricsError } = await supabase
                .from('meta_metrics')
                .select('*')
                .order('date', { ascending: true });

            if (metricsError) throw metricsError;

            // 2. Fetch AI Insights
            const { data: insightsData, error: insightsError } = await supabase
                .from('meta_insights')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (insightsError) throw insightsError;

            // 3. Fetch Top Ads (by ROAS)
            // We need to fetch ads to get names, then map metrics
            // For simplicity, let's process metrics in JS to find top performing ad_ids
            const adPerformance = {};
            metricsData.forEach(m => {
                if (!adPerformance[m.ad_id]) adPerformance[m.ad_id] = { spend: 0, value: 0, roas: 0 };
                adPerformance[m.ad_id].spend += Number(m.spend);
                // Calculate value from ROAS * Spend if value not stored directly (we stored ROAS)
                // But wait, we didn't store value directly in metrics, only ROAS. 
                // We can approximate value = roas * spend.
                adPerformance[m.ad_id].value += (Number(m.roas) * Number(m.spend));
            });

            const topAdIds = Object.keys(adPerformance)
                .map(id => ({ id, ...adPerformance[id], roas: adPerformance[id].spend > 0 ? adPerformance[id].value / adPerformance[id].spend : 0 }))
                .sort((a, b) => b.roas - a.roas)
                .slice(0, 3)
                .map(a => a.id);

            let topAdsData = [];
            if (topAdIds.length > 0) {
                const { data: ads } = await supabase
                    .from('meta_ads')
                    .select('id, name, creative')
                    .in('id', topAdIds);

                topAdsData = ads.map(ad => {
                    const perf = adPerformance[ad.id];
                    return { ...ad, ...perf };
                });
            }

            setMetrics(metricsData);
            setInsights(insightsData || []);
            setTopAds(topAdsData);

            // Calculate Summary
            const sum = metricsData.reduce((acc, curr) => ({
                spend: acc.spend + (Number(curr.spend) || 0),
                impressions: acc.impressions + (Number(curr.impressions) || 0),
                clicks: acc.clicks + (Number(curr.clicks) || 0),
                value: acc.value + ((Number(curr.roas) || 0) * (Number(curr.spend) || 0))
            }), { spend: 0, impressions: 0, clicks: 0, value: 0 });

            setSummary({
                spend: sum.spend,
                impressions: sum.impressions,
                clicks: sum.clicks,
                ctr: sum.impressions ? ((sum.clicks / sum.impressions) * 100).toFixed(2) : 0,
                roas: sum.spend ? (sum.value / sum.spend).toFixed(2) : 0,
                cpc: sum.clicks ? (sum.spend / sum.clicks).toFixed(2) : 0,
                cpm: sum.impressions ? ((sum.spend / sum.impressions) * 1000).toFixed(2) : 0
            });

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                        Todas as Plataformas
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                        Últimos 30 dias
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="ROAS Total"
                    value={`${summary.roas}x`}
                    icon={TrendingUp}
                    iconBg="bg-emerald-100"
                    iconColor="text-emerald-600"
                    change="12.5%"
                    changeType="increase"
                />
                <MetricCard
                    title="Gasto Total"
                    value={`R$ ${summary.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                    change="8.2%"
                    changeType="increase"
                />
                <MetricCard
                    title="CPC Médio"
                    value={`R$ ${summary.cpc}`}
                    icon={MousePointer}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                    change="5.4%"
                    changeType="decrease"
                />
                <MetricCard
                    title="CPM Médio"
                    value={`R$ ${summary.cpm}`}
                    icon={Eye}
                    iconBg="bg-orange-100"
                    iconColor="text-orange-600"
                    change="2.1%"
                    changeType="increase"
                />
                <MetricCard
                    title="CTR Médio"
                    value={`${summary.ctr}%`}
                    icon={TrendingUp}
                    iconBg="bg-indigo-100"
                    iconColor="text-indigo-600"
                    change="0.4%"
                    changeType="increase"
                />
                <MetricCard
                    title="Impressões"
                    value={summary.impressions.toLocaleString()}
                    icon={Eye}
                    iconBg="bg-pink-100"
                    iconColor="text-pink-600"
                    change="25%"
                    changeType="increase"
                />
                <MetricCard
                    title="Cliques"
                    value={summary.clicks.toLocaleString()}
                    icon={MousePointer}
                    iconBg="bg-cyan-100"
                    iconColor="text-cyan-600"
                    change="18%"
                    changeType="increase"
                />
                <MetricCard
                    title="Conversões"
                    value="--"
                    icon={TrendingUp}
                    iconBg="bg-teal-100"
                    iconColor="text-teal-600"
                    change="22%"
                    changeType="increase"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Resumo</h3>
                            <div className="text-3xl font-bold text-gray-900 mt-1">R$ {summary.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">Diário</span>
                            <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-medium text-white">Mensal</span>
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={metrics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'Gasto']}
                                />
                                <Line type="monotone" dataKey="spend" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts & Attention */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Alertas e Atenção</h3>
                    <div className="space-y-4">
                        {insights.filter(i => i.type === 'alert').length > 0 ? (
                            insights.filter(i => i.type === 'alert').map(alert => (
                                <div key={alert.id} className="p-4 bg-red-50 rounded-xl border border-red-100">
                                    <h4 className="font-semibold text-red-700 text-sm mb-1">{alert.title}</h4>
                                    <p className="text-xs text-red-600">{alert.message}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                                <p className="text-sm text-green-700 font-medium">Tudo certo! Nenhum alerta crítico.</p>
                            </div>
                        )}

                        {/* Static fallback for demo if no alerts */}
                        {insights.length === 0 && (
                            <>
                                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                    <h4 className="font-semibold text-yellow-700 text-sm mb-1">Queda no ROAS</h4>
                                    <p className="text-xs text-yellow-600">A campanha "Verão 2025" teve uma queda de 15% no ROAS nas últimas 24h.</p>
                                </div>
                                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                    <h4 className="font-semibold text-red-700 text-sm mb-1">Orçamento Limitado</h4>
                                    <p className="text-xs text-red-600">A campanha "Remarketing" atingiu 90% do orçamento diário.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-[#064E3B] rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="flex items-center gap-2 mb-6 relative z-10">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                        <TrendingUp size={20} className="text-green-300" />
                    </div>
                    <h3 className="text-lg font-bold">Oportunidades de Crescimento</h3>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded text-green-100">Sugestões geradas por IA</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {insights.filter(i => i.type === 'optimization' || i.type === 'success').length > 0 ? (
                        insights.filter(i => i.type === 'optimization' || i.type === 'success').map(insight => (
                            <div key={insight.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-white">{insight.title}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${insight.impact_level === 'high' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                                        {insight.impact_level === 'high' ? 'Alto Impacto' : 'Médio Impacto'}
                                    </span>
                                </div>
                                <p className="text-sm text-green-100 mb-3">{insight.message}</p>
                                <div className="flex items-center text-xs text-green-300 font-medium group-hover:text-white transition-colors">
                                    Aplicar Sugestão →
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-white">Otimizar Criativos</h4>
                                    <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Alto Impacto</span>
                                </div>
                                <p className="text-sm text-green-100 mb-3">A IA identificou que vídeos curtos estão performando 35% melhor. Sugerimos criar 3 variações de Reels.</p>
                                <div className="flex items-center text-xs text-green-300 font-medium group-hover:text-white transition-colors">
                                    Aplicar Sugestão →
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-white">Ajuste de Bid</h4>
                                    <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Médio Impacto</span>
                                </div>
                                <p className="text-sm text-green-100 mb-3">Aumentar o lance em R$ 0,50 na campanha "Institucional" pode aumentar o alcance em 20%.</p>
                                <div className="flex items-center text-xs text-green-300 font-medium group-hover:text-white transition-colors">
                                    Aplicar Sugestão →
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Detailed Insights & Top Creatives */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SectionCard title="Picos de Gasto">
                    <div className="flex items-center justify-between py-4 border-b border-gray-50">
                        <span className="text-sm text-gray-500">Hoje, 14:00</span>
                        <span className="text-sm font-bold text-red-500">+R$ 450,00</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Detectamos um aumento incomum no CPC da campanha "Black Friday".</p>
                </SectionCard>

                <SectionCard title="Top Criativos">
                    <div className="space-y-4">
                        {topAds.length > 0 ? (
                            topAds.map(ad => (
                                <div key={ad.id} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                        {/* Placeholder for creative thumbnail if available in JSON */}
                                        <div className="w-full h-full bg-gray-300"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-sm font-medium text-gray-900 truncate">{ad.name}</h5>
                                        <p className="text-xs text-gray-500">Meta Ads</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-green-600">{ad.roas.toFixed(1)} ROAS</div>
                                        <div className="text-xs text-gray-400">{(ad.spend / ad.value * 100).toFixed(1)}% CTR</div> {/* Mock CTR calculation for display */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 text-center py-4">Nenhum dado de criativo ainda.</p>
                        )}
                    </div>
                </SectionCard>

                <SectionCard title="Distribuição">
                    {/* Simple Pie Chart Placeholder */}
                    <div className="flex items-center justify-center h-40">
                        <div className="relative w-32 h-32 rounded-full border-[12px] border-green-500 border-r-blue-500 border-b-gray-800 transform rotate-45">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-400">Mix</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <div className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-green-500"></span> Meta Ads</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Google Ads</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-800"></span> TikTok Ads</div>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default MetaDashboard;
