export interface Patient {
  id: string;
  name: string;
  age: number;
  primaryCondition: string;
}

export interface Note {
  id: string;
  patientId: string;
  content: string;
  title: string;
}
