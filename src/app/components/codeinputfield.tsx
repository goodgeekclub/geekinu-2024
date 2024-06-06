import { motion } from "framer-motion";
import { cn } from "../lib/cn";
import { forwardRef } from "react";

type CodeInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  autoFocus?: boolean;
};

export const shakeAnimation = {
  shake: {
    x: [-5, 5, -5, 5, -3, 3, -2, 2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// export default function CodeInputField({ value, onChange, error, autoFocus }: CodeInputProps) {
//   return (
//     <motion.input
//       type="text"
//       className={cn(
//         "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-gray-900 bg-white border border-gray-300 hover:border-gray-400 appearance-none rounded p-2 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
//         error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
//       )}
//       maxLength={1}
//       required
//       value={value}
//       onChange={onChange}
//       animate={error ? "shake" : ""}
//       variants={shakeAnimation}
//       autoFocus={autoFocus}
//     />
//   );
// }


const CodeInputField = forwardRef(({ value, onChange, error, autoFocus }: CodeInputProps, ref: any) => {
  return (
    <motion.input
      ref={ref}
      type="text"
      className={cn(
        "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-gray-900 bg-white border border-gray-300 hover:border-gray-400 appearance-none rounded p-2 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""
      )}
      maxLength={1}
      required
      value={value}
      onChange={onChange}
      animate={error ? "shake" : ""}
      variants={shakeAnimation}
      autoFocus={autoFocus}
    />
  );
})

export default CodeInputField;