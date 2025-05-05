import { Patient } from "#models/index.ts";
import { PatientFilter } from "./filterPatients";

export function buildFilterConfig(filters: {
    name?: string;
    primaryCondition?: string;
    minAge?: number;
    gender?: string;
}): PatientFilter<Patient, keyof Patient>[] {
    const result: PatientFilter<Patient, keyof Patient>[] = [];

    if (filters.name) {
        result.push({
            property: "name",
            value: filters.name,
            condition: (item, value) => {
                if (typeof item === "string" && typeof value === "string") {
                    return item.toLowerCase().includes(value.toLowerCase());
                }
                return false;
            },
        });
    }

    if (filters.primaryCondition) {
        result.push({
            property: "primaryCondition",
            value: filters.primaryCondition,
            condition: (item, value) => {
                if (typeof item === "string" && typeof value === "string") {
                    return item.toLowerCase().includes(value.toLowerCase());
                }
                return false;
            },
        });
    }

    if (filters.minAge !== undefined) {
        result.push({
            property: "age",
            value: filters.minAge,
            condition: (item, value) => item >= value,
        });
    }

    if (filters.gender) {
        result.push({
            property: "gender",
            value: filters.gender,
            condition: (item, value) => item === value,
        });
    }

    return result;
}
