import React from 'react';
import MetricCard from '../components/MetricCard';
import SectionCard from '../components/SectionCard';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const Finances = () => {
    const transactions = [
        { desc: 'Assinatura Shopify', category: 'Software', date: 'Nov 12, 2025', amount: 'R$ 79', type: 'expense' },
        { desc: 'Gasto Meta Ads', category: 'Marketing', date: 'Nov 11, 2025', amount: 'R$ 450', type: 'expense' },
        { desc: 'Vendas de Produtos', category: 'Receita', date: 'Nov 10, 2025', amount: 'R$ 2.340', type: 'income' },
        { desc: 'Hospedagem', category: 'Infraestrutura', date: 'Nov 09, 2025', amount: 'R$ 25', type: 'expense' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Finanças</h1>
                <p className="text-sm text-gray-500 mt-1">Visão geral financeira</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Receita Total" value="R$ 45.231" change="+12%" icon={DollarSign} iconBg="bg-green-50" iconColor="text-green-600" />
                <MetricCard title="Despesas Totais" value="R$ 12.450" change="+5%" icon={TrendingDown} iconBg="bg-red-50" iconColor="text-red-600" />
                <MetricCard title="Lucro Líquido" value="R$ 32.781" change="+18%" icon={Wallet} iconBg="bg-blue-50" iconColor="text-blue-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SectionCard title="Transações Recentes">
                        <div className="overflow-x-auto">
                            <table className="table-clean">
                                <thead>
                                    <tr>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Data</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t, i) => (
                                        <tr key={i}>
                                            <td><span className="font-medium text-gray-900">{t.desc}</span></td>
                                            <td><span className="text-gray-600">{t.category}</span></td>
                                            <td><span className="text-gray-600">{t.date}</span></td>
                                            <td>
                                                <span className={`font-semibold ${t.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                                                    {t.type === 'expense' ? '-' : '+'}{t.amount}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>
                </div>

                <SectionCard title="Margem Real">
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="relative w-32 h-32 mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                                <circle cx="64" cy="64" r="56" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="352" strokeDashoffset="88" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-gray-900">72%</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">Margem bruta saudável comparada à média do setor</p>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default Finances;
