import { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import BottomNav from "../component/BottomNav";
import { TrackingSearch } from "../component/TrackingSearch";
import { TrackingResult } from "../component/TrackingResult";
import { consultarTracking } from "../lib/tranking";
import { X, Package, User, CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import Popup from "../component/Popup"
export default function Seguimiento() {
  const { user, loading } = useAuth();
  const [userName, setUserName] = useState("");
  const [clienteInfo, setClienteInfo] = useState({
    plan: "",
    beneficios: "",
    sucursal: "",
    direccion: "",
    telefono: "",
  });
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allowOpen, setAllowOpen] = useState(false); // 👈 para volver a abrir manualmente
  const [closing, setClosing] = useState(false);
  // 🔹 Obtener el nombre del cliente autenticado
  useEffect(() => {
    const getUserData = async () => {
      if (!user?.email) return;

      try {
        // 1️⃣ Buscar datos del cliente
        const { data: cliente, error: errorCliente } = await supabase
          .from("tb_cliente")
          .select("nombre, apellido, id_plan, id_sucursal")
          .eq("email", user.email)
          .maybeSingle();

        if (errorCliente) throw errorCliente;
        if (!cliente) return;

        // 2️⃣ Buscar el plan
        const { data: plan, error: errorPlan } = await supabase
          .from("tb_plan")
          .select("descripcion, precio, beneficios")
          .eq("id_plan", cliente.id_plan)
          .maybeSingle();

        if (errorPlan) throw errorPlan;

        // 3️⃣ Buscar la sucursal
        const { data: sucursal, error: errorSucursal } = await supabase
          .from("tb_sucursal")
          .select("nombre, direccion, telefono")
          .eq("id_sucursal", cliente.id_sucursal)
          .maybeSingle();

        if (errorSucursal) throw errorSucursal;

        // 4️⃣ Guardar todo en el estado
        setUserName(`${cliente.nombre} ${cliente.apellido}`);
        setClienteInfo({
          plan: plan?.descripcion || "—",
          beneficios: plan?.beneficios || "—",
          sucursal: sucursal?.nombre || "—",
          direccion: sucursal?.direccion || "—",
          telefono: sucursal?.telefono || "—",
        });
      } catch (err) {
        console.error("Error al obtener datos del cliente:", err.message);
      }
    };

    getUserData();
  }, [user]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // bloquea scroll del fondo
    } else {
      document.body.style.overflow = "auto"; // lo reactiva al cerrar
    }

    // limpia si el componente se desmonta
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  // 🔍 Buscar tracking
  const handleSearch = async (trackingId) => {
    setIsLoading(true);
    setTrackingData(null);
    setError(null);
    setShowModal(false);
    setAllowOpen(false);

    try {
      const result = await consultarTracking(trackingId);

      if (!result.error && result.data) {
        setTrackingData(result.data);
        // espera 3 segundos después de mostrar el estado antes de abrir el modal
        setTimeout(() => {
          setShowModal(true);
          setAllowOpen(true);
        }, 1500);
      } else {
        setError({
          type: "not_found",
          message:
            result.message ||
            "No se encontró información para este número de rastreo.",
        });
      }
    } catch {
      setError({
        type: "network",
        message: "Error de conexión. Verifica tu internet e intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //Confirmar agregar paquete
  // ✅ Confirmar agregar paquete a la cuenta del cliente
  const handleConfirmAdd = async () => {
    try {
      if (!trackingData?.tracking_id) {
        setPopup({ show: true, message: "No hay un número de rastreo válido.", type: "error" });
        return;
      }


      // 1️⃣ Buscar el id_cliente del usuario actual
      const { data: cliente, error: errorCliente } = await supabase
        .from("tb_cliente")
        .select("id_cliente, nombre, apellido, email")
        .eq("email", user.email)
        .maybeSingle();

      if (errorCliente) throw errorCliente;
      if (!cliente) {
        setPopup({ show: true, message: "No se encontró tu cuenta de cliente.", type: "error" });
        return;
      }


      // 2️⃣ Verificar si el paquete existe antes de actualizar
      const { data: paqueteExistente, error: errorBuscar } = await supabase
        .from("tb_paquetes")
        .select("id_paquetes, id_cliente, tracking_id")
        .eq("tracking_id", String(trackingData.tracking_id).trim())
        .maybeSingle();

      if (errorBuscar) throw errorBuscar;
      if (!paqueteExistente) {
        setPopup({ show: true, message: "Este paquete no existe en la base de datos.", type: "error" });
        return;
      }

      if (paqueteExistente.id_cliente) {
        setPopup({ show: true, message: "Este paquete ya fue reclamado por otro cliente.", type: "error" });
        return;
      }


      // 3️⃣ Actualizar el paquete con los datos del cliente
      const { data, error } = await supabase
        .from("tb_paquetes")
        .update({
          id_cliente: cliente.id_cliente,
          correo_vinculado: cliente.email,
          nombre_en_etiqueta: `${cliente.nombre} ${cliente.apellido}`,
          estado: "Vinculado",
        })
        .eq("tracking_id", String(trackingData.tracking_id).trim())
        .select();

      if (error) throw error;

      if (data.length === 0) {
        setPopup({ show: true, message: "No se actualizó el paquete. Verifica los datos.", type: "error" });
      } else {
        setPopup({ show: true, message: "✅ Paquete vinculado correctamente a tu cuenta.", type: "success" });
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error al vincular paquete:", err.message);
      setPopup({ show: true, message: "Ocurrió un error al vincular el paquete. Intenta nuevamente.", type: "error" });
    }
  };


  // al cerrar
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 400); // coincide con la duración de la animación
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Barra lateral en desktop */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 ml-0 md:ml-20 pb-20 md:pb-0 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Seguimiento de Paquetes
        </h1>

        {/* 🔍 Barra de búsqueda */}
        <TrackingSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* 📦 Resultado */}
        <div className="w-full max-w-3xl mt-6 space-y-4">
          {/* 👇 Botón para abrir manualmente el modal si ya fue mostrado una vez */}
          {allowOpen && trackingData && (
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center bg-[#b71f4b] hover:bg-[#a01744] text-white w-12 h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                title="Agregar paquete"
              >
                {/* signo + */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-5 h-5 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          )}



          <TrackingResult data={trackingData} error={error} />

        </div>
      </main>

      {/* Barra inferior para móviles */}
      <BottomNav />

      {/* 🔔 Modal tipo "sheet" desde abajo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-end md:items-center px-4">
          <div
            className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl transform transition-all duration-300 translate-y-0 animate-slide-up"
            style={{ animation: `${closing ? "slideDown" : "slideUp"} 0.4s ease-out`, }}
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Agregar Paquete</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-gray-700 text-sm">
                ¿Quieres agregar este paquete a tu cuenta?
              </p>

              {/* Información del paquete */}
              <div className="bg-linear-to-br from-[#fdecef] to-[#f9dce2] rounded-xl p-4 border border-[#f3c2cc]">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-[#b71f4b]" />
                  <span className="font-semibold text-gray-800 text-sm">
                    Detalles del Paquete
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>ID:</strong> {trackingData?.tracking_id || "—"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Estado:</strong>{" "}
                  {(() => {
                    const status = trackingData?.current_status?.toLowerCase() || "";
                    if (status.includes("transit") || status.includes("tránsito")) return "En tránsito a Panamá";
                    if (status.includes("received")) return "Bodega Miami";
                    if (status.includes("invoiced")) return "Facturado";
                    return trackingData?.current_status || "Pendiente";
                  })()}
                </p>

              </div>

              {/* Información del cliente */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-5 h-5 text-[#b71f4b]" />
                  <span className="font-semibold text-gray-800 text-sm">
                    Información de tu Cuenta
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Nombre:</strong> {userName || "—"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Plan:</strong> {clienteInfo.plan}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Sucursal:</strong> {clienteInfo.sucursal}
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleConfirmAdd}
                className="flex-1 bg-[#b71f4b] hover:bg-[#a01744] text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Agregar a mi cuenta</span>
              </button>
              <button
                onClick={handleClose}
                className="flex-1 border border-gray-300 text-gray-600 font-medium rounded-xl py-3 hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <Popup
        show={popup.show}
        onClose={() => setPopup({ ...popup, show: false })}
        message={popup.message}
        type={popup.type}
      />
    </div>
  );
}

/* 🔹 Animación desde abajo */
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;
document.head.appendChild(style);
/* 🔹 Animación de arriba hacia abajo */
const style2 = document.createElement("style");
style2.innerHTML = `
@keyframes slideDown {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
}
`;
document.head.appendChild(style2);
