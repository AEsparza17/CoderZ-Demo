import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom'; // <--- 1. Importamos useNavigate

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Importar nuestros estilos y datos
import './TechCarousel.css';
import { services } from '@/data/servicesData';

const TechCarousel = ({ herramientas = [] }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const visibleServices = services.filter(s => herramientas.includes(s.herramienta));

  const handleAccess = (service) => {
    if (service.active) {
      // SI ESTÁ ACTIVO: Navegamos a la ruta
      navigate(service.path);
    } else {
      // SI NO ESTÁ ACTIVO: Mostramos el aviso
      toast({
        title: "🚧 Módulo en desarrollo",
        description: `El acceso a ${service.title} estará disponible muy pronto.`,
        duration: 3000,
        className: "bg-slate-900 border-blue-500 text-white" 
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1} // Arranca mostrando el Turnero (que es el índice 1)
        loop={false}
        speed={800}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="tech-swiper"
      >
        {visibleServices.map((service) => (
          <SwiperSlide key={service.id} className="tech-slide">
            
            <div className="h-full w-full bg-slate-900/80 backdrop-blur-md border border-blue-500/30 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                
                {/* Efecto hover condicional (Verde si activo, Azul si inactivo) */}
                <div className={`absolute inset-0 bg-gradient-to-b ${service.active ? 'from-blue-500/10' : 'from-gray-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>

                <div className="relative z-10 mb-6 p-4 bg-slate-950 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-16 h-16 object-contain"
                    />
                </div>

                <h3 className="relative z-10 text-2xl font-bold text-white mb-3 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                    {service.title}
                </h3>

                <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                </p>

                <div className="relative z-10 mt-auto w-full">
                    <button 
                        onClick={() => handleAccess(service)} // <--- Pasamos el objeto servicio completo
                        className={`w-full py-2 px-4 font-semibold rounded-lg shadow-lg transition-all duration-300 border transform hover:-translate-y-1 cursor-pointer ${
                          service.active 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400/30 hover:shadow-blue-500/50' // Estilo ACTIVO
                            : 'bg-slate-700 hover:bg-slate-600 text-gray-300 border-slate-500/30' // Estilo INACTIVO
                        }`}
                    >
                        {service.active ? 'Ingresar Ahora' : 'Próximamente'}
                    </button>
                </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TechCarousel;