import React, { useState } from 'react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { ArrowUpRight } from 'lucide-react';

const PerformanceChart = ({ data: rawData }) => {
    const [period, setPeriod] = useState('monthly');

    // Process data if provided, otherwise use empty array
    const data = rawData && rawData.length > 0 ? rawData : [];

    // Calculate totals for the header
    const totalSpend = data.reduce((acc, curr) => acc + (curr.spend || 0), 0);
    const totalRevenue = data.reduce((acc, curr) => acc + (curr.revenue || 0), 0);

    // Calculate percentage change (mock logic for now, or compare last period)
    const percentageChange = 12.8;

    return (
        <div className="card-premium p-5 lg:p-4 xl:p-6 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 lg:mb-3">
                <div>
                    <h3 className="text-lg lg:text-base font-bold text-gray-900 mb-1">Resumo</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl lg:text-xl xl:text-2xl font-bold text-gray-900">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSpend)}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                            +{percentageChange}% <ArrowUpRight size={12} />
                        </span>
                    </div>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-full">
                    {['Diário', 'Semanal', 'Mensal'].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p.toLowerCase())}
                            className={`px-3 py-1 lg:px-2 lg:py-0.5 rounded-full text-xs lg:text-[10px] xl:text-xs font-semibold transition-all ${period === p.toLowerCase() || (period === 'monthly' && p === 'Mensal')
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full h-[300px] lg:h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <pattern id="stripe-pattern" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                                <rect width="2" height="4" transform="translate(0,0)" fill="white" fillOpacity="0.3" />
                            </pattern>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                            tickFormatter={(value) => `R$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: 'none',
                                borderRadius: '12px',
                                color: '#fff',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#fff', fontWeight: 600 }}
                            cursor={{ fill: '#F3F4F6' }}
                            formatter={(value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                            labelFormatter={(label) => new Date(label).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        />
                        <Bar dataKey="spend" name="Gasto" barSize={40} radius={[8, 8, 8, 8]} fill="#10B981">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#059669' : '#10B981'} />
                            ))}
                        </Bar>
                        <Bar dataKey="spend" barSize={40} radius={[8, 8, 8, 8]} fill="url(#stripe-pattern)" />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            name="Receita (ROAS)"
                            stroke="#059669"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;
