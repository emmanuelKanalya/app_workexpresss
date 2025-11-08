import React, { useState, useRef, useEffect } from "react";

export default function Promociones() {
  const [promotions] = useState([
    {
      id: 1,
      title: "2x1 en envíos marítimos 🌊",
      description:
        "Envía dos paquetes y paga uno. Válido hasta el 15 de noviembre.",
      validUntil: "15 de noviembre",
      discount: "2x1",
      bgColor: "from-[#f2af1e]/90 to-[#b71f4b]/90",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "🚚 Envío Express Gratis",
      description: "En compras mayores a 100 lbs este mes.",
      validUntil: "31 de Diciembre",
      discount: "GRATIS",
      bgColor: "from-[#f2af1e]/90 to-[#b71f4b]/90",
      image:
        "https://images.unsplash.com/photo-1612831662375-295c1003d3b0?auto=format&fit=crop&w=800&q=60",
    },
        {
      id: 3,
      title: "🚚 Envío Express Gratis",
      description: "En compras mayores a 100 lbs este mes.",
      validUntil: "31 de Diciembre",
      discount: "GRATIS",
      bgColor: "from-[#f2af1e]/90 to-[#b71f4b]/90",
      image:
        "https://images.unsplash.com/photo-1612831662375-295c1003d3b0?auto=format&fit=crop&w=800&q=60",
    },
  ]);

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detectar la tarjeta visible
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    return (
      <img
        src={
          error
            ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="
            : src
        }
        alt={alt}
        className={className}
        onError={() => setError(true)}
      />
    );
  };

  return (
    <div className="mb-8 w-full max-w-3xl mx-auto">
      <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
        Promociones y Anuncios
      </h3>

      {/* Carrusel */}
      <div className="relative overflow-hidden rounded-3xl">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 pb-4 no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative shrink-0 w-full snap-start rounded-3xl overflow-hidden border-0 shadow-md"
            >
              <div
                className={`relative h-56 md:h-64 bg-linear-to-r ${promo.bgColor} overflow-hidden`}
              >
                <ImageWithFallback
                  src={promo.image}
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                />

                {/* Contenido principal */}
                <div className="relative h-full flex flex-col justify-between p-6 text-white">
                  <div>
                    <span className="inline-block bg-white/20 text-white backdrop-blur-sm mb-3 px-3 py-1 rounded-full text-xs border-0">
                      Válido hasta {promo.validUntil}
                    </span>
                    <h3 className="mb-2 font-semibold text-lg">
                      {promo.title}
                    </h3>
                    <p className="opacity-90 text-sm leading-snug">
                      {promo.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="text-white">
                      <span className="opacity-90 text-sm">Descuento</span>
                      <p className="text-xl font-bold">{promo.discount}</p>
                    </div>
                    <button className="bg-white/30 text-white hover:opacity-90 text-sm font-medium px-4 py-2 rounded-xl transition">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-3">
          {promotions.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === activeIndex
                  ? "w-6 bg-linear-to-r from-[#f2af1e] to-[#b71f4b]"
                  : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Estilos personalizados */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
