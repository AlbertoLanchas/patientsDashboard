import React from "react";
import { Gender } from "../../../interfaces";

interface FiltersPatientsProps {
    gender: Gender;
    setGender: React.Dispatch<React.SetStateAction<Gender>>;
    primaryConditions: string[];
    selectedConditions: string[];
    setSelectedConditions: React.Dispatch<React.SetStateAction<string[]>>;
    minAge: number | null;
    setMinAge: React.Dispatch<React.SetStateAction<number | null>>;
    maxAge: number | null;
    setMaxAge: React.Dispatch<React.SetStateAction<number | null>>;
}

const FiltersPatients: React.FC<FiltersPatientsProps> = ({
    gender,
    setGender,
    selectedConditions,
    setSelectedConditions,
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
}) => {
    const handleConditionChange = (condition: string) => {
        setSelectedConditions((prevSelected) =>
            prevSelected.includes(condition)
                ? prevSelected.filter((item) => item !== condition)
                : [...prevSelected, condition]
        );
    };

    const PRIMARY_CONDITIONS = [
        "Diabetes",
        "Hypertension",
        "Asthma",
        "Migraine",
        "Arthritis",
    ];
    return (
        <div className="mb-6 bg-white rounded-lg p-4">

            {/* Gender Filter*/}
            <div className="flex items-center mb-4">
                <button
                    className={`px-4 py-2 rounded text-sm font-medium mr ${gender === Gender.All ? "active bg-blue-500 text-white" : ""}`}
                    onClick={() => setGender(Gender.All)}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded text-sm font-medium mr ${gender === Gender.Male ? "active bg-blue-500 text-white" : ""}`}
                    onClick={() => setGender(Gender.Male)}
                >
                    Male
                </button>
                <button
                    className={`px-4 py-2 rounded text-sm font-medium mr ${gender === Gender.Female ? "active bg-blue-500 text-white" : ""}`}
                    onClick={() => setGender(Gender.Female)}
                >
                    Female
                </button>
            </div>

            {/* Primary Condition Filter*/}
            <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Primary Conditions</h3>
                <div className="flex flex-wrap">
                    {PRIMARY_CONDITIONS.map((condition) => (
                        <button
                            key={condition}
                            onClick={() => handleConditionChange(condition)}
                            className={`px-4 py-2 m-2 rounded text-sm font-medium ${selectedConditions.includes(condition)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {condition}
                        </button>
                    ))}
                </div>
            </div>

            {/* Age Filter*/}
            <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Age Range</h3>
                <div className="flex">
                    <input
                        type="number"
                        value={minAge ?? ""}
                        onChange={(e) => setMinAge(e.target.value ? parseInt(e.target.value, 10) : null)}
                        placeholder="Min Age"
                        className="px-4 py-2 m-2 rounded border"
                    />
                    <input
                        type="number"
                        value={maxAge ?? ""}
                        onChange={(e) => setMaxAge(e.target.value ? parseInt(e.target.value, 10) : null)}
                        placeholder="Max Age"
                        className="px-4 py-2 m-2 rounded border"
                    />
                </div>
            </div>
        </div>
    );
};

export default FiltersPatients;
