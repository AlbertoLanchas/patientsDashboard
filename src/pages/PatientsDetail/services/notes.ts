import { Note, NoteType } from "../interface/KPIModal";
import { sleep } from "../../../utils/sleep";

export const getNotes = async (id: string, type?: NoteType): Promise<Note[]> => {
  await sleep(2);

  const url = new URL(`/api/patients/${id}/notes`, window.location.origin);

  if (type) {
    url.searchParams.set('type', type);
  }

  const response = await fetch(url.toString());
  return response.json();
};
export const addNote = async (id: string, note: Note): Promise<Note> => {
  await sleep(2);
  const response = await fetch(`/api/patients/${id}/notes/${note.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Error adding note");
  }

  return response.json();
};

export const updateNote = async (id: string, note: Note): Promise<Note> => {
  await sleep(2);
  const response = await fetch(`/api/patients/${id}/notes/${note.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Error updating note");
  }

  return response.json();
};

export const deleteNote = async (id: string, note: Note): Promise<void> => {
  await sleep(2);
  const response = await fetch(`/api/patients/${id}/notes/${note.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting note");
  }
};
