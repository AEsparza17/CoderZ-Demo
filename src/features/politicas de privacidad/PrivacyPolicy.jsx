import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";

const fadeInBlur = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center bg-linear-to-br from-black via-slate-900 to-blue-950 font-sans p-6 md:p-12 lg:p-20 text-slate-300"
      initial="hidden"
      animate="visible"
      variants={fadeInBlur}
    >
      <div className="w-full max-w-4xl">
        {/* Botón Volver */}
        <motion.div variants={fadeInBlur} className="mb-8">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/")}
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a coder-z.com
          </Button>
        </motion.div>

        {/* HEADER */}
        <header className="mb-12 border-b pb-8 border-slate-800">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-200 mb-4">
            Políticas de <span className="text-blue-600">Privacidad</span>
          </h1>
          <p className="text-slate-500">
            Última actualización: 26 de marzo de 2026
          </p>
        </header>

        <main className="space-y-12">
          {/* SECCIÓN 1 */}
          <section className="p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold text-blue-500 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Compromiso de Coder-Z
            </h2>
            <p className="leading-relaxed text-sm">
              En <strong>Coder-Z</strong>, la privacidad de nuestros usuarios es
              fundamental. Esta política detalla cómo gestionamos la información
              técnica y personal recolectada a través de nuestras integraciones
              de Inteligencia Artificial y servicios de mensajería (WhatsApp
              Cloud API).
            </p>
          </section>

          {/* SECCIÓN 2: GRID DE PUNTOS CLAVE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/40 border border-slate-800/50 rounded-lg">
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Lock className="h-4 w-4" /> Datos Recolectados
              </h3>
              <p className="text-sm text-slate-400">
                Procesamos números de teléfono, nombres de perfil y el contenido
                de los mensajes únicamente para brindar respuestas automatizadas
                mediante modelos de lenguaje (LLMs).
              </p>
            </div>

            <div className="p-6 bg-slate-900/40 border border-slate-800/50 rounded-lg">
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <EyeOff className="h-4 w-4" /> Uso de Datos
              </h3>
              <p className="text-sm text-slate-400">
                No comercializamos tus datos con terceros. La información se
                utiliza exclusivamente para la mejora de la lógica de nuestros
                agentes de IA y soporte técnico.
              </p>
            </div>
          </div>

          {/* SECCIÓN 3 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-200 uppercase tracking-widest border-l-4 border-blue-600 pl-4">
              Derechos del Usuario
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Cualquier usuario puede solicitar la eliminación de su historial
              de interacción enviando un mensaje directo o contactando a través
              de <strong>www.coder-z.com</strong>. Cumplimos con los estándares
              de seguridad requeridos por la plataforma Meta para aplicaciones
              en modo producción.
            </p>
          </section>
        </main>

        <footer className="mt-20 text-center text-slate-600 text-xs">
          <p>© 2026 Coder-Z | Villa Nueva, Córdoba, Argentina</p>
        </footer>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
