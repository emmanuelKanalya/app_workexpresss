import React, { useState } from "react";
import { Moon, Sun, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import logoBlack from "../assets/img/LOGO-WORKEXPRES.webp";
import logo from "../assets/img/LOGO-ROJO-LETRA.png";
import { img } from "framer-motion/client";

export default function Login({ onLogin, onNavigate, onForgotPassword, onRegister }) {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login"); // 👈 controla qué pantalla mostrar

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
      onNavigate("home"); // 👈 cambia vista o redirige
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fbff] dark:bg-[#0f172a] p-4 relative overflow-hidden">
      {/* 🌗 Botón modo oscuro */}
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-gray-700" />
        ) : (
          <Sun className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* 📦 Contenido con transición entre Login / Forgot / Signup */}
      <AnimatePresence mode="wait">
        {view === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              {/* Encabezado */}
              <motion.div
                className="flex flex-col items-center mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {theme === "light" ? (
                  <img src={logo} alt="Logo WorkExpress" className="h-16 mx-auto" />
                ) : (
                  <img src={logoBlack} alt="Logo WorkExpress" className="h-16 mx-auto" />
                )}
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Inicia sesión en tu cuenta</p>
              </motion.div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 px-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2af1e] transition-all"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="password" className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 px-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2af1e] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-linear-to-r from-[#f2af1e] to-[#b71f4b] hover:opacity-90 text-white font-medium rounded-md transition-all cursor-pointer"
                >
                  Iniciar sesión
                </button>
              </form>

              {/* Enlaces */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="bg-linear-to-r from-[#f2af1e] to-[#b71f4b] bg-clip-text text-transparent hover:opacity-90 dark:text-white text-sm font-medium hover:underline transition-all cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setView("signup")}
                  className="relative w-full h-11 rounded-2xl cursor-pointer font-medium 
             transition-all border-2 bg-transparent
             text-transparent bg-clip-text 
             bg-linear-to-r
             border-transparent border-gradient-to-r from-[#f2af1e] to-[#b71f4b]
             hover:opacity-90 
             dark:border-gray-500 dark:text-gray-300"
                  style={{
                    borderImage: "linear-gradient(to right, #f2af1e, #b71f4b) 1",
                  }}
                >
                  Crear cuenta nueva
                </button>

              </div>
            </div>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
              Compras internacionales y casilleros en USA
            </p>
          </motion.div>
        )}

        {view === "forgot" && (
          <motion.div
            key="forgot"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <ForgotPassword onNavigate={() => setView("login")} onForgotPassword={onForgotPassword} />
          </motion.div>
        )}

        {view === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <SignUp
              onNavigate={() => setView("login")}
              onRegister={onRegister} // 👈 se conecta a tu lógica real
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
