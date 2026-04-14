import React, { useState, useEffect } from 'react';
import TurneroSidebar from '../components/TurneroSidebar';
import { Button } from '@/components/ui/button';
import { Save, Bell, User, Stethoscope, Plus, Trash2, Clock, LogOut } from 'lucide-react';
import { serviciosApi, authApi, perfilApi } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const Configuracion = () => {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', duracion: 30 });
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [totalSesiones, setTotalSesiones] = useState(null);
  const [perfil, setPerfil] = useState({ nombre_visible: '', especialidad: '', email_notif: true, whatsapp_notif: true });
  const [guardando, setGuardando] = useState(false);
  const [guardadoOk, setGuardadoOk] = useState(false);

  useEffect(() => {
    serviciosApi.getAll()
      .then(setServicios)
      .catch(() => {})
      .finally(() => setLoadingServicios(false));
    authApi.getSesiones()
      .then((data) => setTotalSesiones(data.total))
      .catch(() => {});
    perfilApi.get()
      .then((data) => setPerfil({ ...data, email_notif: !!data.email_notif, whatsapp_notif: !!data.whatsapp_notif }))
      .catch(() => {});
  }, []);

  const handleGuardarPerfil = async () => {
    setGuardando(true);
    setGuardadoOk(false);
    try {
      await perfilApi.update(perfil);
      if (perfil.nombre_visible) {
        localStorage.setItem('coderz_nombre', perfil.nombre_visible);
        window.dispatchEvent(new CustomEvent('perfil-updated'));
      }
      setGuardadoOk(true);
      setTimeout(() => setGuardadoOk(false), 3000);
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleAgregarServicio = async (e) => {
    e.preventDefault();
    if (!nuevoServicio.nombre.trim()) return;
    try {
      const creado = await serviciosApi.create(nuevoServicio);
      setServicios([...servicios, creado]);
      setNuevoServicio({ nombre: '', duracion: 30 });
    } catch (err) {
      alert('Error al agregar servicio: ' + err.message);
    }
  };

  const handleCerrarTodasSesiones = async () => {
    if (!confirm('¿Cerrar todas las sesiones activas? Tendrás que volver a iniciar sesión en todos los dispositivos.')) return;
    try {
      await authApi.logoutAll();
      localStorage.removeItem('coderz_token');
      localStorage.removeItem('coderz_nombre');
      navigate('/portal');
    } catch (err) {
      alert('Error al cerrar sesiones: ' + err.message);
    }
  };

  const handleEliminarServicio = async (id) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    try {
      await serviciosApi.delete(id);
      setServicios(servicios.filter((s) => s.id !== id));
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <TurneroSidebar />

      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pt-18 md:pt-8">

        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Configuración</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Administra tus preferencias del sistema.</p>
        </header>

        <div className="max-w-4xl space-y-6">

          {/* Perfil */}
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"><User size={24} /></div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Perfil Profesional</h2>
            </div>

            {/* ==============================
                VISTA DESKTOP — Campos en 2 columnas
                ============================== */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Visible</label>
                <input
                  type="text"
                  value={perfil.nombre_visible || ''}
                  onChange={(e) => setPerfil({ ...perfil, nombre_visible: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Especialidad</label>
                <input
                  type="text"
                  value={perfil.especialidad || ''}
                  onChange={(e) => setPerfil({ ...perfil, especialidad: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* ==============================
                VISTA MOBILE — Campos apilados
                ============================== */}
            <div className="md:hidden space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Visible</label>
                <input
                  type="text"
                  value={perfil.nombre_visible || ''}
                  onChange={(e) => setPerfil({ ...perfil, nombre_visible: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Especialidad</label>
                <input
                  type="text"
                  value={perfil.especialidad || ''}
                  onChange={(e) => setPerfil({ ...perfil, especialidad: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg"><Stethoscope size={24} /></div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Servicios / Tratamientos</h2>
            </div>

            {/* Lista de servicios */}
            <div className="mb-6 space-y-2">
              {loadingServicios ? (
                <p className="text-sm text-slate-400">Cargando...</p>
              ) : servicios.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No hay servicios cargados aún.</p>
              ) : (
                servicios.map((s) => (
                  <div key={s.id} className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-medium text-slate-800 dark:text-white truncate">{s.nombre}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                        <Clock size={11} /> {s.duracion} min
                      </span>
                    </div>
                    <button
                      onClick={() => handleEliminarServicio(s.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Formulario agregar nuevo servicio */}

            {/* ==============================
                VISTA DESKTOP — Formulario en línea
                ============================== */}
            <form onSubmit={handleAgregarServicio} className="hidden md:flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre del servicio</label>
                <input
                  type="text"
                  placeholder="Ej: Blanqueamiento"
                  value={nuevoServicio.nombre}
                  onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duración (min)</label>
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={nuevoServicio.duracion}
                  onChange={(e) => setNuevoServicio({ ...nuevoServicio, duracion: parseInt(e.target.value) })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-1" /> Agregar
              </Button>
            </form>

            {/* ==============================
                VISTA MOBILE — Formulario apilado
                ============================== */}
            <form onSubmit={handleAgregarServicio} className="md:hidden space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre del servicio</label>
                <input
                  type="text"
                  placeholder="Ej: Blanqueamiento"
                  value={nuevoServicio.nombre}
                  onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duración (min)</label>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    value={nuevoServicio.duracion}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, duracion: parseInt(e.target.value) })}
                    className="w-full p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white shrink-0">
                  <Plus className="w-4 h-4 mr-1" /> Agregar
                </Button>
              </div>
            </form>
          </div>

          {/* Notificaciones */}
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg"><Bell size={24} /></div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Notificaciones</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300 text-sm">Recordatorios por Email</span>
                <input
                  type="checkbox"
                  checked={perfil.email_notif}
                  onChange={(e) => setPerfil({ ...perfil, email_notif: e.target.checked })}
                  className="accent-blue-600 w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300 text-sm">Avisos de nuevos turnos (WhatsApp)</span>
                <input
                  type="checkbox"
                  checked={perfil.whatsapp_notif}
                  onChange={(e) => setPerfil({ ...perfil, whatsapp_notif: e.target.checked })}
                  className="accent-blue-600 w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Sesiones */}
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg"><LogOut size={24} /></div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">Sesiones Activas</h2>
                  {totalSesiones !== null && (
                    <span className="text-xs font-semibold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                      {totalSesiones}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Cerrá sesión en todos los dispositivos a la vez.</p>
              </div>
            </div>
            <button
              onClick={handleCerrarTodasSesiones}
              className="w-full md:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Cerrar todas las sesiones
            </button>
          </div>

          <div className="flex justify-end items-center gap-4 pt-4">
            {guardadoOk && (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Cambios guardados correctamente</span>
            )}
            <Button
              onClick={handleGuardarPerfil}
              disabled={guardando}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              <Save className="mr-2 h-4 w-4" /> {guardando ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Configuracion;
