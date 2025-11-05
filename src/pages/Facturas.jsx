import { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import BottomNav from "../component/BottomNav";
import {
  FileText,
  Eye,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function Facturas() {
  const [tab, setTab] = useState("pendientes");
  const [selected, setSelected] = useState([]);
  const [preview, setPreview] = useState(false);
  const [showBottom, setShowBottom] = useState(true); // 👈 controlar visibilidad del BottomNav

  useEffect(() => {
    // Ocultar menú si hay preview de pago
    setShowBottom(!preview);
  }, [preview]);

  const facturas = [
    {
      codigo: "87424361890",
      monto: 192.79,
      estado: "PENDIENTE",
      emitida: "27/10/2025",
      vence: "26/11/2025",
    },
    {
      codigo: "87424361832",
      monto: 92.79,
      estado: "PENDIENTE",
      emitida: "27/10/2025",
      vence: "26/11/2025",
    },
    {
      codigo: "874233436181",
      monto: 92.79,
      estado: "PENDIENTE",
      emitida: "27/10/2025",
      vence: "26/11/2025",
    },
    {
      codigo: "8742436190",
      monto: 110.25,
      estado: "PENDIENTE",
      emitida: "02/11/2025",
      vence: "02/12/2025",
    },
    {
      codigo: "8742436170",
      monto: 150.0,
      estado: "PAGADA",
      emitida: "10/09/2025",
      vence: "10/10/2025",
    },
  ];

  const pendientes = facturas.filter((f) => f.estado === "PENDIENTE");
  const pagadas = facturas.filter((f) => f.estado === "PAGADA");

  const toggleSelect = (codigo) => {
    setSelected((prev) =>
      prev.includes(codigo)
        ? prev.filter((id) => id !== codigo)
        : [...prev, codigo]
    );
  };

  const total = pendientes
    .filter((f) => selected.includes(f.codigo))
    .reduce((sum, f) => sum + f.monto, 0)
    .toFixed(2);

  const allSelected =
    pendientes.length > 0 && selected.length === pendientes.length;

  const toggleSelectAll = () => {
    if (allSelected) setSelected([]);
    else setSelected(pendientes.map((f) => f.codigo));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-20 pb-24 md:pb-0 p-6">
        {/* 🔹 Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Mis Facturas</h1>
        <p className="text-sm text-gray-500 mb-4">
          Gestiona y paga tus facturas pendientes
        </p>

        {/* 🔹 Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-5">
          <button
            onClick={() => setTab("pendientes")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              tab === "pendientes"
                ? "bg-[#b71f4b] text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Pendientes ({pendientes.length})
          </button>
          <button
            onClick={() => setTab("pagadas")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              tab === "pagadas"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Pagadas ({pagadas.length})
          </button>
        </div>

        {/* 🔹 Sección Pendientes */}
        {tab === "pendientes" && (
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">
                Pendientes
              </span>
              <label className="flex items-center text-sm gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="accent-[#b71f4b]"
                />
                Seleccionar todas
              </label>
            </div>

            <div className="space-y-3">
              {pendientes.map((f) => (
                <div
                  key={f.codigo}
                  className={`bg-white rounded-2xl p-4 border-2 ${
                    selected.includes(f.codigo)
                      ? "border-[#b71f4b]"
                      : "border-transparent"
                  } shadow-sm`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(f.codigo)}
                        onChange={() => toggleSelect(f.codigo)}
                        className="mt-1 accent-[#b71f4b]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#b71f4b]" />
                          <h3 className="font-semibold text-gray-800 text-sm">
                            ST-{f.codigo}
                          </h3>
                          <span className="text-gray-900 font-bold text-sm">
                            ${f.monto}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Emitida: {f.emitida}
                        </p>
                        <p className="text-xs text-gray-500">
                          Vence: {f.vence}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setPreview(f)}
                    className="mt-3 text-[#b71f4b] text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    <Eye size={15} /> Ver detalles
                  </button>
                </div>
              ))}
            </div>

            {/* 🔹 Resumen */}
            {selected.length > 0 && (
              <div className="mt-6 bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-[#b71f4b]" />
                  Resumen de Pago
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {selected.length} factura
                  {selected.length > 1 ? "s seleccionadas" : " seleccionada"}
                </p>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  {pendientes
                    .filter((f) => selected.includes(f.codigo))
                    .map((f) => (
                      <div
                        key={f.codigo}
                        className="flex justify-between text-sm text-gray-700 border-b border-gray-100 last:border-none py-1"
                      >
                        <span>ST-{f.codigo}</span>
                        <span>${f.monto}</span>
                      </div>
                    ))}
                </div>

                <div className="flex justify-between font-semibold text-gray-700 mb-4">
                  <span>Total a Pagar:</span>
                  <span className="text-[#b71f4b]">${total}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => alert("Vista previa")}
                    className="flex-1 border border-[#b71f4b] text-[#b71f4b] py-2 rounded-xl text-sm font-medium hover:bg-[#fff1f6]"
                  >
                    Ver Preview
                  </button>
                  <button
                    onClick={() => setPreview(true)}
                    className="flex-1 bg-[#b71f4b] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#a01744]"
                  >
                    <CreditCard className="inline w-4 h-4 mr-1" />
                    Pagar Ahora
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* 🔹 Sección Pagadas */}
        {tab === "pagadas" && (
          <div className="space-y-3">
            {pagadas.map((f) => (
              <div
                key={f.codigo}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">
                        ST-{f.codigo}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Emitida: {f.emitida}
                      </p>
                      <p className="text-xs text-gray-500">
                        Vence: {f.vence}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    PAGADA
                  </span>
                </div>

                <button className="mt-3 text-[#b71f4b] text-sm font-medium flex items-center gap-1 hover:underline">
                  <Eye size={15} /> Ver detalles
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Vista previa del pago */}
        {preview && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-end md:items-center z-50">
            <div className="bg-white w-full md:w-[420px] rounded-t-3xl md:rounded-3xl shadow-2xl p-6 relative animate-fadeIn">
              <button
                onClick={() => setPreview(false)}
                className="absolute top-3 left-3 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft size={20} />
              </button>

              <h3 className="text-lg font-semibold text-gray-800 text-center">
                Vista Previa del Pago
              </h3>
              <p className="text-sm text-gray-500 text-center mb-5">
                Revisa los detalles antes de confirmar el pago
              </p>

              <div className="bg-pink-50 rounded-xl p-4 mb-4 text-sm">
                <h4 className="font-semibold text-[#b71f4b] mb-1">
                  Tu Empresa S.A.
                </h4>
                <p className="text-gray-600">
                  Av. Principal 123, Ciudad
                  <br />
                  +1 234 567 890 — contacto@empresa.com
                </p>
                <p className="text-xs mt-2 text-gray-500">Comprobante de Pago</p>
              </div>

              <div className="text-sm text-gray-700 mb-4">
                <p>
                  <strong>Cliente:</strong> Juan Pérez
                </p>
                <p>
                  <strong>ID Cliente:</strong> #CLT-001234
                </p>
                <p>
                  <strong>Fecha:</strong> 04/11/2025
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                {pendientes
                  .filter((f) => selected.includes(f.codigo))
                  .map((f) => (
                    <div
                      key={f.codigo}
                      className="flex justify-between text-sm text-gray-700 border-b border-gray-100 last:border-none py-1"
                    >
                      <span>ST-{f.codigo}</span>
                      <span>${f.monto}</span>
                    </div>
                  ))}
              </div>

              <div className="flex justify-between font-semibold text-gray-700 mb-4">
                <span>Total a Pagar:</span>
                <span className="text-[#b71f4b]">${total}</span>
              </div>

              <button className="w-full bg-[#b71f4b] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#a01744] mb-3 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Confirmar Pago ${total}
              </button>

              <button
                onClick={() => setPreview(false)}
                className="w-full border border-gray-300 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 🔹 Ocultar BottomNav si preview está abierto */}
      {showBottom && <BottomNav />}
    </div>
  );
}
