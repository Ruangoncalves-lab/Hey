import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, isOpen, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
        group relative flex items-center w-full p-3 my-1 rounded-xl transition-all duration-300
        sidebar-item-glow
        ${isActive
                    ? 'text-white active'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
      `}
        >
            {/* Icon Container */}
            <div className={`
        flex items-center justify-center min-w-[24px] h-6 transition-transform duration-300
        ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(108,93,211,0.5)]' : 'group-hover:scale-110'}
      `}>
                <Icon size={20} strokeWidth={1.5} />
            </div>

            {/* Label (Open State) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 font-medium text-sm whitespace-nowrap overflow-hidden"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Tooltip (Closed State) */}
            {!isOpen && (
                <div className="
          absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-[#1E2029] text-white text-xs font-medium
          opacity-0 -translate-x-2 pointer-events-none
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-200 z-50 whitespace-nowrap
          border border-white/10 shadow-xl
        ">
                    {label}
                    {/* Tooltip Arrow */}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-[#1E2029]" />
                </div>
            )}

            {/* Active Glow Indicator (Right side, optional, based on "illuminated inner border") */}
            {isActive && isOpen && (
                <motion.div
                    layoutId="activeGlow"
                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
                />
            )}
        </button>
    );
};

export default SidebarItem;
