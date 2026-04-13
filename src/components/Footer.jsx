import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const handleContact = (type) => {

    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: "Esta característica estará disponible pronto. ¡Gracias por tu interés!",
      duration: 3000,
      className: "bg-slate-900 border-blue-500 text-white" 
    });
  };


  return (
    <footer id="contact" ref={ref} className="bg-black text-white py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-cyan-950/20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 block">
              CoderZ
            </span>
            <p className="text-gray-400 leading-relaxed">
              Transformamos ideas en soluciones digitales innovadoras. Tu socio tecnológico de confianza.
            </p>
          </div>

          <div>
            <span className="text-xl font-semibold mb-4 block text-blue-400">Contacto</span>
            <div className="space-y-3">
              <button
                //onClick={() => handleContact('email')} QUEDA COMENTADO POR QUE SI NO LLAMA AL TOAST 
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contactocoderz@gmail.com"
                  title="Comunicándose con Coder-Z"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enviar Correo por Gmail
                </a>
              </button>
              <button
                onClick={() => window.open(`https://wa.me/+5493535651024`, '_blank')}
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Phone size={20} className="group-hover:scale-110 transition-transform" />
                <span>+5493535651024</span>
              </button>
              <button
                onClick={() => window.open(`https://wa.me/+5493534204353`, '_blank')}
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Phone size={20} className="group-hover:scale-110 transition-transform" />
                <span>+5493534204353</span>
              </button>
              <button
                onClick={() => window.open(`https://www.google.com/maps/place/Villa+María,+Córdoba/@-32.433808,-63.2455168,14z/data=!4m6!3m5!1s0x95cc42fb51306dc1:0xbfb3fffbd425c6b1!8m2!3d-32.4104614!4d-63.243645!16zL20vMDJwdmg1?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D`, '_blank')}
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <MapPin size={20} className="group-hover:scale-110 transition-transform" />
                <span>Villa María, Córdoba, Argentina</span>
              </button>
            </div>
          </div>

          <div>
            <span className="text-xl font-semibold mb-4 block text-blue-400">Síguenos</span>
            <div className="flex gap-4">
              <button
                onClick={() => handleContact('linkedin')}
                className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Linkedin size={20} />
              </button>
              <button
                onClick={() => handleContact('twitter')}
                className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter size={20} />
              </button>
              <button
                onClick={() => handleContact('github')}
                className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Github size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-500">
            © 2024 CoderZ. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;