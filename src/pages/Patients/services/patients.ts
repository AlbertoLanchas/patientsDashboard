import { sleep } from "../../../utils/sleep";
import { Gender, Patient } from "../../../interfaces";

export async function getPatients({
  gender,
  selectedConditions,
  minAge,
  maxAge,
  page,
  pageSize,
}: {
  gender: Gender;
  selectedConditions: string[];
  minAge: number | null;
  maxAge: number | null;
  page: number;
  pageSize: number;
}): Promise<{ data: Patient[]; total: number }> {
  await sleep(2);

  const params = new URLSearchParams();

  if (gender !== Gender.All) {
    params.append('gender', gender);
  }

  if (selectedConditions.length > 0) {
    selectedConditions.forEach(condition => {
      params.append('primaryCondition', condition);
    });
  }

  if (minAge !== null) {
    params.append('minAge', minAge.toString());
  }

  if (maxAge !== null) {
    params.append('maxAge', maxAge.toString());
  }

  params.append('page', page.toString());
  params.append('pageSize', pageSize.toString());

  const url = `/api/patients?${params.toString()}`;

  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Could not get patient list (status ${response.status})`);
  }

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
