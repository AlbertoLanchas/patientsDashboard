import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Note } from "../interface/KPIModal";
import { addNote, updateNote, deleteNote } from "../services/notes";

export const useNotesMutations = (
  setOptimisticNoteId: (id: string | null) => void,
  patientId: string,
) => {
  const queryClient = useQueryClient();

  const addNoteMutation = useMutation({
    mutationFn: async (noteData: Note) => {
      return await addNote(patientId, noteData);
    },
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({
        queryKey: ["patients", patientId, "notes"],
      });
      const previousNotes =
        queryClient.getQueryData<Note[]>(["patients", patientId, "notes"]) ??
        [];

      setOptimisticNoteId(newNote.id);
      queryClient.setQueryData<Note[]>(
        ["patients", patientId, "notes"],
        (old = []) => [...old, newNote],
      );

      return { previousNotes };
    },
    onSuccess: () => {
      toast.success("Note added correctly", {
        className: "bg-green-100 text-green-800",
      });
      setOptimisticNoteId(null);
    },
    onError: (_err, _new, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(
          ["patients", patientId, "notes"],
          context.previousNotes,
        );
      }
      setOptimisticNoteId(null);
      toast.error("Error adding note");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients", patientId, "notes"],
      });
    },
  });

  const editNoteMutation = useMutation({
    mutationFn: async (noteData: Note) => {
      return await updateNote(patientId, noteData);
    },
    onMutate: async (updatedNote) => {
      await queryClient.cancelQueries({
        queryKey: ["patients", patientId, "notes"],
      });
      const previousPatients =
        queryClient.getQueryData<Note[]>(["patients", patientId, "notes"]) ??
        [];

      setOptimisticNoteId(updatedNote.id);
      queryClient.setQueryData<Note[]>(
        ["patients", patientId, "notes"],
        (old = []) =>
          old.map((p) => (p.id === updatedNote.id ? updatedNote : p)),
      );

      return { previousPatients };
    },
    onSuccess: () => {
      toast.info("Note Edited Correctly", {
        className: "bg-blue-100 text-blue-800",
      });
      setOptimisticNoteId(null);
    },
    onError: (_err, _updated, context) => {
      if (context?.previousPatients) {
        queryClient.setQueryData(
          ["patients", patientId, "notes"],
          context.previousPatients,
        );
      }
      setOptimisticNoteId(null);
      toast.error("Error editing note");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients", patientId, "notes"],
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteData: Note) => {
      await deleteNote(patientId, noteData);
    },
    onMutate: async (noteData: Note) => {
      await queryClient.cancelQueries({
        queryKey: ["patients", patientId, "notes"],
      });
      const previousPatients = queryClient.getQueryData<Note[]>([
        "patients",
        patientId,
        "notes",
      ]);
      queryClient.setQueryData<Note[]>(
        ["patients", patientId, "notes"],
        (old = []) => old.filter((p) => p.id !== noteData.id),
      );
      return { previousPatients };
    },
    onSuccess: () => {
      toast.error("Note successfully removed");
      queryClient.invalidateQueries({
        queryKey: ["patients", patientId, "notes"],
      });
    },
    onError: () => {
      toast.error("There was an error in deleting the note");
    },
  });

  return {
    addNoteMutation,
    editNoteMutation,
    deleteNoteMutation,
  };
};
