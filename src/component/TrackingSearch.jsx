import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabaseClient"; // <-- IMPORTA supabase

export function TrackingSearch({ onSearch, isLoading }) {
  const [trackingId, setTrackingId] = useState("");
  const [inputError, setInputError] = useState("");

  const validateTrackingId = (id) => {
    const trimmedId = id.trim();

    if (!trimmedId) {
      return "Por favor ingresa un número de rastreo";
    }

    if (trimmedId.length < 8) {
      return "El número de rastreo debe tener al menos 8 caracteres";
    }

    if (trimmedId.length > 50) {
      return "El número de rastreo es demasiado largo";
    }

    if (!/^[A-Za-z0-9]+$/.test(trimmedId)) {
      return "El número de rastreo solo puede contener letras y números";
    }

    return null;
  };

  // --- Guardar en DB en segundo plano, silencioso ---
  const logTrackingSilently = async (id) => {
    // no await en el caller; aquí manejamos errores localmente y los ignoramos
    try {
      // intenta insertar;
      // si tienes una constraint UNIQUE en tracking_id puede fallar con duplicate
      const { data, error } = await supabase
        .from("tb_paquetes")
        .insert([{ tracking_id: id }]);

      if (error) {
        // Ignora errores por duplicado o por permisos; opcional: detecta por mensaje/código
        const msg = (error?.message || "").toLowerCase();
        if (msg.includes("duplicate") || msg.includes("unique") || error?.code === "23505") {
          // registro ya existe -> OK, no mostrar nada
          return;
        }

        // En desarrollo, puedes loggear para debug sin mostrar al usuario:
        if (process.env.NODE_ENV === "development") console.debug("logTracking error:", error);
        // no propagar el error al UI
      }
      // si quieres, puedes manejar data (no necesario)
    } catch (err) {
      // swallow all network/other errors to keeplo silent
      if (process.env.NODE_ENV === "development") console.debug("logTracking exception:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError("");

    const validationError = validateTrackingId(trackingId);
    if (validationError) {
      setInputError(validationError);
      return;
    }

    const id = trackingId.trim().toUpperCase();

    // 1) Ejecuta la búsqueda visible para el usuario
    onSearch(id);

    // 2) Graba silenciosamente en la BD en background (no await)
    logTrackingSilently(id);

    // 3) opcional: limpia input o deja como está
    // setTrackingId("");
  };

  const handleInputChange = (e) => {
    setTrackingId(e.target.value);
    if (inputError) {
      setInputError("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ingresa tu número de rastreo"
              value={trackingId}
              onChange={handleInputChange}
              className={`w-full h-12 sm:h-14 pl-4 pr-12 text-base sm:text-lg border-2 rounded-xl focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md ${
                inputError
                  ? "border-[#e74c3c] focus:border-[#b71f4b] bg-red-50/30"
                  : "border-gray-200 focus:border-[#b71f4b] bg-white hover:border-gray-300 focus:shadow-lg focus:shadow-[#b71f4b]/20"
              }`}
            />
            {!inputError && (
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            )}
            {inputError && (
              <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#e74c3c]" />
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !!inputError}
            className={`h-12 sm:h-14 px-6 sm:px-8 flex items-center justify-center gap-2 rounded-xl text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
              isLoading || inputError
                ? "bg-gray-400 cursor-not-allowed shadow-none transform-none"
                : "bg-[#b71f4b] hover:bg-[#a01744]"
            }`}
          >                  
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Buscando...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Rastrear</span>
              </>
            )}
          </button>
        </div>

        {inputError && (
          <div className="mt-4 flex items-start gap-3 text-[#b71f4b] text-sm bg-[#fdecef] border border-[#f3c2cc] rounded-xl px-4 py-3 shadow-sm animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{inputError}</span>
          </div>
        )}
      </form>
    </div>
  );
}
