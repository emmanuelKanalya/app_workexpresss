import { useEffect, useRef, useState } from "react";
import logo from "../assets/icon/mini_target.webp";

function SplashScreen({ onFinish }) {
  const [dots, setDots] = useState("");
  const canvasRef = useRef(null);

  // 🔹 Animación de puntos
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Partículas sutiles (brillantes)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        gradient.addColorStop(0, "rgba(255, 215, 0, 0.8)");
        gradient.addColorStop(1, "rgba(255, 215, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // 🔹 Duración
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-50">
      {/* Fondo animado: degradado suave con mezcla oscura */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#3b0a14] to-[#b71f4b] animate-gradient-x" />

      {/* Partículas */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute inset-0 opacity-70"
      />

      {/* Logo con sutil glow */}
      <div className="relative z-10 flex flex-col items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-28 h-28 md:w-32 md:h-32 animate-pulse drop-shadow-[0_0_15px_rgba(255,220,120,0.4)]"
        />
        <h2 className="mt-5 text-amber-400 text-xl md:text-2xl font-semibold tracking-wider animate-fade-in">
          Cargando{dots}
        </h2>
      </div>

      {/* Efecto de resplandor radial */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#f2af1e]/10 blur-3xl"></div>
    </div>
  );
}

export default SplashScreen;
