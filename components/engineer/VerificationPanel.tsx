"use client";
import { motion } from "framer-motion";
import { Loader, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function VerificationPanel() {
  const code = "930912";
  const [statusText, setStatusText] = useState(
    "Waiting for Operations Center..."
  );
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusText("Verification in progress...");
      setIsVerifying(true); // Start "Verifying" after 3 seconds
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusText("Redirecting...");
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center space-y-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Title with loading spinner */}
        <h3 className="text-2xl font-semibold text-gray-700 flex items-center justify-center gap-2">
          <Loader className="animate-spin text-zenith-accent-600 w-8 h-8" />
          <span>Awaiting Verification</span>
        </h3>

        {/* Verification code display */}
        <p className="text-gray-500 text-sm">Your verification code is:</p>
        <p className="text-3xl font-mono font-bold text-zenith-accent-700">
          {code}
        </p>

        {/* Status text with animation */}
        <motion.div
          className="text-gray-400 text-lg bg-green-100 rounded-full px-6 py-3 inline-flex items-center space-x-2 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Tiny pulsing dot */}
          <motion.div
            className="w-2.5 h-2.5 animate-pulse rounded-full bg-green-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <span>{statusText}</span>
        </motion.div>

        {/* Checkmark once the verification is done (fun transition) */}
        {isVerifying && (
          <motion.div
            className="text-green-500 text-xl mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="inline-block w-8 h-8 animate-pulse" />
            <p className="text-lg mt-2">Verification Successful!</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
