import { motion } from "framer-motion";
import { cn } from "../lib/cn";

type CodeInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
};

export const shakeAnimation = {
  shake: {
    x: [-2, 2, -2, 1, 0],
    y: [-2, 2, -2, 1, 0],
    rotate: [-3, 3, -3, 3, 0],
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function CodeInputField({value, onChange, error}: CodeInputProps) {
  return (
    <motion.input
      type="text"
      className={cn(
        "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
        error ? "border-red-500" : "border-green-500"
      )}
      maxLength={1}
      required
      value={value}
      onChange={onChange}
      animate={error ? shakeAnimation.shake : {}}
      transition={{ duration: 0.3 }}
    />
  );
}
