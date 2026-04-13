import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowLeft,
  Cpu,
  Box,
  Code,
  Zap,
} from "lucide-react";

// Animacion
const fadeInBlur = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Scroll
const AnimatedSection = ({ children, className }) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeInBlur}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// === COMPONENTE PRINCIPAL ===
const CVPage = () => {
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900 font-sans p-6 md:p-12 lg:p-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full   lg:max-w-6xl">
        {/* Botón Volver */}
        <motion.div variants={fadeInBlur} className="mb-8">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/")}
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Coder-Z
          </Button>
        </motion.div>

        {/* HEADER */}
        <header className="mb-16 border-b pb-10 border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <motion.div variants={fadeInBlur}>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-2">
                AGUSTÍN <span className="text-blue-600">ESPARZA</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 font-medium">
                Desarrollador Full-Stack | Co-fundador en Coder-Z
              </p>
            </motion.div>

            <motion.div
              variants={fadeInBlur}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                contactoagustinesparza@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500 shrink-0" /> +54 9 353
                4204353
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500 shrink-0" />
                www.coder-z.com/agustinesparza
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500 shrink-0" /> Villa
                Nueva, Córdoba
              </div>
            </motion.div>
          </div>
        </header>

        <main className="    grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* === COLUMNA IZQUIERDA === */}
          <div className="lg:col-span-4 space-y-12">
            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                  Perfil Profesional
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Desarrollador Full-Stack autodidacta y proactivo. Combino
                  formación académica con experiencia real construyendo sitios a
                  medida, sistemas de gestión y automatización con IA.
                  Especialista en resolver problemas complejos y diseñar
                  arquitecturas eficientes.
                </p>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Stack & Herramientas
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Frontend
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Vite",
                        "JavaScript (ES6+)",
                        "HTML5",
                        "CSS3 (Responsive)",
                      ].map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#eff6ff",
                          }}
                          className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Backend & DB
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "MySQL", "SQL"].map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#eff6ff",
                          }}
                          className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Automatización & IA
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["n8n", "OpenAI API", "Twilio API"].map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#eff6ff",
                          }}
                          className="px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-xs font-semibold transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Infraestructura
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Git/GitHub",
                        "Linux (Ubuntu, Mint)",
                        "VPS & Despliegues",
                      ].map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#eff6ff",
                          }}
                          className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Diseño Técnico
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Fusion 360", "AutoCAD", "Rhino 3D"].map((s) => (
                        <motion.span
                          key={s}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#fff7ed",
                          }}
                          className="px-2 py-1 bg-orange-50 text-orange-700 border border-orange-100 rounded text-xs font-semibold transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Idiomas
                </h2>
                <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                  <h4 className="font-bold text-sm text-slate-800">Inglés</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium italic">
                    Alta lectocomprensión técnica.
                  </p>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Proyectos Destacados
                </h2>
                <div className="space-y-4">
                  <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <h4 className="font-bold text-sm text-slate-800">
                      Sistema de Gestión de Turnos
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-medium italic leading-relaxed">
                      Diseño de arquitectura de base de datos (DER) e
                      implementación de lógica para administración de reservas.
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <h4 className="font-bold text-sm text-slate-800">
                      Landing Page Corporativa (Coder-Z)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 font-medium italic leading-relaxed">
                      Desarrollo frontend optimizado en React con enfoque en
                      performance y SEO.
                    </p>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          </div>

          {/* === COLUMNA DERECHA === */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-6">
                  Experiencia Profesional
                </h2>
                <div className="space-y-10 border-l-2 border-slate-100 pl-6">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-blue-600 rounded-full ring-4 ring-white" />
                    <h3 className="text-xl font-bold text-slate-800 italic">
                      Softech TI | Desarrollador en Prácticas (Automatización)
                    </h3>
                    <p className="text-sm text-blue-500 font-semibold mb-3">
                      4 meses (Reciente)
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc ml-4 leading-relaxed">
                      <li>
                        Diseño y despliegue de flujos de automatización
                        integrales utilizando{" "}
                        <span className="font-bold text-slate-800 italic">
                          n8n
                        </span>
                        .
                      </li>
                      <li>
                        Implementación de inteligencia artificial en procesos de
                        negocio mediante{" "}
                        <span className="font-bold text-slate-800 italic">
                          OpenAI
                        </span>
                        .
                      </li>
                      <li>
                        Integración de servicios de mensajería y comunicación
                        con la API de{" "}
                        <span className="font-bold text-slate-800 italic">
                          Twilio
                        </span>
                        .
                      </li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-blue-600 rounded-full ring-4 ring-white" />
                    <h3 className="text-xl font-bold text-slate-800 italic">
                      Coder-Z | Co-fundador & Desarrollador Full-Stack
                    </h3>
                    <p className="text-sm text-blue-500 font-semibold mb-3">
                      Octubre 2025 – Actualidad
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc ml-4 leading-relaxed">
                      <li>
                        Desarrollo de sitios web y aplicaciones a medida
                        utilizando React y Vite.
                      </li>
                      <li>
                        Creación de chatbots inteligentes para automatización de
                        atención al cliente.
                      </li>
                      <li>
                        Gestión de infraestructura y administración de
                        servidores VPS basados en Linux.
                      </li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-slate-300 rounded-full ring-4 ring-white" />
                    <h3 className="text-xl font-bold text-slate-800 italic">
                      Tecno Pak | Técnico en Reparación de Hardware
                    </h3>
                    <p className="text-sm text-slate-400 font-semibold mb-3">
                      2023 – 2025
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc ml-4 leading-relaxed">
                      <li>
                        Diagnóstico lógico y reparación a nivel componente de
                        dispositivos móviles y notebooks.
                      </li>
                      <li>
                        Optimización de sistemas operativos y mantenimiento
                        correctivo/preventivo.
                      </li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-slate-300 rounded-full ring-4 ring-white" />
                    <h3 className="text-xl font-bold text-slate-800 italic">
                      Emprendimiento Personal | Diseño e Impresión 3D
                    </h3>
                    <p className="text-sm text-slate-400 font-semibold mb-3">
                      2020 – Actualidad
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc ml-4 leading-relaxed">
                      <li>
                        Modelado 3D de piezas técnicas a medida con Fusion 360 y
                        AutoCAD.
                      </li>
                      <li>
                        Gestión de ciclo completo: diseño, presupuesto,
                        producción en serie y logística.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-6 italic">
                  Educación
                </h2>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-slate-800 font-bold">
                    Técnico Superior en Programación
                  </h3>
                  <p className="text-sm text-slate-500 italic font-medium">
                    Instituto TecLab (Articulación Univ. Siglo 21)
                  </p>
                  <p className="text-xs text-blue-500 mt-1 font-semibold italic">
                    Abril 2024 – Diciembre 2025
                  </p>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-4 italic">
                  Referencias Profesionales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-sm p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="font-bold text-slate-800">
                      Pablo Karlau (TecnoPak)
                    </p>
                    <p className="text-blue-600 font-medium">
                      +54 353 419 1512
                    </p>
                  </div>
                  <div className="text-sm p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="font-bold text-slate-800">
                      Cristian Carraro (Softech TI)
                    </p>
                    <p className="text-blue-600 font-medium">
                      +54 353 421 0692
                    </p>
                  </div>
                </div>
              </section>
            </AnimatedSection>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default CVPage;
