import { Loader2 } from "lucide-react";
import { useMemo } from "react";

import ConfirmationModal from "#components/ConfirmationModal.tsx";
import { Gender } from "#models/index.ts";
import {
  AddPatientButton,
  FilterPatient,
  PatientFormModal,
  PatientsContainer,
  PatientsTable
} from "../components";
import { usePatientContext } from "../context/PatientContext";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { usePatients } from "../hooks/usePatients";
import { usePatientsHandlers } from "../hooks/usePatientsHandlers";
import { usePatientsMutations } from "../hooks/usePatientsMutations";

export function PatientsPage() {

  const {
    setShowAddModal,
    editingPatient,
    setEditingPatient,
    showDeleteModal,
    setShowDeleteModal,
    patientToDelete,
    setPatientToDelete,
    optimisticPatientId,
    setOptimisticPatientId,
    searchName,
    conditionFilter,
    minAge,
    genderFilter,
  } = usePatientContext();

  const debouncedSearchName = useDebouncedValue(searchName, 500);
  const debouncedConditionFilter = useDebouncedValue(conditionFilter, 500);

  const filters = useMemo(() => ({
    name: debouncedSearchName,
    primaryCondition: debouncedConditionFilter,
    minAge,
    gender: genderFilter,
  }), [debouncedSearchName, debouncedConditionFilter, minAge, genderFilter]);

  const patientsQuery = usePatients(filters);

  const { addPatientMutation, editPatientMutation, deleteMutation } =
    usePatientsMutations(setOptimisticPatientId);

  const {
    handleOpenAddModal,
    handleEditPatient,
  } = usePatientsHandlers({
    setShowAddModal,
    setEditingPatient,
  });

  const confirmDelete = () => {
    if (!patientToDelete) return;
    deleteMutation.mutate(patientToDelete.id);
    setShowDeleteModal(false);
    setPatientToDelete(null);
  };

  if (patientsQuery.isLoading) {
    return (
      <PatientsContainer>
        <div className="flex items-center justify-center">
          <Loader2
            size={40}
            className="animate-spin text-blue-500 dark:text-blue-400"
          />
          <span className="ml-2 text-blue-500 dark:text-blue-400 font-medium">
            Loading patients...
          </span>
        </div>
      </PatientsContainer>
    );
  }

  if (patientsQuery.error) {
    return (
      <PatientsContainer>
        <div className="flex items-center justify-center">
          Error loading patients: {patientsQuery.error.message}
        </div>
      </PatientsContainer>
    );
  }

  const patients = patientsQuery.data ?? [];

  return (
    <PatientsContainer>
      <AddPatientButton onAdd={handleOpenAddModal} />
      <div className="bg-white rounded-lg p-4 mb-6">
        <FilterPatient />
        <PatientsTable
          patients={patients}
          onEdit={handleEditPatient}
          optimisticId={optimisticPatientId}
          onDelete={(patient) => {
            setPatientToDelete(patient);
            setShowDeleteModal(true);
          }}
        />
      </div>
      <PatientFormModal
        onSubmit={(data) => {
          if (editingPatient) {
            editPatientMutation.mutate({ ...editingPatient, ...data });
          } else {
            addPatientMutation.mutate({
              ...data,
              id: crypto.randomUUID(),
              gender: Gender.Unkwnon,
            });
          }

          setShowAddModal(false);
          setEditingPatient(null);
        }}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Patient"
        message={`Are you sure you want to delete ${patientToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
      />
    </PatientsContainer>
  );
}
