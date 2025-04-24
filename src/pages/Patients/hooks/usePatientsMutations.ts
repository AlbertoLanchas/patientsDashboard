import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Patient } from "../../../interfaces";
import { addPatient, updatePatient, deletePatient } from "../services/patients";

export function usePatientsMutations(
  setOptimisticPatientId: (id: string | null) => void,
) {
  const queryClient = useQueryClient();

  const addPatientMutation = useMutation({
    mutationFn: async (patientData: Patient) => {
      return await addPatient(patientData);
    },
    onMutate: async (newPatient) => {
      await queryClient.cancelQueries({ queryKey: ["patients"] });
      const previousPatients =
        queryClient.getQueryData<Patient[]>(["patients"]) ?? [];

      setOptimisticPatientId(newPatient.id);
      queryClient.setQueryData<Patient[]>(["patients"], (old = []) => [
        ...old,
        newPatient,
      ]);

      return { previousPatients };
    },
    onSuccess: () => {
      toast.success("Patient added correctly", {
        className: "bg-green-100 text-green-800",
      });
      setOptimisticPatientId(null);
    },
    onError: (_err, _new, context) => {
      if (context?.previousPatients) {
        queryClient.setQueryData(["patients"], context.previousPatients);
      }
      setOptimisticPatientId(null);
      toast.error("Error adding patient");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const editPatientMutation = useMutation({
    mutationFn: async (patientData: Patient) => {
      return await updatePatient(patientData);
    },
    onMutate: async (updatedPatient) => {
      await queryClient.cancelQueries({ queryKey: ["patients"] });
      const previousPatients =
        queryClient.getQueryData<Patient[]>(["patients"]) ?? [];

      setOptimisticPatientId(updatedPatient.id);
      queryClient.setQueryData<Patient[]>(["patients"], (old = []) =>
        old.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)),
      );

      return { previousPatients };
    },
    onSuccess: () => {
      toast.info("Patient Edited Correctly", {
        className: "bg-blue-100 text-blue-800",
      });
      setOptimisticPatientId(null);
    },
    onError: (_err, _updated, context) => {
      if (context?.previousPatients) {
        queryClient.setQueryData(["patients"], context.previousPatients);
      }
      setOptimisticPatientId(null);
      toast.error("Error editing patient");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deletePatient(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["patients"] });
      const previousPatients = queryClient.getQueryData<Patient[]>([
        "patients",
      ]);
      queryClient.setQueryData<Patient[]>(["patients"], (old = []) =>
        old.filter((p) => p.id !== id),
      );
      return { previousPatients };
    },
    onSuccess: () => {
      toast.error("Patient successfully removed");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: () => {
      toast.error("There was an error in deleting the patient");
    },
  });

  return { addPatientMutation, editPatientMutation, deleteMutation };
}
