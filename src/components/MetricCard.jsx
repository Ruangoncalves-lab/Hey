import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({
    title,
    value,
    change,
    changeType = 'increase',
    icon: Icon,
    iconBg = 'bg-blue-50',
    iconColor = 'text-blue-600'
}) => {
    const isPositive = changeType === 'increase';

    return (
        <div className="card-premium p-4 lg:p-2 xl:p-4 flex flex-col justify-between h-full relative overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300">
            {/* Header: Title and Action/Icon */}
            <div className="flex justify-between items-start mb-2 lg:mb-1 xl:mb-3">
                <div className={`p-2 lg:p-1 xl:p-2 rounded-[16px] ${iconBg === 'bg-blue-50' ? 'bg-emerald-50' : iconBg} ${iconColor === 'text-blue-600' ? 'text-emerald-600' : iconColor}`}>
                    <Icon size={16} className="lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 xl:px-2 xl:py-0.5 rounded-full ${isPositive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                        }`}>
                        {isPositive ? <TrendingUp size={10} className="xl:w-3 xl:h-3" /> : <TrendingDown size={10} className="xl:w-3 xl:h-3" />}
                        {change}
                    </div>
                )}
            </div>

            {/* Content: Value and Label */}
            <div>
                <div className="text-[10px] lg:text-[9px] xl:text-[11px] text-gray-500 font-medium mb-0.5 xl:mb-1">{title}</div>
                <div className="text-lg lg:text-base xl:text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
            </div>

            {/* Decorative Background Icon */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                <Icon size={80} className="text-emerald-900 lg:w-12 lg:h-12 xl:w-20 xl:h-20" />
            </div>
        </div>
    );
};

export default MetricCard;
