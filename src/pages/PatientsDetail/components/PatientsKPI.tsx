import { useState } from 'react'

import { Maximize2 } from 'lucide-react'


import { patientKPIsData } from './KPIComponent';
import { KPIModalType } from '../interface/KPIModal';
import { KPIModal } from './KPIComponent/KPIModal';

const PatientsKPI = () => {

    const [selectedKPI, setSelectedKPI] = useState<KPIModalType | null>(null); // Usamos el tipo KPI
    const [showKPIModal, setShowKPIModal] = useState(false);

    const handleKPIClick = (kpi: KPIModalType) => {
        setSelectedKPI(kpi);
        setShowKPIModal(true);
    };
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {patientKPIsData.map((kpi, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-slate-800 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
                        onClick={() => handleKPIClick(kpi)}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center ${kpi.color}`}>
                                    {kpi.icon}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                                <Maximize2 size={16} />
                            </button>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-semibold text-gray-900 dark:text-white">{kpi.value}</span>
                            {kpi.change && (
                                <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {kpi.change}
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {selectedKPI && (
                    <KPIModal selectedKPI={selectedKPI} showKPIModal={showKPIModal} setShowKPIModal={setShowKPIModal} />
                )}
            </div>
        </div>

    )
}

export default PatientsKPI