import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    Plus,
    Image,
    Video,
    Type,
    MoreHorizontal,
    MessageCircle,
    Heart,
    Share2,
    BarChart2,
    Search,
    Filter,
    Instagram,
    Facebook,
    Linkedin,
    Send,
    Smile,
    Paperclip,
    CheckCircle2,
    Clock,
    Wand2
} from 'lucide-react';

const SocialMedia = () => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [selectedPlatform, setSelectedPlatform] = useState('all');

    // --- Components ---

    const CalendarView = () => {
        const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock calendar grid
        const posts = [
            { day: 5, type: 'image', platform: 'instagram', title: 'Promoção Relâmpago', time: '10:00' },
            { day: 8, type: 'video', platform: 'tiktok', title: 'Bastidores', time: '14:00' },
            { day: 12, type: 'carousel', platform: 'linkedin', title: 'Estudo de Caso', time: '09:00' },
            { day: 15, type: 'image', platform: 'facebook', title: 'Lançamento', time: '18:00' },
        ];

        return (
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">Calendário de Conteúdo</h2>
                    <div className="flex gap-2">
                        <button className="btn-secondary px-3 py-1.5 text-xs">Mês</button>
                        <button className="btn-ghost px-3 py-1.5 text-xs">Semana</button>
                    </div>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                            <div key={d} className="py-3 text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 auto-rows-[120px]">
                        {days.map((day) => {
                            const dayPosts = posts.filter(p => p.day === day);
                            return (
                                <div key={day} className="border-r border-b border-gray-100 p-2 relative group hover:bg-gray-50/50 transition-colors">
                                    <span className="text-xs font-bold text-gray-400">{day <= 30 ? day : ''}</span>
                                    <div className="mt-1 space-y-1">
                                        {dayPosts.map((post, idx) => (
                                            <div key={idx} className={`p-1.5 rounded-lg text-[10px] font-bold border flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform ${post.platform === 'instagram' ? 'bg-pink-50 text-pink-700 border-pink-100' :
                                                    post.platform === 'linkedin' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                        post.platform === 'tiktok' ? 'bg-gray-100 text-gray-900 border-gray-200' :
                                                            'bg-indigo-50 text-indigo-700 border-indigo-100'
                                                }`}>
                                                {post.platform === 'instagram' && <Instagram size={10} />}
                                                {post.platform === 'linkedin' && <Linkedin size={10} />}
                                                <span className="truncate">{post.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {day <= 30 && (
                                        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-emerald-100 text-emerald-600 rounded-full transition-all">
                                            <Plus size={14} />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile List View */}
                <div className="md:hidden p-4 space-y-3">
                    {posts.map((post, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${post.platform === 'instagram' ? 'bg-pink-50 text-pink-600' :
                                    post.platform === 'linkedin' ? 'bg-blue-50 text-blue-600' :
                                        post.platform === 'tiktok' ? 'bg-gray-100 text-gray-900' :
                                            'bg-indigo-50 text-indigo-600'
                                }`}>
                                {post.platform === 'instagram' && <Instagram size={20} />}
                                {post.platform === 'linkedin' && <Linkedin size={20} />}
                                {post.platform === 'tiktok' && <Video size={20} />}
                                {post.platform === 'facebook' && <Facebook size={20} />}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-sm">{post.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <CalendarIcon size={12} /> Dia {post.day} • {post.time}
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    ))}
                    <button className="w-full py-3 mt-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-sm flex items-center justify-center gap-2 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all">
                        <Plus size={18} /> Agendar Novo Post
                    </button>
                </div>
            </div>
        );
    };

    const PostCreator = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-2 space-y-6">
                <div className="card-premium p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Novo Post</h3>

                    {/* Platform Selector */}
                    <div className="flex gap-3 mb-6">
                        {[
                            { id: 'instagram', icon: Instagram, color: 'text-pink-600 bg-pink-50' },
                            { id: 'facebook', icon: Facebook, color: 'text-blue-600 bg-blue-50' },
                            { id: 'linkedin', icon: Linkedin, color: 'text-blue-700 bg-blue-50' },
                        ].map(p => (
                            <button key={p.id} className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${selectedPlatform === p.id
                                ? 'border-emerald-500 ring-2 ring-emerald-500 ring-offset-2'
                                : 'border-gray-100 hover:border-gray-200'
                                }`} onClick={() => setSelectedPlatform(p.id)}>
                                <div className={`p-1.5 rounded-full ${p.color}`}>
                                    <p.icon size={16} />
                                </div>
                                <span className="text-sm font-bold capitalize">{p.id}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="space-y-4">
                        <textarea
                            className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none resize-none text-sm"
                            placeholder="Escreva sua legenda aqui..."
                        ></textarea>

                        <div className="flex items-center gap-2">
                            <button className="btn-secondary px-3 py-1.5 text-xs"><Image size={14} /> Foto/Vídeo</button>
                            <button className="btn-secondary px-3 py-1.5 text-xs"><Wand2 size={14} /> Gerar Legenda IA</button>
                            <button className="btn-secondary px-3 py-1.5 text-xs"><Smile size={14} /> Emoji</button>
                        </div>

                        {/* Media Placeholder */}
                        <div className="border-2 border-dashed border-gray-200 rounded-xl h-48 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                            <Image size={32} className="mb-2" />
                            <span className="text-sm font-medium">Adicionar Mídia</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview & Checklist */}
            <div className="space-y-6">
                <div className="card-premium p-6 bg-gray-50 border-dashed border-2 border-gray-200">
                    <h3 className="font-bold text-gray-500 text-sm uppercase mb-4 text-center">Pré-visualização</h3>
                    {/* Mock Phone Preview */}
                    <div className="bg-white rounded-[2rem] shadow-lg p-4 max-w-[280px] mx-auto border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="h-2 w-20 bg-gray-100 rounded"></div>
                        </div>
                        <div className="aspect-square bg-gray-100 rounded-xl mb-3"></div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-gray-50 rounded"></div>
                            <div className="h-2 w-2/3 bg-gray-50 rounded"></div>
                        </div>
                    </div>
                </div>

                <div className="card-premium p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-500" /> Checklist IA
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={14} className="text-emerald-500" /> Imagem em alta resolução
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={14} className="text-emerald-500" /> Legenda otimizada
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={14} className="text-orange-500" /> Melhor horário: 18:00
                        </div>
                    </div>
                    <button className="btn-primary w-full mt-6">Agendar Post</button>
                </div>
            </div>
        </div>
    );

    const UnifiedInbox = () => (
        <div className="card-premium p-0 flex h-[600px] overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" placeholder="Buscar mensagens..." className="w-full bg-gray-50 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 ${i === 1 ? 'bg-emerald-50/30' : ''}`}>
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                    <Instagram size={12} className="text-pink-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-bold text-sm text-gray-900">Usuário {i}</span>
                                    <span className="text-[10px] text-gray-400">10:30</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">Olá, gostaria de saber mais sobre...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50/30">
                <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">Usuário 1</h3>
                            <span className="text-xs text-gray-500">Instagram Direct</span>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[70%] text-sm text-gray-700 shadow-sm">
                            Olá, gostaria de saber mais sobre o produto X.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-none p-3 max-w-[70%] text-sm shadow-md">
                            Olá! Claro, posso te ajudar com isso. O produto X é...
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600"><Paperclip size={20} /></button>
                        <input type="text" placeholder="Digite sua mensagem..." className="flex-1 bg-transparent outline-none text-sm" />
                        <button className="p-2 text-gray-400 hover:text-gray-600"><Smile size={20} /></button>
                        <button className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"><Send size={18} /></button>
                    </div>
                    <div className="mt-2 flex gap-2">
                        <button className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-purple-100">
                            <Wand2 size={10} /> Sugestão IA: Resposta de Vendas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Social Mídia</h1>
                    <p className="text-gray-500">Gerencie todas as suas redes em um só lugar.</p>
                </div>
                <button className="btn-primary">
                    <Plus size={20} /> Criar Post
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex w-full md:w-auto overflow-x-auto">
                {[
                    { id: 'calendar', label: 'Calendário', icon: CalendarIcon },
                    { id: 'creator', label: 'Criador', icon: Type },
                    { id: 'inbox', label: 'Inbox Unificado', icon: MessageCircle },
                    { id: 'metrics', label: 'Métricas', icon: BarChart2 },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'calendar' && <CalendarView />}
                {activeTab === 'creator' && <PostCreator />}
                {activeTab === 'inbox' && <UnifiedInbox />}
                {activeTab === 'metrics' && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <BarChart2 size={48} className="mb-4 opacity-50" />
                        <p>Métricas detalhadas em breve.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialMedia;
