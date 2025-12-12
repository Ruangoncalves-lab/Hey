import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export const useStore = create(
    persist(
        (set, get) => ({
            // --- CRM Slice ---
            leads: [
                { id: '1', name: 'Alice Johnson', status: 'Novo', value: '$500', email: 'alice@example.com', phone: '+1234567890' },
                { id: '2', name: 'Bob Smith', status: 'Contatado', value: '$1,200', email: 'bob@example.com', phone: '+1987654321' },
                { id: '3', name: 'Charlie Brown', status: 'Qualificado', value: '$3,000', email: 'charlie@example.com', phone: '+1122334455' },
                { id: '4', name: 'Diana Prince', status: 'Fechado', value: '$5,000', email: 'diana@example.com', phone: '+1555666777' },
            ],
            addLead: (lead) => set((state) => ({ leads: [...state.leads, { id: uuidv4(), status: 'Novo', ...lead }] })),
            updateLeadStatus: (id, status) => set((state) => ({
                leads: state.leads.map((l) => (l.id === id ? { ...l, status } : l)),
            })),
            updateLead: (id, updates) => set((state) => ({
                leads: state.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
            })),
            deleteLead: (id) => set((state) => ({ leads: state.leads.filter((l) => l.id !== id) })),

            // --- Campaigns Slice ---
            campaigns: [
                { id: '1', name: 'Promoção de Verão 2024', status: 'Ativo', budget: '$1,000', spent: '$450', roi: '+210%' },
                { id: '2', name: 'Coleção de Inverno', status: 'Pausado', budget: '$2,000', spent: '$1,200', roi: '+150%' },
            ],
            addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, { id: uuidv4(), status: 'Ativo', spent: '$0', roi: '0%', ...campaign }] })),
            updateCampaign: (id, updates) => set((state) => ({
                campaigns: state.campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
            })),
            deleteCampaign: (id) => set((state) => ({ campaigns: state.campaigns.filter((c) => c.id !== id) })),

            // --- Products Slice ---
            products: [
                { id: '1', name: 'Plano Premium', price: '$99.00', stock: 'Ilimitado', status: 'Ativo' },
                { id: '2', name: 'Plano Básico', price: '$49.00', stock: 'Ilimitado', status: 'Ativo' },
            ],
            addProduct: (product) => set((state) => ({ products: [...state.products, { id: uuidv4(), status: 'Ativo', ...product }] })),
            updateProduct: (id, updates) => set((state) => ({
                products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
            })),
            deleteProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

            // --- Orders Slice ---
            orders: [
                { id: '1001', customer: 'John Doe', date: '2023-10-25', total: '$120.00', status: 'Concluído' },
                { id: '1002', customer: 'Jane Smith', date: '2023-10-26', total: '$85.50', status: 'Processando' },
            ],
            updateOrderStatus: (id, status) => set((state) => ({
                orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
            })),

            // --- Finance Slice ---
            transactions: [
                { id: '1', description: 'Pagamento Stripe', amount: 1200, type: 'income', date: '2023-10-25', status: 'Concluído' },
                { id: '2', description: 'Custos de Servidor', amount: -50, type: 'expense', date: '2023-10-26', status: 'Pendente' },
            ],
            addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),

            // --- Chat Slice (WhatsApp) ---
            chats: [
                { id: 1, name: 'Alice Johnson', lastMessage: 'Obrigado pela informação!', time: '10:30 AM', unread: 2, messages: [] },
                { id: 2, name: 'Bob Smith', lastMessage: 'Quando podemos agendar uma ligação?', time: 'Ontem', unread: 0, messages: [] },
            ],
            messages: {
                1: [
                    { id: 1, role: 'user', content: 'Olá! Estou interessado em seus serviços.', time: '10:00 AM' },
                    { id: 2, role: 'ai', content: 'Olá Alice! Obrigado pelo contato. Como posso ajudar hoje?', time: '10:05 AM' },
                ]
            },
            sendMessage: (chatId, content) => {
                const newMessage = { id: uuidv4(), role: 'ai', content, time: format(new Date(), 'hh:mm a') };
                set((state) => ({
                    messages: {
                        ...state.messages,
                        [chatId]: [...(state.messages[chatId] || []), newMessage]
                    },
                    chats: state.chats.map(c => c.id === chatId ? { ...c, lastMessage: content, time: 'Agora' } : c)
                }));
            },
            receiveMessage: (chatId, content) => {
                const newMessage = { id: uuidv4(), role: 'user', content, time: format(new Date(), 'hh:mm a') };
                set((state) => ({
                    messages: {
                        ...state.messages,
                        [chatId]: [...(state.messages[chatId] || []), newMessage]
                    },
                    chats: state.chats.map(c => c.id === chatId ? { ...c, lastMessage: content, time: 'Agora', unread: c.unread + 1 } : c)
                }));
            },

            // --- Social Media Slice ---
            posts: [
                { id: '1', content: 'Dia de Lançamento do Produto!', date: '2023-11-15', platform: 'Instagram', status: 'Agendado' }
            ],
            addPost: (post) => set((state) => ({ posts: [...state.posts, { id: uuidv4(), status: 'Agendado', ...post }] })),

            // --- Integrations Slice ---
            integrations: [
                { id: 1, name: 'Facebook Ads', status: 'Conectado' },
                { id: 2, name: 'Google Ads', status: 'Desconectado' },
                { id: 3, name: 'Instagram', status: 'Conectado' },
                { id: 4, name: 'Twitter', status: 'Desconectado' },
                { id: 5, name: 'Mailchimp', status: 'Conectado' },
                { id: 6, name: 'WhatsApp', status: 'Conectado' },
            ],
            toggleIntegration: (id) => set((state) => ({
                integrations: state.integrations.map(i => i.id === id ? { ...i, status: i.status === 'Conectado' ? 'Desconectado' : 'Conectado' } : i)
            })),
        }),
        {
            name: 'traffic-master-storage',
        }
    )
);
