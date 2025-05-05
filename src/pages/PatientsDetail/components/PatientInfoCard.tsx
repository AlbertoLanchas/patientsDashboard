import { Patient } from "../../../models";

const PatientInfoCard = ({ patient }: { patient: Patient }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md mb-6">
    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
      {patient.name}
    </h2>
    <p className="text-gray-700 dark:text-gray-300">Age: {patient.age}</p>
    <p className="text-gray-700 dark:text-gray-300">
      Primary Condition: {patient.primaryCondition}
    </p>
  </div>
);

export default PatientInfoCard;
