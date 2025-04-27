import { Plus, X } from "lucide-react";
import { useState } from "react";
import GoalCard from "./GoalCard";

interface Goal {
    id: string;
    title: string;
    target: string;
    current: string;
    progress: number;
    completed: boolean;
    period: GoalPeriod;
}

type GoalPeriod = 'daily' | 'weekly' | 'monthly';

const GoalTab = () => {
    const [activePeriod, setActivePeriod] = useState<GoalPeriod>('daily');
    const [showNewGoalModal, setShowNewGoalModal] = useState(false);
    const [newGoal, setNewGoal] = useState<{
        title: string;
        target: string;
        period: GoalPeriod;
    }>({
        title: '',
        target: '',
        period: 'daily'
    });

    const [goals, setGoals] = useState<Goal[]>([
        {
            id: '1',
            title: 'Daily Steps',
            target: '8,000 steps',
            current: '6,000 steps',
            progress: 75,
            completed: false,
            period: 'daily'
        },
        {
            id: '2',
            title: 'Sleep Duration',
            target: '8 hours',
            current: '7h 15m',
            progress: 90,
            completed: false,
            period: 'daily'
        },
        {
            id: '3',
            title: 'Water Intake',
            target: '2L',
            current: '2L',
            progress: 100,
            completed: true,
            period: 'daily'
        },
        {
            id: '4',
            title: 'Exercise Sessions',
            target: '5 sessions',
            current: '3 sessions',
            progress: 60,
            completed: false,
            period: 'weekly'
        },
        {
            id: '5',
            title: 'Weight Goal',
            target: 'Lose 0.5 kg',
            current: '-0.3 kg',
            progress: 60,
            completed: false,
            period: 'weekly'
        },
        {
            id: '6',
            title: 'BMI Goal',
            target: '24.0',
            current: '24.5',
            progress: 80,
            completed: false,
            period: 'monthly'
        }
    ]);

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();

        const goal: Goal = {
            id: `g${Date.now()}`,
            title: newGoal.title,
            target: newGoal.target,
            current: '0',
            progress: 0,
            completed: false,
            period: newGoal.period
        };

        setGoals(prev => [...prev, goal]);
        setNewGoal({ title: '', target: '', period: 'daily' });
        setShowNewGoalModal(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                    {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                        <button
                            key={period}
                            onClick={() => setActivePeriod(period)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activePeriod === period
                                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                                }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setShowNewGoalModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add Goal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals
                    .filter(goal => goal.period === activePeriod)
                    .map((goal) => (
                        <GoalCard
                            key={goal.id}
                            title={goal.title}
                            target={goal.target}
                            current={goal.current}
                            progress={goal.progress}
                            completed={goal.completed}
                        />
                    ))}
                {/* New Goal Modal */}
                {showNewGoalModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Goal</h2>
                                <button
                                    onClick={() => setShowNewGoalModal(false)}
                                    className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddGoal} className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Goal Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newGoal.title}
                                            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                                            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
                                            placeholder="e.g., Daily Steps"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Target <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newGoal.target}
                                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                                            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
                                            placeholder="e.g., 10,000 steps"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Period <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            required
                                            value={newGoal.period}
                                            onChange={(e) => setNewGoal({ ...newGoal, period: e.target.value as GoalPeriod })}
                                            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewGoalModal(false)}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Add Goal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GoalTab