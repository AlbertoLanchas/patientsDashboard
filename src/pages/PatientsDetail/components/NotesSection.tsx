import { ReactNode } from "react";

interface NotesSectionProps {
  children: ReactNode
  onAdd: () => void
}

const NotesSection = ({ children, onAdd }: NotesSectionProps) => {
  return (
    <div >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Notes
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:hover:text-blue-400" onClick={onAdd}>
          + Add Note
        </button>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default NotesSection;
