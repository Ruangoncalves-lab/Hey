import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Bell, Search, User, MessageCircle } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    // Menu items are now handled by the Sidebar, but we keep the array if needed for future reference or mobile menu
    const menuItems = [
        { path: '/', title: 'Dashboard' },
        { path: '/products', title: 'Produtos' },
        { path: '/orders', title: 'Pedidos' },
        { path: '/integrations', title: 'Integrações' },
        { path: '/traffic/meta', title: 'Meta Ads' },
        { path: '/traffic/google', title: 'Google Ads' },
        { path: '/social-media', title: 'Social Mídia' },
        { path: '/finances', title: 'Finanças' },
    ];

    return (
        <header className="relative pt-6 mx-auto w-[98%] xl:w-[96%] max-w-[1400px] transition-all duration-300 mb-8">
            <div className="px-2 py-2 flex items-center justify-between">

                {/* Left: Logo/Greeting & Mobile Menu */}
                <div className="flex items-center gap-4 pl-2">
                    <div className="lg:hidden">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Greeting Section */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                            <span className="font-bold text-xl">T</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight leading-tight">
                                Hello, Thomas!
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Right: Search & Actions */}
                <div className="flex items-center gap-3 sm:gap-4 pr-2">
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-white rounded-full px-5 py-3 shadow-sm border border-gray-100 w-72 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                        <Search size={20} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm ml-3 w-full text-gray-700 placeholder-gray-400"
                        />
                        <div className="bg-gray-900 rounded-full p-1.5 ml-2 cursor-pointer hover:bg-gray-800 transition-colors">
                            <Search size={14} className="text-white" />
                        </div>
                    </div>

                    {/* Mobile Search Icon */}
                    <button className="md:hidden p-2.5 rounded-full bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-gray-900 transition-all">
                        <Search size={20} />
                    </button>

                    {/* Message Icon */}
                    <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:scale-105 transition-all relative hidden sm:flex">
                        <MessageCircle size={20} />
                        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                    </button>

                    {/* Notification Icon */}
                    <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:scale-105 transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                    </button>

                    {/* User Avatar */}
                    <div className="pl-1">
                        <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm border border-gray-100 cursor-pointer hover:ring-2 hover:ring-emerald-100 transition-all hover:scale-105">
                            <img src="https://ui-avatars.com/api/?name=Thomas+Anree&background=10B981&color=fff" className="w-full h-full rounded-full object-cover" alt="User" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
