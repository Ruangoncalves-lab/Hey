import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AdminPanel from '../components/AdminPanel';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[#F2F3F5]">
            {/* Sidebar (Mobile Drawer) */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content Wrapper */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:pl-20 2xl:pl-24 py-6 flex-1">
                    <Outlet />
                </main>
            </div>

            {/* Visual Admin Panel */}
            <AdminPanel />
        </div>
    );
};

export default MainLayout;
