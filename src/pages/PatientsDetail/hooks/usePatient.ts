import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../services/patient";
import { getNotes } from "../services/notes";
import { NoteType } from "../interface/KPIModal";
import { useState } from "react";


export const usePatient = (patientId: string) => {
  const [selectedType, setSelectedType] = useState<NoteType | undefined>(undefined);

  const patientQuery = useQuery({
    queryKey: ["patients", patientId],
    queryFn: () => getPatient(patientId),
    staleTime: 1000 * 60 * 60,
    retry: false,
  });

  const notesQuery = useQuery({
    queryKey: ["patients", patientQuery.data?.id, "notes", { selectedType }],
    queryFn: () => getNotes(patientQuery.data!.id, selectedType),
    staleTime: 1000 * 60 * 60,
    retry: false,
    enabled: !!patientQuery.data,
    refetchOnWindowFocus: false,
  });

  return { patientQuery, notesQuery, selectedType, setSelectedType };
};
