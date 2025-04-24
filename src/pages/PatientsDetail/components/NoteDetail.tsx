import { Pencil, Trash2 } from "lucide-react";
import { Note } from "../../../interfaces";

interface Props {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (note: Note) => void;
    optimisticId?: string | null;
}

const NoteDetail = ({ note, onEdit, onDelete, optimisticId }: Props) => {

    const isOptimistic = note.id === optimisticId;

    return (
        <div
            className={`bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 border transition-all duration-300 ${isOptimistic
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <h3
                    className={`text-lg font-semibold ${isOptimistic ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-100'
                        }`}
                >
                    {note.title}
                </h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit?.(note)}
                        className={`hover:text-blue-600 transition-colors ${isOptimistic ? 'text-blue-700' : 'text-blue-500'
                            }`}
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => onDelete?.(note)}
                        className={`hover:text-red-600 transition-colors ${isOptimistic ? 'text-red-700' : 'text-red-500'
                            }`}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <p
                className={`text-gray-700 dark:text-gray-300 whitespace-pre-line text-base leading-relaxed ${isOptimistic ? 'text-blue-600' : ''
                    }`}
            >
                {note.content}
            </p>
        </div>
    );
};

export default NoteDetail;
