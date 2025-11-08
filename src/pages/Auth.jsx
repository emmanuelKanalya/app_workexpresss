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
import { div, p } from "framer-motion/client";
import Login from "../component/Login";
import { ThemeProvider } from "../component/ThemeProvider";
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
  const handleLogin = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
  const handleForgotPassword = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://app-prueba-wokrexpress.netlify.app/reset-password",
      });
      setLoading(false);

      if (error) {
        alert("Error: " + error.message);
        return false;
      } else {
        return true;
      }
    } catch (e) {
      alert("Error inesperado: " + e.message);
      return false;
    }
  };


  return (
    <ThemeProvider>
      <Login
        onLogin={(email, pass) => handleLogin(email, pass)}
        onForgotPassword={handleForgotPassword}
        onNavigate={() => { }}
      />

    </ThemeProvider>

  );
}
