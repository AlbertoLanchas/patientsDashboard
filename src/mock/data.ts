import { Patient, Gender } from "../interfaces";

import { Note } from "../pages/PatientsDetail/interface/KPIModal";

export const db: {
  patients: Patient[];
  notes: Note[];
} = {
  patients: [
    {
      id: "1",
      age: 52,
      primaryCondition: "Diabetes",
      name: "Carlos Gomez",
      imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Male,
    },
    {
      id: "2",
      age: 63,
      primaryCondition: "Hypertension",
      name: 'Michael Brown',
      imgUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Male,
    },
    {
      id: "3",
      age: 45,
      primaryCondition: "Asthma",
      name: "Ana Perez",
      imgUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Female,
    },
    {
      id: "4",
      age: 30,
      primaryCondition: "Migraine",
      name: 'Emily Johnson',
      imgUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Female,
    },
    {
      id: "5",
      age: 70,
      primaryCondition: "Arthritis",
      name: 'Sarah Johnson',
      imgUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Female,
    },
    {
      id: "6",
      age: 52,
      primaryCondition: "Diabetes",
      name: 'Sarah Lee',
      imgUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Female,
    },
    {
      id: "7",
      age: 63,
      primaryCondition: "Hypertension",
      name: 'David Kim',
      imgUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Male,
    },
    {
      id: "8",
      age: 45,
      primaryCondition: "Asthma",
      name: 'Natalie Brown',
      imgUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Female,
    },
    {
      id: "9",
      age: 30,
      primaryCondition: "Migraine",
      name: 'James Wilson',
      imgUrl: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Male,
    },
    {
      id: "10",
      age: 70,
      primaryCondition: "Arthritis",
      name: 'Linda Gonzalez',
      imgUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Female,
    },
    {
      id: "11",
      age: 52,
      primaryCondition: "Diabetes",
      name: 'Robert Taylor',
      imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Male,
    },
    {
      id: "12",
      age: 63,
      primaryCondition: "Hypertension",
      name: 'Jessica Nguyen',
      imgUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=100&h=100',
      gender: Gender.Female,
    },
  ],
  notes: [
    {
      id: "n1",
      patientId: "1",
      title: "Initial Check-up",
      content: "Patient is stable",
      createdAt: '2024-03-15T10:30:00Z',
      createdBy: {
        name: 'Dr. Joseph Carlo',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: 'general'
    },
    {
      id: "n2",
      patientId: "1",
      title: "Follow-up",
      content: "Blood pressure is high",
      createdAt: '2024-03-18T14:15:00Z',
      createdBy: {
        name: 'Dr. Joseph Carlo',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: 'health'
    },
    {
      id: "n3",
      patientId: "3",
      title: "Asthma Management",
      content: "Patient reports occasional shortness of breath",
      createdAt: '2024-03-18T09:45:00Z',
      createdBy: {
        name: 'Dr. Joseph Carlo',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: 'general'
    },
    {
      id: "n4",
      patientId: "3",
      title: "Migraine Report",
      content: "Patient is experiencing frequent headaches",
      createdAt: '2024-03-20T11:20:00Z',
      createdBy: {
        name: 'Dr. Joseph Carlo',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: 'health',
      isEdited: true,
      editedAt: '2024-03-20T11:25:00Z',
      versions: [
        {
          content: 'Reviewed blood sugar logs.',
          editedAt: '2024-03-20T11:20:00Z'
        }
      ]
    },
  ],
};
