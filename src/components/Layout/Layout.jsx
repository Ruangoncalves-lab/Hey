import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true); // Default open on desktop
            } else {
                setIsSidebarOpen(false); // Default closed on mobile
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="app-layout flex h-screen overflow-hidden bg-[#F5F7FA]">
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                isMobile={isMobile}
            />

            <div
                className="flex-1 flex flex-col h-full transition-all duration-300 ease-in-out"
                style={{
                    marginLeft: isMobile ? '0px' : (isSidebarOpen ? '300px' : '70px'),
                    width: isMobile ? '100%' : `calc(100% - ${isSidebarOpen ? '300px' : '70px'})`
                }}
            >
                <Header toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default Layout;
