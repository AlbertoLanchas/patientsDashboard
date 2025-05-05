import { useState } from "react";
import { Patient } from "../../../models";
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
  const [sortColumn, setSortColumn] = useState<keyof Patient>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof Patient) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedPatients = [...patients].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  return (
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr className="bg-gray-100 dark:bg-slate-700">
          <th
            className="p-2 text-left cursor-pointer"
            onClick={() => handleSort("name")}
          >
            Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="p-2 text-left cursor-pointer"
            onClick={() => handleSort("age")}
          >
            Age {sortColumn === "age" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th
            className="p-2 text-left cursor-pointer"
            onClick={() => handleSort("primaryCondition")}
          >
            Primary Condition{" "}
            {sortColumn === "primaryCondition" &&
              (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedPatients.map((patient) => (
          <PatientRow
            key={patient.id}
            patient={patient}
            onEdit={onEdit}
            onDelete={onDelete}
            isOptimistic={patient.id === optimisticId}
          />
        ))}
        {sortedPatients.length === 0 && (
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
