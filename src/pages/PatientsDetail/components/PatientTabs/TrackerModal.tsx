import React from 'react';
import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { useTheme } from '../../../../contexts/ThemeContext';

interface TrackerModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: {
        labels: string[];
        values: number[];
    };
    unit: string;
}

const TrackerModal: React.FC<TrackerModalProps> = ({
    isOpen,
    onClose,
    title,
    data,
    unit
}) => {
    const { isDarkMode } = useTheme();

    if (!isOpen) return null;

    const chartData = data.labels.map((label, index) => ({
        label,
        value: data.values[index],
    }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-3xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title} History</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => `${value} ${unit}`} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={isDarkMode ? '#60A5FA' : '#3B82F6'}
                                    fill={isDarkMode ? '#60A5FA20' : '#3B82F610'}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackerModal;
