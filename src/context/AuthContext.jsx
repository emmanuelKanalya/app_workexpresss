import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // tu cliente ya configurado

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar sesión actual al iniciar la app
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error obteniendo sesión:", error);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    fetchUser();

    // 🔹 Escuchar cambios de sesión (login, logout, refresh)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usarlo más fácil
export const useAuth = () => useContext(AuthContext);
