import { supabase } from "../lib/supabaseClient";

const API_KEY = import.meta.env.VITE_API_KEY;
const ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const MAP_ESTADOS = {
  RECEIVED: "Bodega miami",
  IN_TRANSIT: "En tránsito",
  ARRIVED: "En tránsito",
  WAREHOUSED: "En tránsito",
  DELIVERED: "En tránsito",
};

export async function consultarTracking(trackingId) {
  try {
    // 1. Consultar estado local
    const { data: paqueteDB } = await supabase
      .from("tb_paquetes")
      .select("estado")
      .eq("tracking_id", trackingId)
      .maybeSingle();

    // 2. Llamar API remota
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_access_key: API_KEY,
        tracking_id: trackingId,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error || data.code >= 400) {
      console.warn("❌ API error, no guardar");
      return { error: true, message: data.message };
    }

    const paquete = data.data;
    let estadoAPI = paquete.current_status;

    // 3. Prioridad de facturación (local > remoto)
    if (paqueteDB?.estado === "facturado") {
      estadoAPI = "FACTURADO";
    } else if (paqueteDB?.estado === "en_facturacion") {
      estadoAPI = "EN FACTURACIÓN";
    } else {
      // 4. Mapeo de estados según tu tabla
      estadoAPI = MAP_ESTADOS[estadoAPI] || estadoAPI.toLowerCase();
    }

    // 5. Guardar en base
    const { error: insertError } = await supabase
      .from("tb_paquetes")
      .upsert([
        {
          tracking_id: trackingId,
          estado: estadoAPI,
          updated_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      console.error("⚠️ Error guardando:", insertError.message);
    }

    return { error: false, data: { ...paquete, estado_mapeado: estadoAPI } };

  } catch (error) {
    console.error("❌ Error consultando tracking:", error);
    return { error: true, message: "Error de conexión." };
  }
}
