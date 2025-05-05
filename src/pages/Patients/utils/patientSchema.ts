import { z } from "zod";

import { Patient } from "#models/index.ts";

export const patientsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z
        .number({
            invalid_type_error: "Age must be a number",
            required_error: "Age is required",
        })
        .min(0, "Age must be at least 0")
        .max(120, "Age must be 120 or less"),
    primaryCondition: z.string().min(1, "Primary condition is required"),
});

export type FormValuesPatientsSchema = z.infer<typeof patientsSchema>;

type Field<T> = {
    name: keyof T;
    label: string;
    type: string;
};

export const patientFields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "primaryCondition", label: "Primary Condition", type: "text" },
] satisfies Field<Patient>[];