const API_KEY = import.meta.env.VITE_API_KEY;
const ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function consultarTracking(trackingId) {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_access_key: API_KEY, // ← token correcto según documentación
        tracking_id: trackingId,   // ID del paquete
      }),
    });

    const data = await response.json();
    // Manejo según código de respuesta
    if (data.code === 404 || data.message?.includes("not found")) {
      return { error: true, message: "El paquete no ha sido encontrado." };
    }

    if (data.error === true || data.code >= 400) {
      return { error: true, message: data.message || "Error en la solicitud." };
    }

    if (data.code === 200 && data.data) {
    const paquete = data.data;

    // Simulación de progreso automático ---
    if (paquete.current_status === "RECEIVED" && paquete.list_status_history?.length) {
      const fechaRecibido = new Date(paquete.list_status_history[0].date);
      const ahora = new Date();
      const horasPasadas = (ahora - fechaRecibido) / (1000 * 60);

      // si ya pasaron más de 48h -> pasa a TRANSIT
      if (horasPasadas >= 48) {
        paquete.current_status = "TRANSIT";
      }
    }
    return { error: false, data: paquete };
  }


    // Si nada encaja, fallback genérico
    return { error: true, message: "Respuesta inesperada del servidor." };

  } catch (error) {
    console.error("Error consultando tracking:", error);
    return { error: true, message: "Error de conexión con el servidor." };
  }
}
