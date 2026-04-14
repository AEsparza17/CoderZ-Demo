import React, { useState, useEffect, useRef } from "react";
import TurneroSidebar from "../components/TurneroSidebar";
import Modal from "../components/Modal";
import { Button } from "@/components/ui/button";
import { Plus, Search, Clock, MoreVertical, Save } from "lucide-react";
import { turnosApi, pacientesApi, serviciosApi } from "@/services/api";
import { useSocket } from "@/hooks/useSocket";

const estadoClases = {
  Confirmado:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pendiente:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Cancelado: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const TurneroApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const [menuAbierto, setMenuAbierto] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const [newTurno, setNewTurno] = useState({
    paciente_id: "",
    servicio: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: "",
    estado: "Pendiente",
  });

  const fechaHoy = new Date().toISOString().split("T")[0];
  const horaRef = useRef(null);

  useSocket({
    turno_creado: (turno) => {
      const fechaTurno = turno.fecha?.split('T')[0] ?? turno.fecha;
      if (fechaTurno !== fechaHoy) return;
      setTurnos((prev) => prev.some((t) => t.id === turno.id) ? prev : [...prev, turno]);
    },
    turno_actualizado: (turno) => {
      setTurnos((prev) => prev.map((t) => t.id === turno.id ? { ...t, ...turno } : t));
    },
    turno_eliminado: ({ id }) => {
      setTurnos((prev) => prev.filter((t) => t.id !== id));
    },
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [turnosData, pacientesData, serviciosData] = await Promise.all([
          turnosApi.getAll(fechaHoy),
          pacientesApi.getAll(),
          serviciosApi.getAll(),
        ]);
        setTurnos(turnosData);
        setPacientes(pacientesData);
        setServicios(serviciosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (!e.target.closest("[data-menu]")) {
        setMenuAbierto(null);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const handleSaveTurno = async (e) => {
    e.preventDefault();
    const hora = horaRef.current?.value || "";
    const [, mm] = hora.split(":").map(Number);
    if (!hora || mm > 59) {
      alert("Ingresá un horario válido (HH:MM, minutos entre 00 y 59)");
      return;
    }
    try {
      const turnoCreado = await turnosApi.create({ ...newTurno, hora });
      const paciente = pacientes.find(
        (p) => p.id === parseInt(newTurno.paciente_id),
      );
      setTurnos([
        ...turnos,
        { ...turnoCreado, paciente_nombre: paciente?.nombre || "" },
      ]);
      setNewTurno({
        paciente_id: "",
        servicio: "",
        fecha: fechaHoy,
        hora: "",
        estado: "Pendiente",
      });
      setIsModalOpen(false);
    } catch (err) {
      alert("Error al guardar el turno: " + err.message);
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await turnosApi.updateEstado(id, { estado: nuevoEstado });
      setTurnos(
        turnos.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)),
      );
    } catch (err) {
      alert("Error al cambiar estado: " + err.message);
    } finally {
      setMenuAbierto(null);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este turno?")) return;
    try {
      await turnosApi.delete(id);
      setTurnos(turnos.filter((t) => t.id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    } finally {
      setMenuAbierto(null);
    }
  };

  const turnosFiltrados = turnos.filter((t) =>
    (t.paciente_nombre || "").toLowerCase().includes(busqueda.toLowerCase()),
  );

  const MenuDropdown = ({ turno }) => (
    <div className="relative inline-block" data-menu>
      <button
        data-menu
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMenuPos({ top: rect.bottom, left: rect.right - 176 });
          setMenuAbierto(menuAbierto === turno.id ? null : turno.id);
        }}
        className="text-slate-400 hover:text-blue-600 transition-colors p-1"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      {menuAbierto === turno.id && (
        <div
          data-menu
          style={{ position: "fixed", top: menuPos.top, left: menuPos.left }}
          className="w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
        >
          <button
            onClick={() => handleCambiarEstado(turno.id, "Confirmado")}
            className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-t-lg"
          >
            Confirmar
          </button>
          <button
            onClick={() => handleCambiarEstado(turno.id, "Cancelado")}
            className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Cancelar turno
          </button>
          <button
            onClick={() => handleEliminar(turno.id)}
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

        {/* Header */}
        <header className="flex justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Tablero de Turnos
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
              Bienvenido, aquí tienes la agenda de hoy.
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
          >
            <Plus className="mr-1 md:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Nuevo Turno</span>
            <span className="sm:hidden">Nuevo</span>
          </Button>
        </header>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">
              Turnos Hoy
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {turnos.length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">
              Confirmados
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">
              {turnos.filter((t) => t.estado === "Confirmado").length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            <h3 className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">
              Pendientes
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-yellow-500 mt-2">
              {turnos.filter((t) => t.estado === "Pendiente").length}
            </p>
          </div>
        </div>

        {/* Panel de turnos */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">

          {/* Barra de búsqueda */}
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Próximos Pacientes
            </h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 bg-white dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">Cargando turnos...</div>
          ) : error ? (
            <div className="p-12 text-center text-red-500">{error}</div>
          ) : (
            <>
              {/* ==============================
                  VISTA DESKTOP — Tabla de turnos
                  ============================== */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Hora</th>
                      <th className="px-6 py-4 font-semibold">Paciente</th>
                      <th className="px-6 py-4 font-semibold">Servicio</th>
                      <th className="px-6 py-4 font-semibold">Estado</th>
                      <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {turnosFiltrados.map((turno) => (
                      <tr
                        key={turno.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center text-slate-700 dark:text-slate-200 font-medium">
                            <Clock className="h-4 w-4 mr-2 text-slate-400" />
                            {turno.hora?.slice(0, 5)}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                          {turno.paciente_nombre}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                          {turno.servicio}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${estadoClases[turno.estado] || estadoClases.Pendiente}`}>
                            {turno.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <MenuDropdown turno={turno} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ==============================
                  VISTA MOBILE — Tarjetas de turnos
                  ============================== */}
              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {turnosFiltrados.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">Sin turnos para hoy</div>
                ) : (
                  turnosFiltrados.map((turno) => (
                    <div key={turno.id} className="p-4 flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-semibold">
                            <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                            {turno.hora?.slice(0, 5)}
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${estadoClases[turno.estado] || estadoClases.Pendiente}`}>
                            {turno.estado}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {turno.paciente_nombre}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {turno.servicio}
                        </p>
                      </div>
                      <MenuDropdown turno={turno} />
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 text-center">
            <span className="text-xs text-slate-400">
              Mostrando {turnosFiltrados.length} turnos
            </span>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nuevo Turno"
      >
        <form onSubmit={handleSaveTurno} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Paciente
            </label>
            <select
              required
              value={newTurno.paciente_id}
              onChange={(e) =>
                setNewTurno({ ...newTurno, paciente_id: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar paciente...</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Servicio / Tratamiento
            </label>
            <select
              required
              value={newTurno.servicio}
              onChange={(e) =>
                setNewTurno({ ...newTurno, servicio: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar...</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.nombre}>{s.nombre} ({s.duracion} min)</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Fecha
              </label>
              <input
                required
                type="date"
                value={newTurno.fecha}
                onChange={(e) =>
                  setNewTurno({ ...newTurno, fecha: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Horario
              </label>
              <input
                required
                type="time"
                ref={horaRef}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="dark:bg-transparent dark:text-slate-300 dark:border-slate-700"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" /> Guardar Turno
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TurneroApp;
