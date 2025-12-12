import React from 'react';
import { AlertTriangle, TrendingDown, AlertCircle } from 'lucide-react';

const AlertsSection = ({ alerts: rawAlerts }) => {
    // Default alerts if none provided
    const defaultAlerts = [
        {
            type: 'info',
            title: 'Sistema Atualizado',
            message: 'Seus dados foram sincronizados com sucesso.',
            icon: AlertCircle,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100'
        }
    ];

    const alerts = rawAlerts && rawAlerts.length > 0 ? rawAlerts.map(a => {
        let icon = AlertCircle;
        let color = 'text-blue-600';
        let bg = 'bg-blue-50';
        let border = 'border-blue-100';

        if (a.type === 'alert' || a.impact_level === 'high') {
            icon = AlertTriangle;
            color = 'text-red-600';
            bg = 'bg-red-50';
            border = 'border-red-100';
        } else if (a.type === 'optimization') {
            icon = TrendingDown; // Or Up depending on context
            color = 'text-amber-600';
            bg = 'bg-amber-50';
            border = 'border-amber-100';
        }

        return {
            ...a,
            icon,
            color,
            bg,
            border
        };
    }) : defaultAlerts;

    return (
        <div className="card-premium p-5 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Alertas e Atenção</h3>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[250px] pr-1 custom-scrollbar">
                {alerts.map((alert, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded-2xl border ${alert.bg} ${alert.border}`}>
                        <div className={`p-1.5 rounded-full bg-white/60 ${alert.color}`}>
                            <alert.icon size={18} />
                        </div>
                        <div>
                            <h4 className={`text-sm font-bold ${alert.color} mb-0.5`}>{alert.title}</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">{alert.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertsSection;
