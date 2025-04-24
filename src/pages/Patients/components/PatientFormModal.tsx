import { X } from "lucide-react";
import { Patient } from "../../../interfaces";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface PatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  register: UseFormRegister<Patient>;
  errors: FieldErrors<Patient>;
  isEdit: boolean;
}

const PatientFormModal = ({
  isOpen,
  onClose,
  handleSubmit,
  register,
  errors,
  isEdit,
}: PatientFormProps) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEdit ? "Edit Patient" : "Add New Patient"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4"
        >
          < div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter full name"
                aria-label="Full Name"
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} {/* Error message */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Age
              </label>
              <input
                {...register("age", { required: true, valueAsNumber: true })}
                type="number"
                placeholder="Enter full name"
                aria-label="Age"
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>} {/* Error message */}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Primary Condition
              </label>
              <input
                {...register("primaryCondition", { required: true })}
                type="text"
                placeholder="Enter full name"
                aria-label="Primary Condition"
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-slate-700"
              />
              {errors.primaryCondition && (
                <p className="text-red-500 text-sm">{errors.primaryCondition.message}</p> // Error message
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
              {isEdit ? "Save Changes" : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PatientFormModal;
