import { Plus } from "lucide-react";

const AddPatientButton = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex justify-end mb-4">
    <button
      onClick={onAdd}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
    >
      <Plus size={20} />
      Add Patient
    </button>
  </div>
);

export default AddPatientButton;
