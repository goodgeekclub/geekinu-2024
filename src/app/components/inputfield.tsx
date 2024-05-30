import { cn } from "../lib/cn";

type InputFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
};

export default function InputField({
  label,
  type,
  value,
  onChange,
  required,
  className
}: InputFieldProps) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        className={cn("bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", className)}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
