import { Calendar, Clock, HeartPulse, Pill, AlertCircle } from 'lucide-react';

import { KPISection, KPICard, ProgressBar } from '.';
import { KPIModalType } from '../../interface/KPIModal';

export const patientKPIsData: KPIModalType[] = [
    {
        title: "Last Visit",
        value: '2024-02-15',
        icon: <Calendar size={20} />,
        color: "text-blue-500 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/30",
        modalContent: (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <KPICard label="Previous Visit" value="Feb 15, 2024" />
                    <KPICard label="Next Visit" value="Apr 15, 2024" />
                </div>
                <KPISection
                    title="Visit History"
                    items={[
                        { label: 'Mar 15, 2024', value: 'Dr. Sarah Wilson' },
                        { label: 'Feb 15, 2024', value: 'Dr. James Chen' },
                        { label: 'Jan 15, 2024', value: 'Dr. Sarah Wilson' },
                    ]}
                />
            </div>
        ),
    },
    {
        title: "Appointments",
        value: "3",
        change: "Next: Tomorrow",
        icon: <Clock size={20} />,
        color: "text-green-500 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/30",
        modalContent: (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <KPICard label="Upcoming" value="2" />
                    <KPICard label="Past (30 days)" value="3" />
                </div>
                <KPISection
                    title="Upcoming Appointments"
                    items={[
                        { label: 'Mar 29, 2024', value: '10:00 AM' },
                        { label: 'Apr 15, 2024', value: '2:30 PM' },
                    ]}
                />
            </div>
        ),
    },
    {
        title: "Health Score",
        value: "85%",
        change: "+5%",
        trend: "up",
        icon: <HeartPulse size={20} />,
        color: "text-purple-500 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-900/30",
        modalContent: (
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <KPICard label="Current" value="85%" />
                    <KPICard label="Previous" value="80%" />
                    <KPICard label="Target" value="90%" />
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Components</h4>
                    {[
                        { name: 'Physical Activity', score: 90, change: '+5' },
                        { name: 'Diet & Nutrition', score: 85, change: '+3' },
                        { name: 'Sleep Quality', score: 80, change: '+2' },
                        { name: 'Stress Level', score: 75, change: '+4' },
                    ].map((c, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 dark:text-green-400">{c.change}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{c.score}%</span>
                                </div>
                            </div>
                            <ProgressBar value={c.score} />
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: "Medications",
        value: "3",
        icon: <Pill size={20} />,
        color: "text-red-500 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/30",
        modalContent: (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <KPICard label="Active" value="3" />
                    <KPICard label="Past" value="2" />
                </div>
                <KPISection
                    title="Current Medications"
                    items={[
                        { label: 'Lisinopril', value: '20mg Once daily' },
                        { label: 'Metformin', value: '500mg Twice daily' },
                        { label: 'Aspirin', value: '81mg Once daily' },
                    ]}
                />
            </div>
        ),
    },
    {
        title: "Allergies",
        value: "2",
        icon: <AlertCircle size={20} />,
        color: "text-orange-500 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-900/30",
        modalContent: (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <KPICard label="Drug Allergies" value="1" />
                    <KPICard label="Food Allergies" value="1" />
                </div>
                <KPISection
                    title="Known Allergies"
                    items={[
                        { label: 'Penicillin', value: 'Anaphylaxis' },
                        { label: 'Peanuts', value: 'Hives, Swelling' },
                    ]}
                />
            </div>
        ),
    },
];

