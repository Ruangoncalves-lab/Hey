import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({ checked, onChange, disabled = false }) => {
    return (
        <button
            type="button"
            onClick={() => !disabled && onChange(!checked)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-300 focus:outline-none ${checked ? 'bg-emerald-500' : 'bg-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm ${checked ? 'left-6' : 'left-1'
                    }`}
            />
        </button>
    );
};

export default Toggle;
