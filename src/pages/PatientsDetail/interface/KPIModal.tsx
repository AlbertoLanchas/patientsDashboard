export interface KPIModalType {
    title: string;
    value: string;
    icon: JSX.Element;
    color: string;
    bgColor: string;
    modalContent: JSX.Element;
    change?: string;
    trend?: string;
}

export type PatientTab = 'summary' | 'trackers' | 'goals' | 'health';

export interface Note {
    id: string;
    patientId: string;
    content: string;
    title: string;
    createdAt: string;
    createdBy: NoteCreatedBy
    type?: NoteType;
    isEdited?: boolean;
    editedAt?: string;
    versions?: NoteVersion[];
}

export type NoteType = 'general' | 'health' | 'medication' | 'alert'

export interface NoteVersion {
    content: string;
    editedAt: string;
}

export interface NoteCreatedBy {
    name: string;
    avatar?: string;
}