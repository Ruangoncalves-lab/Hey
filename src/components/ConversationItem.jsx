import React from 'react';
import { Instagram, Facebook, MessageCircle, Clock, Circle } from 'lucide-react';

const ConversationItem = ({
    avatar,
    name,
    lastMessage,
    time,
    platform,
    unread = 0,
    isActive = false,
    onClick
}) => {
    const platformIcons = {
        instagram: <Instagram size={14} className="text-pink-500" />,
        facebook: <Facebook size={14} className="text-blue-600" />,
        whatsapp: <MessageCircle size={14} className="text-green-500" />
    };

    return (
        <div
            onClick={onClick}
            className={`flex items-start gap-3 p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${isActive ? 'bg-blue-50 hover:bg-blue-50' : ''
                }`}
        >
            <div className="relative flex-shrink-0">
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
                {platformIcons[platform] && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        {platformIcons[platform]}
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm text-gray-900 truncate">{name}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{time}</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{lastMessage}</p>
            </div>

            {unread > 0 && (
                <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                        {unread}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ConversationItem;
