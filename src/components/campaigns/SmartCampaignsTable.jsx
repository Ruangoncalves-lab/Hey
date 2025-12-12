import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    MousePointerClick,
    MessageCircle,
    Users,
    Eye,
    Video,
    ShoppingBag,
    Filter,
    Download,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    Settings,
    X,
    Plus
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const SmartCampaignsTable = () => {
    const [selectedObjective, setSelectedObjective] = useState('Vendas');
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [activeColumns, setActiveColumns] = useState([]);

    const objectives = [
        { id: 'Vendas', icon: ShoppingBag, label: 'Vendas', apiObjective: 'OUTCOME_SALES' },
        { id: 'Tráfego', icon: MousePointerClick, label: 'Tráfego', apiObjective: 'OUTCOME_TRAFFIC' },
        { id: 'Engajamento', icon: MessageCircle, label: 'Engajamento', apiObjective: 'OUTCOME_ENGAGEMENT' },
        { id: 'Leads', icon: Users, label: 'Leads', apiObjective: 'OUTCOME_LEADS' },
        { id: 'Mensagens', icon: MessageCircle, label: 'Mensagens', apiObjective: 'OUTCOME_MESSAGES' },
        { id: 'Alcance', icon: Eye, label: 'Alcance', apiObjective: 'OUTCOME_AWARENESS' },
        { id: 'Video', icon: Video, label: 'Visualização de Vídeo', apiObjective: 'OUTCOME_AWARENESS' },
    ];

    // Master list of all available columns
    const ALL_COLUMNS = [
        { key: 'roas', label: 'ROAS', format: 'number', color: 'text-emerald-600 font-bold' },
        { key: 'roi', label: 'ROI', format: 'percent', color: 'text-emerald-600' },
        { key: 'cpa', label: 'CPA (Custo/Ação)', format: 'currency' },
        { key: 'conversions', label: 'Conversões', format: 'number' },
        { key: 'revenue', label: 'Valor Conv.', format: 'currency', color: 'font-bold text-gray-900' },
        { key: 'ticket', label: 'Ticket Médio', format: 'currency' },
        { key: 'cpc', label: 'CPC (Custo/Clique)', format: 'currency', color: 'font-bold text-blue-600' },
        { key: 'ctr', label: 'CTR (Taxa Clique)', format: 'percent', color: 'text-green-600' },
        { key: 'clicks', label: 'Cliques', format: 'number' },
        { key: 'impressions', label: 'Impressões', format: 'compact' },
        { key: 'cpm', label: 'CPM (Custo/Mil)', format: 'currency', color: 'font-bold text-blue-600' },
        { key: 'reach', label: 'Alcance', format: 'compact' },
        { key: 'frequency', label: 'Frequência', format: 'number' },
        { key: 'cpl', label: 'CPL (Custo/Lead)', format: 'currency', color: 'font-bold text-emerald-600' },
        { key: 'leads', label: 'Leads', format: 'number', color: 'font-bold text-gray-900' },
        { key: 'costPerMsg', label: 'Custo/Msg', format: 'currency' },
        { key: 'totalMsg', label: 'Msgs Iniciadas', format: 'number' },
        { key: 'cpv', label: 'CPV (Custo/View)', format: 'currency' },
        { key: 'views', label: 'Visualizações', format: 'compact' },
        { key: 'spend', label: 'Valor Gasto', format: 'currency', color: 'font-bold text-red-600' },
    ];

    // Default column presets per objective
    const COLUMN_PRESETS = {
        'Vendas': ['roas', 'roi', 'cpa', 'conversions', 'revenue', 'ticket', 'spend'],
        'Tráfego': ['cpc', 'ctr', 'clicks', 'impressions', 'cpm', 'spend'],
        'Engajamento': ['impressions', 'cpm', 'clicks', 'ctr', 'spend'],
        'Leads': ['cpl', 'leads', 'ctr', 'cpm', 'spend'],
        'Mensagens': ['costPerMsg', 'totalMsg', 'cpm', 'spend'],
        'Alcance': ['cpm', 'reach', 'impressions', 'frequency', 'spend'],
        'Video': ['cpv', 'views', 'cpm', 'spend'],
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Update active columns when objective changes
    useEffect(() => {
        const presetKeys = COLUMN_PRESETS[selectedObjective] || COLUMN_PRESETS['Vendas'];
        const presetColumns = ALL_COLUMNS.filter(col => presetKeys.includes(col.key));
        setActiveColumns(presetColumns);
    }, [selectedObjective]);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1. Fetch Campaigns
            const { data: campaignsData, error: campaignsError } = await supabase
                .from('meta_campaigns')
                .select('*')
                .order('updated_at', { ascending: false });

            if (campaignsError) throw campaignsError;

            // 2. Fetch Metrics
            const { data: metricsData, error: metricsError } = await supabase
                .from('meta_metrics')
                .select('*');

            if (metricsError) throw metricsError;

            // 3. Aggregate Metrics
            const campaignMetrics = {};
            metricsData.forEach(m => {
                if (!campaignMetrics[m.campaign_id]) {
                    campaignMetrics[m.campaign_id] = {
                        spend: 0, impressions: 0, clicks: 0, revenue: 0,
                        conversions: 0, leads: 0, messages: 0, views: 0,
                        roas: 0, actions: []
                    };
                }
                const cm = campaignMetrics[m.campaign_id];
                cm.spend += Number(m.spend) || 0;
                cm.impressions += Number(m.impressions) || 0;
                cm.clicks += Number(m.clicks) || 0;

                // Revenue from ROAS approximation or action_values if available
                // For now, using ROAS * Spend as a reliable proxy if action_values is complex
                const dailyRevenue = (Number(m.roas) || 0) * (Number(m.spend) || 0);
                cm.revenue += dailyRevenue;

                // Parse Actions (JSONB)
                // Example: [{action_type: 'purchase', value: 5}, {action_type: 'lead', value: 2}]
                if (m.actions && Array.isArray(m.actions)) {
                    m.actions.forEach(action => {
                        const val = Number(action.value) || 0;
                        if (action.action_type === 'purchase') cm.conversions += val;
                        if (action.action_type === 'lead') cm.leads += val;
                        if (action.action_type === 'onsite_conversion.messaging_conversation_started_7d') cm.messages += val;
                        if (action.action_type === 'video_view') cm.views += val;
                    });
                }
            });

            // 4. Merge & Calculate Derived Metrics
            const formattedCampaigns = campaignsData.map(c => {
                const m = campaignMetrics[c.id] || {
                    spend: 0, impressions: 0, clicks: 0, revenue: 0,
                    conversions: 0, leads: 0, messages: 0, views: 0
                };

                // Base calculations
                const ctr = m.impressions ? (m.clicks / m.impressions) * 100 : 0;
                const cpc = m.clicks ? m.spend / m.clicks : 0;
                const cpm = m.impressions ? (m.spend / m.impressions) * 1000 : 0;
                const roas = m.spend ? m.revenue / m.spend : 0;
                const roi = m.spend ? ((m.revenue - m.spend) / m.spend) * 100 : -100;

                // Specific CPAs
                const cpa = m.conversions ? m.spend / m.conversions : 0;
                const cpl = m.leads ? m.spend / m.leads : 0;
                const costPerMsg = m.messages ? m.spend / m.messages : 0;
                const cpv = m.views ? m.spend / m.views : 0;

                const ticket = m.conversions ? m.revenue / m.conversions : 0;
                const frequency = m.impressions && c.reach ? m.impressions / c.reach : 0; // Approx if reach not in daily

                return {
                    ...c,
                    budget: { amount: c.daily_budget || c.lifetime_budget || 0 },
                    metrics: {
                        spend: m.spend,
                        impressions: m.impressions,
                        clicks: m.clicks,
                        revenue: m.revenue,
                        conversions: m.conversions,
                        leads: m.leads,
                        totalMsg: m.messages,
                        views: m.views,
                        ctr,
                        cpc,
                        cpm,
                        roas,
                        roi,
                        cpa,
                        cpl,
                        costPerMsg,
                        cpv,
                        ticket,
                        reach: 0, // Need insights for reach
                        frequency
                    }
                };
            });

            setCampaigns(formattedCampaigns);
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar dados: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Formatters
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
    const formatNumber = (val) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(val || 0);
    const formatCompact = (val) => new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(val || 0);
    const formatPercent = (val) => `${(val || 0).toFixed(2)}%`;

    const renderMetricValue = (value, format) => {
        switch (format) {
            case 'currency': return formatCurrency(value);
            case 'percent': return formatPercent(value);
            case 'compact': return formatCompact(value);
            case 'number': return formatNumber(value);
            default: return value;
        }
    };

    const toggleColumn = (columnKey) => {
        const isExists = activeColumns.find(c => c.key === columnKey);
        if (isExists) {
            setActiveColumns(activeColumns.filter(c => c.key !== columnKey));
        } else {
            const colToAdd = ALL_COLUMNS.find(c => c.key === columnKey);
            if (colToAdd) setActiveColumns([...activeColumns, colToAdd]);
        }
    };

    if (loading) {
        return (
            <div className="card-premium p-12 flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-emerald-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="card-premium p-6 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="card-premium p-6 animate-in fade-in duration-500 relative">
            {/* Header & Filters */}
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Campanhas Ativas</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowColumnSelector(true)}
                            className="btn-secondary px-4 py-2 text-xs flex items-center gap-2"
                        >
                            <Settings size={14} /> Colunas
                        </button>
                        <button className="btn-secondary px-4 py-2 text-xs flex items-center gap-2">
                            <Filter size={14} /> Filtros
                        </button>
                        <button className="btn-secondary px-4 py-2 text-xs flex items-center gap-2">
                            <Download size={14} /> Exportar
                        </button>
                    </div>
                </div>

                {/* Objective Selector */}
                <div className="flex overflow-x-auto p-1 pb-2 gap-2 no-scrollbar">
                    {objectives.map((obj) => (
                        <button
                            key={obj.id}
                            onClick={() => setSelectedObjective(obj.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${selectedObjective === obj.id
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-600 ring-offset-2'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            <obj.icon size={16} />
                            {obj.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Column Selector Modal */}
            {showColumnSelector && (
                <div className="absolute top-20 right-0 z-50 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900">Personalizar Colunas</h3>
                        <button onClick={() => setShowColumnSelector(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                        {ALL_COLUMNS.map((col) => (
                            <label key={col.key} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={!!activeColumns.find(c => c.key === col.key)}
                                    onChange={() => toggleColumn(col.key)}
                                    className="rounded text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-sm text-gray-700">{col.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Smart Table */}
            <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-10">
                                <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                            </th>
                            <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[200px]">Campanha</th>
                            <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            {activeColumns.map((col) => (
                                <th key={col.key} className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                    {col.label}
                                </th>
                            ))}
                            <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Orçamento</th>
                            <th className="text-right py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {campaigns.length === 0 ? (
                            <tr>
                                <td colSpan={activeColumns.length + 5} className="py-8 text-center text-gray-500">
                                    Nenhuma campanha encontrada.
                                </td>
                            </tr>
                        ) : (
                            campaigns.map((campaign) => (
                                <tr key={campaign._id || campaign.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-4 px-4">
                                        <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="font-bold text-gray-900 line-clamp-2">{campaign.name}</div>
                                        <div className="text-xs text-gray-400">ID: {(campaign.external_id || campaign.id).substring(0, 12)}...</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${campaign.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
                                            campaign.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    {activeColumns.map((col) => (
                                        <td key={col.key} className={`py-4 px-4 text-sm whitespace-nowrap ${col.color || 'text-gray-600'}`}>
                                            {renderMetricValue(campaign.metrics[col.key], col.format)}
                                        </td>
                                    ))}
                                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                                        {campaign.budget ? (
                                            campaign.budget.amount ? formatCurrency(campaign.budget.amount) : 'N/A'
                                        ) : 'N/A'}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Mock) */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                <div>Mostrando {campaigns.length} campanhas</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Anterior</button>
                    <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default SmartCampaignsTable;
