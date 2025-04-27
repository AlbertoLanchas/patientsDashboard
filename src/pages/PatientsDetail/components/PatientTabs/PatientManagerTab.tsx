import React, { useState } from 'react'
import { PatientTab } from '../../interface/KPIModal';
import { FileText, Activity, Target, Heart } from 'lucide-react';

import TrackerTab from "./TrackerTab"
import { NotesTab } from './NotesTab';
import GoalTab from './GoalTab';

const PatientManagerTab = () => {

    const tabs: { id: PatientTab; label: string; icon: React.ReactNode }[] = [
        { id: 'summary', label: 'Summary', icon: <FileText size={20} /> },
        { id: 'trackers', label: 'Trackers', icon: <Activity size={20} /> },
        { id: 'goals', label: 'Goals', icon: <Target size={20} /> },
        { id: 'health', label: 'Health', icon: <Heart size={20} /> },
    ];

    const [activeTab, setActiveTab] = useState<PatientTab>('summary');
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex gap-2 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
      ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-6">
                {activeTab === 'summary' && (
                    <NotesTab />
                )}

                {activeTab === 'trackers' && (
                    <TrackerTab />
                )}

                {activeTab === 'goals' && (
                    <GoalTab />
                )}

            </div>
        </div>

    )
}

export default PatientManagerTab