import { Patient } from "../../../interfaces";
import { v4 as uuid } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";

interface UsePatientsHandlersProps {
  setShowAddModal: (open: boolean) => void;
  setEditingPatient: (patient: Patient | null) => void;
  editingPatient: Patient | null;
  addPatient: (patient: Patient) => void;
  editPatient: (patient: Patient) => void;
}

export function usePatientsHandlers({
  setShowAddModal,
  setEditingPatient,
  editingPatient,
  addPatient,
  editPatient,
}: UsePatientsHandlersProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Patient>({
    defaultValues: {
      name: "",
      age: 0,
      primaryCondition: "",
    },
  });

  const onSubmit: SubmitHandler<Patient> = (data) => {
    const { name, age, primaryCondition } = data;

    if (!name || !age || !primaryCondition) return;

    if (editingPatient) {
      editPatient({
        ...editingPatient,
        name,
        age,
        primaryCondition,
      });
    } else {
      addPatient({
        ...data,
        id: uuid(),
      });
    }
    setShowAddModal(false);
    reset();
  };

  const handleOpenAddModal = () => {
    reset();
    setEditingPatient(null);
    setShowAddModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setValue("name", patient.name);
    setValue("age", patient.age);
    setValue("primaryCondition", patient.primaryCondition);
    setShowAddModal(true);
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    handleOpenAddModal,
    handleEditPatient,
    errors,
    register,
  };
}
