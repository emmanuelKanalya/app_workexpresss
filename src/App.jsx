import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SplashScreen from "./component/SplashScreen";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ErrorPages from "./pages/NotFound";
import Seguimiento from "./pages/Seguimiento";
import Facturas from "./pages/Facturas";
import Perfil from "./pages/Perfil";
import ConfirmacionCorreo from "./pages/ConfirmacionCorreo";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import { ThemeProvider } from "./component/ThemeProvider"; // 👈 importa aquí

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    // 👇 Aquí el cambio importante
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/seguimiento"
              element={
                <PrivateRoute>
                  <Seguimiento />
                </PrivateRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
            <Route
              path="/facturas"
              element={
                <PrivateRoute>
                  <Facturas />
                </PrivateRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirmacion-correo" element={<ConfirmacionCorreo />} />
            <Route path="*" element={<ErrorPages />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
