import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../services/patient";
import { getNotes } from "../services/notes";

export const usePatient = (patientId: string) => {
  const patientQuery = useQuery({
    queryKey: ["patients", patientId],
    queryFn: () => getPatient(patientId),
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  const notesQuery = useQuery({
    queryKey: ["patients", patientQuery.data?.id, "notes"],
    queryFn: () => getNotes(patientQuery.data!.id),
    staleTime: 1000 * 60 * 60,
    retry: false,
    enabled: !!patientQuery.data,
    refetchOnWindowFocus: false,
  });

  return { patientQuery, notesQuery };
};
