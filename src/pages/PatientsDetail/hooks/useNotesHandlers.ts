import { Note } from "../interface/KPIModal";
import { v4 as uuid } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";

interface UseNotesHandlersProps {
  setShowAddModal: (open: boolean) => void;
  setEditingNote: (patient: Note | null) => void;
  editingNote: Note | null;
  addNote: (patient: Note) => void;
  editNote: (patient: Note) => void;
}

export function useNotesHandlers({
  setShowAddModal,
  setEditingNote,
  editingNote,
  addNote,
  editNote,
}: UseNotesHandlersProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Note>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<Note> = (data) => {
    const { content, title } = data;

    if (!content || !title) return;

    if (editingNote) {
      editNote({
        ...editingNote,
        title,
        content,
      });
    } else {
      addNote({
        ...data,
        id: uuid(),
      });
    }
    setShowAddModal(false);
    reset();
  };

  const handleOpenAddModal = () => {
    reset();
    setEditingNote(null);
    setShowAddModal(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setValue("content", note.content);
    setValue("title", note.title);
    setShowAddModal(true);
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    handleOpenAddModal,
    handleEditNote,
    errors,
    register,
  };
}
