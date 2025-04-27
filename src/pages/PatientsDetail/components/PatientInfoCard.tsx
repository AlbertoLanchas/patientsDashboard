import { User, Activity } from "lucide-react";
import { Patient } from "../../../interfaces";

const PatientInfoCard = ({ patient }: { patient: Patient }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-6">
    <div className="flex items-start gap-6">
      <img
        src={patient.imgUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}`}
        alt={patient.name}
        className="w-24 h-24 rounded-full"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{patient.name}</h2>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{patient.age} years • {patient.gender}</span>
          </div>
          {patient.primaryCondition && (
            <div className="flex items-center gap-2">
              <Activity size={16} />
              <span>{patient.primaryCondition}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  </div>
);

export default PatientInfoCard;
