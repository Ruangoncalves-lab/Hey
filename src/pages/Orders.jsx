import React from 'react';
import SectionCard from '../components/SectionCard';
import StatusPill from '../components/StatusPill';
import { Eye, Download, Filter } from 'lucide-react';

const Orders = () => {
    const orders = [
        {
            id: '#ORD-001',
            customer: 'Ruben Philips',
            avatar: 'https://ui-avatars.com/api/?name=Ruben+Philips&background=4ade80&color=fff',
            amount: 'R$ 1.299',
            status: 'Concluído',
            statusVariant: 'success',
            origin: 'Shopify',
            date: 'Nov 12, 2025'
        },
        {
            id: '#ORD-002',
            customer: 'Emery Donin',
            avatar: 'https://ui-avatars.com/api/?name=Emery+Donin&background=60a5fa&color=fff',
            amount: 'R$ 549',
            status: 'Pendente',
            statusVariant: 'warning',
            origin: 'WooCommerce',
            date: 'Nov 11, 2025'
        },
        {
            id: '#ORD-003',
            customer: 'Charlie Korssgard',
            avatar: 'https://ui-avatars.com/api/?name=Charlie+Korssgard&background=a78bfa&color=fff',
            amount: 'R$ 2.340',
            status: 'Concluído',
            statusVariant: 'success',
            origin: 'Amazon',
            date: 'Nov 10, 2025'
        },
        {
            id: '#ORD-004',
            customer: 'Ryan Vaccaro',
            avatar: 'https://ui-avatars.com/api/?name=Ryan+Vaccaro&background=fb923c&color=fff',
            amount: 'R$ 450',
            status: 'Cancelado',
            statusVariant: 'danger',
            origin: 'Mercado Livre',
            date: 'Nov 09, 2025'
        },
        {
            id: '#ORD-005',
            customer: 'Maria Silva',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Silva&background=ec4899&color=fff',
            amount: 'R$ 899',
            status: 'Em Trânsito',
            statusVariant: 'info',
            origin: 'Shopify',
            date: 'Nov 08, 2025'
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Pedidos</h1>
                    <p className="text-sm text-gray-500 mt-1">{orders.length} pedidos recentes</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                        <Filter size={18} />
                        Filtrar
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Download size={18} />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <SectionCard>
                <div className="overflow-x-auto">
                    <table className="table-clean">
                        <thead>
                            <tr>
                                <th>ID do Pedido</th>
                                <th>Cliente</th>
                                <th>Valor</th>
                                <th>Status</th>
                                <th>Origem</th>
                                <th>Data</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <span className="font-medium text-gray-900">{order.id}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={order.avatar}
                                                alt={order.customer}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="font-medium text-gray-900">{order.customer}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="font-semibold text-gray-900">{order.amount}</span>
                                    </td>
                                    <td>
                                        <StatusPill status={order.status} variant={order.statusVariant} />
                                    </td>
                                    <td>
                                        <span className="text-gray-600">{order.origin}</span>
                                    </td>
                                    <td>
                                        <span className="text-gray-600">{order.date}</span>
                                    </td>
                                    <td>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Eye size={16} className="text-gray-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SectionCard>
        </div>
    );
};

export default Orders;
