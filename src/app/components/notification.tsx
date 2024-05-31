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
          ? "bg-red-500 text-white"
          : type === "special"
          ? "bg-yellow-500 text-black"
          : "bg-green-500 text-white"
      } px-6 py-4 md:px-8 md:py-6 text-sm md:text-base rounded-lg shadow-lg`}
    >
      <span className="font-semibold">{message}</span>
      {type === "special" && (
        <div className="mt-4 flex justify-between space-x-2">
          {[code1, code2, code3, code4].map((code, index) => (
            <input
              key={index}
              type="text"
              className={cn(
                "w-12 md:w-14 h-12 md:h-14 text-center text-lg md:text-xl font-bold text-gray-900 bg-gray-100 border border-gray-300 rounded-lg p-2 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              )}
              maxLength={1}
              disabled
              value={code}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

