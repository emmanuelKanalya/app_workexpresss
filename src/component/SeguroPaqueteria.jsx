import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function SeguroPaqueteria({ clienteId, precio = 0.99, onPopup }) {
  const [activo, setActivo] = useState(true);
  const [ultimaDesactivacion, setUltimaDesactivacion] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar estado actual del seguro
  useEffect(() => {
    const fetchSeguro = async () => {
      if (!clienteId) return;
      const { data, error } = await supabase
        .from("tb_cliente")
        .select("seguro")
        .eq("id_cliente", clienteId)
        .maybeSingle();

      if (!error && data) {
        setActivo(data.seguro ?? true);
        setUltimaDesactivacion(data.fecha_desactivacion);
      }
    };
    

    fetchSeguro();
  }, [clienteId]);

  // 🔹 Cambiar estado del seguro
  const handleToggleSeguro = async () => {
  if (loading) return;

  const nuevoEstado = !activo;
  const now = new Date();

  // 📅 Guardar fecha local si desactiva
  if (!nuevoEstado) {
    localStorage.setItem("ultimaDesactivacionSeguro", now.toISOString());
  }

  // 📅 Recuperar fecha local para bloqueo de 90 días
  const ultimaDesactivacionLocal = localStorage.getItem("ultimaDesactivacionSeguro");
  if (!nuevoEstado && ultimaDesactivacionLocal) {
    setUltimaDesactivacion(ultimaDesactivacionLocal);
  }

  // ⏱️ Si intenta activar antes de 90 días
  if (
    !activo &&
    ultimaDesactivacionLocal &&
    (now - new Date(ultimaDesactivacionLocal)) / (1000 * 60 * 60 * 24) < 90
  ) {
    onPopup({
      show: true,
      success: false,
      message: "No puedes volver a activar el seguro hasta pasados 90 días.",
    });
    return;
  }

  setLoading(true);
  const { error } = await supabase
    .from("tb_cliente")
    .update({ seguro: nuevoEstado })
    .eq("id_cliente", clienteId); // ajusta si es id_cliente o id

  setLoading(false);

  if (error) {
    onPopup({
      show: true,
      success: false,
      message: "Error al actualizar el estado del seguro.",
    });
    return;
  }

  setActivo(nuevoEstado);

  onPopup({
    show: true,
    success: true,
    message: nuevoEstado
      ? "Seguro activado correctamente."
      : "Has desactivado tu seguro. No podrás reactivarlo durante 90 días.",
  });
};


  return (
    <div
      className="relative rounded-2xl p-5 shadow-md overflow-hidden transition-all border-2"
      style={{
        background: "white",
        borderColor: activo ? "#b71f4b" : "#ccc",
        color: activo ? "#b71f4b" : "#999",
      }}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-3">
        <h3
          className={`font-semibold text-base ${
            activo ? "text-[#b71f4b]" : "text-gray-500"
          }`}
        >
          Seguro de Paquetería
        </h3>
        <div
          className={`p-2 rounded-full ${
            activo ? "bg-[#b71f4b]/10" : "bg-gray-200"
          }`}
        >
          <ShieldCheck
            className={`w-5 h-5 ${activo ? "text-[#b71f4b]" : "text-gray-400"}`}
          />
        </div>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mb-3">
        Protege tus envíos ante daños o pérdidas durante el transporte.
      </p>

      {/* Precio */}
      <p
        className={`text-3xl font-extrabold tracking-tight ${
          activo ? "text-[#b71f4b]" : "text-gray-500"
        }`}
      >
        ${precio.toFixed(2)}
        <span className="text-base text-gray-500 font-medium ml-1">
          / Paquete
        </span>
      </p>

      {/* Botón toggle */}
      <button
        onClick={handleToggleSeguro}
        disabled={loading}
        className={`mt-4 w-full py-2 rounded-lg font-medium transition-all ${
          activo
            ? "bg-[#b71f4b] text-white hover:bg-[#a01744]"
            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
        }`}
      >
        {loading
          ? "Actualizando..."
          : activo
          ? "Desactivar Seguro"
          : "Activar Seguro"}
      </button>
    </div>
  );
}
