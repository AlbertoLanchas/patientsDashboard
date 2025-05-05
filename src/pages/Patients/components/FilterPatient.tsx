import { Gender } from "#models/index.ts";
import { usePatientContext } from "../context/PatientContext";

const FilterPatient = () => {
    const { searchName, setSearchName, conditionFilter, setConditionFilter, minAge, setMinAge, genderFilter, setGenderFilter } = usePatientContext();

    return (
        <div className="flex gap-4 mb-4">
            <input
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Filter by condition"
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="number"
                placeholder="Min age"
                value={minAge}
                onChange={(e) => setMinAge(Number(e.target.value))
                }
                className="border p-2 rounded w-32"
            />
            <select
                value={genderFilter}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                        setGenderFilter("");
                    } else if (Object.values(Gender).includes(value as Gender)) {
                        setGenderFilter(value as Gender);
                    }
                }}
                className="border p-2 rounded"
            >
                <option value="">All genders</option>
                {Object.values(Gender).map((g) => (
                    <option key={g} value={g}>
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FilterPatient