import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ data, title }) => {
    // Default mock data if none provided
    const defaultData = [
        { name: 'Sep', total: 30 },
        { name: 'Oct', total: 45 },
        { name: 'Nov', total: 60 },
        { name: 'Dec', total: 50 },
        { name: 'Jan', total: 70 },
        { name: 'Feb', total: 90 },
        { name: 'Mar', total: 85 },
    ];

    const chartData = data || defaultData;

    return (
        <div className="col-span-12 card-premium px-8 pt-8 pb-6 xl:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gray-50 text-gray-600">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">Engagement Rate</h4>
                        <p className="text-sm font-medium text-gray-500">Monthly vs Annually</p>
                    </div>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-full">
                    <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-900">Monthly</button>
                    <button className="px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-600 text-white shadow-sm">Annually</button>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '16px', color: '#fff', padding: '12px 16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#fff', fontWeight: 600 }}
                                cursor={{ stroke: '#059669', strokeWidth: 2, strokeDasharray: '5 5' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#059669"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Chart;
