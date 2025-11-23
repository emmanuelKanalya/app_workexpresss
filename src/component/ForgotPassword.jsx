import React, { useState } from "react";
import { ArrowLeft, Mail, Package } from "lucide-react";
import { motion } from "framer-motion";
import logoBlack from "../assets/icon/mini_target.webp";
import logo from "../assets/icon/mini_target.webp";
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
        className="min-h-screen flex items-center justify-center  p-4"
      >
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-[#040c13] rounded-2xl shadow-lg p-8  border border-gray-200 dark:border-gray-700">
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
              className="w-full h-11  bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium rounded-md transition"
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
      className="min-h-screen flex items-center justify-center  p-4"
    >
      <div className="w-full max-w-md">
        {/* Botón volver */}
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center mb-8">
          <img
            src={theme === "light" ? logo : logoBlack}
            alt="Logo WorkExpress"
            className="h-20 w-20 mx-auto mb-4"
          />

          <h1 className="text-3xl md:text-4xl font-bold text-[#01060c] dark:text-white">
            WorkExpress
          </h1>
          <p className="text-sm md:text-base text-[#85919a] dark:text-gray-400">
            Envíos rápidos y seguros a tu alcance
          </p>
        </div>
        {/* Contenedor principal */}
        <div className="bg-white dark:bg-[#040c13] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl font-bold">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-gray-500 dark:text-gray-400  mt-1 text-sm">
              Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu cuenta.
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

              <div className="relative">
                {/* Ícono de correo */}
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 w-full pl-10 pr-3 rounded-md border border-gray-300 
                 dark:border-gray-700 dark:bg-gray-900 dark:text-white 
                 text-sm focus:outline-none focus:ring-2 
                 focus:ring-orange-500 dark:focus:ring-pink-500"
                />
              </div>
            </div>


            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 ${loading ? "bg-gray-400 cursor-not-allowed" : " bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                } text-white font-medium rounded-md transition`}
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
