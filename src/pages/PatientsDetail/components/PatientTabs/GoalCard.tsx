import React from 'react';
import { Circle, CheckCircle2 } from 'lucide-react';

interface GoalCardProps {
    title: string;
    target: string;
    current: string;
    progress: number;
    completed: boolean;
}

const GoalCard: React.FC<GoalCardProps> = ({
    title,
    target,
    current,
    progress,
    completed
}) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Target: {target}</p>
                </div>
                {completed ? (
                    <CheckCircle2 className="text-green-500 dark:text-green-400" size={20} />
                ) : (
                    <Circle className="text-gray-300 dark:text-gray-600" size={20} />
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{current}</span>
                    <span className="text-gray-500 dark:text-gray-400">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${completed
                                ? 'bg-green-500 dark:bg-green-400'
                                : 'bg-blue-500 dark:bg-blue-400'
                            }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GoalCard;