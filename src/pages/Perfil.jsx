import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import BottomNav from "../component/BottomNav";
import { supabase } from "../lib/supabaseClient";
import Loading from "../component/Loading";
import Planes from "../component/Planes";
import Popup from "../component/Popup";
import SeguroPaqueteria from "../component/SeguroPaqueteria";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  IdCard,
  Edit,
  Check,
  ChevronLeft,
  Clock,
  Star,
  Package,
  Lock,
  Gift,
  Bell,
  FileText,
  Home,
  Shield,
  Import,
  CheckCircle,   // ✅ agregar este
  XCircle,
  Key, LogOut      // ✅ y este
} from "lucide-react";


export default function Perfil() {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔹 Obtener datos del usuario logueado
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("tb_cliente")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error) throw error;
        setCliente(data);
      } catch (err) {
        console.error("Error al obtener perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  // 🔹 Guardar cambios
  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("tb_cliente")
        .update({
          telefono: cliente.telefono,
          direccion: cliente.direccion,
        })
        .eq("id_cliente", cliente.id_cliente);

      if (error) throw error;
      setEditMode(false);
    } catch (err) {
      console.error("Error al guardar:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-20 pb-20 md:pb-0">
        {/* Header */}
        <div className="bg-[#b71f4b] text-white p-6 flex items-center justify-start">

          <h1 className="text-lg font-semibold">Mi Perfil</h1>
          <div className="w-5" />
        </div>

        {/* Tabs */}
        <div className="flex justify-around bg-white ">
          {[
            { key: "personal", label: "Personal", icon: <IdCard size={16} /> },
            { key: "seguridad", label: "Seguridad", icon: <Shield size={16} /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center justify-center gap-2 flex-1 py-3 text-sm font-medium transition-all border-b-2 ${tab === item.key
                ? "text-[#b71f4b] border-[#b71f4b]"
                : "text-gray-500 border-transparent hover:text-[#b71f4b]/70"
                }`}
            >
              <span
                className={`transition-transform ${tab === item.key ? "scale-110 text-[#b71f4b]" : "text-gray-400"
                  }`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div className="p-4 md:p-8 w-full">
          {/* {tab === "resumen" && <Resumen cliente={cliente} />} */}
          {tab === "personal" && (
            <Personal
              cliente={cliente}
              editMode={editMode}
              setEditMode={setEditMode}
              saving={saving}
              handleSave={handleSave}
              setCliente={setCliente}
            />
          )}
          {tab === "seguridad" && <Seguridad />}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               SECCIÓN: PERSONAL                            */
/* -------------------------------------------------------------------------- */
function Personal({ cliente, editMode, setEditMode, saving, handleSave, setCliente }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const [popupMessage, setPopupMessage] = useState("");
  const [popup, setPopup] = useState({ show: false, success: false, message: "" });

  // 🔹 Envolvemos handleSave para mostrar el popup automáticamente
  const handleSaveWithPopup = async () => {
    try {
      await handleSave(); // ejecuta tu función de guardado original
      setPopupType("success");
      setPopupMessage("Los cambios se han guardado correctamente.");
      setPopupVisible(true);
    } catch (error) {
      console.error(error);
      setPopupType("error");
      setPopupMessage("Ocurrió un error al guardar los cambios.");
      setPopupVisible(true);
    }
  };
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup({ show: false }), 2500); // se cierra en 2.5s
      return () => clearTimeout(timer);
    }
  }, [popup.show]);
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-8 md:gap-12 px-2 md:px-6">
      {/* 🔹 Plan actual */}
      <div className="w-full flex flex-col lg:flex-row md:items-start md:justify-between gap-4">
        {/* 🔹 Plan y Sucursal */}
        <div className="w-full">
          <Planes
            id_plan={cliente.id_plan}
            clienteId={cliente.id_cliente}
            onPopup={setPopup}
          />
        </div>

        {/* 🔹 Seguro de Paquetería */}
        <div className="w-full">
          <SeguroPaqueteria clienteId={cliente.id_cliente} onPopup={setPopup} />
        </div>

        {/* 🔔 Popup de confirmación */}
        <Popup
          show={popup.show}
          onClose={() => setPopup({ show: false })}
          message={popup.message}
          type={popup.success ? "success" : "error"}
          duration={2500}
        />
      </div>


      {/* 🔹 Información personal */}
      <div className="md:w-[50%] w-full bg-white rounded-2xl p-8 shadow-md space-y-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Información Personal
        </h3>

        <Info
          label="Nombre completo"
          value={`${cliente.nombre} ${cliente.apellido}`}
          icon={<User />}
        />
        <Info label="Correo" value={cliente.email} icon={<Mail />} />
        <Info label="Cédula" value={cliente.cedula} icon={<IdCard />} />

        <EditableInfo
          label="Teléfono"
          value={cliente.telefono || ""}
          onChange={(v) => setCliente({ ...cliente, telefono: v })}
          icon={<Phone />}
          editable={editMode}
        />

        <EditableInfo
          label="Dirección"
          value={cliente.direccion || ""}
          onChange={(v) => setCliente({ ...cliente, direccion: v })}
          icon={<MapPin />}
          editable={editMode}
        />

        {/* Botón de edición */}
        <div className="flex justify-end pt-4">
          {editMode ? (
            <button
              onClick={handleSaveWithPopup}
              disabled={saving}
              className="bg-[#b71f4b] hover:bg-[#a01744] text-white px-7 py-3 rounded-xl font-semibold transition-all text-sm md:text-base"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-[#b71f4b] hover:bg-[#a01744] text-white p-5 rounded-full font-semibold transition-all"
            >
              <Edit size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Popup de éxito o error */}
      <Popup
        show={popupVisible}
        onClose={() => setPopupVisible(false)}
        message={popupMessage}
        type={popupType}
      />
    </div>
  );


}
/* -------------------------------------------------------------------------- */
/*                               SECCIÓN: SEGURIDAD                           */
/* -------------------------------------------------------------------------- */


function Seguridad() {
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  // 🔹 Cambiar contraseña (para usuario autenticado)
  const handleChangePassword = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      setPopup({
        show: true,
        message: "No se pudo obtener tu correo. Inicia sesión nuevamente.",
        type: "error",
      });
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      setPopup({
        show: true,
        message: "Error al enviar el correo: " + error.message,
        type: "error",
      });
    } else {
      setPopup({
        show: true,
        message: "Se envió un correo para cambiar tu contraseña.",
        type: "success",
      });
      setEmailSent(true);
    }
  };



  // 🔹 Cerrar sesión
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setPopup({
        show: true,
        message: "Error al cerrar sesión: " + error.message,
        type: "error",
      });
    } else {
      setPopup({
        show: true,
        message: "Sesión cerrada correctamente.",
        type: "success",
      });
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5 border border-gray-100">
      {/* Encabezado */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Lock className="w-5 h-5 text-[#b71f4b]" />
        <h3 className="text-lg font-semibold text-gray-800">
          Seguridad y Privacidad
        </h3>
      </div>

      {/* Cambiar contraseña */}
      <div
        onClick={handleChangePassword}
        className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl cursor-pointer transition"
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#b71f4b]/10 p-2 rounded-full">
            <Lock className="w-5 h-5 text-[#b71f4b]" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Cambiar Contraseña</h4>
            <p className="text-sm text-gray-500">
              Actualiza tu contraseña de acceso
            </p>
          </div>
        </div>
        <span className="text-gray-400 text-sm">›</span>
      </div>

      {/* Cerrar sesión */}
      <div className="pt-2 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>

      {/* Popup global */}
      <Popup
        show={popup.show}
        onClose={() => setPopup({ ...popup, show: false })}
        message={popup.message}
        type={popup.type}
      />
    </div>
  );
}





// ✅ Info.jsx
export function Info({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
      <div className="text-[#b71f4b]">{icon}</div>
      <div className="flex flex-col text-gray-700">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm">{value || "—"}</span>
      </div>
    </div>
  );
}


// ✅ EditableInfo.jsx
export function EditableInfo({ label, value, onChange, icon, editable }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${editable
        ? "border-2 border-[#b71f4b]/60 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#b71f4b]/30"
        : "border border-gray-200 bg-gray-50"
        }`}
    >
      {/* Icono */}
      <div className="text-[#b71f4b]">{icon}</div>

      {/* Contenido */}
      <div className="flex flex-col text-gray-700 w-full">
        <span
          className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${editable ? "text-[#b71f4b]" : "text-gray-500"
            }`}
        >
          {label}
        </span>

        {/* Valor editable */}
        {editable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent outline-none text-sm w-full text-gray-900"
          />
        ) : (
          <span className="text-sm">{value || "—"}</span>
        )}
      </div>
    </div>
  );
}


