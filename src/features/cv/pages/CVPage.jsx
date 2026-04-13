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
  Clock,
  Linkedin,
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
      className="min-h-screen w-full flex flex-col items-center bg-linear-to-br from-black via-slate-900 to-blue-950 font-sans p-6 md:p-12 lg:p-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-5xl lg:max-w-6xl">
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
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-700 mb-2">
                ESPARZA<span className="text-blue-600"> AGUSTÍN</span>
              </h1>
              <p className="text-xl md:text-1xl text-slate-400 font-medium">
                Desarrollador Full-Stack | Co-fundador en Coder-Z
              </p>
            </motion.div>

            <motion.div
              variants={fadeInBlur}
              className="flex flex-col gap-3 text-sm text-slate-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                  contactoagustinesparza@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500 shrink-0" /> +54 9 3534 204353
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500 shrink-0" />
                  www.coder-z.com/agustinesparza
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500 shrink-0" /> Villa Nueva, Córdoba
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500 shrink-0" />
                <span className="font-semibold text-green-400 tracking-wide">
                  Disponibilidad: Full Time
                </span>
              </div>
            </motion.div>
          </div>
        </header>

        <main className="    grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* === COLUMNA IZQUIERDA === */}
          <div className="p-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl lg:col-span-4 space-y-12">
            <AnimatedSection>
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                  Perfil Profesional
                </h2>
                <p className="text-slate-400 leading-relaxed text-sm">
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
                    <h3 className="text-xs font-bold text-slate-200 uppercase mb-2">
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
                          initial={{ color: "#94a3b8" }}
                          whileHover={{
                            scale: 1.05,
                            borderRadius: "9px",
                            backgroundColor: "#145efc",
                            color: "#ffff"
                          }}
                          className="px-2 py-1 text-xs text-slate-400 mt-1 font-medium italic transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 uppercase mb-2">
                      Backend & DB
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "MySQL", "SQL"].map((s) => (
                        <motion.span
                          key={s}
                          initial={{ color: "#94a3b8" }}
                          whileHover={{
                            scale: 1.05,
                            borderRadius: "9px",
                            backgroundColor: "#145efc",
                            color: "#ffff"
                          }}
                          className="px-2 py-1 text-xs text-slate-400 mt-1 font-medium italic transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 uppercase mb-2">
                      Automatización & IA
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["n8n", "OpenAI API", "Twilio API"].map((s) => (
                        <motion.span
                          key={s}
                          initial={{ color: "#94a3b8" }}
                          whileHover={{
                            scale: 1.05,
                            borderRadius: "9px",
                            backgroundColor: "#145efc",
                            color: "#ffff"
                          }}
                          className="px-2 py-1 text-xs text-slate-400 mt-1 font-medium italic transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 uppercase mb-2">
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
                          initial={{ color: "#94a3b8" }}
                          whileHover={{
                            scale: 1.05,
                            borderRadius: "9px",
                            backgroundColor: "#145efc",
                            color: "#ffff"
                          }}
                          className="px-2 py-1 text-xs text-slate-400 mt-1 font-medium italic transition-colors cursor-default"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 uppercase mb-2">
                      Diseño Técnico
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Fusion 360", "AutoCAD", "Rhino 3D"].map((s) => (
                        <motion.span
                          key={s}
                          initial={{ color: "#94a3b8" }}
                          whileHover={{
                            scale: 1.05,
                            borderRadius: "9px",
                            backgroundColor: "#145efc",
                            color: "#ffff"
                          }}
                          className="px-2 py-1 text-xs text-slate-400 mt-1 font-medium italic transition-colors cursor-default"
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
                <div className="p-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl">
                  <h4 className="font-bold text-sm text-blue-400">Inglés</h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium italic">
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
                  <div className="p-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl">
                    <h4 className="font-bold text-sm text-blue-400">
                      Sistema de Gestión de Turnos
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-medium italic ">
                      Diseño de arquitectura de base de datos (DER) e
                      implementación de lógica para administración de reservas.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl">
                    <h4 className="font-bold text-sm text-blue-400">
                      Landing Page Corporativa (Coder-Z)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-medium italic">
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
                    <h3 className="text-xl font-bold  text-slate-200 italic">
                      Coder-Z | Co-fundador & Desarrollador Full-Stack
                    </h3>
                    <p className="text-sm text-blue-500 font-semibold mb-3">
                      Octubre 2025 – Actualidad
                    </p>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc ml-4 leading-relaxed">
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
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-blue-600 rounded-full ring-4 ring-white" />
                    <h3 className="text-xl font-bold  text-slate-200 italic">
                      Softech TI | Desarrollador en Prácticas (Automatización)
                    </h3>
                    <p className="text-sm text-blue-500 font-semibold mb-3">
                      Septiembre 2025 - Diciembre 2025
                    </p>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc ml-4 leading-relaxed">
                      <li>
                        Diseño y despliegue de flujos de automatización
                        integrales utilizando{" "}
                        <span className="font-bold  text-slate-200 italic">
                          n8n
                        </span>
                        .
                      </li>
                      <li>
                        Implementación de inteligencia artificial en procesos de
                        negocio mediante{" "}
                        <span className="font-bold  text-slate-200 italic">
                          OpenAI
                        </span>
                        .
                      </li>
                      <li>
                        Integración de servicios de mensajería y comunicación
                        con la API de{" "}
                        <span className="font-bold  text-slate-200 italic">
                          Twilio
                        </span>
                        .
                      </li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-blue-600 rounded-full ring-4 ring-white" />
                    <h3 className="text-xl font-bold  text-slate-200 italic">
                      Tecno Pak | Técnico en Reparación de Hardware
                    </h3>
                    <p className="text-sm text-blue-500 font-semibold mb-3">
                      2023 – Actualidad
                    </p>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc ml-4 leading-relaxed">
                      <li>
                        Diagnóstico lógico y reparación a nivel componente de
                        dispositivos móviles y notebooks.
                      </li>
                      <li>
                        Optimización de sistemas operativos y mantenimiento
                        correctivo/preventivo.
                      </li>
                      <li>
                        Atención al cliente presencial y remota, asesorando
                        usuarios con distintos niveles de conocimiento
                        tecnológico de forma clara y efectiva.
                      </li>
                      <li>
                        Registro y seguimiento de trabajos mediante{" "}
                        <span className="font-bold text-slate-200 italic">
                          Excel
                        </span>
                        : control de inventario, presupuestos y órdenes de
                        trabajo.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["Excel", "Atención al Cliente", "Soporte Técnico"].map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ color: "#94a3b8" }}
                          whileHover={{
                            scale: 1.05,
                            borderRadius: "9px",
                            backgroundColor: "#145efc",
                            color: "#ffffff",
                          }}
                          className="px-2 py-1 text-xs text-slate-400 font-medium italic border border-slate-700 rounded-md cursor-default transition-colors"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-2 h-2 bg-blue-600 rounded-full ring-4 ring-white" />
                    <h3 className="text-xl font-bold  text-slate-200 italic">
                      Emprendimiento Personal | Diseño e Impresión 3D
                    </h3>
                    <p className="text-sm text-blue-500 font-semibold mb-3">
                      2020 – 2023
                    </p>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc ml-4 leading-relaxed">
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
                <div className="p-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl">
                  <h3 className=" text-slate-200 font-bold">
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
                  <div className="p-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl">
                    <p className="font-bold  text-slate-200">
                      Pablo Karlau (TecnoPak)
                    </p>
                    <p className="text-blue-600 font-medium">
                      +54 9 3534 191512
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl">
                    <p className="font-bold  text-slate-200">
                      Cristian Carraro (Softech TI)
                    </p>
                    <p className="text-blue-600 font-medium">
                      +54 9 3534 210692
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