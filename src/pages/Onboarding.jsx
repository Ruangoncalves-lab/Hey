import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI/Basic';
import { useNavigate } from 'react-router-dom';
import { Rocket, Facebook, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <div className="onboarding-container">
            <Card className="ui-card onboarding-card">
                <div className="onboarding-content">
                    <div className="onboarding-header">
                        <div className="brand-wrapper">
                            <div className="logo-container">
                                <Rocket size={24} color="var(--accent-color)" />
                            </div>
                            <h2 className="brand-name">TrafficMaster AI</h2>
                        </div>
                        <span className="step-indicator">Passo {step} de 3</span>
                    </div>

                    {step === 1 && (
                        <div className="step-content">
                            <h3 className="step-title">Bem-vindo!</h3>
                            <p className="step-description">Vamos configurar sua conta para começar a otimizar seu tráfego.</p>
                            <div className="input-wrapper">
                                <Input label="Nome da Empresa" placeholder="Digite o nome da sua empresa" />
                            </div>
                            <div className="button-wrapper-right">
                                <Button onClick={nextStep} style={{ borderRadius: '0.75rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                                    Próximo <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </Button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="step-content">
                            <h3 className="step-title">Conectar Contas</h3>
                            <p className="step-description">Conecte suas contas de anúncios para importar dados.</p>
                            <div className="connect-buttons">
                                <Button variant="outline" className="connect-button">
                                    <Facebook size={20} style={{ marginRight: '0.75rem', color: '#1877F2' }} /> Conectar Facebook Ads
                                </Button>
                                <Button variant="outline" className="connect-button">
                                    <ShoppingBag size={20} style={{ marginRight: '0.75rem', color: '#DB4437' }} /> Conectar Google Ads
                                </Button>
                            </div>
                            <div className="button-wrapper-between">
                                <Button variant="ghost" onClick={prevStep} style={{ color: 'var(--text-secondary)' }}>
                                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Voltar
                                </Button>
                                <Button onClick={nextStep} style={{ borderRadius: '0.75rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                                    Próximo <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </Button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="step-content">
                            <h3 className="step-title">Tudo Pronto!</h3>
                            <p className="step-description">Sua conta foi configurada com sucesso. Você já pode acessar seu dashboard.</p>
                            <div className="button-wrapper-between">
                                <Button variant="ghost" onClick={prevStep} style={{ color: 'var(--text-secondary)' }}>
                                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Voltar
                                </Button>
                                <Button onClick={() => navigate('/')} style={{ borderRadius: '0.75rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                                    Ir para Dashboard <Rocket size={18} style={{ marginLeft: '0.5rem' }} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
            </Card>
        </div>
    );
};

export default Onboarding;
