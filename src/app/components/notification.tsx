import { motion } from "framer-motion";
import { useEffect } from "react";

type NotificationProps = {
  message: string;
  type: "error" | "success";
  onClose: () => void;
};

export default function Notification({
  message,
  type,
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
      className={`mx-5 absolute top-0 ${
        type === "error" ? "bg-red-400" : "bg-green-400"
      } px-4 md:px-8 py-4 text-xs md:text-sm rounded-xl shadow-lg`}
    >
      {message}
    </motion.div>
  );
}
