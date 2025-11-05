import { FileText } from "lucide-react";

export default function FacturaCard({ codigo, monto, estado, emitida, vence }) {
  // 🔹 Colores dinámicos según el estado
  const estadoColor =
    estado === "PAGADA"
      ? "bg-green-100 text-green-700"
      : estado === "VENCIDA"
      ? "bg-red-100 text-red-700"
      : "bg-blue-100 text-blue-700"; // PENDIENTE

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4 hover:shadow-md transition-all duration-200">
      {/* 🔹 Info principal */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#fce4ec] text-[#b71f4b]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              ST-{codigo}
            </h3>
            <span className="text-gray-900 font-bold text-sm sm:text-base">
              ${monto}
            </span>
            <span
              className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${estadoColor}`}
            >
              {estado}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <p>Emitida: {emitida}</p>
            <p>Vence: {vence}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
