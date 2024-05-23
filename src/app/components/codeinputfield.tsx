import { cn } from "../lib/cn";

type CodeInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
};

export default function CodeInputField({value, onChange, error}: CodeInputProps) {
  return (
    <input
      type="text"
      className={cn(
        "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
        error ? "border-red-500" : "border-green-500"
      )}
      maxLength={1}
      required
      value={value}
      onChange={onChange}
    />
  );
}
