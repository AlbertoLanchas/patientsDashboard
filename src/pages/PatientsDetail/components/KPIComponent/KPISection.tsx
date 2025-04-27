
interface KPISectionProps {
    title: string;
    items: { label: string; value: React.ReactNode }[];
}

export const KPISection: React.FC<KPISectionProps> = ({ title, items }) => (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h4>
        <div className="space-y-2">
            {items.map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.value}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
