import { Patient } from "../../../models";

interface UsePatientsHandlersProps {
  setShowAddModal: (open: boolean) => void;
  setEditingPatient: (patient: Patient | null) => void;
}

export function usePatientsHandlers({
  setShowAddModal,
  setEditingPatient,

}: UsePatientsHandlersProps) {


  const handleOpenAddModal = () => {
    setEditingPatient(null);
    setShowAddModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setShowAddModal(true);
  };

  return {
    handleOpenAddModal,
    handleEditPatient,
  };
}
