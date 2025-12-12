import React from 'react';

const StatusPill = ({ status, variant = 'default' }) => {
    const variants = {
        success: 'bg-green-50 text-green-700',
        warning: 'bg-yellow-50 text-yellow-700',
        danger: 'bg-red-50 text-red-700',
        info: 'bg-blue-50 text-blue-700',
        default: 'bg-gray-50 text-gray-700',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {status}
        </span>
    );
};

export default StatusPill;
