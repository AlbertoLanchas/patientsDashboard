import { Patient, Note } from "../interfaces";

export const db: {
  patients: Patient[];
  notes: Note[];
} = {
  patients: [
    {
      id: "1",
      name: "Carlos Gomez",
      age: 52,
      primaryCondition: "Diabetes",
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      age: 63,
      primaryCondition: "Hypertension",
    },
    {
      id: "3",
      name: "Ana Perez",
      age: 45,
      primaryCondition: "Asthma",
    },
    {
      id: "4",
      name: "John Doe",
      age: 30,
      primaryCondition: "Migraine",
    },
    {
      id: "5",
      name: "Emily Smith",
      age: 70,
      primaryCondition: "Arthritis",
    },
  ],
  notes: [
    {
      id: "n1",
      patientId: "1",
      title: "Initial Check-up",
      content: "Patient is stable",
    },
    {
      id: "n2",
      patientId: "1",
      title: "Follow-up",
      content: "Blood pressure is high",
    },
    {
      id: "n3",
      patientId: "3",
      title: "Asthma Management",
      content: "Patient reports occasional shortness of breath",
    },
    {
      id: "n4",
      patientId: "3",
      title: "Migraine Report",
      content: "Patient is experiencing frequent headaches",
    },
    {
      id: "n5",
      patientId: "5",
      title: "Arthritis Pain Management",
      content: "Patient needs increased pain relief medication",
    },
  ],
};
