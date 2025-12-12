import React from 'react';

// Card Component
export const Card = ({ children, className = '', title, actions, ...props }) => (
    <div className={`card-premium p-6 ${className}`} {...props}>
        {(title || actions) && (
            <div className="flex items-center justify-between mb-6">
                {title && <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>}
                {actions && <div className="flex gap-2">{actions}</div>}
            </div>
        )}
        <div className="relative">{children}</div>
    </div>
);

// Button Component
export const Button = ({ children, variant = 'primary', size = 'medium', className = '', isLoading = false, ...props }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'primary': return 'btn-primary';
            case 'secondary': return 'btn-secondary';
            case 'outline': return 'btn-secondary'; // Map outline to secondary for now
            case 'ghost': return 'btn-ghost';
            case 'danger': return 'bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold transition-colors';
            default: return 'btn-primary';
        }
    };

    return (
        <button
            className={`${getVariantClass()} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {children}
        </button>
    );
};

// Input Component
export const Input = ({ label, error, className = '', ...props }) => (
    <div className={`space-y-2 ${className}`}>
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <input className={`input-premium ${error ? 'ring-red-500 focus:ring-red-500' : ''}`} {...props} />
        {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
);

// Badge Component
export const Badge = ({ children, variant = 'neutral', className = '' }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'success': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
            case 'warning': return 'bg-amber-50 text-amber-700 border border-amber-100';
            case 'danger': return 'bg-red-50 text-red-700 border border-red-100';
            case 'info': return 'bg-blue-50 text-blue-700 border border-blue-100';
            default: return 'bg-gray-50 text-gray-600 border border-gray-100';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getVariantClass()} ${className}`}>
            {children}
        </span>
    );
};
