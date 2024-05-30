import { motion } from "framer-motion";

const LoadingSkeleton = () => {
  return (
    <motion.button
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ transitionEnd: { y: -10, opacity: 0 } }}
      transition={{ duration: 0.5 }}
      className="absolute top-0 bg-indigo-500 text-white font-bold px-4 md:px-8 py-4 rounded-xl inline-flex items-center shadow-lg"
      disabled
    >
      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
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
