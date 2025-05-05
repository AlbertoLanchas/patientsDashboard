import { z } from "zod";

export const schema = z.object({
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

export type FormValues = z.infer<typeof schema>;
