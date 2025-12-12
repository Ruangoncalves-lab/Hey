import React, { useState, useRef, useEffect } from 'react';
import { Card, Button } from '../components/UI/Basic';
import { Bot, Send, Sparkles, Copy, User } from 'lucide-react';

const AIFeatures = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', content: 'Olá! Sou seu assistente de IA. Como posso ajudar a otimizar seu tráfego hoje?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            let aiResponse = "Posso ajudar com isso.";
            if (text.includes("ad copy") || text.includes("anúncio")) {
                aiResponse = "Aqui está um texto de anúncio de alta conversão para sua campanha:\n\nTítulo: 🚀 Aumente Suas Vendas Hoje!\nCorpo: Não perca nossa oferta exclusiva de verão. Ganhe 50% de desconto em todos os planos premium. Tempo limitado!\nCTA: Compre Agora";
            } else if (text.includes("analyze") || text.includes("analisar")) {
                aiResponse = "Com base em seus dados atuais:\n- O CTR aumentou 15% esta semana.\n- O CPA está um pouco alto no Facebook Ads.\nRecomendação: Pause conjuntos de anúncios com baixo desempenho e realoque o orçamento para o Google Ads.";
            } else if (text.includes("keywords") || text.includes("palavras-chave")) {
                aiResponse = "Principais palavras-chave de SEO para seu nicho:\n1. Ferramentas de Marketing Digital\n2. Gerador de Tráfego IA\n3. CRM Automatizado\n4. Hacks de Crescimento E-commerce";
            } else if (text.includes("email")) {
                aiResponse = "Assunto: Bem-vindo à família! 🌟\n\nOlá [Nome],\n\nObrigado por se juntar ao TrafficMaster AI. Estamos felizes em tê-lo a bordo. Aqui estão algumas dicas para começar...";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content: aiResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const presets = [
        'Gerar texto de anúncio para promoção de verão',
        'Analisar desempenho da campanha',
        'Sugerir palavras-chave para SEO',
        'Escrever sequência de e-mail para novos leads'
    ];

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            {/* Sidebar Presets */}
            <div className="w-80 flex-shrink-0 hidden lg:flex flex-col gap-6">
                <div className="card-premium p-6 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white border-none">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Sparkles size={24} className="text-yellow-300" />
                        </div>
                        <h3 className="text-xl font-bold">Traffic AI</h3>
                    </div>
                    <p className="text-emerald-100 text-sm">Seu assistente inteligente para otimização de tráfego e conteúdo.</p>
                </div>

                <div className="flex-1 card-premium p-6 flex flex-col">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Ações Rápidas</p>
                    <div className="space-y-3">
                        {presets.map((preset, index) => (
                            <button
                                key={index}
                                onClick={() => handleSend(preset)}
                                className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 text-sm font-medium text-gray-600 transition-all border border-gray-100 hover:border-emerald-200"
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 card-premium p-0 flex flex-col overflow-hidden relative">
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'ai' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                                {msg.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl p-5 shadow-sm relative group ${msg.role === 'ai' ? 'bg-white border border-gray-100 text-gray-700' : 'bg-emerald-600 text-white'}`}>
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                                {msg.role === 'ai' && (
                                    <button
                                        onClick={() => copyToClipboard(msg.content)}
                                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-gray-100 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200"
                                        title="Copiar"
                                    >
                                        <Copy size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Bot size={20} />
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="relative flex items-center gap-2">
                        <input
                            className="w-full bg-gray-100 border-none rounded-2xl pl-6 pr-14 py-4 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-gray-900 placeholder:text-gray-500"
                            placeholder="Pergunte qualquer coisa à IA..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={() => handleSend()}
                            className="absolute right-2 p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIFeatures;
