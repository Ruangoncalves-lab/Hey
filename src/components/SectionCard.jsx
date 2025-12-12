import React from 'react';

const SectionCard = ({ title, action, children, className = '' }) => {
    return (
        <div className={`card-premium p-6 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                {title && <h3 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h3>}
                {action && <div>{action}</div>}
            </div>
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

export default SectionCard;
