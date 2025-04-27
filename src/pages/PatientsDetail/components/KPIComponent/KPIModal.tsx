import { X } from "lucide-react";
import { KPIModalType } from "../../interface/KPIModal";

interface KPIModalProps {
    selectedKPI: KPIModalType | null;
    showKPIModal: boolean;
    setShowKPIModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function KPIModal({ selectedKPI, showKPIModal, setShowKPIModal }: KPIModalProps) {
    if (!selectedKPI || !showKPIModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedKPI.title} Details</h2>
                    <button
                        onClick={() => setShowKPIModal(false)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4">
                    {selectedKPI.modalContent}
                </div>
            </div>
        </div>
    );
}
