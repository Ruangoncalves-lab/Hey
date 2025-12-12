import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Layers,
    BarChart3,
    Wallet,
    Bell,
    Settings,
    Search,
    ChevronDown,
    Calendar,
    Share2
} from 'lucide-react';

const TopNavbar = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const navItems = [
        { title: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
        { title: 'Produtos', path: '/products', icon: <Package size={18} /> },
        { title: 'Pedidos', path: '/orders', icon: <ShoppingCart size={18} /> },
        { title: 'Integrações', path: '/integrations', icon: <Layers size={18} /> },
        { title: 'Meta Ads', path: '/traffic/meta', icon: <BarChart3 size={18} /> },
        { title: 'Google Ads', path: '/traffic/google', icon: <LayoutDashboard size={18} /> },
        { title: 'Social Mídia', path: '/social-media', icon: <Share2 size={18} /> },
        { title: 'Finanças', path: '/finances', icon: <Wallet size={18} /> },
    ];

    return (
        <nav className="w-full max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-4 xl:gap-8 2xl:gap-12">
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-inner border border-white/10">
                            <div className="w-5 h-5 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">TrafficMaster</span>
                    </NavLink>

                    {/* Navigation Links */}
                    <div className="hidden xl:flex items-center gap-1">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 2xl:gap-4">
                    {/* Settings */}
                    <button className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                        <Settings size={20} />
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-[var(--color-primary)] rounded-full animate-pulse"></span>
                    </button>

                    {/* Profile */}
                    <div className="relative pl-4 border-l border-white/10">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 hover:bg-white/5 rounded-xl p-1.5 pr-3 transition-all"
                        >
                            <img
                                src="https://ui-avatars.com/api/?name=Kennedy+Jones&background=F97316&color=fff"
                                alt="User"
                                className="w-10 h-10 rounded-xl border-2 border-white/20 shadow-sm"
                            />
                            <div className="hidden 2xl:block text-left">
                                <div className="text-sm font-semibold text-white">Kennedy Jones</div>
                                <div className="text-xs text-emerald-200/80">Product Manager</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
