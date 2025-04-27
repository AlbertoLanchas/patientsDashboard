import { useState } from "react";
import { Filter, Loader2 } from "lucide-react";

import { AddPatientButton, PatientFormModal, PatientsContainer, PatientsTable, SearchBar, FilterPatients } from "../components";

import ConfirmationModal from "../../../components/ConfirmationModal";
import { Gender, Patient } from "../../../interfaces";
import { usePatientsMutations } from "../hooks/usePatientsMutations";
import { usePatientsHandlers } from "../hooks/usePatientsHandlers";
import { searchPatients } from "../utils/searchPatients";
import { usePatients } from "../hooks/usePatients";

export function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [optimisticPatientId, setOptimisticPatientId] = useState<string | null>(null);

  const [gender, setGender] = useState<Gender>(Gender.All);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);

  const { patientsQuery, page, nextPage, prevPage } = usePatients({
    gender,
    selectedConditions,
    minAge,
    maxAge,
  });

  const { addPatientMutation, editPatientMutation, deleteMutation } = usePatientsMutations(setOptimisticPatientId);

  const { handleSubmit, handleOpenAddModal, handleEditPatient, errors, register } = usePatientsHandlers({
    setShowAddModal,
    setEditingPatient,
    editingPatient,
    addPatient: addPatientMutation.mutate,
    editPatient: editPatientMutation.mutate,
  });

  const confirmDelete = () => {
    if (!patientToDelete) return;
    deleteMutation.mutate(patientToDelete.id);
    setShowDeleteModal(false);
    setPatientToDelete(null);
  };

  const patients = patientsQuery?.data?.data || []
  const filteredPatients = searchPatients(patients, searchTerm);
  const primaryConditions = [...new Set(patients.map(patient => patient.primaryCondition).flat())];

  if (patientsQuery.isLoading) {
    return (
      <PatientsContainer>
        <div className="flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-blue-500 dark:text-blue-400" />
          <span className="ml-2 text-blue-500 dark:text-blue-400 font-medium">Loading patients...</span>
        </div>
      </PatientsContainer>
    );
  }

  if (patientsQuery.error) {
    return (
      <PatientsContainer>
        <div className="flex items-center justify-center">Error loading patients: {patientsQuery.error.message}</div>
      </PatientsContainer>
    );
  }

  return (
    <PatientsContainer>
      <AddPatientButton onAdd={handleOpenAddModal} />
      <div className="bg-white rounded-lg p-4 mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterPatients
          gender={gender}
          setGender={setGender}
          primaryConditions={primaryConditions}
          selectedConditions={selectedConditions}
          setSelectedConditions={setSelectedConditions}
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
        />

        <PatientsTable
          patients={filteredPatients}
          onEdit={handleEditPatient}
          optimisticId={optimisticPatientId}
          onDelete={(patient) => {
            setPatientToDelete(patient);
            setShowDeleteModal(true);
          }}
          onGenderChange={setGender}
          gender={gender}
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
      <PatientFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        isEdit={Boolean(editingPatient)}
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
