import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Layers,
    BarChart3,
    Wallet,
    Bell,
    Settings,
    ChevronDown,
    ChevronUp,
    Menu,
    X,
    Share2,
    MessageSquare,
    Calendar,
    Wand2,
    PieChart,
    Target
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;
    const [openSubmenus, setOpenSubmenus] = useState({
        traffic: true // Default open for better visibility
    });

    const toggleSubmenu = (key) => {
        setOpenSubmenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/',
            icon: <LayoutDashboard size={20} />
        },
        {
            title: 'Gestor de Campanhas',
            icon: <Target size={20} />,
            submenu: true,
            submenuKey: 'traffic',
            items: [
                { title: 'Meta Ads', path: '/traffic/meta' },
                { title: 'Google Ads', path: '/traffic/google' },
                { title: 'TikTok Ads', path: '/traffic/tiktok' }
            ]
        },
        {
            title: 'Social Media',
            path: '/social-media',
            icon: <Share2 size={20} />
        },
        {
            title: 'WhatsApp Inbox',
            path: '/whatsapp',
            icon: <MessageSquare size={20} />
        },
        {
            title: 'Analytics Profundo',
            path: '/analytics',
            icon: <PieChart size={20} />
        },
        {
            title: 'Criador Inteligente',
            path: '/smart-campaign',
            icon: <Wand2 size={20} />
        },
        {
            title: 'Produtos',
            path: '/products',
            icon: <Package size={20} />
        },
        {
            title: 'Pedidos',
            path: '/orders',
            icon: <ShoppingCart size={20} />
        },
        {
            title: 'Finanças',
            path: '/finances',
            icon: <Wallet size={20} />
        },
        {
            title: 'Configurações',
            path: '/settings',
            icon: <Settings size={20} />
        }
    ];

    return (
        <aside
            className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-slate-900 text-white duration-300 ease-linear dark:bg-slate-900 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${!sidebarOpen && 'lg:w-20'}`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/" className={`flex items-center gap-2 text-2xl font-bold ${!sidebarOpen && 'lg:hidden'}`}>
                    <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <span className="text-white">T</span>
                    </div>
                    TrafficMaster
                </NavLink>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="block lg:hidden"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className={`mb-4 ml-4 text-sm font-semibold text-slate-400 ${!sidebarOpen && 'lg:hidden'}`}>
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    if (!sidebarOpen) setSidebarOpen(true);
                                                    toggleSubmenu(item.submenuKey);
                                                }}
                                                className={`group relative flex w-full items-center gap-2.5 rounded-xl px-4 py-2 font-medium text-slate-200 duration-300 ease-in-out hover:bg-slate-800 ${(pathname.includes(item.path) || openSubmenus[item.submenuKey]) && 'bg-slate-800'
                                                    }`}
                                            >
                                                {item.icon}
                                                <span className={`${!sidebarOpen && 'lg:hidden'}`}>{item.title}</span>
                                                <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${!sidebarOpen && 'lg:hidden'}`}>
                                                    {openSubmenus[item.submenuKey] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                </span>
                                            </button>
                                            <div className={`translate transform overflow-hidden ${!openSubmenus[item.submenuKey] && 'hidden'}`}>
                                                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                                    {item.items.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <NavLink
                                                                to={subItem.path}
                                                                className={({ isActive }) =>
                                                                    `group relative flex items-center gap-2.5 rounded-xl px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white ${isActive && '!text-white'
                                                                    } ${!sidebarOpen && 'lg:hidden'}`
                                                                }
                                                            >
                                                                {subItem.title}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `group relative flex items-center gap-2.5 rounded-xl px-4 py-2 font-medium text-slate-200 duration-300 ease-in-out hover:bg-slate-800 ${isActive && 'bg-slate-800 text-white'
                                                }`
                                            }
                                        >
                                            {item.icon}
                                            <span className={`${!sidebarOpen && 'lg:hidden'}`}>{item.title}</span>
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div >
        </aside >
    );
};

export default Sidebar;
