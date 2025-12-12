import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/tailwind.css'; // Keeping this if it has other necessary styles, otherwise might be redundant if index.css covers it

const AppLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed/hidden for top nav layout

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--color-bg-main)]">
            {/* Sidebar (Mobile Drawer) */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content Area */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out w-full">
                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main Content */}
                <main>
                    <div className="mx-auto max-w-7xl p-4 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
