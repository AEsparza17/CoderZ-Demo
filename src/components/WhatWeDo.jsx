import { motion } from 'framer-motion';
import { MessageSquare, Globe, ShoppingCart } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const WhatWeDo = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const services = [
    {
      icon: MessageSquare,
      title: 'Chatbots Inteligentes',
      description: 'Desarrollamos chatbots con inteligencia artificial que automatizan la atención al cliente, mejoran la experiencia del usuario y optimizan tus procesos de comunicación. Nuestras soluciones conversacionales están diseñadas para entender y responder de manera natural, disponibles 24/7 para tus clientes.',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Globe,
      title: 'Sitios Web a Pedido',
      description: 'Creamos sitios web personalizados que reflejan la identidad única de tu marca. Desde landing pages impactantes hasta plataformas web complejas, cada proyecto es desarrollado con las últimas tecnologías, diseño responsive y optimización SEO para garantizar máxima visibilidad y conversión.',
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Profesional',
      description: 'Construimos tiendas online completas y escalables que impulsan tus ventas. Integramos pasarelas de pago seguras, sistemas de gestión de inventario, análisis de datos y experiencias de compra optimizadas para convertir visitantes en clientes fieles. Tu éxito en el comercio digital es nuestra prioridad.',
      gradient: 'from-blue-600 to-cyan-600'
    }
  ];

  return (
    <section id="services" ref={ref} className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-black via-blue-900 to-cyan-900 bg-clip-text text-transparent">
            Qué Hacemos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones tecnológicas integrales que transforman la manera en que tu negocio opera en el mundo digital
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="text-white" size={32} />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-500 rounded-full`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;