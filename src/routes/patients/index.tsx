import { createFileRoute } from "@tanstack/react-router";

import { PatientsPage } from "../../pages/Patients/views/PatientsPage";

export const Route = createFileRoute("/patients/")({
  component: PatientsComponent,
});

function PatientsComponent() {
  return <PatientsPage />
}
