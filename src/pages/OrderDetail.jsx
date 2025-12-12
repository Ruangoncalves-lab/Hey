import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Card, Button } from '../components/UI/Basic';
import { Table } from '../components/UI/Complex';
import { Package, Truck, CheckCircle, Clock, ArrowLeft, Download, MapPin, Phone, Mail } from 'lucide-react';

const OrderDetail = () => {
    const { id } = useParams();
    const { orders } = useStore();
    const order = orders.find(o => o.id === id);

    const timeline = [
        { status: 'Pedido Realizado', date: '25 Out, 10:30', icon: Clock, active: true },
        { status: 'Processando', date: '25 Out, 11:00', icon: Package, active: true },
        { status: 'Enviado', date: '26 Out, 09:15', icon: Truck, active: true },
        { status: 'Entregue', date: 'Est. 28 Out', icon: CheckCircle, active: false },
    ];

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pedido não encontrado</h3>
                <Link to="/orders"><Button variant="secondary">Voltar para Pedidos</Button></Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Link to="/orders" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pedido {id}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-gray-500 ml-14">Realizado em {order.date}</p>
                </div>
                <div className="flex items-center gap-3 ml-14 lg:ml-0">
                    <Button variant="secondary"><Download size={18} /> Baixar Fatura</Button>
                    <Button variant="primary"><Truck size={18} /> Rastrear Pedido</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card title="Itens do Pedido">
                        <Table headers={['Produto', 'Preço', 'Qtd', 'Total']}>
                            <tr>
                                <td className="font-medium text-gray-900">Assinatura Plano Premium</td>
                                <td className="text-gray-600">R$ 99,00</td>
                                <td className="text-gray-600">1</td>
                                <td className="font-bold text-gray-900">R$ 99,00</td>
                            </tr>
                            <tr>
                                <td className="font-medium text-gray-900">Taxa de Setup</td>
                                <td className="text-gray-600">R$ 21,00</td>
                                <td className="text-gray-600">1</td>
                                <td className="font-bold text-gray-900">R$ 21,00</td>
                            </tr>
                            <tr className="border-t-2 border-gray-100">
                                <td colSpan="3" className="text-right font-bold text-gray-600 pt-4">Subtotal</td>
                                <td className="font-bold text-gray-900 pt-4">R$ 120,00</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-right font-bold text-gray-900 text-lg">Total</td>
                                <td className="font-bold text-emerald-600 text-lg">R$ 120,00</td>
                            </tr>
                        </Table>
                    </Card>

                    <Card title="Timeline do Pedido">
                        <div className="relative pl-4">
                            {timeline.map((item, index) => (
                                <div key={index} className="flex gap-4 pb-8 last:pb-0 relative">
                                    {/* Line */}
                                    {index < timeline.length - 1 && (
                                        <div className={`absolute left-[19px] top-10 bottom-0 w-0.5 ${item.active ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                                    )}

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${item.active ? 'bg-emerald-100 text-emerald-600 ring-4 ring-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="pt-2">
                                        <h4 className={`font-bold text-sm ${item.active ? 'text-gray-900' : 'text-gray-500'}`}>{item.status}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card title="Detalhes do Cliente">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                                <img src={order.avatar} alt={order.customer} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">{order.customer}</h4>
                                <p className="text-sm text-gray-500">Cliente desde 2022</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail size={18} className="text-gray-400" />
                                <span>{order.customer.toLowerCase().replace(' ', '.')}@example.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Phone size={18} className="text-gray-400" />
                                <span>+55 11 99999-9999</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="Endereço de Entrega">
                        <div className="flex gap-3">
                            <MapPin size={20} className="text-gray-400 flex-shrink-0 mt-1" />
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Av. Paulista, 1000<br />
                                Apt 4B<br />
                                São Paulo, SP 01310-100<br />
                                Brasil
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
