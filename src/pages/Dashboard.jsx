import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, ChevronDown, RefreshCw } from 'lucide-react';
import KPIGrid from '../components/dashboard/KPIGrid';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import AlertsSection from '../components/dashboard/AlertsSection';
import AIOpportunities from '../components/dashboard/AIOpportunities';
import DashboardWidgets from '../components/dashboard/DashboardWidgets';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
    const [dateRange, setDateRange] = useState('Últimos 7 dias');
    const [platform, setPlatform] = useState('Todas as Plataformas');
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    const [chartData, setChartData] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [topCreatives, setTopCreatives] = useState([]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1. Fetch Metrics (Daily)
            const { data: metricsData, error: metricsError } = await supabase
                .from('meta_metrics')
                .select('*')
                .order('date', { ascending: true });

            if (metricsError) throw metricsError;

            // 2. Fetch Insights/Alerts
            const { data: insightsData, error: insightsError } = await supabase
                .from('meta_insights')
                .select('*')
                .eq('is_read', false);

            if (insightsError) throw insightsError;

            // --- Process Metrics for KPI Grid ---
            let totalSpend = 0;
            let totalImpressions = 0;
            let totalClicks = 0;
            let totalRevenue = 0;
            let totalConversions = 0;

            metricsData.forEach(m => {
                totalSpend += Number(m.spend) || 0;
                totalImpressions += Number(m.impressions) || 0;
                totalClicks += Number(m.clicks) || 0;
                totalRevenue += (Number(m.roas) || 0) * (Number(m.spend) || 0);
            });

            const ctr = totalImpressions ? (totalClicks / totalImpressions) * 100 : 0;
            const cpc = totalClicks ? totalSpend / totalClicks : 0;
            const cpm = totalImpressions ? (totalSpend / totalImpressions) * 1000 : 0;
            const roas = totalSpend ? totalRevenue / totalSpend : 0;
            const cpa = totalConversions ? totalSpend / totalConversions : 0;

            setMetrics({
                spend: totalSpend,
                impressions: totalImpressions,
                clicks: totalClicks,
                ctr: ctr.toFixed(2),
                cpc: cpc.toFixed(2),
                cpm: cpm.toFixed(2),
                roas: roas.toFixed(2),
                cpa: cpa.toFixed(2),
                conversions: totalConversions,
                reach: 0,
                frequency: 0
            });

            // --- Process Metrics for Chart (Group by Date) ---
            const chartMap = {};
            metricsData.forEach(m => {
                const date = m.date;
                if (!chartMap[date]) {
                    chartMap[date] = { date, spend: 0, revenue: 0 };
                }
                chartMap[date].spend += Number(m.spend) || 0;
                chartMap[date].revenue += (Number(m.roas) || 0) * (Number(m.spend) || 0);
            });
            setChartData(Object.values(chartMap));

            // --- Process Insights ---
            const newAlerts = insightsData.filter(i => i.type === 'alert' || i.type === 'warning');
            const newOpportunities = insightsData.filter(i => i.type === 'optimization' || i.type === 'success');
            setAlerts(newAlerts);
            setOpportunities(newOpportunities);

            // --- Mock Top Creatives (Since we don't have creative data fully synced with images yet) ---
            // In a real scenario, we would join meta_ads with meta_metrics grouped by ad_id
            setTopCreatives([]);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="space-y-6 lg:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. Top Bar: Global Filters */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-[20px] shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
                    <p className="text-sm text-gray-500">Acompanhe o desempenho de todas as suas campanhas.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Platform Filter */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors">
                            <Filter size={16} className="text-gray-400" />
                            {platform}
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Date Filter */}
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors">
                            <Calendar size={16} className="text-gray-400" />
                            {dateRange}
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={fetchDashboardData}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </motion.div>

            {/* 2. KPI Grid (Metrics) */}
            <motion.section variants={itemVariants}>
                <KPIGrid metrics={metrics} />
            </motion.section>

            {/* 3. Main Chart & Widgets */}
            <motion.section variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Main Chart (Spans 2 columns on large screens) */}
                <div className="xl:col-span-2">
                    <PerformanceChart data={chartData} />
                </div>

                {/* AI Alerts (Right Column) */}
                <div className="flex flex-col gap-6">
                    <AlertsSection alerts={alerts} />
                </div>
            </motion.section>

            {/* 4. Secondary Widgets (Spikes, Creatives, Distribution) */}
            <motion.section variants={itemVariants}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                    Insights Detalhados
                </h2>
                <DashboardWidgets topCreatives={topCreatives} />
            </motion.section>

            {/* 5. AI Opportunities (Full Width or Grid) */}
            <motion.section variants={itemVariants}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                    Sugestões da Inteligência Artificial
                </h2>
                <AIOpportunities opportunities={opportunities} />
            </motion.section>
        </motion.div>
    );
};

export default Dashboard;
