import { CheckCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon/mini_target.webp";

export default function ConfirmacionCorreo() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-white to-red-50 px-6 text-center">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="WorkExpress Logo" className="w-14 h-14" />
        <h1 className="text-2xl font-bold text-[#b71f4b]">
          WorkExpress.Online
        </h1>
      </div>

      {/* Icono de verificación */}
      <div className="bg-[#b71f4b]/10 p-6 rounded-full mb-6 shadow-md">
        <CheckCircle className="w-16 h-16 text-[#b71f4b]" />
      </div>

      {/* Texto principal */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        ¡Correo verificado exitosamente!
      </h2>
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        Gracias por confirmar tu dirección de correo electrónico.  
        Ahora puedes acceder a tu cuenta y comenzar a disfrutar de todos los
        servicios de <span className="font-bold text-[#b71f4b]">WorkExpress</span>.
      </p>

      {/* Botón */}
      <button
        onClick={() => navigate("/")}
        className="bg-[#b71f4b] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a01744] transition-all duration-300"
      >
        Ir al inicio de sesión
      </button>

      {/* Mensaje secundario */}
      <div className="flex items-center gap-2 mt-10 text-sm text-gray-500">
        <Mail className="w-4 h-4 text-[#b71f4b]" />
        <span>¿No solicitaste esta verificación? Ignora este mensaje.</span>
      </div>
    </div>
  );
}
