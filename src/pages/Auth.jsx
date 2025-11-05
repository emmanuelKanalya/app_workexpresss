import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Popup from "../component/Popup";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  IdCard,
  MapPin,
  Building2,
  Package,
} from "lucide-react";
import logo from "../assets/icon/mini_target.webp";
import willy from "../assets/willyLogin.webp";
import { supabase } from "../lib/supabaseClient";
export default function Auth() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
  const [showPopup, setShowPopup] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo_principal: "",
    apellido: "",
    telefono: "",
    cedula: "",
    direccion: "",
    sucursal_preferida: "",
    plan: "",
    password: "",
  });
  useEffect(() => {
    const savedForm = localStorage.getItem("workexpress_form");
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        // Si detecta un id viejo, lo limpia
        if (parsed.plan && parsed.plan.includes("_")) parsed.plan = "";
        setForm(parsed);
      } catch (err) {
        console.warn("Error restaurando formulario:", err);
      }
    }
  }, []);
  useEffect(() => {
    const fetchSucursales = async () => {
      const { data, error } = await supabase
        .from("tb_sucursal")
        .select("nombre, id_sucursal")
        .eq("estado", true);

      if (error) console.error("Error cargando sucursales:", error);
      else setSucursales(data || []);
    };

    const fetchPlanes = async () => {
      const { data, error } = await supabase
        .from("tb_plan")
        .select("id_plan, descripcion, id_sucursal, precio, beneficios, estado_plan");

      if (error) console.error("❌ Error cargando planes:", error.message);

      else setPlanes(data);
      
    };

    fetchSucursales();
    fetchPlanes();
  }, []);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };



  // 🔹 LOGIN
  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.correo_principal,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      setPopup({
        show: true,
        message: "Error al iniciar sesión: " + error.message,
        type: "error",
      });
    } else {
      setPopup({
        show: true,
        message: "Sesión iniciada correctamente.",
        type: "success",
      });

      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => navigate("/Home"), 1000);
    }
  };


  // 🔹 REGISTRO (modificado)
  const handleRegister = async () => {
    setLoading(true);

    // 🔹 Crear usuario en Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.correo_principal,
      password: form.password,
      options: {
        emailRedirectTo: "https://app-prueba-wokrexpress.netlify.app/confirmacion-correo",
      },
    });

    if (authError) {
      setPopup({
        show: true,
        message: "Error al registrarse: " + authError.message,
        type: "error",
      });
      setLoading(false);
      return;
    }


    const { data: sucursalData, error: sucursalError } = await supabase
      .from("tb_sucursal")
      .select("id_sucursal, nombre")
      .eq("id_sucursal", form.sucursal_preferida)
      .maybeSingle();


    if (sucursalError) {
      console.error("❌ Error al buscar sucursal:", sucursalError.message);
    }

    if (!sucursalData) {
      setPopup({
        show: true,
        message: "No se encontró la sucursal seleccionada.",
        type: "error",
      });
      setLoading(false);
      return;
    }



    const { data: planData, error: planError } = await supabase
      .from("tb_plan")
      .select("id_plan, descripcion, id_sucursal")
      .eq("descripcion", form.plan.trim())
      .maybeSingle();

    if (planData.id_sucursal !== sucursalData.id_sucursal) {
    }


    if (planError) {
      console.error("❌ Error al buscar plan:", planError.message);
    }


    if (!planData) {
      setPopup({
        show: true,
        message: "No se encontró el plan seleccionado.",
        type: "error",
      });
      setLoading(false);
      return;
    }
    // 🔹 Insertar en tb_cliente
    const { error: insertError } = await supabase.from("tb_cliente").insert([
      {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.correo_principal,
        telefono: form.telefono,
        cedula: form.cedula,
        direccion: form.direccion,
        id_sucursal: sucursalData.id_sucursal,
        id_plan: planData.id_plan,
        seguro: true,
      },
    ]);

    setLoading(false);

    if (insertError) {
      setPopup({
        show: true,
        message: "Error guardando cliente: " + insertError.message,
        type: "error",
      });
    } else {
      localStorage.removeItem("workexpress_form");
      setPopup({
        show: true,
        message: "Registro exitoso. Revisa tu correo para confirmar la cuenta.",
        type: "success",
      });
      setIsRegister(false);
    }
  };




  // 🔹 RECUPERAR CONTRASEÑA
  const handleForgotPassword = async () => {
    if (!form.correo_principal) {
      alert("Por favor ingresa tu correo.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(form.correo_principal, {
      redirectTo: "https://app-prueba-wokrexpress.netlify.app/reset-password",
    });
    setLoading(false);

    if (error) alert("Error: " + error.message);
    else alert("📧 Correo de recuperación enviado.");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between md:flex-row bg-white text-graydark">
      {/* 🔹 Columna izquierda (formulario) */}
      <div className="flex flex-col justify-between w-full md:w-1/2 bg-white md:bg-white">
        <div
          className="w-full flex flex-col justify-between min-h-screen text-graydark 
          bg-no-repeat bg-center bg-cover md:bg-none
          "
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${willy})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <div className="h-screen md:bg-none md:bg-white flex flex-col justify-between">
            {/* 🔹 Logo y texto (arriba) */}
            <div className="flex flex-col items-center mt-8 text-center">
              <img src={logo} alt="WorkExpress Logo" className="w-20 mb-2" />
              <h1 className="text-white md:text-[#b71f4b] text-lg font-bold tracking-wide">
                WorkExpress.Online
              </h1>
              <p className="text-[#f2af1e] md:text-gray-600 text-sm font-medium">
                {isRegister
                  ? "Crea tu cuenta para comenzar"
                  : "¡Gestiona tus envíos fácilmente!"}
              </p>
            </div>

            {/* 🔹 Contenedor animado adaptable (centro/pie) */}
            <motion.div
              layout
              className="relative w-full overflow transition-all duration-500"
            >
              <AnimatePresence mode="wait">
                {!isRegister && !isForgotPassword ? (
                  // LOGIN
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className=" bg-white p-6 rounded-t-3xl shadow-lg"
                  >
                    <h2 className="text-center text-2xl font-semibold text-graydark mb-2">
                      Iniciar Sesión
                    </h2>
                    <p className="text-center text-graylight text-sm mb-6">
                      Accede a tu cuenta para gestionar tus envíos
                    </p>

                    {/* Correo */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-graydark mb-1">
                        Correo Electrónico
                      </label>
                      <div
                        className={`flex items-center border rounded-lg px-3 py-2 transition-colors duration-200 ${focusedField === "email"
                          ? "ring-2 ring-[#b71f4b]"
                          : "border-gray-300"
                          }`}
                      >
                        <Mail
                          className={`mr-2 w-5 h-5 ${focusedField === "email"
                            ? "text-[#b71f4b]"
                            : "text-gray-400"
                            }`}
                        />
                        <input
                          type="email"
                          name="correo_principal"
                          value={form.correo_principal}
                          onChange={handleChange}
                          placeholder="tu@ejemplo.com"
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField("")}
                          className="w-full outline-none text-sm bg-transparent text-gray-700"
                        />
                      </div>
                    </div>

                    {/* Contraseña */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-graydark mb-1">
                        Contraseña
                      </label>
                      <div
                        className={`flex items-center border rounded-lg px-3 py-2 transition-colors duration-200 ${focusedField === "password"
                          ? "ring-2 ring-[#b71f4b]"
                          : "border-gray-300"
                          }`}
                      >
                        <Lock
                          className={`mr-2 w-5 h-5 ${focusedField === "password"
                            ? "text-[#b71f4b]"
                            : "text-gray-400"
                            }`}
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Ingresa tu contraseña"
                          onFocus={() => setFocusedField("password")}
                          onBlur={() => setFocusedField("")}
                          className="w-full outline-none text-sm bg-transparent text-gray-700"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Recordar / Recuperar */}
                    <div className="flex items-center justify-between text-sm mb-6">
                      <label className="flex items-center text-gray-600">
                        <input type="checkbox" className="mr-2 accent-[#b71f4b]" />
                        Recordarme
                      </label>
                      <button
                        className="text-[#b71f4b] hover:underline"
                        onClick={() => setIsForgotPassword(true)}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    {/* Botón */}
                    <button
                      onClick={handleLogin}
                      className="w-full bg-[#b71f4b] text-white py-2.5 rounded-lg font-semibold hover:bg-[#a01744] transition-all"
                    >
                      Iniciar Sesión
                    </button>

                    <p className="text-center text-graydark text-sm mt-4">
                      ¿No tienes una cuenta?{" "}
                      <button
                        onClick={() => setIsRegister(true)}
                        className="text-[#b71f4b] font-semibold hover:underline"
                      >
                        Regístrate gratis
                      </button>
                    </p>
                  </motion.div>
                ) : isForgotPassword ? (
                  // 🔹 FORMULARIO DE RECUPERAR CONTRASEÑA
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-t-3xl shadow-lg"
                  >
                    <h2 className="text-center text-2xl font-semibold text-graydark mb-2">
                      Recuperar Contraseña
                    </h2>
                    <p className="text-center text-graylight text-sm mb-6">
                      Ingresa tu correo electrónico para restablecer tu contraseña
                    </p>

                    {/* Correo */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-graydark mb-1">
                        Correo Electrónico
                      </label>
                      <div
                        className={`flex items-center border rounded-lg px-3 py-2 transition-colors duration-200 ${focusedField === "email" ? "ring-2 ring-[#b71f4b]" : "border-gray-300"
                          }`}
                      >
                        <Mail
                          className={`mr-2 w-5 h-5 ${focusedField === "email" ? "text-[#b71f4b]" : "text-gray-400"
                            }`}
                        />
                        <input
                          type="email"
                          name="correo_principal"
                          value={form.correo_principal}
                          onChange={handleChange}
                          placeholder="tu@ejemplo.com"
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField("")}
                          className="w-full outline-none text-sm bg-transparent text-gray-700"
                        />
                      </div>
                    </div>

                    {/* 🔹 Aquí llamas la función real */}
                    <button
                      onClick={handleForgotPassword}
                      disabled={loading}
                      className={`w-full py-2.5 rounded-lg font-semibold transition-all ${loading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-[#b71f4b] text-white hover:bg-[#a01744]"
                        }`}
                    >
                      {loading ? "Enviando..." : "Recuperar Contraseña"}
                    </button>

                    <p className="text-center text-graydark text-sm mt-4">
                      ¿Recordaste tu contraseña?{" "}
                      <button
                        onClick={() => setIsForgotPassword(false)}
                        className="text-[#b71f4b] font-semibold hover:underline"
                      >
                        Volver a Iniciar Sesión
                      </button>
                    </p>
                  </motion.div>

                ) : (
                  // REGISTRO
                  <AnimatePresence mode="wait">
                    {!showPasswordStep ? (
                      // Paso 1: datos y plan
                      <motion.form
                        key="register-step1"
                        onSubmit={(e) => {
                          e.preventDefault();

                          // 🔹 Forzar sincronización inmediata de los datos
                          setForm((prev) => ({
                            ...prev,
                            sucursal_preferida: prev.sucursal_preferida.trim(),
                            nombre: prev.nombre.trim(),
                            apellido: prev.apellido.trim(),
                            correo_principal: prev.correo_principal.trim(),
                            telefono: prev.telefono.trim(),
                            cedula: prev.cedula.trim(),
                            direccion: prev.direccion.trim(),
                          }));

                          // 🔹 Validaciones mínimas
                          if (!form.sucursal_preferida || !form.plan) {
                            setPopup({
                              show: true,
                              message: "Selecciona una sucursal y un plan antes de continuar.",
                              type: "warning", // puedes usar "error" si prefieres
                            });
                            return;
                          }

                          // 🔹 Persistir temporalmente (por si refrescan o navegan)
                          localStorage.setItem("workexpress_form", JSON.stringify(form));

                          // 🔹 Cambiar al paso de contraseña
                          setShowPasswordStep(true);
                        }}

                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-6 rounded-t-3xl shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          {/* 🔹 Botón de regreso */}
                          <button
                            type="button"
                            onClick={() => {
                              // 🔹 Cierra cualquier paso de registro o recuperación
                              setIsRegister(false);
                              setIsForgotPassword(false);
                              setShowPasswordStep(false);

                              // 🔹 Limpia campos del formulario si quieres
                              setForm({
                                ...form,
                                password: "",
                              });
                            }}
                            className="text-[#b71f4b] hover:text-[#a01744] p-1 transition-all rounded-full hover:bg-[#b71f4b]/10"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>



                          {/* Título centrado */}
                          <div className="flex-1 text-center -ml-6">
                            <h2 className="text-2xl font-semibold text-graydark">Registro de Cliente</h2>
                            <p className="text-sm text-graylight -mt-1">Completa tus datos para continuar</p>
                          </div>

                          {/* Espaciador visual para mantener simetría */}
                          <div className="w-6" />
                        </div>



                        {/* Nombre */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-graydark mb-1">
                            Nombre
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <User className="text-[#b71f4b] mr-2 w-5 h-5" />
                            <input
                              type="text"
                              name="nombre"
                              value={form.nombre}
                              onChange={handleChange}
                              placeholder="Nombre"
                              required
                              className="w-full outline-none text-sm text-graydark"
                            />
                          </div>
                        </div>

                        {/* Apellido */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-graydark mb-1">
                            Apellido
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <User className="text-[#b71f4b] mr-2 w-5 h-5" />
                            <input
                              type="text"
                              name="apellido"
                              value={form.apellido}
                              onChange={handleChange}
                              placeholder="Apellido"
                              required
                              className="w-full outline-none text-sm text-graydark"
                            />
                          </div>
                        </div>

                        {/* Correo */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-graydark mb-1">
                            Correo Electrónico
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <Mail className="text-[#b71f4b] mr-2 w-5 h-5" />
                            <input
                              type="email"
                              name="correo_principal"
                              value={form.correo_principal}
                              onChange={handleChange}
                              placeholder="tu@ejemplo.com"
                              required
                              className="w-full outline-none text-sm text-graydark"
                            />
                          </div>
                        </div>

                        {/* Teléfono */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-graydark mb-1">
                            Teléfono
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <Phone className="text-[#b71f4b] mr-2 w-5 h-5" />
                            <input
                              type="text"
                              name="telefono"
                              value={form.telefono}
                              onChange={handleChange}
                              placeholder="+507 6000-0000"
                              className="w-full outline-none text-sm text-graydark"
                            />
                          </div>
                        </div>

                        {/* Cédula */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-graydark mb-1">
                            Cédula
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <IdCard className="text-[#b71f4b] mr-2 w-5 h-5" />
                            <input
                              type="text"
                              name="cedula"
                              value={form.cedula}
                              onChange={handleChange}
                              placeholder="Ej: 8-888-888"
                              className="w-full outline-none text-sm text-graydark"
                            />
                          </div>
                        </div>

                        {/* Dirección */}
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-graydark mb-1">
                            Dirección
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <MapPin className="text-[#b71f4b] mr-2 w-5 h-5" />
                            <input
                              type="text"
                              name="direccion"
                              value={form.direccion}
                              onChange={handleChange}
                              placeholder="Ciudad, Provincia"
                              className="w-full outline-none text-sm text-graydark"
                            />
                          </div>
                        </div>

                        {/* Sucursal */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium mb-1">
                            Sucursal de preferencia
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <Building2 className="w-5 h-5 text-[#b71f4b] mr-2" />
                            <select
                              name="sucursal_preferida"
                              value={form.sucursal_preferida}
                              onChange={handleChange}
                              className="w-full outline-none text-sm bg-transparent"
                            >
                              <option value="">Seleccionar sucursal</option>
                              {sucursales.map((suc, index) => (
                                <option key={index} value={suc.id_sucursal}>
                                  {suc.nombre}
                                </option>
                              ))}
                            </select>



                          </div>
                        </div>
                        {/* Planes dinámicos */}
                        {form.sucursal_preferida && (
                          <div className="mb-6">

                            <div className="space-y-4">
                              {planes
                                .filter(
                                  (p) =>
                                    p.estado_plan &&
                                    p.id_sucursal === form.sucursal_preferida // comparación directa de GUID
                                )

                                .map((plan, i) => (
                                  <motion.div
                                    key={i}
                                    onClick={() => {
                                      const updatedForm = { ...form, plan: plan.descripcion };
                                      setForm(updatedForm);
                                      localStorage.setItem("workexpress_form", JSON.stringify(updatedForm));
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    animate={
                                      form.plan === plan.descripcion
                                        ? {
                                          scale: [1, 1.05, 1],
                                          boxShadow: "0 0 20px rgba(183,31,75,0.25)",
                                        }
                                        : { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                                    }
                                    transition={{ duration: 0.3 }}
                                    className={`border rounded-xl p-4 shadow-sm cursor-pointer transition-all ${form.plan === plan.descripcion
                                        ? "border-[#b71f4b] bg-[#fff4f7]"
                                        : "border-gray-200 hover:border-[#b71f4b]/40"
                                      }`}
                                  >
                                    <div className="flex justify-between items-center mb-2">
                                      <h3 className="text-lg font-semibold text-graydark">
                                        {plan.descripcion}
                                      </h3>
                                      {form.plan === plan.descripcion && (
                                        <motion.span
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                          }}
                                          className="text-xs bg-[#b71f4b] text-white px-2 py-0.5 rounded-full"
                                        >
                                          Seleccionado
                                        </motion.span>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="text-2xl font-bold text-[#b71f4b]">
                                        ${plan.precio} x Libra
                                      </p>
                                    </div>

                                    <ul className="text-sm text-gray-600">
                                      <li>✔ {plan.beneficios}</li>
                                    </ul>
                                  </motion.div>
                                ))}


                            </div>
                          </div>
                        )}
                        <button
                          type="submit"
                          className="w-full bg-[#b71f4b] text-white py-2.5 rounded-lg font-semibold hover:bg-[#a01744] transition-all"
                        >
                          Continuar
                        </button>
                      </motion.form>
                    ) : (
                      // Paso 2: contraseña
                      <motion.form
                        key="register-step2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleRegister();
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white p-6 rounded-t-3xl shadow-lg"
                      >
                        {/* 🔹 Encabezado con flecha e título */}
                        <div className="flex items-center justify-between mb-2">
                          <button
                            type="button"
                            onClick={() => setShowPasswordStep(false)}
                            className="text-[#b71f4b] hover:text-[#a01744] transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>

                          <h2 className="text-center flex-1 text-2xl font-semibold text-graydark">
                            Crea tu Contraseña
                          </h2>
                          <div className="w-6" /> {/* espacio simétrico al lado derecho */}
                        </div>

                        <p className="text-center text-graylight text-sm mb-6">
                          Solo falta proteger tu cuenta
                        </p>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-graydark mb-1">
                            Contraseña
                          </label>
                          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-[#b71f4b]">
                            <Lock className="text-[#b71f4b] mr-2 w-5 h-5" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={form.password}
                              onChange={handleChange}
                              placeholder="Mínimo 8 caracteres"
                              required
                              className="w-full outline-none text-sm text-graydark"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className={`w-full py-2.5 rounded-lg font-semibold transition-all ${loading
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-[#b71f4b] text-white hover:bg-[#a01744]"
                            }`}
                        >
                          {loading ? "Creando..." : "Crear Cuenta"}
                        </button>
                      </motion.form>

                    )}
                  </AnimatePresence>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 🔹 Popup u otros elementos (debajo si aplica) */}
            <Popup
              show={popup.show}
              message={popup.message}
              type={popup.type}
              onClose={() => setPopup({ ...popup, show: false })}
            />
          </div>

        </div>
      </div>
      {/* Columna derecha: imagen decorativa */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${willy})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" w-full h-full flex flex-col justify-center items-center text-white text-center p-10">
          <img src={logo} alt="WorkExpress Logo" className="w-28 mb-4" />
          <h2 className="text-4xl font-bold mb-2">WorkExpress</h2>
          <p className="text-lg font-medium">
            ¡Compra sin estrés, compra con WorkExpress!
          </p>
        </div>
      </div>
    </div>

  );
}
