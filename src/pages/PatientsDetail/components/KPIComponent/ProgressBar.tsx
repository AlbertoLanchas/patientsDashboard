import React from 'react';

interface ProgressBarProps {
    value: number;
    color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'bg-purple-500 dark:bg-purple-400' }) => (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
    </div>
);
