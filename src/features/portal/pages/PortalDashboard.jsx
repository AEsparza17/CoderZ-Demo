import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import TechCarousel from '@/components/TechCarousel';
import { authApi } from '@/services/api';
import { disconnectSocket } from '@/hooks/useSocket';

const PortalDashboard = () => {
  const navigate = useNavigate();
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const herramientas = JSON.parse(localStorage.getItem('coderz_herramientas') || '[]');

  const handleLogout = async () => {
    disconnectSocket();
    try { await authApi.logout(); } catch { /* si falla igual limpiamos local */ }
    localStorage.removeItem('coderz_token');
    localStorage.removeItem('coderz_nombre');
    localStorage.removeItem('coderz_herramientas');
    navigate('/portal');
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-black via-slate-900 to-blue-950 text-white"
    >
      {/* Fondo con patrón SVG */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold mb-6 bg-linear-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
        >
          Selecciona tu Herramienta
        </motion.h1>

        {/* Herramientas habilitadas o pantalla de pendiente */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-300 mb-8 max-w-lg"
        >
          {herramientas.length > 0 ? (
            <TechCarousel herramientas={herramientas} />
          ) : (
            <div className="text-center px-6 py-8 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-2xl mb-3">⏳</p>
              <p className="text-white font-semibold mb-2">Acceso pendiente de aprobación</p>
              <p className="text-gray-400 text-sm">
                Tu cuenta fue registrada correctamente. Cuando el equipo de CoderZ habilite tus herramientas, vas a poder verlas acá.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-blue-600/80 hover:bg-blue-600 rounded-full font-semibold text-lg transition-colors border border-cyan-500/30 shadow-lg inline-block"
          >
            Cerrar Sesión
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalDashboard;