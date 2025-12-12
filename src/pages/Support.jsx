import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI/Basic';
import { ChevronDown, ChevronUp, MessageCircle, HelpCircle, Mail } from 'lucide-react';

const Support = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        { id: 1, question: 'Como conecto minha conta do Facebook Ads?', answer: 'Vá para a página Integrações, clique em "Conectar" no cartão do Facebook Ads e siga as instruções de login.' },
        { id: 2, question: 'Posso alterar meu plano de assinatura?', answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento em Configurações > Faturamento.' },
        { id: 3, question: 'Como funciona o recurso de IA?', answer: 'Nossa IA analisa seus dados para fornecer insights acionáveis e gerar conteúdo. Você pode interagir com ela através da página Recursos de IA.' },
    ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Ajuda e Suporte</h1>
                <p className="text-gray-500">Encontre respostas ou entre em contato com nossa equipe</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FAQ Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <HelpCircle size={20} className="text-emerald-600" />
                        <h3 className="text-xl font-bold text-gray-900">Perguntas Frequentes</h3>
                    </div>
                    <div className="space-y-4">
                        {faqs.map(faq => (
                            <div key={faq.id} className="card-premium p-0 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                    className={`w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors ${openFaq === faq.id ? 'bg-gray-50' : ''}`}
                                >
                                    {faq.question}
                                    {openFaq === faq.id ? <ChevronUp size={18} className="text-emerald-600" /> : <ChevronDown size={18} className="text-gray-400" />}
                                </button>
                                {openFaq === faq.id && (
                                    <div className="p-6 pt-0 bg-gray-50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Mail size={20} className="text-emerald-600" />
                        <h3 className="text-xl font-bold text-gray-900">Contatar Suporte</h3>
                    </div>
                    <Card className="sticky top-6">
                        <div className="space-y-4">
                            <Input label="Assunto" placeholder="Como podemos ajudar?" />
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Mensagem</label>
                                <textarea
                                    placeholder="Descreva seu problema..."
                                    className="input-premium min-h-[150px] resize-none"
                                />
                            </div>
                            <Button className="w-full justify-center"><MessageCircle size={18} /> Enviar Ticket</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Support;
