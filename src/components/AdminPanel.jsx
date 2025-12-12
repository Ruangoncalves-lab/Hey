import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Settings, X, RotateCcw, Layout, Type, Palette, Move } from 'lucide-react';

const AdminPanel = () => {
    const { theme, updateColor, updateFont, updateRadius, toggleLayout, resetTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('style'); // 'style', 'layout'

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-[var(--color-primary)] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 border-4 border-white/20"
                title="Editor Visual"
            >
                <Settings size={24} className="animate-spin-slow" />
            </button>
        );
    }

    return (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 transform transition-transform duration-300">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[var(--color-primary)] text-white">
                <h2 className="font-bold text-lg flex items-center gap-2">
                    <Settings size={18} /> Editor Visual
                </h2>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setActiveTab('style')}
                    className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'style' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-gray-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Palette size={16} /> Estilo
                </button>
                <button
                    onClick={() => setActiveTab('layout')}
                    className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'layout' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-gray-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Layout size={16} /> Layout
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {activeTab === 'style' && (
                    <>
                        {/* Colors */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Palette size={14} /> Cores do Tema
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Cor Primária</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 font-mono">{theme.colors.primary}</span>
                                        <input
                                            type="color"
                                            value={theme.colors.primary}
                                            onChange={(e) => updateColor('primary', e.target.value)}
                                            className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Fundo Principal</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 font-mono">{theme.colors.secondary}</span>
                                        <input
                                            type="color"
                                            value={theme.colors.secondary}
                                            onChange={(e) => updateColor('secondary', e.target.value)}
                                            className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">Texto Principal</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 font-mono">{theme.colors.text}</span>
                                        <input
                                            type="color"
                                            value={theme.colors.text}
                                            onChange={(e) => updateColor('text', e.target.value)}
                                            className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Typography */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Type size={14} /> Tipografia
                            </h3>
                            <select
                                value={theme.font}
                                onChange={(e) => updateFont(e.target.value)}
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none"
                            >
                                <option value="Outfit">Outfit (Padrão)</option>
                                <option value="Inter">Inter</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Montserrat">Montserrat</option>
                            </select>
                        </div>

                        {/* Border Radius */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <Move size={14} /> Arredondamento
                            </h3>
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { label: '0', value: '0px' },
                                    { label: 'sm', value: '0.5rem' },
                                    { label: 'md', value: '1rem' },
                                    { label: 'lg', value: '2rem' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => updateRadius(opt.value)}
                                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${theme.borderRadius === opt.value
                                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'layout' && (
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <Layout size={14} /> Visibilidade de Seções
                        </h3>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium text-gray-700">Métricas Principais</span>
                                <input
                                    type="checkbox"
                                    checked={theme.layout.showMetrics}
                                    onChange={() => toggleLayout('showMetrics')}
                                    className="w-5 h-5 text-[var(--color-primary)] rounded focus:ring-[var(--color-primary)]"
                                />
                            </label>
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium text-gray-700">Gráficos de Desempenho</span>
                                <input
                                    type="checkbox"
                                    checked={theme.layout.showCharts}
                                    onChange={() => toggleLayout('showCharts')}
                                    className="w-5 h-5 text-[var(--color-primary)] rounded focus:ring-[var(--color-primary)]"
                                />
                            </label>
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium text-gray-700">Atividade Recente</span>
                                <input
                                    type="checkbox"
                                    checked={theme.layout.showRecentActivity}
                                    onChange={() => toggleLayout('showRecentActivity')}
                                    className="w-5 h-5 text-[var(--color-primary)] rounded focus:ring-[var(--color-primary)]"
                                />
                            </label>
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium text-gray-700">Modo Compacto</span>
                                <input
                                    type="checkbox"
                                    checked={theme.layout.compactMode}
                                    onChange={() => toggleLayout('compactMode')}
                                    className="w-5 h-5 text-[var(--color-primary)] rounded focus:ring-[var(--color-primary)]"
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50">
                <button
                    onClick={resetTheme}
                    className="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                >
                    <RotateCcw size={16} /> Restaurar Padrões
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
