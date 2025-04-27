
interface KPICardProps {
    label: string;
    value: string;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value }) => (
    <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</h4>
        <p className="text-lg font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
);
