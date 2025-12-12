import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`card-premium px-8 py-8 ${className}`}>
            {(title || action) && (
                <div className="mb-8 flex justify-between items-center">
                    {title && <h4 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h4>}
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
