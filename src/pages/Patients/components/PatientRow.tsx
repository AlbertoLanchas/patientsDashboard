import { Link } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";

import { Patient } from "../../../interfaces";
import { getPatient } from "../../../pages/PatientsDetail/services/patient";
import { getNotes } from "../../PatientsDetail/services/notes";

type PatientRowProps = {
    patient: Patient;
    onEdit: (p: Patient) => void;
    onDelete: (p: Patient) => void;
    isOptimistic?: boolean;
};

const PatientRow = ({ patient, onEdit, onDelete, isOptimistic }: PatientRowProps) => {
    const queryClient = useQueryClient();
    const patientId = patient.id;

    const prefetchData = () => {
        queryClient.prefetchQuery({
            queryKey: ["patients", patientId],
            queryFn: () => getPatient(patientId),
            staleTime: 1000 * 60,
        });

        queryClient.prefetchQuery({
            queryKey: ["patients", patientId, "notes"],
            queryFn: () => getNotes(patientId),
            staleTime: 1000 * 60,
        });
    };

    const presetData = () => {
        queryClient.setQueryData(["patients", patientId], patient, {
            updatedAt: Date.now() + 1000 * 60,
        });
    };

    return (
        <tr
            className={clsx(
                "transition-opacity",
                isOptimistic ? "opacity-30" : "opacity-100"
            )}
            onMouseEnter={prefetchData}
        >
            <td className="p-2">
                <Link
                    to={`/patients/${patient.id}`}
                    className="text-blue-500"
                    onMouseEnter={presetData}
                >
                    {patient.name}
                </Link>
            </td>
            <td className="p-2">{patient.age}</td>
            <td className="p-2">{patient.primaryCondition}</td>
            <td className="p-2 space-x-2">
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => onEdit(patient)}
                >
                    <Pencil className="text-blue-500" size={18} />
                </button>
                <button
                    className="text-red-500 hover:underline"
                    onClick={() => onDelete(patient)}
                >
                    <Trash2 className="text-red-500" size={18} />
                </button>
            </td>
        </tr>
    );
};

export default PatientRow;
