import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, X } from 'lucide-react';
import { authApi } from '@/services/api';

const PortalLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('coderz_token', data.token);
      localStorage.setItem('coderz_nombre', data.nombre);
      localStorage.setItem('coderz_herramientas', JSON.stringify(data.herramientas || []));
      navigate('/portal/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-slate-900 to-blue-950 text-white">

      {/* Fondo con patrón SVG */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Bienvenido a CoderZ
            </h1>
            <p className="text-blue-200 mt-2 text-sm">
              Acceso exclusivo para clientes
            </p>
          </div>

          {/* Banner demo */}
          <div className="mb-6 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-400/30 text-center">
            <p className="text-xs text-blue-300 font-medium mb-1">Acceso de demostración</p>
            <p className="text-xs text-blue-200/70">
              <span className="font-mono">demo@demo.com</span> / <span className="font-mono">demo1234</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cliente@empresa.com"
                required
                className="w-full bg-black/20 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-black/20 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2 rounded-lg shadow-lg shadow-blue-500/20 mt-4 border-none"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/portal/register')}
              className="text-sm text-blue-300 hover:text-blue-100 transition-colors cursor-pointer"
            >
              ¿No tenés cuenta? Registrate
            </button>
          </div>

          <div className="mt-2 text-center">
            <button
              onClick={() => setShowModal(true)}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
            >
              ¿Necesitás ayuda? Contactanos
            </button>
          </div>

          <div className="mt-3 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
            >
              Volver al inicio
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal de contacto */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-white">Contactanos</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-5">
                Elegí cómo querés comunicarte con nosotros para crear tu cuenta.
              </p>

              <div className="space-y-3">
                <a
                  href="https://wa.me/5493534204353"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 rounded-xl px-4 py-3 text-green-300 transition-colors"
                >
                  <MessageCircle size={20} />
                  <div>
                    <p className="font-medium text-sm">WhatsApp - Agustín</p>
                    <p className="text-xs text-green-400/70">+54 9 353 420-4353</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/5493535651024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 rounded-xl px-4 py-3 text-green-300 transition-colors"
                >
                  <MessageCircle size={20} />
                  <div>
                    <p className="font-medium text-sm">WhatsApp - Emiliano</p>
                    <p className="text-xs text-green-400/70">+54 9 353 565-1024</p>
                  </div>
                </a>

                <a
                  href="mailto:contactocoderz@gmail.com"
                  className="flex items-center gap-3 w-full bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-300 transition-colors"
                >
                  <Mail size={20} />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <p className="text-xs text-blue-400/70">contactocoderz@gmail.com</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalLogin;
