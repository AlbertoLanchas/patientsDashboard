import { X } from "lucide-react";
import { z } from "zod";

import CustomForm from "#components/CustomForm/CustomForm.tsx";
import { SubmitHandler } from "react-hook-form";
import { usePatientContext } from "../context/PatientContext";

const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(0, "Age must be at least 0").max(120, "Age must be less than 120"),
  primaryCondition: z.string().min(1, "Primary condition is required"),
});

type PatientFormData = z.infer<typeof patientSchema>;

type Field<T> = {
  name: keyof T;
  label: string;
  type: string;
};


interface PatientFormProps {
  onSubmit: SubmitHandler<PatientFormData>;
}

const PatientFormModal = ({ onSubmit }: PatientFormProps) => {
  const { showAddModal, setShowAddModal, editingPatient } = usePatientContext();

  if (!showAddModal) return null;

  const isEdit = Boolean(editingPatient)

  const onClose = () => {
    setShowAddModal(false)
  }

  const patientFields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "primaryCondition", label: "Primary Condition", type: "text" },
  ] satisfies Field<PatientFormData>[];

  const defaultPatient: PatientFormData = {
    name: "",
    age: 0,
    primaryCondition: "",
  };

  let editingPatientClean;

  if (editingPatient) {
    editingPatientClean = {
      name: editingPatient.name,
      age: editingPatient.age,
      primaryCondition: editingPatient.primaryCondition,
    };
  }

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

        <CustomForm<PatientFormData>
          schema={patientSchema}
          fields={patientFields}
          defaultValues={isEdit ? editingPatientClean : defaultPatient}
          onSubmit={onSubmit}
          onClose={onClose}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
};
export default PatientFormModal;
