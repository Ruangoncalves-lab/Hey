import React from 'react';

const ListItem = ({
    avatar,
    icon: Icon,
    iconBg = 'bg-gray-100',
    iconColor = 'text-gray-600',
    title,
    subtitle,
    meta,
    action,
    onClick
}) => {
    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {/* Avatar or Icon */}
            {avatar ? (
                <img src={avatar} alt={title} className="w-10 h-10 rounded-full object-cover" />
            ) : Icon ? (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
                    <Icon size={20} className={iconColor} />
                </div>
            ) : null}

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
                {subtitle && (
                    <p className="text-xs text-gray-500 truncate">{subtitle}</p>
                )}
            </div>

            {/* Meta or Action */}
            {meta && (
                <div className="text-xs text-gray-500 whitespace-nowrap">{meta}</div>
            )}
            {action && action}
        </div>
    );
};

export default ListItem;
