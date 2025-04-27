import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface PatientDetailViewProps {
  children: ReactNode
}

const PatientDetailView = ({ children }: PatientDetailViewProps) => {

  return (
    <div className="p-6 dark:bg-slate-900">
      <div className="mb-6">
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
