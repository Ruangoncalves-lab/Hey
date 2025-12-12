import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Target,
    Share2,
    Settings,
    Wallet,
    LogOut,
    X,
    Link as LinkIcon,
    MessageSquare,
    PieChart,
    Wand2,
    LayoutGrid,
    Image
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const trigger = useRef(null);
    const sidebar = useRef(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [sidebarOpen]);

    // Close on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tenantId');
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, path: '/', title: 'Dashboard' },
        { icon: Target, path: '/traffic', title: 'Gestor de Tráfego' },
        { icon: LayoutGrid, path: '/campaigns', title: 'Campanhas' },
        { icon: Image, path: '/creatives', title: 'Biblioteca de Criativos' },
        { icon: Share2, path: '/social-media', title: 'Social Mídia' },
        { icon: MessageSquare, path: '/whatsapp', title: 'WhatsApp Inbox' },
        { icon: PieChart, path: '/analytics', title: 'Analytics Profundo' },
        { icon: Wand2, path: '/smart-campaign', title: 'Criador Inteligente' },
        { icon: Wallet, path: '/finances', title: 'Financeiro' },
        { icon: LinkIcon, path: '/integrations', title: 'Integrações' },
    ];

    return (
        <>
            {/* Desktop Floating Sidebar (Icon Strip) */}
            <aside className="hidden lg:flex fixed left-4 2xl:left-6 top-36 2xl:top-44 z-40 flex-col items-center gap-2 h-auto">
                {/* Main Menu */}
                <div className="flex flex-col items-center bg-white rounded-full py-2 2xl:py-3 px-2 2xl:px-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 gap-1 2xl:gap-2">
                    {menuItems.map((item, index) => (
                        <div key={index} className="relative group">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `p-2 2xl:p-2.5 rounded-full transition-all duration-300 flex items-center justify-center relative z-10 ${isActive
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                                        : 'text-gray-400 hover:text-emerald-600'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <item.icon size={20} />
                                        </motion.div>
                                        {!isActive && (
                                            <motion.div
                                                className="absolute inset-0 bg-gray-50 rounded-full -z-10"
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileHover={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>

                            {/* Tooltip */}
                            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg translate-x-2 group-hover:translate-x-0 duration-200">
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bottom Menu (Settings & Logout) */}
                <div className="flex flex-col items-center bg-white rounded-full py-2 2xl:py-3 px-2 2xl:px-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 gap-1 2xl:gap-2">
                    {/* Settings */}
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `p-2 2xl:p-2.5 rounded-full transition-all duration-300 group relative ${isActive
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                                : 'text-gray-400 hover:bg-gray-50 hover:text-emerald-600'
                            }`
                        }
                    >
                        <Settings size={20} />
                        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Configurações
                        </span>
                    </NavLink>

                    {/* Logout */}
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="p-2 2xl:p-2.5 rounded-full transition-all duration-300 group relative text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                        <LogOut size={20} />
                        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            Sair
                        </span>
                    </button>
                </div>
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sidebar Drawer */}
                        <motion.aside
                            ref={sidebar}
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed left-0 top-0 bottom-0 z-50 flex w-72 flex-col bg-white shadow-2xl lg:hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                                        <span className="text-lg font-bold">T</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900 tracking-tight">TrafficMaster</span>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Menu */}
                            <div className="flex flex-col gap-1 p-4 overflow-y-auto flex-1">
                                {menuItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <item.icon size={20} />
                                        <span>{item.title}</span>
                                    </NavLink>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-100">
                                <button
                                    onClick={() => setShowLogoutModal(true)}
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium"
                                >
                                    <LogOut size={20} />
                                    <span>Sair</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutModal && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-sm rounded-[2rem] bg-white p-8 text-center shadow-2xl dark:bg-boxdark"
                        >
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
                                <LogOut size={36} strokeWidth={2} />
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                                Encerrar Sessão?
                            </h3>
                            <p className="mb-8 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="flex-1 rounded-xl border border-gray-200 bg-white py-3.5 font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 rounded-xl bg-[#FF3B30] py-3.5 font-bold text-white hover:bg-red-600 transition-all duration-200 shadow-lg shadow-red-500/20"
                                >
                                    Sair
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
