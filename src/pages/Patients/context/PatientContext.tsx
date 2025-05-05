import React, { createContext, ReactNode, useContext, useState } from "react";

import { Gender, Patient } from "#models/index.ts";
import { usePatientsHandlers } from "../hooks/usePatientsHandlers";
import { usePatientsMutations } from "../hooks/usePatientsMutations";

interface PatientContextType {
    searchName: string;
    setSearchName: React.Dispatch<React.SetStateAction<string>>;
    conditionFilter: string;
    setConditionFilter: React.Dispatch<React.SetStateAction<string>>;
    minAge: number;
    setMinAge: React.Dispatch<React.SetStateAction<number>>;
    genderFilter: Gender | "";
    setGenderFilter: React.Dispatch<React.SetStateAction<Gender | "">>;
    showAddModal: boolean;
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    editingPatient: Patient | null;
    setEditingPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
    showDeleteModal: boolean;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    patientToDelete: Patient | null;
    setPatientToDelete: React.Dispatch<React.SetStateAction<Patient | null>>;
    optimisticPatientId: string | null;
    setOptimisticPatientId: React.Dispatch<React.SetStateAction<string | null>>;
    handleOpenAddModal: () => void;
    handleEditPatient: (patient: Patient) => void;
    confirmDelete: () => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Filters
    const [searchName, setSearchName] = useState("");
    const [conditionFilter, setConditionFilter] = useState("");
    const [minAge, setMinAge] = useState<number>(0);
    const [genderFilter, setGenderFilter] = useState<Gender | "">("");

    //Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
    const [optimisticPatientId, setOptimisticPatientId] = useState<string | null>(null);

    const { deleteMutation } = usePatientsMutations(setOptimisticPatientId);

    const { handleOpenAddModal, handleEditPatient } = usePatientsHandlers({
        setShowAddModal,
        setEditingPatient,
    });

    const confirmDelete = () => {
        if (!patientToDelete) return;
        deleteMutation.mutate(patientToDelete.id);
        setShowDeleteModal(false);
        setPatientToDelete(null);
    };


    return (
        <PatientContext.Provider
            value={{
                searchName,
                setSearchName,
                conditionFilter,
                setConditionFilter,
                minAge,
                setMinAge,
                genderFilter,
                setGenderFilter,
                showAddModal,
                setShowAddModal,
                editingPatient,
                setEditingPatient,
                showDeleteModal,
                setShowDeleteModal,
                patientToDelete,
                setPatientToDelete,
                optimisticPatientId,
                setOptimisticPatientId,
                handleOpenAddModal,
                handleEditPatient,
                confirmDelete,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};

export const usePatientContext = (): PatientContextType => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error("usePatientContext must be used within a PatientProvider");
    }
    return context;
};
