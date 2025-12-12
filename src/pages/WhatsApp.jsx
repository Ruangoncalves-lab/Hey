import React, { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Paperclip, Mic, Send, Phone, Video, Info } from 'lucide-react';
import { useStore } from '../store/useStore';

const WhatsApp = () => {
    const { chats, messages, sendMessage, receiveMessage } = useStore();
    const [selectedChatId, setSelectedChatId] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const selectedChat = chats.find(c => c.id === selectedChatId);
    const currentMessages = messages[selectedChatId] || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages, selectedChatId]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        sendMessage(selectedChatId, inputValue);
        setInputValue('');

        // Simulate AI Auto-reply
        setTimeout(() => {
            receiveMessage(selectedChatId, "Sou um assistente de IA. Recebi sua mensagem: " + inputValue);
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex gap-6">
            {/* Sidebar - Chat List */}
            <div className="w-1/3 card-premium flex flex-col overflow-hidden p-0">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Conversas</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            placeholder="Pesquisar conversa..."
                            className="input-premium pl-10 py-2.5 bg-gray-50 border-transparent focus:bg-white"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChatId(chat.id)}
                            className={`p-4 flex gap-3 cursor-pointer transition-all border-b border-gray-50 hover:bg-gray-50 ${selectedChatId === chat.id ? 'bg-emerald-50/50 border-l-4 border-l-emerald-500' : 'border-l-4 border-l-transparent'
                                }`}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                                    {chat.name.charAt(0)}
                                </div>
                                {chat.online && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm truncate ${selectedChatId === chat.id ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                        {chat.name}
                                    </h4>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-500 truncate max-w-[80%]">
                                        {chat.lastMessage}
                                    </p>
                                    {chat.unread > 0 && (
                                        <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 card-premium flex flex-col overflow-hidden p-0">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                            {selectedChat?.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{selectedChat?.name}</h4>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="text-xs text-gray-500">Online agora</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                            <Phone size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                            <Video size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                            <Info size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F0F2F5] custom-scrollbar">
                    {currentMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.role === 'sent' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm relative ${msg.role === 'sent'
                                    ? 'bg-emerald-600 text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-tl-none'
                                }`}>
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                <span className={`text-[10px] block text-right mt-1 ${msg.role === 'sent' ? 'text-emerald-100' : 'text-gray-400'
                                    }`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-[24px] border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <input
                            placeholder="Digite sua mensagem..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 placeholder:text-gray-400"
                        />
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={handleSend}
                            className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsApp;
