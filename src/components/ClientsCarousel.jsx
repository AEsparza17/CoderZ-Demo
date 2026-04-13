import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Corregí la ruta de importación para usar una ruta relativa
import { useInView } from '../hooks/useInView';
// Importamos tu logo (usando la ruta que te funcionó)
// Corregí la ruta de importación para usar una ruta relativa
import zonaTronikLogo from '../assets/img/zonaTronik.png';

const ClientsCarousel = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- 1. MODIFICACIÓN: Array de clientes ---
  // Ahora solo tiene un cliente.
  // ¡Simplemente añade más objetos a este array cuando tengas más clientes!
  const clients = [
    { name: 'ZonaTronik', logo: zonaTronikLogo },
    // { name: 'Cliente Nuevo 2', logo: 'url-o-import-del-logo-2' },
    // { name: 'Cliente Nuevo 3', logo: 'url-o-import-del-logo-3' },
    // { name: 'Cliente Nuevo 4', logo: 'url-o-import-del-logo-4' },
  ];

  // --- 2. MODIFICACIÓN: Lógica condicional ---
  // El carrusel solo se "activa" (slide, botones, etc.) si hay MÁS de 3 clientes.
  const isCarouselActive = clients.length > 3;

  // --- 3. MODIFICACIÓN: useEffect (Auto-slide) ---
  useEffect(() => {
    // Solo se activa el intervalo si el carrusel está activo
    if (isCarouselActive) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % clients.length);
      }, 3000);
      return () => clearInterval(interval);
    }
    // Añadimos 'isCarouselActive' a las dependencias
  }, [clients.length, isCarouselActive]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  // --- 4. MODIFICACIÓN: Lógica de visibilidad ---
  const getVisibleClients = () => {
    // Si el carrusel NO está activo (3 clientes o menos), muéstralos todos.
    if (!isCarouselActive) {
      return clients;
    }

    // Si el carrusel ESTÁ activo (más de 3 clientes), usa la lógica de 3 en 3.
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(clients[(currentIndex + i) % clients.length]);
    }
    return visible;
  };

  return (
    <section id="about" ref={ref} className="py-24 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-black relative overflow-hidden">
      {/* (Fondo SVG - sin cambios) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTI4LjIyMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* (Título y párrafo - sin cambios) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Confían en Nosotros
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empresas que han transformado su negocio con nuestras soluciones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="flex items-center justify-center gap-8">
            
            {/* --- 5. MODIFICACIÓN: Mostrar botón condicionalmente --- */}
            {isCarouselActive && (
              <button
                onClick={prevSlide}
                className="hidden md:block p-3 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-white backdrop-blur-sm transition-all hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div className="flex gap-6 md:gap-8 overflow-hidden justify-center">
              {/* Si hay 3 clientes o menos, 'AnimatePresence' no es estrictamente necesario,
                pero no molesta y permite que la lógica sea escalable.
              */}
              <AnimatePresence mode="wait">
                {getVisibleClients().map((client, index) => (
                  <motion.div
                    key={`${client.name}-${currentIndex}-${index}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    // Esta es la tarjeta con la imagen y el texto de la vez anterior
                    className="flex-shrink-0 w-48 h-24 bg-white/10 backdrop-blur-md rounded-xl flex flex-col items-center justify-center p-4 gap-2 border border-blue-400/20 hover:border-blue-400/50 transition-all hover:scale-105 shadow-xl"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-12 max-w-full object-contain"
                    />
                    <span className="text-white font-bold text-xs text-center">
                      {client.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- 6. MODIFICACIÓN: Mostrar botón condicionalmente --- */}
            {isCarouselActive && (
              <button
                onClick={nextSlide}
                className="hidden md:block p-3 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-white backdrop-blur-sm transition-all hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* --- 7. MODIFICACIÓN: Mostrar puntos condicionalmente --- */}
          {isCarouselActive && (
            <div className="flex justify-center gap-2 mt-8">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-400 w-8'
                      : 'bg-blue-400/30 hover:bg-blue-400/50'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsCarousel;