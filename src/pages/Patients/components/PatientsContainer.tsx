import { ReactNode } from "react";

interface PatientsContainerProps {
  children: ReactNode;
}

const PatientsContainer = ({ children }: PatientsContainerProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
      </div>
      {children}
    </div>
  );
};
export default PatientsContainer;
