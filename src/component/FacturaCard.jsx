import { useState } from "react";
import { FileText } from "lucide-react";

export default function FacturaCard({ codigo, tracking, monto, estado, fecha }) {
  const [isSelected, setIsSelected] = useState(false);

  // 🎨 Colores según estado
  const estadoEstilos = {
    PAGADA: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
    VENCIDA: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300",
    PENDIENTE: "bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300",
  };

  const colorEstado = estadoEstilos[estado] || estadoEstilos["PENDIENTE"];

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={`
        flex flex-col justify-between
        bg-white dark:bg-gray-900
        border rounded-2xl shadow-sm hover:shadow-lg
        px-5 py-4 transition-all duration-300 cursor-pointer select-none
        ${
          isSelected
            ? "border-[#b71f4b] dark:border-[#f2af1e] ring-2 ring-[#b71f4b]/40 dark:ring-[#f2af1e]/40"
            : "border-gray-100 dark:border-gray-800"
        }
      `}
    >
      {/* Encabezado */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#fce4ec] text-[#b71f4b] dark:bg-[#1f2937] dark:text-[#f2af1e]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
              {codigo}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tracking: {tracking}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{fecha}</p>
          </div>
        </div>
      </div>

      {/* Pie con total y estado */}
      <div className="flex justify-between items-center mt-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="text-xs">Total</span>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            ${monto}
          </p>
        </div>

        <span
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${colorEstado}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              estado === "PAGADA"
                ? "bg-green-500"
                : estado === "VENCIDA"
                ? "bg-red-500"
                : "bg-amber-500"
            }`}
          ></span>
          {estado}
        </span>
      </div>
    </div>
  );
}
