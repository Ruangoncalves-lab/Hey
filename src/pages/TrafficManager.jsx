import React, { useState } from 'react';
import MetaAds from './MetaAds';
import GoogleAds from './GoogleAds';
import TikTokAds from './TikTokAds';
import LinkedInAds from './LinkedInAds';
import { Target, Search, Video, Linkedin, LayoutGrid } from 'lucide-react';

const TrafficManager = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Visão Geral', icon: LayoutGrid },
        { id: 'meta', label: 'Meta Ads', icon: Target },
        { id: 'google', label: 'Google Ads', icon: Search },
        { id: 'tiktok', label: 'TikTok Ads', icon: Video },
        { id: 'linkedin', label: 'LinkedIn Ads', icon: Linkedin },
    ];

    return (
        <div className="space-y-6">
            {/* Header with Tabs */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gestor de Tráfego</h1>
                        <p className="text-gray-500">Central unificada de campanhas multicanal.</p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex w-full md:w-auto overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Overview Dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="card-premium p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-none">
                                <div className="text-emerald-100 text-xs font-bold uppercase mb-2">Investimento Total</div>
                                <div className="text-3xl font-bold mb-1">R$ 42.350</div>
                                <div className="text-emerald-100 text-sm">+15% este mês</div>
                            </div>
                            <div className="card-premium p-6">
                                <div className="text-gray-400 text-xs font-bold uppercase mb-2">ROAS Global</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">4.8x</div>
                                <div className="text-green-600 text-sm font-bold">+0.4 vs média</div>
                            </div>
                            <div className="card-premium p-6">
                                <div className="text-gray-400 text-xs font-bold uppercase mb-2">Conversões</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">1,240</div>
                                <div className="text-green-600 text-sm font-bold">+12% este mês</div>
                            </div>
                            <div className="card-premium p-6">
                                <div className="text-gray-400 text-xs font-bold uppercase mb-2">CPA Médio</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">R$ 34,15</div>
                                <div className="text-red-600 text-sm font-bold">+2% (Atenção)</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="card-premium p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-4">Distribuição de Verba</h3>
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-400">
                                    Gráfico de Pizza (Meta vs Google vs TikTok)
                                </div>
                            </div>
                            <div className="card-premium p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-4">Performance Diária</h3>
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 text-gray-400">
                                    Gráfico de Linha (Receita x Gasto)
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'meta' && <MetaAds />}
                {activeTab === 'google' && <GoogleAds />}
                {activeTab === 'tiktok' && <TikTokAds />}
                {activeTab === 'linkedin' && <LinkedInAds />}
            </div>
        </div>
    );
};

export default TrafficManager;
