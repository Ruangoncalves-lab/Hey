import React from 'react';
import SidebarItem from './SidebarItem';
import { Icons } from './Icons';

const Sidebar = ({ isOpen, onClose, toggleSidebar, isMobile }) => {
    // Navigation items array
    const navItems = [
        { path: '/', icon: Icons.Dashboard, label: 'Dashboard' },
        { path: '/campaigns', icon: Icons.Campaigns, label: 'Campanhas' },
        { path: '/crm', icon: Icons.Users, label: 'CRM' },
        { path: '/finance', icon: Icons.Wallet, label: 'Financeiro' },
        { path: '/products', icon: Icons.Package, label: 'Produtos' },
        { path: '/orders', icon: Icons.ShoppingCart, label: 'Pedidos' },
        { path: '/whatsapp', icon: Icons.MessageSquare, label: 'WhatsApp' },
        { path: '/social-media', icon: Icons.Share, label: 'Social' },
        { path: '/ai-features', icon: Icons.Bot, label: 'IA' },
        { path: '/integrations', icon: Icons.Puzzle, label: 'Integrações' },
        { path: '/settings', icon: Icons.Settings, label: 'Config' },
    ];

    return (
        <aside
            className={`
                fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-50 
                transition-all duration-300 ease-in-out flex flex-col py-6
                ${isMobile
                    ? (isOpen ? 'w-[280px] translate-x-0 shadow-2xl' : 'w-[280px] -translate-x-full')
                    : (isOpen ? 'w-[300px] translate-x-0' : 'w-[70px] translate-x-0')
                }
            `}
        >
            {/* Hamburger Menu - Isolated at top */}
            <div className="w-full flex justify-center py-6 px-4" style={{ marginBottom: '80px' }}>
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-gray-400 hover:text-[#6C5DD3] transition-colors"
                >
                    <div className="w-5 h-5">
                        {Icons.Menu}
                    </div>
                </button>
            </div>

            {/* Navigation Items - Well spaced */}
            <nav
                className={`flex-1 w-full flex flex-col items-center overflow-y-auto scrollbar-hide ${!isMobile && !isOpen ? 'px-0' : 'px-4'}`}
                style={{ gap: '28px' }}
            >
                {navItems.map((item) => (
                    <SidebarItem
                        key={item.path}
                        path={item.path}
                        icon={item.icon}
                        label={item.label}
                        isOpen={isMobile || isOpen}
                        onClick={isMobile ? onClose : undefined}
                    />
                ))}
            </nav>

            {/* Support - Separated at footer */}
            <div className={`mt-auto flex flex-col w-full pt-6 border-t border-gray-200 ${!isMobile && !isOpen ? 'px-0 items-center' : 'px-4'}`}>
                <SidebarItem
                    path="/support"
                    icon={Icons.HelpCircle}
                    label="Suporte"
                    isOpen={isMobile || isOpen}
                />
            </div>
        </aside>
    );
};

export default Sidebar;
