import { Patient } from "#models/index.ts";

export type PatientProperty = keyof Patient;

export interface PatientFilter<T, K extends keyof T> {
    property: K;
    value: T[K];
    condition: (itemValue: T[K], filterValue: T[K]) => boolean;
}

export function filterPatients<T>(data: T[], filters: PatientFilter<T, keyof T>[]): T[] {
    return data.filter((item) =>
        filters.every((filter) => {
            const itemValue = item[filter.property];
            const filterValue = filter.value;

            if (filterValue === undefined || filterValue === "") return true;

            return filter.condition(itemValue, filterValue as T[typeof filter.property]);
        })
    );
}


