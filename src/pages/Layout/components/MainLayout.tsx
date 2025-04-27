import React, { ReactNode } from 'react';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="layout-main flex-1 min-h-screen">
                <TopBar />
                <main className="p-5">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;