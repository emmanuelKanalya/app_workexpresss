import { useState } from "react";
import { MessageCircle, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end">
        {/* Panel animado */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-linear-to-r from-[#b71f4b] to-[#e22d5c] text-white p-4 flex items-center justify-between">
                <h3 className="font-semibold text-base">Asistente Virtual</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="hover:text-gray-100 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 text-gray-700 text-sm leading-relaxed">
                <p> ¡Hola! Soy tu asistente de WorkExpress.</p>
                <p className="mt-1">
                  Estoy aquí para ayudarte con tus envíos, facturas o soporte.
                </p>
              </div>

              <div className="px-5 pb-5">
                <button
                  onClick={() => alert("Aquí se abrirá tu ChatGPT o ChatGWOT")}
                  className="w-full flex items-center justify-center gap-2 bg-[#b71f4b] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#a01744] transition-colors"
                >
                  <Rocket size={18} />
                  Iniciar chat
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Burbuja principal */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white bg-linear-to-r from-[#b71f4b] to-[#e22d5c] animate-bounce-slow"
        >
          {open ? <X size={26} /> : <MessageCircle size={28} />}
        </motion.button>
      </div>
    </>
  );
}
