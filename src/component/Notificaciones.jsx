import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Trash2, X } from "lucide-react";

export default function Notificaciones({ onModalChange }) {
  const [showModal, setShowModal] = useState(false);
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      titulo: "Tu paquete ha llegado a Panamá 🇵🇦",
      mensaje: "El paquete con tracking #WX123 está listo para retirar en la sucursal.",
      fecha: "Hoy, 10:45 a.m.",
    },
    {
      id: 2,
      titulo: "Factura disponible 💳",
      mensaje: "Ya puedes descargar la factura de tu envío #WX098.",
      fecha: "Ayer, 5:20 p.m.",
    },
    {
      id: 3,
      titulo: "Nuevo beneficio disponible 🎁",
      mensaje: "Has desbloqueado un cupón del 10% en tu próximo envío.",
      fecha: "Hace 3 días",
    },
  ]);

  useEffect(() => {
    if (onModalChange) onModalChange(showModal);
  }, [showModal, onModalChange]);

  const eliminarNotificacion = (id) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div>
      {/* 🔹 Preview compacta */}
      <div
        onClick={() => setShowModal(true)}
        className="relative flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#f5b3c2] text-[#b71f4b] bg-white dark:bg-gray-800 dark:text-[#f2af1e] dark:border-[#f2af1e]/40 cursor-pointer hover:scale-105 transition shadow-sm"
      >
        <Bell className="w-6 h-6" />

        {/* 🔴 Badge */}
        {notificaciones.length > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#b71f4b] dark:bg-[#f2af1e] text-white dark:text-gray-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-md">
            {notificaciones.length}
          </div>
        )}
      </div>

      {/* 🔹 Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 dark:text-gray-100 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative overflow-y-auto max-h-[90vh] transition-colors duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#b71f4b] dark:text-[#f2af1e]" />
                  <h3 className="text-lg font-semibold text-[#b71f4b] dark:text-[#f2af1e]">
                    Bandeja de Notificaciones
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lista */}
              <div className="space-y-4">
                {notificaciones.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-10">
                    No tienes notificaciones pendientes 🎉
                  </p>
                ) : (
                  notificaciones.map((notif) => (
                    <div
                      key={notif.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-sm dark:hover:shadow-[#f2af1e]/10 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">
                            {notif.titulo}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                            {notif.mensaje}
                          </p>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {notif.fecha}
                          </span>
                        </div>
                        <button
                          onClick={() => eliminarNotificacion(notif.id)}
                          className="text-gray-400 hover:text-[#b71f4b] dark:hover:text-[#f2af1e] transition"
                          title="Eliminar notificación"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Botón eliminar todas */}
              {notificaciones.length > 0 && (
                <button
                  onClick={() => setNotificaciones([])}
                  className="mt-6 w-full py-3 bg-[#b71f4b] dark:bg-[#f2af1e] text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-[#a01744] dark:hover:bg-[#f2af1e]/80 transition"
                >
                  Eliminar todas las notificaciones
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
