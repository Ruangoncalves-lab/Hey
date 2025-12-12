import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [step, setStep] = useState('dots'); // 'dots' | 'logo' | 'finished'

    useEffect(() => {
        // Sequence timing
        const dotsTimer = setTimeout(() => {
            setStep('logo');
        }, 2500); // Dots animate for 2.5s

        const logoTimer = setTimeout(() => {
            onComplete();
        }, 4500); // Logo stays for 2s then finish

        return () => {
            clearTimeout(dotsTimer);
            clearTimeout(logoTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f8f9fd]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative flex items-center justify-center">
                <AnimatePresence mode='wait'>
                    {step === 'dots' && (
                        <motion.div
                            key="dots"
                            className="flex gap-3"
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-4 h-4 bg-emerald-500 rounded-full"
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.1 // Stagger effect
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}

                    {step === 'logo' && (
                        <motion.div
                            key="logo"
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className="flex flex-col items-center"
                        >
                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-2xl mb-4">
                                <span className="text-5xl font-bold tracking-tighter">TM</span>
                            </div>
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-emerald-900 font-bold text-xl tracking-widest uppercase"
                            >
                                TrafficMaster
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Preloader;
