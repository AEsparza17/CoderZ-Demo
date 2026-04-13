import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PortalRegister = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-slate-900 to-blue-950 text-white">

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl text-center space-y-5"
        >
          <div className="text-4xl">🚧</div>

          <h1 className="text-2xl font-bold text-white">
            Registro no disponible en el demo
          </h1>

          <p className="text-blue-200 text-sm leading-relaxed">
            En la aplicación real, los clientes pueden registrarse y solicitar acceso a sus herramientas.
            <br /><br />
            Para explorar el demo, usá las credenciales de prueba:
          </p>

          <div className="px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-400/30">
            <p className="text-sm font-mono text-blue-200">demo@demo.com</p>
            <p className="text-sm font-mono text-blue-200">demo1234</p>
          </div>

          <Button
            onClick={() => navigate('/portal')}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2 rounded-lg shadow-lg shadow-blue-500/20 border-none"
          >
            Ir al login
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalRegister;
