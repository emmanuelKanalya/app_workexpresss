import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function Popup({ show, onClose, message, type = "success", duration = 2500 }) {
  const isSuccess = type === "success";
  const color = isSuccess ? "#16a34a" : "#dc2626";
  const title = isSuccess ? "Éxito" : "Error";
  const Icon = isSuccess ? CheckCircle : XCircle;

  // 🔹 Cierre automático después del tiempo definido
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose?.(), duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white/90 rounded-3xl shadow-2xl p-8 w-80 text-center border border-gray-100 backdrop-blur-md"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            {/* Ícono animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 250, damping: 10 }}
              className="flex justify-center mb-3"
            >
              <Icon
                className="w-14 h-14 drop-shadow-md"
                strokeWidth={2.5}
                color={color}
              />
            </motion.div>

            {/* Título */}
            <h2
              className="text-xl font-semibold mb-1 tracking-tight"
              style={{ color }}
            >
              {title}
            </h2>

            {/* Mensaje */}
            <motion.p
              className="text-gray-700 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
