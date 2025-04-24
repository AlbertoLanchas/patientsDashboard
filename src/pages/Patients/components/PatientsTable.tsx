import { Patient } from "../../../interfaces";
import PatientRow from "./PatientRow";

type PatientsTableProps = {
  patients: Patient[];
  onEdit: (p: Patient) => void;
  onDelete: (p: Patient) => void;
  optimisticId?: string | null;
};

const PatientsTable = ({
  patients,
  onEdit,
  onDelete,
  optimisticId,
}: PatientsTableProps) => {

  return (
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100 dark:bg-slate-700">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Age</th>
          <th className="p-2 text-left">Primary Condition</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <PatientRow
            key={patient.id}
            patient={patient}
            onEdit={onEdit}
            onDelete={onDelete}
            isOptimistic={patient.id === optimisticId}
          />
        ))}
        {patients.length === 0 && (
          <tr>
            <td
              colSpan={4}
              className="text-center text-gray-500 dark:text-gray-400 py-4"
            >
              No patients found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PatientsTable;
