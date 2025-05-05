export interface Patient {
  id: string;
  name: string;
  age: number;
  primaryCondition: string;
  gender: Gender
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
  Unkwnon = "unknown"
}

export interface Note {
  id: string;
  patientId: string;
  content: string;
  title: string;
}
