import { AlertCircle, FileText, HeartPulse, Pill } from "lucide-react";
import { NoteType } from "../interface/KPIModal";

export const getNoteTypeIcon = (type: NoteType) => {
    switch (type) {
        case 'health':
            return <HeartPulse size={16} />;
        case 'medication':
            return <Pill size={16} />;
        case 'alert':
            return <AlertCircle size={16} />;
        default:
            return <FileText size={16} />;
    }
};

export const getNoteTypeColor = (type: NoteType) => {
    switch (type) {
        case 'health':
            return 'text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
        case 'medication':
            return 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30';
        case 'alert':
            return 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
        default:
            return 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30';
    }
};