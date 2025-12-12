import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check, LayoutDashboard, BarChart2, Users, User, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { supabase } from '../lib/supabase';

const Register = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        tenantName: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setSubmitting(true);
        try {
            // 1. Create user in Supabase Auth
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                        tenantName: formData.tenantName
                    }
                }
            });

            if (signUpError) throw signUpError;

            if (data.user) {
                // 2. Call RPC to create profile and tenant
                // We need to wait a bit for the session to be established if auto-confirm is on
                // Or if email confirmation is required, this part won't run until login.

                // If session exists immediately (Auto Confirm enabled)
                if (data.session) {
                    const { error: rpcError } = await supabase.rpc('create_initial_profile', {
                        user_name: formData.name,
                        tenant_name: formData.tenantName
                    });

                    if (rpcError) {
                        console.error('RPC Error:', rpcError);
                        // If RPC fails but Auth succeeded, we might want to retry or show a specific error
                        // But usually it means the user is created.
                        // Let's try to fetch the profile to be sure.
                    }

                    // Get the profile to confirm tenant_id
                    const { data: profile } = await supabase
                        .from('users')
                        .select('tenant_id')
                        .eq('_id', data.user.id)
                        .single();

                    if (profile) {
                        localStorage.setItem('token', data.session.access_token);
                        localStorage.setItem('tenantId', profile.tenant_id);
                        navigate('/');
                        return;
                    }
                }

                // If no session (Email confirmation required)
                setError('Cadastro realizado! Verifique seu email para confirmar.');
            }

        } catch (err) {
            console.error(err);
            setError(err.message || 'Falha no cadastro. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="min-h-screen w-full bg-[#f8f9fd] flex items-center justify-center p-4 font-sans relative"
                >
                    {/* Main Container */}
                    <div className="w-full max-w-[1100px] min-h-[600px] lg:h-[700px] bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 rounded-[2rem] shadow-2xl overflow-hidden flex relative">

                        {/* Background Patterns */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px]" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-400/10 rounded-full blur-[120px]" />
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                            />
                        </div>

                        {/* Left Side - Illustration & Branding */}
                        <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-8 z-10">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                                    <span className="text-lg font-bold">T</span>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">TrafficMaster</span>
                            </div>

                            <div className="relative w-full max-w-sm mx-auto h-64">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transform -rotate-6 z-10"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-emerald-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transform rotate-3 z-20 flex items-center justify-center">
                                    <LayoutDashboard size={32} className="text-white/50" />
                                </div>

                                {/* Floating Cards */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute top-0 left-0 bg-white p-2.5 rounded-xl shadow-lg flex items-center gap-2.5 w-40 z-30"
                                >
                                    <div className="p-1.5 bg-purple-100 rounded-md text-purple-600">
                                        <LayoutDashboard size={16} />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-[10px]">Plataforma Completa</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute bottom-4 right-0 bg-white p-2.5 rounded-xl shadow-lg flex items-center gap-2.5 w-44 z-30"
                                >
                                    <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                                        <BarChart2 size={16} />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-[10px]">Crescimento Real</p>
                                    </div>
                                </motion.div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Comece sua jornada</h2>
                                <p className="text-emerald-200/80 text-xs max-w-sm leading-relaxed">
                                    Junte-se a milhares de gestores que escalam seus negócios com inteligência artificial.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Register Form */}
                        <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4 lg:p-8 z-10">
                            <div className="bg-white rounded-[1.5rem] p-6 shadow-2xl w-full max-w-[420px] relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-50 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <h1 className="text-xl font-bold text-gray-900 mb-1">Crie sua conta</h1>
                                    <p className="text-gray-400 text-[10px] mb-5">Preencha os dados abaixo para começar.</p>

                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleRegister} className="flex flex-col gap-3">
                                        {/* Name */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-700 ml-1">Nome Completo</label>
                                            <div className="relative">
                                                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Seu nome"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-700 ml-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="seu@email.com"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
                                            />
                                        </div>

                                        {/* Tenant/Company Name */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-700 ml-1">Nome da Empresa/Organização</label>
                                            <div className="relative">
                                                <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="tenantName"
                                                    placeholder="Ex: Minha Agência"
                                                    required
                                                    value={formData.tenantName}
                                                    onChange={handleChange}
                                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-700 ml-1">Senha</label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        placeholder="******"
                                                        required
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-700 ml-1">Confirmar</label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        placeholder="******"
                                                        required
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-[10px] text-gray-500 hover:text-gray-700 text-right w-full"
                                        >
                                            {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                                        </button>

                                        {/* Actions */}
                                        <div className="mt-2">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between px-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                <span className="text-xs">{submitting ? 'Criando conta...' : 'Criar Conta'}</span>
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-5 text-center border-t border-gray-50 pt-3">
                                        <p className="text-gray-400 text-[9px] font-medium">
                                            Já tem uma conta?{' '}
                                            <Link to="/login" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors underline decoration-2 underline-offset-2">
                                                Fazer Login
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default Register;
