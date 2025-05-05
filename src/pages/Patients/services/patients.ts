import { Patient } from "#models/index.ts";
import { sleep } from "#utils/sleep.ts";

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch("/api/patients");
  if (!response.ok) {
    throw new Error("Could not get patient list");
  }
  await sleep(2);
  const data = await response.json();
  return data;
}

export async function addPatient(patient: Patient): Promise<Patient> {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    throw new Error("Error adding patient");
  }
  await sleep(2);
  return response.json();
}

export async function updatePatient(patient: Patient): Promise<Patient> {
  const response = await fetch(`/api/patients/${patient.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    throw new Error("Error updating patient");
  }
  await sleep(2);
  return response.json();
}

export async function deletePatient(id: string): Promise<void> {
  const response = await fetch(`/api/patients/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error Deleting Patient");
  }
  await sleep(2);
}
