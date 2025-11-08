import React, { useState } from "react";
import { ArrowLeft, Mail, Package } from "lucide-react";
import { motion } from "framer-motion";
import logoBlack from "../assets/img/LOGO-WORKEXPRES.webp";
import logo from "../assets/img/LOGO-ROJO-LETRA.png";
import { useTheme } from "./ThemeProvider";
export default function ForgotPassword({ onNavigate, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  // 🔹 Ejecuta la función del padre (Auth.jsx)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const success = await onForgotPassword(email); // ✅ usa la función pasada desde Auth.jsx
    setLoading(false);

    if (success) setSubmitted(true);
  };

  // 🔹 Pantalla cuando ya se envió el correo
  if (submitted) {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen flex items-center justify-center bg-[#f9fbff] dark:bg-[#0f172a] p-4"
      >
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-linear-to-br from-[#ea6342] to-[#b71f4b] rounded-full flex items-center justify-center mb-4 shadow-inner">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-gray-900 dark:text-white text-lg font-semibold">
                Correo enviado
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-center mt-2 text-sm">
                Hemos enviado un enlace para restablecer tu contraseña a <b>{email}</b>.
              </p>
            </div>

            <button
              onClick={() => onNavigate("login")}
              className="w-full h-11 bg-[#f2af1e] hover:bg-[#ed933e] text-white font-medium rounded-md transition"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // 🔹 Pantalla inicial (formulario)
  return (
    <motion.div
      key="forgot"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-[#f9fbff] dark:bg-[#0f172a] p-4"
    >
      <div className="w-full max-w-md">
        {/* Botón volver */}
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        {/* Contenedor principal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <motion.div
                            className="flex flex-col items-center mb-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            {theme === "light" ? (
                              <img src={logo} alt="Logo WorkExpress" className="h-12 mx-auto" />
                            ) : (
                              <img src={logoBlack} alt="Logo WorkExpress" className="h-12 mx-auto" />
                            )}
                          </motion.div>
            <h1 className="text-gray-900 dark:text-white text-lg font-semibold">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-center mt-1 text-sm">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300 text-sm font-medium"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 px-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2af1e]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#f2af1e] hover:bg-[#ed933e]"
              } text-white font-medium rounded-md transition`}
            >
              {loading ? "Enviando..." : "Enviar enlace de restablecimiento"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
