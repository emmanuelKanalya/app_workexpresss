import React from "react";
import logo from "../assets/icon/mini_target.webp"; // ajusta la ruta si está en otra carpeta

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900 backdrop-blur-sm z-50 transition-colors duration-300">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner minimalista */}
        <div className="w-10 h-10 border-4 border-[#b71f4b]/30 border-t-[#b71f4b] dark:border-[#f2af1e]/30 dark:border-t-[#f2af1e] rounded-full animate-spin transition-colors duration-300"></div>

        {/* Texto sutil */}
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium transition-colors duration-300">
          Cargando...
        </p>
      </div>
    </div>
  );
}
