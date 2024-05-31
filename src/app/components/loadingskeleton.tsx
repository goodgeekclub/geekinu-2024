import { motion } from "framer-motion";

const LoadingSkeleton = () => {
  return (
    <motion.button
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ transitionEnd: { y: -10, opacity: 0 } }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 bg-blue-600 text-white font-semibold px-6 py-4 rounded-lg inline-flex items-center shadow-lg"
      disabled
    >
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4h-4z"
        ></path>
      </svg>
      Processing...
    </motion.button>
  );
};

export default LoadingSkeleton;
