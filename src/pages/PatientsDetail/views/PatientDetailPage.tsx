import { Loader2 } from "lucide-react";
import { useParams } from "@tanstack/react-router";

import { PatientDetailView, PatientInfoCard, PatientKPIs } from "../components";

import { usePatient } from "../hooks/usePatient";

import PatientManagerTab from "../components/PatientTabs/PatientManagerTab";

export function PatientDetailPage() {
    const { id } = useParams({ from: "/patients/$id" });

    const { patientQuery } = usePatient(id);


    if (patientQuery.isLoading) {
        return (
            <PatientDetailView>
                <div className="flex justify-center items-center py-12">
                    <Loader2 size={32} className="animate-spin text-blue-500" />
                    <span className="ml-2 text-blue-500 font-medium">
                        Loading patient details...
                    </span>
                </div>
            </PatientDetailView>
        );
    }

    if (patientQuery.error) {
        return (
            <PatientDetailView>
                <div className="text-red-500 text-center">
                    Error loading patient: {patientQuery.error.message}
                </div>
            </PatientDetailView>
        );
    }

    if (!patientQuery.data) {
        return (
            <PatientDetailView>
                <div className="text-red-500 text-center">Patient not found</div>
            </PatientDetailView>
        );
    }

    return (
        <PatientDetailView >
            <PatientInfoCard patient={patientQuery.data} />
            <PatientKPIs />

            {/* Tabs */}
            <PatientManagerTab />

        </PatientDetailView>
    );
}
