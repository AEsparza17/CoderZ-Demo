import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { authApi } from '@/services/api';
import { disconnectSocket } from '@/hooks/useSocket';

const TurneroSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [nombre, setNombre] = useState(localStorage.getItem('coderz_nombre') || 'Usuario');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setNombre(localStorage.getItem('coderz_nombre') || 'Usuario');
    window.addEventListener('perfil-updated', handler);
    return () => window.removeEventListener('perfil-updated', handler);
  }, []);

  const handleLogout = async () => {
    disconnectSocket();
    try { await authApi.logout(); } catch { /* si falla igual limpiamos local */ }
    localStorage.removeItem('coderz_token');
    localStorage.removeItem('coderz_nombre');
    localStorage.removeItem('coderz_herramientas');
    navigate('/portal');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Tablero Principal', path: '/portal/turnero', active: location.pathname === '/portal/turnero' },
    { icon: <Calendar size={20} />, label: 'Agenda', path: '/portal/turnero/agenda', active: location.pathname === '/portal/turnero/agenda' },
    { icon: <Users size={20} />, label: 'Pacientes', path: '/portal/turnero/pacientes', active: location.pathname === '/portal/turnero/pacientes' },
    { icon: <Settings size={20} />, label: 'Configuración', path: '/portal/turnero/configuracion', active: location.pathname === '/portal/turnero/configuracion' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ==============================
          VISTA MOBILE — Top bar + Drawer
          ============================== */}
      <div className="md:hidden">

        {/* Barra superior fija */}
        <div className="fixed top-0 left-0 right-0 h-14 bg-slate-900 text-white flex items-center px-4 z-40 shadow-lg">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center font-bold text-sm">T</div>
            <span className="text-lg font-bold tracking-tight">Turnero</span>
          </div>
        </div>

        {/* Overlay oscuro de fondo */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Drawer lateral deslizante */}
        <div className={`fixed top-0 left-0 h-screen w-72 bg-slate-900 text-white flex flex-col z-50 shadow-2xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>

          {/* Cabecera del drawer */}
          <div className="flex items-center justify-between p-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">T</div>
              <span className="text-xl font-bold tracking-tight">Turnero</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer del drawer */}
          <div className="p-4 border-t border-slate-800 space-y-4">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-sm"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                Modo {theme === 'dark' ? 'Oscuro' : 'Claro'}
              </span>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-600'}`}>
                <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${theme === 'dark' ? 'left-4.5' : 'left-0.5'}`}></div>
              </div>
            </button>
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{nombre}</p>
                <p className="text-xs text-slate-500 truncate">Cliente</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 py-2 rounded-lg transition-colors text-sm"
            >
              <LogOut size={16} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==============================
          VISTA DESKTOP — Sidebar fijo
          ============================== */}
      <div className="hidden md:flex h-screen w-64 bg-slate-900 text-white flex-col fixed left-0 top-0 shadow-2xl z-50">

        {/* Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">T</div>
          <span className="text-xl font-bold tracking-tight">Turnero</span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-sm"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              Modo {theme === 'dark' ? 'Oscuro' : 'Claro'}
            </span>
            <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-600'}`}>
              <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${theme === 'dark' ? 'left-4.5' : 'left-0.5'}`}></div>
            </div>
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{nombre}</p>
              <p className="text-xs text-slate-500 truncate">Cliente</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 py-2 rounded-lg transition-colors text-sm"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TurneroSidebar;
