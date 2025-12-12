import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Image, Zap } from 'lucide-react';

const DashboardWidgets = ({ spikes, topCreatives: rawCreatives, distribution }) => {
    // Mock Data for Channel Distribution (fallback)
    const defaultChannelData = [
        { name: 'Meta Ads', value: 100, color: '#10B981' }, // Emerald
    ];

    const channelData = distribution || defaultChannelData;

    // Mock Data for Top Creatives (fallback)
    const defaultCreatives = [];

    const topCreatives = rawCreatives || defaultCreatives;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Widget 1: Spending Spikes */}
            <div className="card-premium p-6 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-4 text-rose-600">
                    <Zap size={20} />
                    <h3 className="font-bold text-gray-900">Picos de Gasto</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Hoje, 14:00</span>
                        <span className="font-bold text-rose-600">+R$ 450,00</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-gray-400">Detectamos um aumento incomum no CPC da campanha "Black Friday".</p>
                </div>
            </div>

            {/* Widget 2: Top Creatives */}
            <div className="card-premium p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-purple-600">
                    <Image size={20} />
                    <h3 className="font-bold text-gray-900">Top Criativos</h3>
                </div>
                <div className="space-y-3">
                    {topCreatives.map((creative, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-900 truncate w-24">{creative.name}</div>
                                    <div className="text-[10px] text-gray-500">{creative.platform}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-emerald-600">{creative.roas} ROAS</div>
                                <div className="text-[10px] text-gray-400">{creative.ctr} CTR</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Widget 3: Channel Distribution */}
            <div className="card-premium p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <TrendingUp size={20} />
                    <h3 className="font-bold text-gray-900">Distribuição</h3>
                </div>
                <div className="flex-1 min-h-[150px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={channelData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {channelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-xs font-bold text-gray-400">Mix</span>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                    {channelData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span className="text-[10px] text-gray-500">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardWidgets;
