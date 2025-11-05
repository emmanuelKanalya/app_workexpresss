import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import Willy from "../assets/img/Willy_sinfondo3.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 flex flex-col items-center justify-center text-center px-4">
      {/* Imagen de Willy */}
      <div className="relative w-48 sm:w-56 md:w-64 mb-6">
        <img
          src={Willy}
          alt="Willy - Mascota WorkExpress"
          className="w-full h-full object-contain drop-shadow-2xl animate-float"
        />
      </div>

      {/* Texto principal */}
      <h1 className="text-7xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-red-500 to-orange-600 mb-3">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        ¡Oops! Página no encontrada
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Lo sentimos, parece que te perdiste. Pero Willy puede ayudarte a volver
        al inicio 🚀
      </p>

      {/* Botón */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 via-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-400/40 hover:scale-105 transition-all"
      >
        <Home className="w-5 h-5" />
        Ir al Inicio
      </button>

      {/* Animación */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
