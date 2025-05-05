import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
    name: keyof T;
    control: Control<T>;
    label: string;
    type?: string;
    error?: FieldError;
}

const InputForm = <T extends FieldValues>({
    name,
    control,
    label,
    type = "text",
    error,
}: Props<T>) => {
    return (
        <div className="space-y-2 m-2">
            <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <Controller
                name={name as string}
                control={control}
                render={({ field }) => (
                    <input
                        id={name as string}
                        type={type}
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(type === "number" ? +e.target.value : e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-200"
                            }`}
                    />
                )}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
};

export default InputForm;
