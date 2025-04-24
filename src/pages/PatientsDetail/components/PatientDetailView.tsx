import { ReactNode } from "react";
import { Link, useParams } from "@tanstack/react-router";

interface PatientDetailViewProps {
  children: ReactNode
}

const PatientDetailView = ({ children }: PatientDetailViewProps) => {
  const { id } = useParams({ from: "/patients/$id" });

  return (
    <div className="p-6 max-w-3xl mx-auto dark:bg-slate-900 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-dark">
          My patient: <span className="text-blue-400">{id}</span>
        </h1>
        <Link
          to="/patients"
          className="text-blue-500 hover:underline hover:text-blue-400 transition-colors text-sm"

        >
          ← Back to patients
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PatientDetailView;
