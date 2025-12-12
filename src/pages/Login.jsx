import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check, LayoutDashboard, BarChart2, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { supabase } from '../lib/supabase';

const Login = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Use Supabase Auth for login
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInError) {
                throw signInError;
            }

            if (data.user) {
                console.log('Login successful:', data.user.id);
                // Session is automatically managed by Supabase
                navigate('/');
            } else {
                throw new Error('Login falhou. Verifique suas credenciais.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
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

                    {/* Main Container - The "Purple" (Emerald) Card */}
                    <div className="w-full max-w-[1100px] min-h-[500px] lg:h-[600px] bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 rounded-[2rem] shadow-2xl overflow-hidden flex relative">

                        {/* Background Patterns */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px]" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-400/10 rounded-full blur-[120px]" />
                            {/* Grid/Tech Pattern Overlay */}
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                            />
                        </div>

                        {/* Left Side - Illustration & Branding */}
                        <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-8 z-10">
                            {/* Logo */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                                    <span className="text-lg font-bold">T</span>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">TrafficMaster</span>
                            </div>

                            {/* Central Illustration Area */}
                            <div className="relative w-full max-w-sm mx-auto h-64">
                                {/* Abstract Circle/Glow behind */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />

                                {/* Main Character/Element Placeholder - Using a stylized glass card stack to represent the "Dashboard" */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transform -rotate-6 z-10"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-emerald-900/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transform rotate-3 z-20 flex items-center justify-center">
                                    <LayoutDashboard size={32} className="text-white/50" />
                                </div>

                                {/* Floating Feature Cards */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0, y: 0 }}
                                    animate={{ x: 0, opacity: 1, y: [0, -8, 0] }}
                                    transition={{
                                        x: { duration: 0.8, delay: 0.2 },
                                        opacity: { duration: 0.8, delay: 0.2 },
                                        y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }
                                    }}
                                    className="absolute top-0 left-0 bg-white p-2.5 rounded-xl shadow-lg flex items-center gap-2.5 w-40 z-30"
                                >
                                    <div className="p-1.5 bg-purple-100 rounded-md text-purple-600">
                                        <LayoutDashboard size={16} />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-[10px]">Smart Platform</p>
                                        <p className="text-gray-500 text-[8px]">Automated Growth</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 20, opacity: 0, y: 0 }}
                                    animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
                                    transition={{
                                        x: { duration: 0.8, delay: 0.4 },
                                        opacity: { duration: 0.8, delay: 0.4 },
                                        y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.7 }
                                    }}
                                    className="absolute bottom-4 right-0 bg-white p-2.5 rounded-xl shadow-lg flex items-center gap-2.5 w-44 z-30"
                                >
                                    <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                                        <BarChart2 size={16} />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-[10px]">Real Time Data</p>
                                        <p className="text-gray-500 text-[8px]">Live Analytics</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: [20, 10, 20], opacity: 1 }}
                                    transition={{
                                        opacity: { duration: 0.8, delay: 0.6 },
                                        y: {
                                            opacity: { duration: 0.8 },
                                            repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.9
                                        }
                                    }}
                                    className="absolute top-12 right-[-20px] bg-white p-2 rounded-xl shadow-lg flex items-center gap-2 z-20"
                                >
                                    <div className="p-1 bg-orange-100 rounded-md text-orange-600">
                                        <Users size={12} />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-bold text-[10px]">Dedicated Team</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Bottom Text */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Gerencie sua logística</h2>
                                <p className="text-emerald-200/80 text-xs max-w-sm leading-relaxed">
                                    Acompanhe todas as suas operações, entregas e métricas em um único painel inteligente.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Floating Login Form */}
                        <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4 lg:p-8 z-10">
                            <div className="bg-white rounded-[1.5rem] p-6 shadow-2xl w-full max-w-[380px] relative overflow-hidden">
                                {/* Decorative top-right circle inside card */}
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-50 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <h1 className="text-xl font-bold text-gray-900 mb-1">Bem-vindo de volta!</h1>
                                    <p className="text-gray-400 text-[10px] mb-5">Por favor, insira seus dados para entrar.</p>

                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleLogin} className="flex flex-col gap-3">
                                        {/* Email */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-700 ml-1">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Digite seu email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-700 ml-1">Senha</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="**************"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-xs font-medium"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Terms */}
                                        <div className="flex items-center gap-2 my-0.5">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer h-3.5 w-3.5 cursor-pointer appearance-none rounded border-2 border-gray-200 transition-all checked:border-emerald-500 checked:bg-emerald-500" />
                                                <Check size={8} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" />
                                            </div>
                                            <span className="text-[9px] text-gray-500 font-medium">
                                                Ao entrar, você concorda com nossos <a href="#" className="text-emerald-600 hover:underline">Termos & Condições</a>
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 mt-1">
                                            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between px-4">
                                                <span className="text-xs">Entrar</span>
                                                <ArrowRight size={14} />
                                            </button>

                                            <Link to="/forgot-password" class="text-[10px] font-bold text-gray-500 hover:text-emerald-600 transition-colors whitespace-nowrap">
                                                Esqueceu a senha?
                                            </Link>
                                        </div>
                                    </form>

                                    <div className="mt-5 text-center border-t border-gray-50 pt-3">
                                        <p className="text-gray-400 text-[9px] font-medium">
                                            Não tem uma conta?{' '}
                                            <Link to="/register" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors underline decoration-2 underline-offset-2">
                                                Criar Conta
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

export default Login;
