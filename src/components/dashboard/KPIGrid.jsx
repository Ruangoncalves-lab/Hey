import React from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    CreditCard,
    MousePointerClick,
    Eye,
    Activity,
    ShoppingBag,
    Users,
    BarChart2
} from 'lucide-react';
import MetricCard from '../MetricCard';

const KPIGrid = ({ metrics: data }) => {
    // Default values if no data provided
    const defaultData = {
        roas: 0,
        spend: 0,
        cpc: 0,
        cpm: 0,
        ctr: 0,
        frequency: 0,
        cpa: 0,
        conversions: 0,
        reach: 0,
        impressions: 0
    };

    const d = data || defaultData;

    const metrics = [
        {
            title: 'ROAS Total',
            value: `${d.roas}x`,
            change: '+0.0%',
            changeType: 'neutral',
            icon: BarChart2,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600'
        },
        {
            title: 'Gasto Total',
            value: `R$ ${d.spend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            change: '+0.0%',
            changeType: 'neutral',
            icon: DollarSign,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            title: 'CPC Médio',
            value: `R$ ${d.cpc}`,
            change: '0.0%',
            changeType: 'neutral',
            icon: MousePointerClick,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            title: 'CPM Médio',
            value: `R$ ${d.cpm}`,
            change: '0.0%',
            changeType: 'neutral',
            icon: Eye,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600'
        },
        {
            title: 'CTR Médio',
            value: `${d.ctr}%`,
            change: '0.0%',
            changeType: 'neutral',
            icon: Activity,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600'
        },
        {
            title: 'Frequência',
            value: `${d.frequency}`,
            change: '0.0%',
            changeType: 'neutral',
            icon: Users,
            iconBg: 'bg-pink-50',
            iconColor: 'text-pink-600'
        },
        {
            title: 'Custo por Compra',
            value: `R$ ${d.cpa}`,
            change: '0.0%',
            changeType: 'neutral',
            icon: CreditCard,
            iconBg: 'bg-cyan-50',
            iconColor: 'text-cyan-600'
        },
        {
            title: 'Conversões',
            value: `${d.conversions}`,
            change: '0.0%',
            changeType: 'neutral',
            icon: ShoppingBag,
            iconBg: 'bg-teal-50',
            iconColor: 'text-teal-600'
        },
        {
            title: 'Alcance',
            value: `${d.reach}`, // Need to format K/M if large
            change: '0.0%',
            changeType: 'neutral',
            icon: Users,
            iconBg: 'bg-yellow-50',
            iconColor: 'text-yellow-600'
        },
        {
            title: 'Impressões',
            value: d.impressions.toLocaleString(),
            change: '0.0%',
            changeType: 'neutral',
            icon: Eye,
            iconBg: 'bg-rose-50',
            iconColor: 'text-rose-600'
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-3 lg:gap-1.5 xl:gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            {metrics.map((metric, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                    <MetricCard {...metric} />
                </motion.div>
            ))}
        </div>
    );
};

export default KPIGrid;
