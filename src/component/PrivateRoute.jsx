import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-20">Cargando...</p>;
  if (!user) return <Navigate to="/" replace />;

  return children;
}
