import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Star,
  Loader2,
  Package,
  MapPin,
  Edit,
  Save,
  XCircle,
} from "lucide-react";

export default function Planes({ id_plan, clienteId, onPopup }) {
  const [plan, setPlan] = useState(null);
  const [sucursal, setSucursal] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [planesSucursal, setPlanesSucursal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // 🔹 Obtener plan, sucursal y fecha de última actualización del cliente
useEffect(() => {
  const fetchData = async () => {
    try {
      if (!id_plan || !clienteId) return;

      // 1️⃣ Traer datos del plan actual
      const { data: planData, error: planError } = await supabase
        .from("tb_plan")
        .select(`
          id_plan,
          descripcion,
          precio,
          beneficios
        `)
        .eq("id_plan", id_plan)
        .single();

      if (planError) throw planError;
      setPlan(planData);
      setSelectedPlan(planData.id_plan);

      // 2️⃣ Traer la sucursal actual del cliente (dato real desde BD)
      const { data: clienteData, error: clienteError } = await supabase
        .from("tb_cliente")
        .select(`
          id_cliente,
          id_sucursal (
            id_sucursal,
            nombre,
            direccion
          ),
          updated_at
        `)
        .eq("id_cliente", clienteId)
        .single();

      if (clienteError) throw clienteError;
      if (clienteData?.id_sucursal) {
        setSucursal(clienteData.id_sucursal);
        setSelectedSucursal(clienteData.id_sucursal.id_sucursal);
      }

      if (clienteData?.updated_at) {
        setLastUpdate(new Date(clienteData.updated_at));
      }
    } catch (err) {
      console.error("❌ Error al obtener datos:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id_plan, clienteId]);


  // 🔹 Cargar todas las sucursales disponibles
  useEffect(() => {
    const fetchSucursales = async () => {
      const { data, error } = await supabase
        .from("tb_sucursal")
        .select("id_sucursal, nombre");
      if (!error) setSucursales(data);
    };
    fetchSucursales();
  }, []);

  // 🔹 Cuando cambia la sucursal, cargar planes disponibles
  useEffect(() => {
    const fetchPlanesSucursal = async () => {
      if (!selectedSucursal) return;
      const { data, error } = await supabase
        .from("tb_plan")
        .select("id_plan, descripcion, precio, beneficios")
        .eq("id_sucursal", selectedSucursal);
      if (!error) setPlanesSucursal(data);
    };
    fetchPlanesSucursal();
  }, [selectedSucursal]);

  // 🔹 Guardar cambios con validación de tiempo (cada 4 meses)
  const handleSave = async () => {
    if (!clienteId || !selectedSucursal || !selectedPlan) {
      onPopup({
        show: true,
        success: false,
        message: "Faltan datos para guardar los cambios.",
      });
      return;
    }

    // ⏳ Validar si pasaron 4 meses desde el último cambio
    if (lastUpdate) {
      const fourMonthsAgo = new Date();
      fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
      if (lastUpdate > fourMonthsAgo) {
        onPopup({
          show: true,
          success: false,
          message: "Solo puedes cambiar de plan cada 4 meses.",
        });
        return;
      }
    }

    setSaving(true);
    try {
      // 1️⃣ Intentar actualizar
      const { error } = await supabase
        .from("tb_cliente")
        .update({
          id_sucursal: selectedSucursal,
          id_plan: selectedPlan,
        })
        .eq("id_cliente", clienteId);

      if (error) throw error;

      // 2️⃣ Volver a obtener el nuevo plan
      const { data: nuevoPlan, error: planError } = await supabase
        .from("tb_plan")
        .select(`
          id_plan,
          descripcion,
          precio,
          beneficios,
          id_sucursal (
            id_sucursal,
            nombre,
            direccion
          )
        `)
        .eq("id_plan", selectedPlan)
        .single();

      if (!planError) {
        setPlan(nuevoPlan);
        setSucursal(nuevoPlan.id_sucursal);
        setLastUpdate(new Date()); // Actualiza localmente el timestamp
      }

      onPopup({
        show: true,
        success: true,
        message: "Los cambios se guardaron correctamente.",
      });

      setEditMode(false);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      const msg =
        err.message?.includes("cuatro meses") ||
        err.message?.includes("four months")
          ? "Solo puedes cambiar de plan cada 4 meses."
          : "Error al guardar los cambios. Intenta nuevamente.";
      onPopup({
        show: true,
        success: false,
        message: msg,
      });
    } finally {
      setSaving(false);
    }
  };

  // 🌀 Loading
  if (loading)
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-center text-gray-500">
        <Loader2 className="animate-spin w-5 h-5 mr-2 text-[#b71f4b]" />
        Cargando plan...
      </div>
    );

  // 🚫 Sin plan
  if (!plan)
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm text-center text-gray-600">
        <Package className="mx-auto w-8 h-8 text-gray-400 mb-2" />
        <p>No tienes un plan asignado actualmente.</p>
      </div>
    );

  // ✅ Vista principal
return (
  <div
    className="relative rounded-2xl p-5 transition-all overflow-hidden shadow-md"
    style={{
      background: "linear-gradient(135deg, #b71f4b, #a01744)",
      color: "white",
    }}
  >
    {/* Encabezado */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-white text-base">Plan y Sucursal</h3>

      {!editMode ? (
        <button
          onClick={() => {
            const fourMonthsAgo = new Date();
            fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
            if (lastUpdate && lastUpdate > fourMonthsAgo) {
              onPopup({
                show: true,
                success: false,
                message:
                  "Aún no han pasado 4 meses desde tu último cambio de plan.",
              });
              return;
            }
            setEditMode(true);
          }}
          className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
          title="Editar plan"
        >
          <Edit size={16} className="text-white" />
        </button>
      ) : (
        <button
          onClick={() => setEditMode(false)}
          className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
          title="Cancelar edición"
        >
          <XCircle size={16} className="text-white" />
        </button>
      )}
    </div>

    {/* 🔸 Sucursal */}
    <div className="mb-3">
      {editMode ? (
        <div className="flex items-center gap-2 text-sm mb-1">
          <MapPin className="w-4 h-4 text-white" />
          <select
            value={selectedSucursal || ""}
            onChange={(e) => setSelectedSucursal(e.target.value)}
            className="flex-1 border border-white/30 bg-transparent text-white rounded-lg p-2 text-sm focus:ring-2 focus:ring-white/40"
          >
            <option value="" className="text-gray-700">
              Selecciona una sucursal
            </option>
            {sucursales.map((s) => (
              <option key={s.id_sucursal} value={s.id_sucursal} className="text-gray-800">
                {s.nombre}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-1 text-white" />
          <span className="font-medium">Sucursal:</span>
          <span className="ml-1 text-white/90">
            {sucursal?.nombre || "No disponible"}
          </span>
        </div>
      )}
    </div>

    {/* 🔸 Plan */}
    {!editMode ? (
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-white">{plan.descripcion}</h4>
          <p className="text-sm text-white/80">{plan.beneficios}</p>
          <p className="text-3xl font-extrabold mt-3 tracking-tight">
            ${plan.precio.toFixed(2)}
            <span className="text-base text-white/70 font-medium ml-1">/ Libra</span>
          </p>
        </div>
        <div className="bg-white/15 text-white p-3 rounded-full">
          <Star className="w-5 h-5" />
        </div>
      </div>
    ) : (
      <>
        <div className="space-y-2">
          {planesSucursal.length === 0 ? (
            <p className="text-white/80 text-sm">
              No hay planes disponibles para esta sucursal.
            </p>
          ) : (
            planesSucursal.map((p) => (
              <div
                key={p.id_plan}
                onClick={() => setSelectedPlan(p.id_plan)}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedPlan === p.id_plan
                    ? "border-white bg-white/10"
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <h4 className="font-semibold text-white">{p.descripcion}</h4>
                <p className="text-sm text-white/80">{p.beneficios}</p>
                <p className="text-white font-bold mt-1">
                  ${p.precio.toFixed(2)}{" "}
                  <span className="text-xs text-white/70">/ Libra</span>
                </p>
              </div>
            ))
          )}
        </div>

        {/* 🔘 Botón para guardar */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-white text-[#b71f4b] px-5 py-2 rounded-lg font-medium transition-all hover:bg-gray-100"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Guardar cambios
              </>
            )}
          </button>
        </div>
      </>
    )}
  </div>
);



}
