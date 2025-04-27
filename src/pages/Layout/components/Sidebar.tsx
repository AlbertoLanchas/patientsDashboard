import React from 'react';
import { Link } from "@tanstack/react-router";

import {
    LayoutDashboard,
    Calendar,
    Users,
    Shield,
    MessageSquare,
} from 'lucide-react';

type NavItemProps = {
    to: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: number;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge }) => {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all duration-200"
            activeProps={{
                className: "bg-slate-700/50 text-white",
            }}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
            {badge && badge > 0 && (
                <span className="ml-auto flex items-center justify-center bg-red-500/90 text-white text-xs w-5 h-5 rounded-full">
                    {badge}
                </span>
            )}
        </Link>
    );
};

const Sidebar: React.FC = () => {

    return (
        <div className="layout-sidebar bg-slate-800 border-r border-slate-700">
            <div className="p-4 flex items-center gap-3 mb-6">
                <Shield className="text-primary-400" size={24} />
                <h1 className="text-xl font-semibold text-white">Health System</h1>
            </div>

            <div className="px-3 mb-6">
                <div className="text-xs text-slate-500 px-4 py-2 uppercase font-semibold tracking-wider">
                    Main Menu
                </div>
                <nav className="flex flex-col gap-1">
                    <NavItem to="/home" icon={<LayoutDashboard size={20} />} label="Overview" />
                    <NavItem to="/patients" icon={<Users size={20} />} label="Patients" />
                    <NavItem to="/schedule" icon={<Calendar size={20} />} label="Appointments" />
                    <NavItem to="/messages" icon={<MessageSquare size={20} />} label="Messages" />
                </nav>
            </div>

            <div className="mt-auto border-t border-slate-700 p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-300 font-medium">
                        DC
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Dr. Latief Chloe</p>
                        <p className="text-xs text-slate-400">Therapist</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;