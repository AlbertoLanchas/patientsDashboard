import { Gender, Patient } from "../../../interfaces";
import PatientRow from "./PatientRow";

type PatientsTableProps = {
  patients: Patient[];
  onEdit: (p: Patient) => void;
  onDelete: (p: Patient) => void;
  optimisticId?: string | null;
  gender: string;
  onGenderChange?: (gender: Gender) => void;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
};

const PatientsTable = ({
  patients,
  onEdit,
  onDelete,
  optimisticId,
  page,
  nextPage,
  prevPage
}: PatientsTableProps) => {
  const ITEMS_PER_PAGE = 10;
  const totalPatients = patients.length;

  return (
    <div>

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
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">

        </div>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Previous
          </button>

          <button
            onClick={nextPage}
            disabled={totalPatients < ITEMS_PER_PAGE}
            className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>


  );
};

export default PatientsTable;
