import React, { useState, useEffect } from "react";
import {
  ClipboardCopy,
  Plane,
  Ship,
  MapPin,
  X,
  Landmark,
  Flag,
  Globe,
  Hash,
  Phone,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import Popup from "./Popup";

export default function Casillero({ onModalChange, cliente }) {
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeTab, setActiveTab] = useState("Aéreo");
  const [showModal, setShowModal] = useState(false);
  const [casilleros, setCasilleros] = useState([]);
  const [popupData, setPopupData] = useState({ show: false, message: "", type: "success" });

  // 🔹 Mostrar popup
  const showPopup = (message, type = "success") => setPopupData({ show: true, message, type });
  const handleClosePopup = () => setPopupData((prev) => ({ ...prev, show: false }));

  // 🔹 Avisar al padre si el modal está abierto
  useEffect(() => {
    if (onModalChange) onModalChange(showModal);
  }, [showModal, onModalChange]);

  // 🔹 Cargar casilleros desde Supabase
  useEffect(() => {
    const fetchCasilleros = async () => {
      const { data, error } = await supabase
        .from("tb_casillero")
        .select(`
          id_casillero,
          direccion1,
          direccion2,
          ciudad,
          provincia,
          estado,
          codigo_postal,
          telefono,
          tb_paises (nombre),
          tb_tipo_envio (nombre)
        `);

      if (error) {
        console.error("Error cargando casilleros:", error.message);
        return;
      }

      const formatted = data.map((c) => ({
        id: c.id_casillero,
        tipo_envio: c.tb_tipo_envio?.nombre || "Desconocido",
        pais: c.tb_paises?.nombre || "N/A",
        direccion1: c.direccion1 || "—",
        direccion2: c.direccion2 || "—",
        ciudad: c.ciudad || "—",
        provincia: c.provincia || "—",
        estado: c.estado || "—",
        codigo_postal: c.codigo_postal || "—",
        telefono: c.telefono || "—",
      }));

      setCasilleros(formatted);
      if (formatted.length > 0) setActiveCountry(formatted[0].pais);
    };

    fetchCasilleros();
  }, []);

  // 🔹 Agrupar por país
  const paises = [...new Set(casilleros.map((c) => c.pais))];
  const item = casilleros.find((c) => c.pais === activeCountry && c.tipo_envio === activeTab);


  const getNombreCasillero = () => {
    if (!cliente) return "Usuario ST";

    const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`;
    const sucursal = (cliente?.sucursal || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // 🔹 Determinar sufijo base según la sucursal
    let sufijo = "ST";
    if (sucursal.includes("santiago")) sufijo = "ST";
    else if (sucursal.includes("chitre")) sufijo = "STC";
    else if (sucursal.includes("panama")) sufijo = "STP";

    // 🔹 Si el tipo activo es marítimo, añadir sufijo extendido
    if (activeTab === "Marítimo") {
      return `${nombreCompleto} ${sufijo} - Marítimo`;
    }

    return `${nombreCompleto} ${sufijo}`;
  };

  // 🔹 Dirección 2 dinámica según tipo de envío
  const getDireccion2 = () => {
    const sucursal = (cliente?.sucursal || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let sufijo = "ST";
    if (sucursal.includes("santiago")) sufijo = "ST";
    else if (sucursal.includes("chitre")) sufijo = "STC";
    else if (sucursal.includes("panama")) sufijo = "STP";

    if (activeTab === "Marítimo") return `${sufijo} - Marítimo`;
    return sufijo;
  };



  const nombreCasillero = getNombreCasillero();

  // 🔹 Copiar toda la información
  const handleCopyAll = (data) => {
    // 🧭 Verificar si es China Marítimo
    if (data.pais.toLowerCase() === "china" && activeTab === "Marítimo") {
      const text = `
${getNombreCasillero()}
━━━━━━━━━━━━━━━━━━━━
⚠️ China no tiene dirección disponible para envíos marítimos.

Detalles de envío ${data.tipo_envio} (${data.pais})
━━━━━━━━━━━━━━━━━━━━
WorkExpress - Envíos confiables
`;
      navigator.clipboard.writeText(text.trim());
      setShowModal(false);
      showPopup("China no tiene dirección en marítimo.");
      return;
    }

    // 📦 Si no es China Marítimo → formato normal
    const text = `
${getNombreCasillero()}
━━━━━━━━━━━━━━━━━━━━
Detalles de envío ${data.tipo_envio} (${data.pais})

📍 Dirección: ${data.direccion1}
📍 Dirección 2: ${getDireccion2()}
🏙️ Ciudad: ${data.ciudad}
🗺️ Estado: ${data.estado}
📮 Código Postal: ${data.codigo_postal}
🌍 País: ${data.pais}
📞 Teléfono: ${data.telefono}

━━━━━━━━━━━━━━━━━━━━
WorkExpress - Envíos confiables
`;

    navigator.clipboard.writeText(text.trim());
    setShowModal(false);
    showPopup(`Información de envío ${data.tipo_envio} copiada al portapapeles`);
  };


  const handleCopyField = (value, label) => {
    navigator.clipboard.writeText(value);
    showPopup(`${label} copiado al portapapeles`);
  };

  const InfoRow = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-none">
      <div className="flex items-start gap-3 flex-1">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 ${color}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-0.5">{label}:</p>
          <p className="font-semibold text-gray-900 text-sm wrap-break-word">{value}</p>
        </div>
      </div>
      <button
        onClick={() => handleCopyField(value, label)}
        className="ml-2 shrink-0 p-1.5 hover:bg-gray-100 rounded-md transition-colors"
      >
        <ClipboardCopy size={18} className="text-gray-400 hover:text-[#b71f4b]" />
      </button>
    </div>
  );

  return (
    <>
      <Popup show={popupData.show} message={popupData.message} type={popupData.type} onClose={handleClosePopup} />

      <div className="relative bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        {/* Título */}
        <div className="flex gap-2 items-center mb-4">
          <MapPin className="w-6 h-6 text-[#b71f4b]" />
          <h2 className="text-lg font-semibold text-gray-800">Mis Casilleros</h2>
        </div>

        {/* 🧍 Nombre completo con sufijo */}


        {/* Tabs por país */}
        <div className="flex flex-wrap gap-3 mb-6">
          {paises.map((pais) => (
            <button
              key={pais}
              onClick={() => setActiveCountry(pais)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeCountry === pais
                ? "bg-[#b71f4b] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {pais}
            </button>
          ))}
        </div>

        {/* Tabs tipo de envío */}
        <div className="flex justify-start space-x-3 mb-6">
          {["Aéreo", "Marítimo"].map((tipo) => (
            <button
              key={tipo}
              onClick={() => {
                setShowModal(true);
                setActiveTab(tipo);
              }}

              className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === tipo
                ? "bg-[#b71f4b] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tipo === "Aéreo" ? <Plane className="w-4 h-4" /> : <Ship className="w-4 h-4" />}
              {tipo}
            </button>
          ))}
        </div>

        {/* Modal */}
        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="bg-white w-[92%] max-w-md rounded-3xl shadow-xl relative overflow-hidden max-h-[85vh] flex flex-col"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-start px-6 pt-5 pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-1">
                    {activeTab === "Aéreo" ? (
                      <Plane className="w-5 h-5 text-[#b71f4b]" />
                    ) : (
                      <Ship className="w-5 h-5 text-[#b71f4b]" />
                    )}
                    Detalles de envío {activeTab} ({activeCountry})
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Contenido dinámico */}
                <div className="overflow-y-auto flex-1 px-6 py-4">
                  {/* Si es China Marítimo */}
                  {activeCountry?.toLowerCase() === "china" && activeTab === "Marítimo" ? (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                      <Ship className="w-10 h-10 text-[#b71f4b] mb-3" />
                      <h4 className="text-lg font-semibold text-gray-800">
                        China no tiene dirección disponible en envíos marítimos.
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Por favor selecciona el modo aéreo para este país.
                      </p>
                    </div>
                  ) : item ? (
                    <>
                      <p className="text-sm text-gray-500 mb-4">Información completa del casillero</p>
                      <div className="space-y-0">
                        <InfoRow
                          icon={User}
                          label="Nombre Completo"
                          value={nombreCasillero}
                          color="bg-blue-500"
                        />
                        <InfoRow
                          icon={MapPin}
                          label="Dirección"
                          value={item.direccion1}
                          color="bg-red-500"
                        />
                        <InfoRow
                          icon={MapPin}
                          label="Dirección 2"
                          value={getDireccion2()}
                          color="bg-red-500"
                        />
                        <InfoRow
                          icon={Landmark}
                          label="Ciudad"
                          value={item.ciudad}
                          color="bg-purple-500"
                        />
                        <InfoRow
                          icon={Flag}
                          label="Estado"
                          value={item.estado}
                          color="bg-cyan-500"
                        />
                        <InfoRow
                          icon={Hash}
                          label="Código Postal"
                          value={item.codigo_postal}
                          color="bg-orange-500"
                        />
                        <InfoRow
                          icon={Globe}
                          label="País"
                          value={item.pais}
                          color="bg-cyan-500"
                        />
                        <InfoRow
                          icon={Phone}
                          label="Teléfono"
                          value={item.telefono}
                          color="bg-orange-500"
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-center text-gray-500">No hay datos disponibles.</p>
                  )}
                </div>

                {/* Botón copiar (solo si hay dirección) */}
                {!(activeCountry?.toLowerCase() === "china" && activeTab === "Marítimo") && item && (
                  <div className="px-6 py-4 border-t border-gray-100 bg-white">
                    <button
                      onClick={() => handleCopyAll(item)}
                      className="w-full flex items-center justify-center gap-2 bg-[#b71f4b] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#a01744] transition-colors shadow-sm"
                    >
                      <ClipboardCopy className="w-4 h-4" />
                      Copiar Información
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
