import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ icon, label, path, isOpen, onClick }) => {
    return (
        <NavLink
            to={path}
            onClick={onClick}
            className={({ isActive }) => `
                relative flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-300 group
                ${isActive
                    ? 'bg-[#6C5DD3] text-white shadow-lg shadow-[#6C5DD3]/30'
                    : 'text-gray-400 hover:text-[#6C5DD3] hover:bg-gray-50'}
                ${!isOpen ? 'justify-center w-[40px] h-[40px] p-0' : 'justify-start w-full'}
            `}
        >
            {/* Icon */}
            <div className="shrink-0 w-5 h-5">
                {icon}
            </div>

            {/* Label */}
            <span className={`
                whitespace-nowrap font-medium text-[14px] transition-all duration-300 overflow-hidden
                ${!isOpen ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto'}
            `}>
                {label}
            </span>

            {/* Tooltip for collapsed state */}
            {!isOpen && (
                <div className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5
                    bg-gray-800 text-white text-xs font-medium rounded-lg
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    transition-opacity duration-200 z-50 whitespace-nowrap
                ">
                    {label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-800" />
                </div>
            )}
        </NavLink>
    );
};

export default SidebarItem;
