import React, { useState, useEffect } from 'react';
import TurneroSidebar from '../components/TurneroSidebar';
import Modal from '../components/Modal';
import { Search, MoreHorizontal, Phone, Mail, UserPlus, Save, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pacientesApi } from '@/services/api';

const Pacientes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [inactivos, setInactivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [busquedaInactivos, setBusquedaInactivos] = useState('');

  const [menuAbierto, setMenuAbierto] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const [newPaciente, setNewPaciente] = useState({
    nombre: '',
    edad: '',
    telefono: '',
    email: '',
  });

  const [pacienteEditando, setPacienteEditando] = useState(null);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const [activos, bajas] = await Promise.all([
          pacientesApi.getAll(),
          pacientesApi.getInactivos(),
        ]);
        setPacientes(activos);
        setInactivos(bajas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarPacientes();
  }, []);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (!e.target.closest('[data-menu]')) {
        setMenuAbierto(null);
      }
    };
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  const handleReactivar = async (id) => {
    try {
      await pacientesApi.reactivar(id);
      const reactivado = inactivos.find((p) => p.id === id);
      setPacientes([reactivado, ...pacientes]);
      setInactivos(inactivos.filter((p) => p.id !== id));
      setIsModalOpen(false);
    } catch (err) {
      alert('Error al reactivar: ' + err.message);
    }
  };

  const handleSavePaciente = async (e) => {
    e.preventDefault();
    try {
      const pacienteCreado = await pacientesApi.create(newPaciente);
      setPacientes([pacienteCreado, ...pacientes]);
      setNewPaciente({ nombre: '', edad: '', telefono: '', email: '' });
      setIsModalOpen(false);
    } catch (err) {
      alert('Error al guardar el paciente: ' + err.message);
    }
  };

  const handleEditarPaciente = async (e) => {
    e.preventDefault();
    try {
      await pacientesApi.update(pacienteEditando.id, pacienteEditando);
      setPacientes(pacientes.map((p) =>
        p.id === pacienteEditando.id ? { ...p, ...pacienteEditando } : p
      ));
      setModalEditar(false);
      setPacienteEditando(null);
    } catch (err) {
      alert('Error al editar el paciente: ' + err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que querés eliminar este paciente?')) return;
    try {
      await pacientesApi.delete(id);
      setPacientes(pacientes.filter((p) => p.id !== id));
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    } finally {
      setMenuAbierto(null);
    }
  };

  const abrirMenu = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 4, left: rect.left - 160 + rect.width });
    setMenuAbierto(id);
  };

  const pacientesFiltrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.telefono || '').includes(busqueda) ||
    (p.email || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  const MenuDropdown = ({ p }) => (
    <div className="relative inline-block" data-menu>
      <button
        onClick={(e) => abrirMenu(e, p.id)}
        className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
      >
        <MoreHorizontal size={18} />
      </button>
      {menuAbierto === p.id && (
        <div
          data-menu
          style={{ position: 'fixed', top: menuPos.top, left: menuPos.left }}
          className="w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
        >
          <button
            onClick={() => {
              setPacienteEditando({ ...p });
              setModalEditar(true);
              setMenuAbierto(null);
            }}
            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-t-lg"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminar(p.id)}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-b-lg"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <TurneroSidebar />

      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pt-18 md:pt-8">

        <header className="flex justify-between items-center mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Pacientes</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
          >
            <UserPlus className="mr-1 md:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Nuevo Paciente</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </header>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">

          {/* Barra de búsqueda */}
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full placeholder:text-slate-400"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">Cargando pacientes...</div>
          ) : error ? (
            <div className="p-12 text-center text-red-500">{error}</div>
          ) : (
            <>
              {/* ==============================
                  VISTA DESKTOP — Tabla de pacientes
                  ============================== */}
              <div className="hidden md:block">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">Nombre</th>
                      <th className="px-6 py-4">Contacto</th>
                      <th className="px-6 py-4">Edad</th>
                      <th className="px-6 py-4">Registrado</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {pacientesFiltrados.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{p.nombre}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          {p.telefono && <div className="flex items-center gap-2"><Phone size={14} /> {p.telefono}</div>}
                          {p.email && <div className="flex items-center gap-2"><Mail size={14} /> {p.email}</div>}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                          {p.edad ? `${p.edad} años` : '—'}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                          {new Date(p.fecha_registro).toLocaleDateString('es-AR')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <MenuDropdown p={p} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ==============================
                  VISTA MOBILE — Tarjetas de pacientes
                  ============================== */}
              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {pacientesFiltrados.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">Sin pacientes</div>
                ) : (
                  pacientesFiltrados.map((p) => (
                    <div key={p.id} className="p-4 flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">{p.nombre}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                          {p.telefono && (
                            <span className="flex items-center gap-1.5">
                              <Phone size={13} className="shrink-0" /> {p.telefono}
                            </span>
                          )}
                          {p.email && (
                            <span className="flex items-center gap-1.5 truncate">
                              <Mail size={13} className="shrink-0" />
                              <span className="truncate">{p.email}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex gap-3 text-xs text-slate-400">
                          {p.edad && <span>{p.edad} años</span>}
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {new Date(p.fecha_registro).toLocaleDateString('es-AR')}
                          </span>
                        </div>
                      </div>
                      <MenuDropdown p={p} />
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 text-center">
            <span className="text-xs text-slate-400">
              {pacientesFiltrados.length} paciente{pacientesFiltrados.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </main>

      {/* Modal nuevo paciente */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nuevo Paciente"
      >
        {inactivos.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Pacientes dados de baja ({inactivos.length})
            </p>
            <input
              type="text"
              placeholder="Buscar..."
              value={busquedaInactivos}
              onChange={(e) => setBusquedaInactivos(e.target.value)}
              className="w-full px-3 py-2 mb-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
              {inactivos
                .filter((p) => p.nombre.toLowerCase().includes(busquedaInactivos.toLowerCase()))
                .map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{p.nombre}</p>
                      {p.telefono && <p className="text-xs text-slate-400">{p.telefono}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleReactivar(p.id)}
                      className="text-xs bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full transition-colors"
                    >
                      Dar de alta
                    </button>
                  </div>
                ))}
            </div>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-xs text-slate-400 bg-white dark:bg-slate-900">o registrar nuevo</span>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSavePaciente} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
            <input
              required
              type="text"
              placeholder="Ej: Laura Martínez"
              value={newPaciente.nombre}
              onChange={(e) => setNewPaciente({ ...newPaciente, nombre: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
              <input
                type="tel"
                placeholder="+54 ..."
                value={newPaciente.telefono}
                onChange={(e) => setNewPaciente({ ...newPaciente, telefono: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Edad</label>
              <input
                type="number"
                placeholder="25"
                value={newPaciente.edad}
                onChange={(e) => setNewPaciente({ ...newPaciente, edad: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="laura@ejemplo.com"
              value={newPaciente.email}
              onChange={(e) => setNewPaciente({ ...newPaciente, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="dark:bg-transparent dark:text-slate-300 dark:border-slate-700">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" /> Guardar Paciente
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal editar paciente */}
      {pacienteEditando && (
        <Modal
          isOpen={modalEditar}
          onClose={() => { setModalEditar(false); setPacienteEditando(null); }}
          title="Editar Paciente"
        >
          <form onSubmit={handleEditarPaciente} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
              <input
                required
                type="text"
                value={pacienteEditando.nombre}
                onChange={(e) => setPacienteEditando({ ...pacienteEditando, nombre: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={pacienteEditando.telefono || ''}
                  onChange={(e) => setPacienteEditando({ ...pacienteEditando, telefono: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Edad</label>
                <input
                  type="number"
                  value={pacienteEditando.edad || ''}
                  onChange={(e) => setPacienteEditando({ ...pacienteEditando, edad: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={pacienteEditando.email || ''}
                onChange={(e) => setPacienteEditando({ ...pacienteEditando, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={() => { setModalEditar(false); setPacienteEditando(null); }} className="dark:bg-transparent dark:text-slate-300 dark:border-slate-700">
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" /> Guardar Cambios
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Pacientes;
