import React, { useState } from 'react';
import SectionCard from '../components/SectionCard';
import { AlertCircle, TrendingDown, Zap, Info } from 'lucide-react';

const Alerts = () => {
    const [filter, setFilter] = useState('all');

    const alerts = [
        { id: 1, type: 'warning', icon: AlertCircle, title: 'Queda de Performance', message: 'Produto "Nike Air Max" teve queda de 15% na taxa de conversão hoje.', category: 'product' },
        { id: 2, type: 'error', icon: TrendingDown, title: 'Orçamento Excedido', message: 'Campanha "Verão 2025" excedeu o orçamento diário em 10%.', category: 'ads' },
        { id: 3, type: 'info', icon: Info, title: 'Atualização de Estoque', message: 'Novo estoque chegou para "Adidas Ultraboost". Inventário atualizado.', category: 'inventory' },
        { id: 4, type: 'success', icon: Zap, title: 'Meta Atingida', message: 'Você atingiu sua meta diária de vendas de R$ 1.000!', category: 'sales' },
    ];

    const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.category === filter);

    const typeColors = {
        warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'text-yellow-600' },
        error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-600' },
        info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'text-blue-600' },
        success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'text-green-600' },
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Alertas Inteligentes</h1>
                    <p className="text-sm text-gray-500 mt-1">Notificações e insights da IA</p>
                </div>
                <div className="flex gap-2">
                    {['all', 'product', 'ads', 'sales'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                    ? 'bg-[#2D5F5D] text-white'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {f === 'all' ? 'Todos' : f === 'product' ? 'Produtos' : f === 'ads' ? 'Anúncios' : 'Vendas'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAlerts.map(alert => {
                    const colors = typeColors[alert.type];
                    const Icon = alert.icon;
                    return (
                        <div key={alert.id} className={`${colors.bg} border ${colors.border} rounded-2xl p-6`}>
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl bg-white/50`}>
                                    <Icon size={24} className={colors.icon} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-semibold ${colors.text} mb-1`}>{alert.title}</h3>
                                    <p className={`text-sm ${colors.text} opacity-80`}>{alert.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Alerts;
