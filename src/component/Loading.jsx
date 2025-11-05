import React from "react";
import logo from "../assets/icon/mini_target.webp"; // ajusta la ruta si está en otra carpeta

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner minimalista */}
        <div className="w-10 h-10 border-4 border-[#b71f4b]/30 border-t-[#b71f4b] rounded-full animate-spin"></div>

        {/* Texto sutil */}
        <p className="text-gray-600 text-sm font-medium">Cargando...</p>
      </div>
    </div>
  );
}
