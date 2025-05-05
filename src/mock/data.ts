import { Gender, Note, Patient } from "../models";

export const db: {
  patients: Patient[];
  notes: Note[];
} = {
  patients: [
    {
      id: crypto.randomUUID(),
      name: "Carlos Gomez",
      age: 52,
      primaryCondition: "Diabetes",
      gender: Gender.Male
    },
    {
      id: crypto.randomUUID(),
      name: "Maria Rodriguez",
      age: 63,
      primaryCondition: "Hypertension",
      gender: Gender.Female
    },
    {
      id: crypto.randomUUID(),
      name: "Ana Perez",
      age: 45,
      primaryCondition: "Asthma",
      gender: Gender.Other
    },
    {
      id: crypto.randomUUID(),
      name: "John Doe",
      age: 30,
      primaryCondition: "Migraine",
      gender: Gender.Male
    },
    {
      id: crypto.randomUUID(),
      name: "Emily Smith",
      age: 70,
      primaryCondition: "Arthritis",
      gender: Gender.Female
    },
  ],
  notes: [
    {
      id: crypto.randomUUID(),
      patientId: "",
      title: "Initial Check-up",
      content: "Patient is stable",
    },
    {
      id: crypto.randomUUID(),
      patientId: "",
      title: "Follow-up",
      content: "Blood pressure is high",
    },
    {
      id: crypto.randomUUID(),
      patientId: "",
      title: "Asthma Management",
      content: "Patient reports occasional shortness of breath",
    },
    {
      id: crypto.randomUUID(),
      patientId: "",
      title: "Migraine Report",
      content: "Patient is experiencing frequent headaches",
    },
    {
      id: crypto.randomUUID(),
      patientId: "",
      title: "Arthritis Pain Management",
      content: "Patient needs increased pain relief medication",
    },
  ],
};

db.notes = db.notes.map((note, index) => {
  const patientId = db.patients[index].id;
  return { ...note, patientId: patientId };
});
