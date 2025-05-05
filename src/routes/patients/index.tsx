import { createFileRoute } from "@tanstack/react-router";

import { PatientProvider } from "#pages/Patients/context/PatientContext.tsx";
import { PatientsPage } from "#pages/Patients/views/PatientsPage.tsx";

export const Route = createFileRoute("/patients/")({
  component: PatientsComponent,
});

function PatientsComponent() {
  return (
    <PatientProvider>
      <PatientsPage />
    </PatientProvider>
  );
}
