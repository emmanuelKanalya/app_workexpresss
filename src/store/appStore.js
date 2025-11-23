import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

export const useAppStore = create((set, get) => ({
  cliente: null,
  paquetes: [],
  loadedCliente: false,
  loadedPaquetes: false,
  realtimeIniciado: false,

  cargarCliente: async (email) => {
    if (!email) return;
    if (get().loadedCliente) return;

    const { data, error } = await supabase
      .from("tb_cliente")
      .select(`
        id_cliente,
        nombre,
        apellido,
        id_sucursal(
          id_sucursal,
          nombre,
          direccion
        )
      `)
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.log("Error cargarCliente:", error);
      return;
    }

    set({
      cliente: data
        ? {
          id_cliente: data.id_cliente,
          nombre: data.nombre,
          apellido: data.apellido,
          sucursal: data.id_sucursal?.nombre || "",
        }
        : null,
      loadedCliente: true,
    });
  },
  consultarTracking: async (tracking_id) => {
    const { data, error } = await supabase
      .from("tb_paquetes")
      .select("*")
      .eq("tracking_id", tracking_id)
      .maybeSingle();

    return { data, error };
  },

  cargarPaquetes: async (id_cliente) => {
  if (!id_cliente) return;

  // 🔥 INICIAR REALTIME *ANTES DE TODO*
  get().iniciarRealtimePaquetes(id_cliente);

  // ❌ NO USAR loadedPaquetes PARA BLOQUEAR LA CARGA
  const { data, error } = await supabase
    .from("tb_paquetes")
    .select(
      "id_paquetes, tracking_id, nombre_en_etiqueta, estado, peso_real, largo, ancho, altura, created_at"
    )
    .eq("id_cliente", id_cliente)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error cargarPaquetes:", error);
    return;
  }

  set({
    paquetes: data || [],
    loadedPaquetes: true, // opcional, pero ya no se usa para bloquear nada
  });
},


  iniciarRealtimePaquetes: (id_cliente) => {
    if (!id_cliente) return;
    if (get().realtimeIniciado) return;

    console.log("🔌 Iniciando Realtime...");
    console.log("🟥 realtimeIniciado:", get().realtimeIniciado);
    const channel = supabase
      .channel("rt-paquetes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tb_paquetes" },
        (payload) => {
          console.log("📡 Cambio realtime:", payload);

          if (payload.eventType === "INSERT") {
            if (payload.new.id_cliente === id_cliente) {
              set((state) => ({
                paquetes: [payload.new, ...state.paquetes],
              }));
            }
          }


          if (payload.eventType === "UPDATE") {
            if (payload.new.id_cliente === id_cliente) {
              set((state) => ({
                paquetes: state.paquetes.map((p) =>
                  p.id_paquetes === payload.new.id_paquetes ? payload.new : p
                ),
              }));
            }
          }


          if (payload.eventType === "DELETE") {
              set((state) => ({
                paquetes: state.paquetes.filter(
                  (p) => p.id_paquetes !== payload.old.id_paquetes
                ),
              }));
          }

        }
      )
      .subscribe();


    set({ realtimeIniciado: true });
  },

  limpiarCache: () => {
    console.log("🧹 Limpiando cache y realtime.");

    supabase.removeAllChannels();

    set({
      cliente: null,
      paquetes: [],
      loadedCliente: false,
      loadedPaquetes: false,
      realtimeIniciado: false,
    });
  },
}));
