import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Cartilla({ onModalChange }) {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0); // 👈 Página actual (0 = primera)
  const totalSellos = 100;
  const sellosActuales = 0;
  const faltantes = totalSellos - sellosActuales;
  const sellosPorPagina = 25;
  const totalPaginas = totalSellos / sellosPorPagina;

  // 🔹 Avisar al padre si el modal está abierto
useEffect(() => {
  if (onModalChange) onModalChange(showModal);
}, [showModal, onModalChange]);


  // Dividimos los sellos en grupos de 25
  const sellos = Array.from({ length: totalSellos });
  const start = page * sellosPorPagina;
  const end = start + sellosPorPagina;
  const sellosPagina = sellos.slice(start, end);

  return (
    <div>
      {/* 🔹 PREVIEW — vista compacta */}
      <div
       onClick={() => setShowModal(true)}
        className="bg-linear-to-r from-[#b71f4b] to-[#e22d5c] rounded-2xl p-5 shadow-md text-white relative cursor-pointer hover:scale-[1.01] transition"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Cartilla de Sellos</h2>
            </div>
            <p className="text-sm opacity-80">
              Acumula sellos y canjea beneficios
            </p>
          </div>
          <button className="text-white/80 hover:text-white text-xl font-bold">
            →
          </button>
        </div>

        {/* Progreso */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Progreso en Cartilla</span>
            <span>
              {sellosActuales} / {totalSellos}
            </span>
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-2 bg-white rounded-full transition-all"
              style={{ width: `${(sellosActuales / totalSellos) * 100}%` }}
            />
          </div>
          <p className="text-xs mt-2 text-white/80">
            Te faltan {faltantes} sellos para canjear
          </p>
        </div>
      </div>

      {/* 🔹 MODAL — vista completa */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Encabezado */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#b71f4b]" />
                  <h3 className="text-lg font-semibold text-[#b71f4b]">
                    Canjear Sellos
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contador */}
              <p className="text-center text-sm font-semibold text-gray-700 mb-4">
                Sellos: {sellosActuales} / {totalSellos}
              </p>

              {/* Grilla de sellos (25 por página) */}
              <div className="grid grid-cols-5 gap-3 justify-items-center mb-6">
                {sellosPagina.map((_, i) => {
                  const index = start + i;
                  return (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-full border-2 ${
                        index < sellosActuales
                          ? "bg-[#b71f4b] border-[#b71f4b]"
                          : "border-[#e5a5b5] bg-[#f9d9e2]"
                      }`}
                    ></div>
                  );
                })}
              </div>

              {/* Paginación */}
              <div className="flex justify-center items-center gap-3 mb-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className={`p-2 rounded-full ${
                    page === 0
                      ? "text-gray-300"
                      : "text-[#b71f4b] hover:bg-[#ffe0e7]"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPaginas }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${
                        i === page ? "bg-[#b71f4b]" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPaginas - 1))
                  }
                  disabled={page === totalPaginas - 1}
                  className={`p-2 rounded-full ${
                    page === totalPaginas - 1
                      ? "text-gray-300"
                      : "text-[#b71f4b] hover:bg-[#ffe0e7]"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Botones */}
              <div className="space-y-3">
                <button className="w-full py-3 bg-[#b71f4b] text-white rounded-lg text-sm font-medium hover:bg-[#a01744] transition">
                  Obtener Sellos (Facturas Pagadas)
                </button>

                <button
                  disabled
                  className="w-full py-3 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium"
                >
                  Necesitas {faltantes} sellos para canjear (tienes{" "}
                  {sellosActuales})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
