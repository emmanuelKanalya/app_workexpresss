import {
  Home,
  FileText,
  Package,
  Activity,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/icon/mini_target.webp";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { id: "home", icon: Home, path: "/home" },
    { id: "facturas", icon: FileText, path: "/facturas" },
    { id: "seguimiento", icon: Package, path: "/seguimiento" },
    { id: "analytics", icon: Activity, path: "/analytics" },
  ];

  const bottomItems = [
    { id: "perfil", icon: User, path: "/perfil" },
    // { id: "logout", icon: LogOut, path: "/salir" },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between items-center w-20 h-screen bg-white border-r border-gray-200 shadow-md py-6 fixed left-0 top-0">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 mb-4" />
      </div>

      {/* Navegación principal */}
      <div className="flex flex-col items-center gap-5 mt-6">
        {items.map(({ id, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`p-3 rounded-xl transition-all ${
                active
                  ? "bg-linear-to-br from-[#b71f4b] to-[#ff4b2b] text-white shadow-lg"
                  : "text-gray-500 hover:text-[#b71f4b]"
              }`}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </div>

      {/* Navegación inferior */}
      <div className="flex flex-col items-center gap-5 mb-4">
        {bottomItems.map(({ id, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`p-3 rounded-xl border transition-all ${
                active
                  ? "border-[#b71f4b] text-[#b71f4b]"
                  : "border-gray-300 text-gray-500 hover:border-[#b71f4b] hover:text-[#b71f4b]"
              }`}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
