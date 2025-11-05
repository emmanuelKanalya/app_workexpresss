import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../component/Sidebar";
import BottomNav from "../component/BottomNav";
import Casillero from "../component/Casillero";
import Cartilla from "../component/Cartilla";
import Notificaciones from "../component/Notificaciones";
import Promociones from "../component/Promociones";
import { useAuth } from "../context/AuthContext";
import ChatBubble from "../component/ChatBubble";
export default function Home() {
  const { user, loading } = useAuth(); // ✅ obtenemos el usuario del contexto
  const [showBottom, setShowBottom] = useState(true);
  const [userName, setUserName] = useState("");
  const [cliente, setCliente] = useState(null);
  const [modalsOpen, setModalsOpen] = useState({
    cartilla: false,
    casillero: false,
    notificaciones: false,
    promociones: false,
  });

  // 🧠 Manejo de modales
  const handleModalChange = useCallback((name, isOpen) => {
    setModalsOpen((prev) => {
      if (prev[name] === isOpen) return prev;
      const updated = { ...prev, [name]: isOpen };
      const anyOpen = Object.values(updated).some(Boolean);
      setShowBottom(!anyOpen);
      return updated;
    });
  }, []);

  const modalHandlers = useMemo(
    () => ({
      cartilla: (isOpen) => handleModalChange("cartilla", isOpen),
      casillero: (isOpen) => handleModalChange("casillero", isOpen),
      notificaciones: (isOpen) => handleModalChange("notificaciones", isOpen),
      promociones: (isOpen) => handleModalChange("promociones", isOpen),
    }),
    [handleModalChange]
  );

  // 🔹 Obtener el nombre del cliente autenticado
useEffect(() => {
  const getCliente = async () => {
    if (!user?.email) return;

    const { data, error } = await supabase
      .from("tb_cliente")
      .select(`
        nombre,
        apellido,
        id_sucursal (
          id_sucursal,
          nombre,
          direccion
        )
      `)
      .eq("email", user.email)
      .maybeSingle();

    if (error) {
      console.error("Error al obtener cliente:", error.message);
    } else if (data) {
      const clienteInfo = {
        nombre: data.nombre,
        apellido: data.apellido,
        sucursal: data.id_sucursal?.nombre || "", // 👈 aquí ya traes el texto
      };
      setCliente(clienteInfo);
      setUserName(data.nombre);
    }
  };

  getCliente();
}, [user]);



  // ⏳ Mostrar loading si aún no se ha cargado el contexto
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Cargando usuario...
      </div>
    );
  }

  // 🚫 Redirección si no hay sesión activa
  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-20 pb-20 md:pb-0 p-6 space-y-6">
        {/* 🔹 Header con saludo y notificaciones */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Hola,</p>
              <h1 className="text-2xl font-bold text-[#b71f4b]">
                {userName}
              </h1>
            </div>
          </div>

          {/* Notificaciones compactas */}
          <div className="relative">
            <Notificaciones onModalChange={modalHandlers.notificaciones} />
          </div>
        </div>

        {/* 🔹 Subtexto */}
        <p className="text-gray-600 text-sm">
          Aquí tienes un resumen de tus beneficios y casilleros.
        </p>

        {/* 🔹 Resto del contenido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* <Promociones onModalChange={modalHandlers.promociones} /> */}
        </div>

        {/* <Cartilla onModalChange={modalHandlers.cartilla} /> */}
        <Casillero onModalChange={modalHandlers.casillero} cliente={cliente} />

        {/* <ChatBubble/> */}
      </main>

      {showBottom && <BottomNav />}
    </div>
  );
}
