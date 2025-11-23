import React from "react";
import { Package, MapPin, Calendar, Weight, CheckCircle2, Truck, Clock, X } from "lucide-react";

export default function PackageDetailModal({ isOpen, onClose, packageData, history }) {
  if (!isOpen || !packageData) return null;
  const ESTADOS_FIJOS = [
    {
      key: "miami",
      label: "Recibido en Miami",
      description: "El paquete fue recibido en la bodega de Miami.",
      icon: Clock
    },
    {
      key: "transito",
      label: "En tránsito",
      description: "El paquete está viajando hacia Panamá.",
      icon: Truck
    },
    {
      key: "facturado",
      label: "Facturado",
      description: "Tu paquete está listo para entrega.",
      icon: CheckCircle2
    }
  ];
  function detectarEstadoActivo(estado) {
    const s = estado?.toLowerCase();

    if (!s) return "miami";

    if (s.includes("facturado")) return "facturado";

    if (
      s.includes("transit") ||
      s.includes("tránsito") ||
      s.includes("transito") ||
      s.startsWith("en tránsito") ||
      s.startsWith("en transito")
    ) return "transito";

    return "miami";
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-9999 overflow-y-auto py-10 px-4">

      {/* Fondo cierre */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white dark:bg-[#040c13] text-gray-800 dark:text-gray-200 w-full max-w-2xl rounded-2xl shadow-xl p-6 animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Detalles del Paquete</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Panel superior */}
        <div className="bg-linear-to-br from-pink-600 via-orange-500 to-purple-600 p-6 rounded-xl text-white mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs opacity-80">Número de rastreo</p>
              <p className="font-mono text-lg break-all">{packageData.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoBox icon={MapPin} label="Origen" value="USA" />
            <InfoBox icon={MapPin} label="Destino" value="Panamá" />
            <InfoBox icon={Calendar} label="Fecha de registro al sistema" value={new Date(packageData.date).toLocaleDateString("es-ES")} />

          </div>
        </div>

        {/* Historial */}
        <h3 className="text-lg font-semibold mb-4">Historial de rastreo</h3>

{(() => {
  const estadoActual = detectarEstadoActivo(packageData.status);

  const estadosNivel = {
    miami: 1,
    transito: 2,
    facturado: 3
  };

  const nivelActual = estadosNivel[estadoActual];

  return (
    <div className="space-y-4">
      {ESTADOS_FIJOS.map((e, index) => {
        const nivel = estadosNivel[e.key];
        const active = nivel <= nivelActual; // ← ACTIVACIÓN PROGRESIVA
        const Icon = e.icon;

        return (
          <div className="flex gap-4" key={e.key}>
            <div className="flex flex-col items-center">

              {/* Círculo estilo semáforo */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all
                  ${active
                    ? "bg-green-500 text-white scale-110 shadow-lg shadow-green-400/60"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
              >
                <Icon size={20} />
              </div>

              {/* Línea */}
              {index !== ESTADOS_FIJOS.length - 1 && (
                <div
                  className={`w-0.5 flex-1 transition-all
                    ${active ? "bg-green-400" : "bg-gray-300 dark:bg-gray-700"}
                  `}
                ></div>
              )}
            </div>

            {/* Texto */}
            <div className="flex-1 pb-4">
              <div className="flex justify-between">
                <p className={`font-semibold ${active ? "text-green-500" : ""}`}>
                  {e.label}
                </p>
              </div>
              <p className="text-sm opacity-80">{e.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
})()}



      </div>
    </div>
  );
}


function InfoBox({ icon: Icon, label, value }) {
  return (
    <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={16} className="opacity-80" />
        <span className="text-xs opacity-80">{label}</span>
      </div>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
