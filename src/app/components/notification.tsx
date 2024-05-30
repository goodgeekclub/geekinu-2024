import { motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../lib/cn";

type NotificationProps = {
  message: string;
  code1?: string;
  code2?: string;
  code3?: string;
  code4?: string;
  type: "error" | "success" | "special";
  onClose: () => void;
};

export default function Notification({
  message,
  type,
  code1,
  code2,
  code3,
  code4,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ transitionEnd: { y: -10, opacity: 0 } }}
      transition={{ duration: 0.5 }}
      className={`mx-5 absolute top-0 flex flex-col ${
        type === "error"
          ? "bg-red-400"
          : type === "special"
          ? "bg-yellow-400"
          : "bg-green-400"
      } px-4 md:px-8 py-4 text-xs md:text-sm rounded-xl shadow-lg`}
    >
      {message}
      {type === "special" && (
        <div className="mt-5 flex justify-between">
          <input
            type="text"
            className={cn(
              "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            )}
            maxLength={1}
            disabled
            value={code1}
          />
          <input
            type="text"
            className={cn(
              "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            )}
            maxLength={1}
            disabled
            value={code2}
          />
          <input
            type="text"
            className={cn(
              "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            )}
            maxLength={1}
            disabled
            value={code3}
          />
          <input
            type="text"
            className={cn(
              "w-12 md:w-14 h-12 md:h-14 text-center text-xl sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            )}
            maxLength={1}
            disabled
            value={code4}
          />
        </div>
      )}
    </motion.div>
  );
}
