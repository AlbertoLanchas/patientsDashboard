import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../services/notes";
import { getPatient } from "../services/patient";

export const usePatient = (patientId: string) => {
  const patientQuery = useQuery({
    queryKey: ["patients", patientId],
    queryFn: () => getPatient(patientId),
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  const notesQuery = useQuery({
    queryKey: ["patients", patientId, "notes"],
    queryFn: () => getNotes(patientId),
    staleTime: 1000 * 60 * 60,
    retry: false,
    enabled: !!patientQuery.data,
    refetchOnWindowFocus: false,
  });

  return { patientQuery, notesQuery };
};
