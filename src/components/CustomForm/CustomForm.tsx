import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldError, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ZodSchema } from "zod";

import InputForm from "./components/InputForm";

type Field<T> = {
    name: keyof T;
    label: string;
    type: string;
};

interface CustomFormProps<T extends FieldValues> {
    schema: ZodSchema<T>;
    fields: Field<T>[];
    defaultValues?: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
    onClose: () => void;
    isEdit: boolean;
}

function CustomForm<T extends FieldValues>({
    schema,
    fields,
    defaultValues,
    onSubmit,
    onClose,
    isEdit,
}: CustomFormProps<T>) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onBlur",
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 m-2">
            {fields.map((field) => (
                <InputForm
                    key={field.name as string}
                    name={field.name}
                    control={control}
                    label={field.label}
                    type={field.type}
                    error={errors[field.name as string] as FieldError}
                />
            ))}

            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    {isEdit ? "Save Changes" : "Create"}
                </button>
            </div>
        </form>
    );
}

export default CustomForm;
