import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, User, Menu, Search, Bell } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const getPageTitle = (pathname) => {
        const path = pathname.substring(1);
        const titles = {
            '': 'Dashboard',
            'campaigns': 'Campanhas',
            'crm': 'CRM / Leads',
            'whatsapp': 'WhatsApp',
            'orders': 'Pedidos',
            'products': 'Produtos',
            'finance': 'Financeiro',
            'social-media': 'Redes Sociais',
            'ai-features': 'Recursos de IA',
            'integrations': 'Integrações',
            'settings': 'Configurações',
            'support': 'Suporte'
        };
        return titles[path] || 'Dashboard';
    };

    return (
        <header className="header">
            <div className="header-left">
                <button
                    onClick={toggleSidebar}
                    className="theme-toggle mobile-menu-btn"
                >
                    <Menu size={24} />
                </button>

                <div className="header-search">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Global search" className="search-input" />
                </div>
            </div>

            <div className="header-actions">
                <button className="icon-btn notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>

                <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="user-profile">
                    <div className="avatar">
                        <img src="https://i.pravatar.cc/150?img=33" alt="User" />
                    </div>
                    <span className="user-name">Administrador</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
