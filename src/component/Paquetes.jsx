import React, { useEffect, useState } from "react";
import { Plane, MapPin, ChevronRight, PackageSearch, Package, CheckCircle2, Truck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import PackageDetailModal from "./PackageDetailModal";
import { useAppStore } from "../store/appStore";


export default function Paquetes() {
  const navigate = useNavigate();
  // const [paquetes, setPaquetes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [history, setHistory] = useState([]); // si luego quieres rastreo real
  const paquetes = useAppStore(state => state.paquetes);
  const consultarTracking = useAppStore(state => state.consultarTracking);

  useEffect(() => {
    if (showModal) {
      // ❌ bloquea el scroll del body
      document.body.style.overflow = "hidden";
    } else {
      // ✅ restaura el scroll
      document.body.style.overflow = "";
    }

    // Cleanup por si React desmonta
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  function generarHistorialDesdeEstado(estado, fecha) {
  const s = estado?.toLowerCase() || "";
  const events = [];

  // Siempre agregamos el primer evento:
  events.push({
    status: "Recibido en Miami",
    location: "Bodega Miami",
    date: new Date(fecha).toLocaleDateString("es-ES"),
    time: new Date(fecha).toLocaleTimeString("es-ES"),
    description: "El paquete fue recibido en la bodega de Miami.",
    icon: Clock
  });

  // 2️⃣ Detectar tránsito (TODAS las variantes correctas)
  if (
    s.includes("transit") ||
    s.includes("tránsito") ||
    s.includes("transito") ||
    s.startsWith("en tránsito") ||
    s.startsWith("en transito")
  ) {
    events.unshift({
      status: "En tránsito",
      location: "Moviéndose hacia Panamá",
      date: new Date().toLocaleDateString("es-ES"),
      time: new Date().toLocaleTimeString("es-ES"),
      description: "Tu paquete está viajando hacia el país.",
      icon: Truck
    });
  }

  // 3️⃣ Facturado
  if (s.includes("facturado") || s.includes("invoiced")) {
    events.unshift({
      status: "Facturado en Panamá",
      location: "Centro Logístico WorkExpress",
      date: new Date().toLocaleDateString("es-ES"),
      time: new Date().toLocaleTimeString("es-ES"),
      description: "Tu paquete está listo para entrega.",
      icon: CheckCircle2
    });
  }

  return events;
}



  return (
    <div className="bg-linear-to-br from-[#d30046] via-orange-500 to-[#db2fb2] text-white rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-800 transition-colors">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Plane size={24} />

          <h2 className="text-lg font-semibold text-gray-100 ">
            Tus Paquetes
          </h2>
        </div>
        <span className="text-sm sm:text-[16px] bg-white/20 text-white font-semibold px-3 py-1 rounded-full">
          {paquetes.length} paquete{paquetes.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Contenedor */}
      {paquetes.length > 0 ? (
        <div
          className={`grid gap-4 ${paquetes.length === 1
            ? "grid-cols-1"
            : paquetes.length === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
            }`}
        >
          {paquetes.map((p) => (
            <div
              key={p.id_paquetes}
              className="bg-white/15 backdrop-blur-md  border border-white/20 rounded-2xl  p-4 hover:shadow-md transition-all"
            >
              {/* Tracking */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Package className="text-white" />
                </div>
                <div>
                  <p className="text-xs" >Número de paquete</p>
                  <p className="text-sm font-semibold  text-white truncate max-w-[140px]">
                    {p.tracking_id || "—"}
                  </p>
                  {/* <p className="text-xs text-gray-100">
                    {p.nombre_en_etiqueta || "Sin etiqueta"}
                  </p> */}
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center gap-2 font-semibold mb-5">
                <MapPin className="w-4 h-4 text-gray-100" />
                <p className="bg-white/20 py-1 px-2 rounded-full text-sm text-gray-100 capitalize">
                  {p.estado || "En tránsito"}
                </p>
                <p className="text-xs text-gray-100">
                  {p.created_at
                    ? new Date(p.created_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              {/* Fecha */}


              {/* Botón */}
              <button
                onClick={async () => {
                  const resp = await consultarTracking(p.tracking_id);

                  let historialFinal = [];

                  if (resp.error || !resp.data?.list_status_history?.length) {
                    // SIN API → usar historial basado en estado local
                    historialFinal = generarHistorialDesdeEstado(p.estado, p.created_at);
                  } else {
                    // CON API → historial real
                    historialFinal = resp.data.list_status_history.map((h) => ({
                      status: h.status,
                      location: h.location,
                      date: new Date(h.date).toLocaleDateString("es-ES"),
                      time: new Date(h.date).toLocaleTimeString("es-ES"),
                      description: h.description || "",
                      icon: seleccionarIconoEstado(h.status),
                    }));
                  }

                  setHistory(historialFinal);

                  setSelectedPackage({
                    id: p.tracking_id,
                    origin: "USA",
                    destination: "Panamá",
                    status: p.estado,
                    date: p.created_at,
                    weight: p.peso_real ? `${p.peso_real} kg` : "—",
                  });

                  setShowModal(true);
                }}

                className="w-full border border-white/30 text-sm font-medium py-2 rounded-xl text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Ver detalles
              </button>

            </div>
          ))}
          <PackageDetailModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            packageData={selectedPackage}
            history={history}
          />
        </div>

      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <PackageSearch
            size={40}
            className="text-white mb-3"
          />
          <p className="text-sm text-white">
            Aún no tienes paquetes vinculados a tu cuenta.
          </p>
        </div>
      )}

    </div>
  );
}
