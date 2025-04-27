import { Loader2 } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";

import { NotesSection, NoteDetail, NoteForm } from ".."

import ConfirmationModal from "../../../../components/ConfirmationModal";

import { usePatient } from "../../hooks/usePatient";
import { Note } from "../../interface/KPIModal";
import { useNotesMutations } from "../../hooks/useNotesMutation";
import { useNotesHandlers } from "../../hooks/useNotesHandlers";

export function NotesTab() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
    const [optimisticNoteId, setOptimisticNoteId] = useState<string | null>(null);

    const { id } = useParams({ from: "/patients/$id" });

    const { notesQuery } = usePatient(id);

    const { addNoteMutation, editNoteMutation, deleteNoteMutation } = useNotesMutations(setOptimisticNoteId, id);

    const { handleSubmit, handleOpenAddModal, handleEditNote, errors, register } = useNotesHandlers({
        setShowAddModal,
        setEditingNote,
        editingNote,
        addNote: addNoteMutation.mutate,
        editNote: editNoteMutation.mutate,
    });

    const confirmDelete = () => {
        if (!noteToDelete) return;
        deleteNoteMutation.mutate(noteToDelete);
        setShowDeleteModal(false);
        setNoteToDelete(null);
    };


    return (
        <NotesSection onAdd={handleOpenAddModal}>
            {
                notesQuery.isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 size={32} className="animate-spin text-blue-500" />
                        <span className="ml-2 text-blue-500 font-medium">
                            Loading notes...
                        </span>
                    </div>
                ) : (notesQuery.data?.map(note => {
                    return (
                        <NoteDetail
                            key={note.id}
                            note={note}
                            onEdit={handleEditNote}
                            optimisticId={optimisticNoteId}
                            onDelete={(note) => {
                                setNoteToDelete(note);
                                setShowDeleteModal(true);
                            }}
                        />
                    );
                }))

            }
            <NoteForm
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                handleSubmit={handleSubmit}
                errors={errors}
                register={register}
                isEdit={Boolean(editingNote)}
            />
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete Patient"
                message={`Are you sure you want to delete ${noteToDelete?.id}? This action cannot be undone.`}
                confirmText="Delete"
            />

        </NotesSection>

    );
}