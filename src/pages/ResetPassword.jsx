// src/pages/ResetPassword.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!password || !confirm) {
      alert("Por favor completa ambos campos.");
      return;
    }
    if (password !== confirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      alert("Error al actualizar la contraseña: " + error.message);
    } else {
      alert("✅ Contraseña restablecida exitosamente.");
      navigate("/"); // vuelve al login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-[#b71f4b] to-[#7a0f36] text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-[#b71f4b] mb-4">
          Restablecer Contraseña
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Ingresa tu nueva contraseña para continuar con tu cuenta.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full outline-none text-sm bg-transparent text-gray-700"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Confirmar Contraseña
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full outline-none text-sm bg-transparent text-gray-700"
            />
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#b71f4b] text-white hover:bg-[#a01744]"
          }`}
        >
          {loading ? "Actualizando..." : "Actualizar Contraseña"}
        </button>
      </motion.div>
    </div>
  );
}
