import { Patient } from "#models/index.ts";

export const searchPatients = (
  patients: Patient[] | undefined,
  searchTerm: string,
): Patient[] => {
  if (!Array.isArray(patients)) return [];
  return patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
