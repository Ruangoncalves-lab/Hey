import React, { useState } from 'react';
import { User, Bell, Lock, Monitor, Globe, Shield, CreditCard, HelpCircle, ChevronRight } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const menuItems = [
        { id: 'profile', label: 'Meu Perfil', icon: User },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'security', label: 'Segurança', icon: Shield },
        { id: 'billing', label: 'Faturamento', icon: CreditCard },
        { id: 'preferences', label: 'Preferências', icon: Monitor },
        { id: 'help', label: 'Ajuda e Suporte', icon: HelpCircle },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
                <div className="card-premium p-4">
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === item.id
                                        ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-6">
                {/* Header */}
                <div className="card-premium p-8 bg-gradient-to-r from-emerald-900 to-teal-900 text-white border-none">
                    <h1 className="text-2xl font-bold mb-2">Configurações da Conta</h1>
                    <p className="text-emerald-100">Gerencie seus dados pessoais e preferências do sistema.</p>
                </div>

                {activeTab === 'profile' && (
                    <div className="card-premium p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User size={24} className="text-emerald-600" /> Informações Pessoais
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
                                    <input type="text" defaultValue="Kennedy Jones" className="input-premium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input type="email" defaultValue="kennedy@trafficmaster.com" className="input-premium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
                                    <input type="tel" defaultValue="+55 11 99999-9999" className="input-premium" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cargo</label>
                                    <input type="text" defaultValue="Gerente de Produto" className="input-premium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Empresa</label>
                                    <input type="text" defaultValue="TrafficMaster Inc." className="input-premium" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <button className="btn-primary">Salvar Alterações</button>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="card-premium p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Bell size={24} className="text-emerald-600" /> Preferências de Notificação
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: 'Alertas de Campanha', desc: 'Receba notificações quando uma campanha atingir metas ou tiver problemas.' },
                                { title: 'Relatórios Semanais', desc: 'Resumo da performance enviado toda segunda-feira.' },
                                { title: 'Novas Oportunidades IA', desc: 'Seja avisado quando a IA encontrar uma oportunidade de otimização.' },
                                { title: 'Mensagens do Chat', desc: 'Notificações de novas mensagens no inbox unificado.' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#059669]"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Other tabs can be implemented similarly */}
                {(activeTab !== 'profile' && activeTab !== 'notifications') && (
                    <div className="card-premium p-12 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Lock size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Em Desenvolvimento</h3>
                        <p className="text-gray-500">Esta seção de configurações estará disponível em breve.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
