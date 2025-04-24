import { X } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Note } from "../../../interfaces";

interface NoteFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: () => void;
    register: UseFormRegister<Note>;
    errors: FieldErrors<Note>;
    isEdit: boolean;
}

const NoteFormModal = ({
    isOpen,
    onClose,
    handleSubmit,
    register,
    errors,
    isEdit,
}: NoteFormModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isEdit ? "Edit Note" : "Add New Note"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>

                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Note Title
                            </label>
                            <input
                                {...register("title", { required: true })}
                                type="text"
                                placeholder="Enter full name"
                                aria-label="Full Name"
                                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
                            />
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Note Content
                            </label>
                            <textarea
                                {...register("content", { required: "Note content is required" })}
                                placeholder="Enter note content"
                                aria-label="Note Content"
                                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
                                rows={4}
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm">{errors.content.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            {isEdit ? "Save Changes" : "Add Note"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteFormModal;
