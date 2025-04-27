import React, { useState } from 'react';
import { Bell, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const TopBar: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <div className="layout-topbar flex items-center justify-between dark:bg-slate-800 dark:text-white">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-slate-700"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <Sun className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                    ) : (
                        <Moon className="w-5 h-5 text-gray-500" />
                    )}
                </button>

                <div className="relative">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-slate-700 relative"
                        onClick={() => setShowNotifications(!showNotifications)}
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5 text-gray-500 dark:text-gray-300" />

                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                </h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                            </div>
                        </div>
                    )}
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-slate-700" aria-label="Messages">
                    <Mail className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                </button>
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-medium ml-2">
                    DC
                </div>
            </div>
        </div>
    );
};

export default TopBar;