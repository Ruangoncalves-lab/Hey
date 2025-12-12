import React, { useMemo } from 'react';
import { Card, Button, Badge } from '../components/UI/Basic';
import { Table } from '../components/UI/Complex';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format, parseISO } from 'date-fns';
import './Finance.css';

const Finance = () => {
    const { transactions } = useStore();

    const financials = useMemo(() => {
        let income = 0;
        let expense = 0;
        transactions.forEach(t => {
            if (t.type === 'income') income += t.amount;
            else expense += Math.abs(t.amount);
        });
        return { income, expense, balance: income - expense };
    }, [transactions]);

    const chartData = useMemo(() => {
        const data = {};
        transactions.forEach(t => {
            const month = format(parseISO(t.date), 'MMM');
            if (!data[month]) data[month] = { name: month, income: 0, expense: 0 };
            if (t.type === 'income') data[month].income += t.amount;
            else data[month].expense += Math.abs(t.amount);
        });
        // Sort by month (simplified for this example, assumes current year)
        const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return Object.values(data).sort((a, b) => monthsOrder.indexOf(a.name) - monthsOrder.indexOf(b.name));
    }, [transactions]);

    // If no data, show some placeholders
    const displayData = chartData.length > 0 ? chartData : [
        { name: 'Jan', income: 0, expense: 0 },
        { name: 'Feb', income: 0, expense: 0 }
    ];

    return (
        <div className="page-container">
            <div className="finance-header">
                <h2 className="finance-title">Financeiro</h2>
                <Button variant="outline" style={{ borderRadius: '0.75rem' }}><Download size={18} /> Exportar Relatório</Button>
            </div>

            <div className="finance-stats-grid">
                <Card className="ui-card finance-stat-card">
                    <div className="stat-content">
                        <div className="stat-info">
                            <p className="stat-label">Saldo Total</p>
                            <h3 className="stat-value">${financials.balance.toLocaleString()}</h3>
                        </div>
                        <div className="stat-icon-wrapper balance">
                            <DollarSign size={28} />
                        </div>
                    </div>
                </Card>
                <Card className="ui-card finance-stat-card">
                    <div className="stat-content">
                        <div className="stat-info">
                            <p className="stat-label">Receita</p>
                            <h3 className="stat-value">${financials.income.toLocaleString()}</h3>
                        </div>
                        <div className="stat-icon-wrapper income">
                            <TrendingUp size={28} />
                        </div>
                    </div>
                </Card>
                <Card className="ui-card finance-stat-card">
                    <div className="stat-content">
                        <div className="stat-info">
                            <p className="stat-label">Despesas</p>
                            <h3 className="stat-value">${financials.expense.toLocaleString()}</h3>
                        </div>
                        <div className="stat-icon-wrapper expense">
                            <TrendingDown size={28} />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="finance-charts-grid">
                <Card title="Receita vs Despesas" className="ui-card chart-card">
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={displayData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                    cursor={{ fill: 'var(--bg-tertiary)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '1rem' }} />
                                <Bar dataKey="income" fill="#10b981" name="Receita" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" fill="#ef4444" name="Despesas" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Transações Recentes" className="ui-card transactions-card">
                    <div className="transactions-header">
                        <h3 className="transactions-title">Transações Recentes</h3>
                    </div>
                    <Table headers={['Descrição', 'Valor', 'Status']}>
                        {transactions.slice(0, 5).map(t => (
                            <tr key={t.id}>
                                <td>
                                    <p className="transaction-description">{t.description}</p>
                                    <span className="transaction-date">{t.date}</span>
                                </td>
                                <td className={`transaction-amount ${t.type}`}>
                                    {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                                </td>
                                <td><Badge variant={t.status === 'Concluído' ? 'success' : 'neutral'}>{t.status}</Badge></td>
                            </tr>
                        ))}
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Finance;
