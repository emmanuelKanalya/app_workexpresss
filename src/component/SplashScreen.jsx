import { useEffect, useRef, useState } from "react";
import logo from "../assets/icon/mini_target.webp";


function SplashScreen({ onFinish }) {
  const [dots, setDots] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242,175,30,0.6)";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") onFinish(); // evita error si no se pasa
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 h-screen bg-linear-to-b from-[#b71f4b] to-[#ea6342] flex flex-col items-center justify-center z-50 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute inset-0"
      />
      <img
        src={logo}
        alt="Logo"
        className="w-32 h-32 animate-pulse-slow relative z-10"
      />
      <h2 className="mt-4 text-amber-500 text-xl font-semibold tracking-wide relative z-10">
        Cargando{dots}
      </h2>
    </div>
  );
}

export default SplashScreen;
