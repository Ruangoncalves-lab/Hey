import React, { useState, useRef, useEffect } from 'react';
import { Menu, Moon, Sun, Bell, Search, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const trigger = useRef(null);
    const dropdown = useRef(null);
    const navigate = useNavigate();

    // Close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [dropdownOpen]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tenantId');
        navigate('/login');
    };

    return (
        <>
            <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-slate-800 dark:drop-shadow-none border-b border-slate-200 dark:border-slate-700">
                <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                    <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                        <button
                            aria-controls="sidebar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="hidden sm:block">
                        <form action="#" method="POST">
                            <div className="relative">
                                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                    <Search size={20} className="text-slate-400" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Digite para buscar..."
                                    className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center gap-3 2xsm:gap-7">
                        <ul className="flex items-center gap-2 2xsm:gap-4">
                            <li>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                >
                                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </li>

                            <li className="relative">
                                <button className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
                                    <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-500">
                                        <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                    </span>
                                    <Bell size={20} />
                                </button>
                            </li>
                        </ul>

                        {/* User Area */}
                        <div className="relative">
                            <button
                                ref={trigger}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-4"
                            >
                                <span className="hidden text-right lg:block">
                                    <span className="block text-sm font-medium text-black dark:text-white">
                                        Thomas Anree
                                    </span>
                                    <span className="block text-xs">Designer UX</span>
                                </span>

                                <span className="h-12 w-12 rounded-full bg-slate-300 overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=Thomas+Anree&background=random" alt="User" />
                                </span>
                                <ChevronDown size={16} className={`hidden sm:block transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown */}
                            <div
                                ref={dropdown}
                                onFocus={() => setDropdownOpen(true)}
                                onBlur={() => setDropdownOpen(false)}
                                className={`absolute right-0 mt-4 w-62 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen ? 'block' : 'hidden'}`}
                            >
                                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                        >
                                            <User size={22} />
                                            Meu Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/settings"
                                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                                        >
                                            <Settings size={22} />
                                            Configurações
                                        </Link>
                                    </li>
                                </ul>
                                <button
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        setShowLogoutModal(true);
                                    }}
                                    className="flex w-full items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                                >
                                    <LogOut size={22} />
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutModal && (
                    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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

export default Header;
