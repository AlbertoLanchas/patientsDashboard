import { createFileRoute } from "@tanstack/react-router";
import { PatientDetailPage } from "../../pages/PatientsDetail/views/PatientDetailPage";

export const Route = createFileRoute("/patients/$id")({
  component: PatientDetail,
});

function PatientDetail() {
  return <PatientDetailPage />
}
