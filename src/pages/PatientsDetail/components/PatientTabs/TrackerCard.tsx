import React from 'react';
import { Info } from 'lucide-react';

interface TrackerCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    source: string;
    sourceIcon: string;
    onClick: () => void;
    progress?: number;
}

const TrackerCard: React.FC<TrackerCardProps> = ({
    title,
    value,
    icon,
    source,
    sourceIcon,
    onClick,
    progress
}) => {
    return (
        <div
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                        {icon}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{title}</span>
                </div>
                <Info size={16} className="text-gray-400 dark:text-gray-500" />
            </div>

            <div className="mb-2">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</span>
            </div>

            {progress !== undefined && (
                <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div
                        className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            <div className="flex items-center gap-1">
                <img src={sourceIcon} alt={source} className="h-4" />
                <span className="text-xs text-gray-500 dark:text-gray-400">{source}</span>
            </div>
        </div>
    );
};

export default TrackerCard;