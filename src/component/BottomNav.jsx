import { PackageSearch, FileText, User, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "home", label: "Inicio", icon: Home, path: "/home" },
    { id: "facturas", label: "Facturas", icon: FileText, path: "/facturas" },
    { id: "seguimiento", label: "Seguimiento", icon: PackageSearch, path: "/seguimiento" },
    { id: "perfil", label: "Perfil", icon: User, path: "/perfil" },
  ];

  return (
    <div
      className="
        md:hidden fixed bottom-0 left-0 right-0
        bg-white dark:bg-[#01060c]
        border-t border-gray-200 dark:border-[#0c0f12]
        shadow-xl flex justify-around py-2 z-50
      "
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;

        // Activo con startsWith → funciona incluso si estás en /, /home, /home/
        const active =
          location.pathname.startsWith(tab.path) ||
          (tab.path === "/home" && location.pathname === "/");

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="relative flex flex-col items-center justify-center px-4 py-1 w-full"
          >
            {/* Icono con animación */}
            <motion.div
              initial={false}
              animate={{
                scale: active ? 1.18 : 1,
                color: active ? "#f6339a" : "#7a7a7a",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`${active ? "text-orange-500 dark:text-pink-500" : "text-gray-500 dark:text-gray-400"}`}
            >
              <Icon size={23} />
            </motion.div>

            {/* Label */}
            <span
              className={`text-[10px] font-medium mt-1 transition-all ${
                active ? "text-pink-500" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {tab.label}
            </span>

            {/* ⭐ Indicador premium animado */}
            {active && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-0 left-0 right-0 mx-auto w-8 h-[3px] rounded-full  bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
