import React, { useState } from 'react';
import './SocialMediaChat.css';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Paperclip, 
  Mic, 
  Send, 
  Smile, 
  Phone, 
  Video, 
  Info,
  Calendar,
  Image as ImageIcon,
  MessageCircle,
  Instagram,
  Facebook,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';

const SocialMediaChat = () => {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'planner'
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState(1);

  // Mock Data
  const conversations = [
    {
      id: 1,
      name: 'Ana Silva',
      avatar: 'https://i.pravatar.cc/150?u=1',
      platform: 'whatsapp',
      lastMessage: 'Olá, gostaria de saber mais sobre o plano...',
      time: '10:30',
      unread: 2,
      type: 'message'
    },
    {
      id: 2,
      name: 'Carlos Oliveira',
      avatar: 'https://i.pravatar.cc/150?u=2',
      platform: 'instagram',
      lastMessage: 'Adorei o conteúdo! 👏',
      time: '09:15',
      unread: 0,
      type: 'comment'
    },
    {
      id: 3,
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?u=3',
      platform: 'facebook',
      lastMessage: 'Qual o valor do frete para 01234-567?',
      time: 'Ontem',
      unread: 0,
      type: 'message'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'them',
      text: 'Olá, bom dia! Gostaria de saber mais sobre os planos disponíveis.',
      time: '10:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'me',
      text: 'Olá Ana! Claro, temos 3 planos principais. Você busca algo para iniciantes ou avançado?',
      time: '10:32',
      status: 'read'
    },
    {
      id: 3,
      sender: 'them',
      text: 'Algo intermediário, por favor.',
      time: '10:33',
      status: 'read'
    },
    {
      id: 4,
      sender: 'me',
      text: 'Perfeito! O plano "Pro" seria ideal. Ele inclui gestão de até 5 contas e relatórios semanais.',
      time: '10:35',
      status: 'delivered'
    }
  ];

  return (
    <div className="social-media-chat-container">
      {/* Top Bar */}
      <div className="smc-top-bar">
        <div className="smc-title">
          <h1>Social Mídia & Chat</h1>
          <p>Gerencie comentários, mensagens, direct e WhatsApp em um só lugar.</p>
        </div>
        <div className="smc-actions">
          <div className="smc-search">
            <Search size={18} className="smc-search-icon" />
            <input type="text" placeholder="Buscar conversas..." />
          </div>
          <button 
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'chat' ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'planner' ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}
            onClick={() => setActiveTab('planner')}
          >
            Planner
          </button>
          <button className="smc-btn-primary">
            <Plus size={18} />
            <span>Adicionar Conta</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="smc-content">
        {activeTab === 'chat' ? (
          <div className="smc-chat-layout">
            {/* Column 1: List */}
            <div className="smc-col-1">
              <div className="smc-tabs">
                {['Todos', 'Comentários', 'Direct', 'WhatsApp'].map((tab) => (
                  <div 
                    key={tab} 
                    className={`smc-tab ${activeFilter === tab.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setActiveFilter(tab.toLowerCase())}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="smc-filters">
                <span className="text-xs font-semibold text-slate-500">FILTRAR POR</span>
                <Filter size={16} className="text-slate-400 cursor-pointer" />
              </div>
              <div className="smc-conversation-list">
                {conversations.map((conv) => (
                  <div 
                    key={conv.id} 
                    className={`smc-conversation-item ${selectedConversation === conv.id ? 'active' : ''}`}
                    onClick={() => setSelectedConversation(conv.id)}
                  >
                    <div className="smc-avatar">
                      <img src={conv.avatar} alt={conv.name} />
                      <div className="smc-platform-icon">
                        {conv.platform === 'whatsapp' && <MessageCircle size={12} className="text-green-500" />}
                        {conv.platform === 'instagram' && <Instagram size={12} className="text-pink-500" />}
                        {conv.platform === 'facebook' && <Facebook size={12} className="text-blue-600" />}
                      </div>
                    </div>
                    <div className="smc-conv-info">
                      <div className="smc-conv-header">
                        <span className="smc-conv-name">{conv.name}</span>
                        <span className="smc-conv-time">{conv.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="smc-conv-preview">{conv.lastMessage}</span>
                        {conv.unread > 0 && <span className="smc-badge">{conv.unread}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Chat Window */}
            <div className="smc-col-2">
              <div className="smc-chat-header">
                <div className="smc-chat-user">
                  <img src="https://i.pravatar.cc/150?u=1" alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">Ana Silva</h3>
                    <span className="text-xs text-green-500 font-medium">Online via WhatsApp</span>
                  </div>
                </div>
                <div className="flex gap-3 text-slate-400">
                  <Phone size={20} className="cursor-pointer hover:text-blue-500" />
                  <Video size={20} className="cursor-pointer hover:text-blue-500" />
                  <MoreVertical size={20} className="cursor-pointer hover:text-blue-500" />
                </div>
              </div>
              
              <div className="smc-chat-messages">
                <div className="text-center text-xs text-slate-400 my-2">Hoje</div>
                {messages.map((msg) => (
                  <div key={msg.id} className={`smc-message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                    <p>{msg.text}</p>
                    <span className="smc-msg-time">
                      {msg.time}
                      {msg.sender === 'me' && (
                        <span className="ml-1 inline-block">
                          {msg.status === 'read' ? <CheckCheck size={12} className="text-blue-500" /> : <Check size={12} />}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="smc-chat-input-area">
                <div className="flex gap-2 text-slate-400">
                  <Smile size={24} className="cursor-pointer hover:text-blue-500" />
                  <Paperclip size={24} className="cursor-pointer hover:text-blue-500" />
                </div>
                <div className="smc-input-wrapper">
                  <input type="text" placeholder="Digite sua mensagem..." />
                </div>
                <div className="flex gap-2 text-slate-400">
                  <Mic size={24} className="cursor-pointer hover:text-blue-500" />
                  <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Column 3: Contact Panel */}
            <div className="smc-col-3">
              <div className="smc-contact-card">
                <img src="https://i.pravatar.cc/150?u=1" alt="User" className="smc-contact-img" />
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Ana Silva</h2>
                <p className="text-sm text-slate-500">@ana.silva_mkt</p>
                <div className="flex gap-2 justify-center mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Cliente VIP</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Lead Quente</span>
                </div>
                <div className="smc-contact-actions">
                  <button className="px-3 py-1 border border-slate-300 rounded text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">Perfil</button>
                  <button className="px-3 py-1 border border-slate-300 rounded text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800">Criar Tarefa</button>
                </div>
              </div>

              <div className="smc-info-section">
                <h3>Informações de Contato</h3>
                <div className="smc-info-row">
                  <span className="smc-label">Telefone</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">+55 11 99999-9999</span>
                </div>
                <div className="smc-info-row">
                  <span className="smc-label">Email</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">ana@email.com</span>
                </div>
                <div className="smc-info-row">
                  <span className="smc-label">Origem</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Instagram Ads</span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>

              <div className="smc-info-section">
                <h3>Atividades Recentes</h3>
                <div className="flex gap-3 mb-4">
                  <div className="mt-1"><Clock size={16} className="text-slate-400" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Pedido #1234 criado</p>
                    <p className="text-xs text-slate-500">Hoje, 09:00</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1"><MessageCircle size={16} className="text-slate-400" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Iniciou conversa</p>
                    <p className="text-xs text-slate-500">Ontem, 14:30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Planner View */
          <div className="smc-planner-layout">
            <div className="smc-calendar-header">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Novembro 2025</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-slate-300 rounded text-sm font-medium hover:bg-slate-50">Hoje</button>
                <button className="smc-btn-primary text-sm">
                  <Plus size={16} /> Criar Post
                </button>
              </div>
            </div>
            <div className="smc-calendar-grid">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="text-center font-semibold text-slate-500 mb-2">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="smc-day-card">
                  <div className="smc-day-header">{i + 1}</div>
                  {i === 3 && (
                    <div className="smc-post-card">
                      <Instagram size={14} className="text-pink-500" />
                      <span>Promoção Black...</span>
                    </div>
                  )}
                  {i === 5 && (
                    <div className="smc-post-card">
                      <Facebook size={14} className="text-blue-600" />
                      <span>Lançamento...</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaChat;
