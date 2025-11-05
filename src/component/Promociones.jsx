import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X } from "lucide-react";

export default function Promociones({ onModalChange }) {
  const [showModal, setShowModal] = useState(false);
  const [promos, setPromos] = useState([
    {
      id: 1,
      titulo: "2x1 en envíos marítimos 🌊",
      descripcion: "Envía dos paquetes y paga uno. Válido hasta el 15 de noviembre.",
      fecha: "Disponible ahora",
    },
    {
      id: 2,
      titulo: "10% de descuento en tu primer envío 🚀",
      descripcion: "Aprovecha este beneficio exclusivo de bienvenida.",
      fecha: "Hasta el 30 de noviembre",
    },
  ]);

useEffect(() => {
  if (onModalChange) onModalChange(showModal);
}, [showModal, onModalChange]);


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
              <Tag className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Promociones</h2>
            </div>
            <p className="text-sm opacity-80">
              Ofertas y beneficios disponibles
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="bg-white text-[#b71f4b] font-bold px-3 py-1 rounded-full text-sm shadow">
              {promos.length}
            </span>
            <span className="text-xs text-white/70 mt-1">activas</span>
          </div>
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
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#b71f4b]" />
                  <h3 className="text-lg font-semibold text-[#b71f4b]">
                    Promociones activas
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lista de promociones */}
              <div className="space-y-4">
                {promos.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-10">
                    No hay promociones disponibles por ahora 🎉
                  </p>
                ) : (
                  promos.map((promo) => (
                    <div
                      key={promo.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                    >
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">
                        {promo.titulo}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {promo.descripcion}
                      </p>
                      <span className="text-xs text-gray-400">{promo.fecha}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
