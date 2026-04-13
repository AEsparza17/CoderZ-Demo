import React, { useState, useEffect } from 'react';
import TurneroSidebar from '../components/TurneroSidebar';
import Modal from '../components/Modal';
import { Button } from '@/components/ui/button';
import { Clock, ChevronLeft, ChevronRight, LayoutGrid, AlignJustify, Plus, Save, Trash2 } from 'lucide-react';
import { turnosApi, pacientesApi, serviciosApi } from '@/services/api';
import { useSocket } from '@/hooks/useSocket';

const colorPorTipo = (servicio) => {
  if (!servicio) return 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400';
  const s = servicio.toLowerCase();
  if (s.includes('consulta')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
  if (s.includes('limpieza')) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
  if (s.includes('ortodoncia') || s.includes('control')) return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
  if (s.includes('extracción') || s.includes('urgencia')) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
  return 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300';
};

const formatFecha = (date) => date.toISOString().split('T')[0];

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DIAS_SEMANA_FULL = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const getLunesDeSemana = (fecha) => {
  const d = new Date(fecha);
  const dia = d.getDay();
  const diff = dia === 0 ? -6 : 1 - dia;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getDiasDelMes = (anio, mes) => {
  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0);
  let inicioOffset = primerDia.getDay() - 1;
  if (inicioOffset < 0) inicioOffset = 6;
  const dias = [];
  for (let i = 0; i < inicioOffset; i++) dias.push(null);
  for (let d = 1; d <= ultimoDia.getDate(); d++) dias.push(new Date(anio, mes, d));
  return dias;
};

const TURNO_VACIO = { paciente_id: '', servicio: '', fecha: '', hora: '', estado: 'Pendiente' };

const Agenda = () => {
  const hoy = new Date();
  const [vista, setVista] = useState('mes');
  const [mesActual, setMesActual] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const [semanaInicio, setSemanaInicio] = useState(() => getLunesDeSemana(hoy));
  const [turnosPorDia, setTurnosPorDia] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pacientes, setPacientes] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [modalNuevoOpen, setModalNuevoOpen] = useState(false);
  const [newTurno, setNewTurno] = useState(TURNO_VACIO);

  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [turnoEditando, setTurnoEditando] = useState(null);

  const anio = mesActual.getFullYear();
  const mes = mesActual.getMonth();
  const diasDelMes = getDiasDelMes(anio, mes);

  const diasDeSemana = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(semanaInicio);
    d.setDate(d.getDate() + i);
    return d;
  });

  useSocket({
    turno_creado: (turno) => {
      const fecha = turno.fecha?.split('T')[0] ?? turno.fecha;
      setTurnosPorDia((prev) => {
        const existing = prev[fecha] || [];
        if (existing.some((t) => t.id === turno.id)) return prev;
        return { ...prev, [fecha]: [...existing, turno] };
      });
    },
    turno_actualizado: (turno) => {
      const nuevaFecha = turno.fecha?.split('T')[0] ?? turno.fecha;
      setTurnosPorDia((prev) => {
        const nuevoMapa = {};
        for (const key of Object.keys(prev)) {
          const filtrados = prev[key].filter((t) => t.id !== turno.id);
          if (filtrados.length > 0) nuevoMapa[key] = filtrados;
        }
        nuevoMapa[nuevaFecha] = [...(nuevoMapa[nuevaFecha] || []), turno];
        return nuevoMapa;
      });
    },
    turno_eliminado: ({ id }) => {
      setTurnosPorDia((prev) => {
        const nuevoMapa = {};
        for (const key of Object.keys(prev)) {
          const filtrados = prev[key].filter((t) => t.id !== id);
          if (filtrados.length > 0) nuevoMapa[key] = filtrados;
        }
        return nuevoMapa;
      });
    },
  });

  // Cargar pacientes y servicios una sola vez
  useEffect(() => {
    Promise.all([pacientesApi.getAll(), serviciosApi.getAll()])
      .then(([p, s]) => { setPacientes(p); setServicios(s); })
      .catch(() => {});
  }, []);

  // Cargar turnos según la vista
  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (vista === 'mes') {
          const inicio = formatFecha(new Date(anio, mes, 1));
          const fin = formatFecha(new Date(anio, mes + 1, 0));
          data = await turnosApi.getMes(inicio, fin);
        } else {
          const inicio = formatFecha(semanaInicio);
          const fin = formatFecha(diasDeSemana[6]);
          data = await turnosApi.getMes(inicio, fin);
        }
        const mapa = {};
        data.forEach((turno) => {
          const fecha = turno.fecha?.split('T')[0] ?? turno.fecha;
          if (!mapa[fecha]) mapa[fecha] = [];
          mapa[fecha].push(turno);
        });
        setTurnosPorDia(mapa);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [mesActual, semanaInicio, vista]);

  const irAtras = () => {
    if (vista === 'mes') setMesActual(new Date(anio, mes - 1, 1));
    else {
      const d = new Date(semanaInicio);
      d.setDate(d.getDate() - 7);
      setSemanaInicio(d);
    }
  };

  const irAdelante = () => {
    if (vista === 'mes') setMesActual(new Date(anio, mes + 1, 1));
    else {
      const d = new Date(semanaInicio);
      d.setDate(d.getDate() + 7);
      setSemanaInicio(d);
    }
  };

  const titulo = vista === 'mes'
    ? mesActual.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
    : `${diasDeSemana[0].toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })} — ${diasDeSemana[6].toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;

  // ---- Handlers de nuevo turno ----
  const handleAbrirNuevo = (fechaKey) => {
    setNewTurno({ ...TURNO_VACIO, fecha: fechaKey });
    setModalNuevoOpen(true);
  };

  const handleSaveTurno = async (e) => {
    e.preventDefault();
    try {
      const creado = await turnosApi.create(newTurno);
      const paciente = pacientes.find((p) => p.id === parseInt(newTurno.paciente_id));
      const turnoConNombre = { ...creado, paciente_nombre: paciente?.nombre || '' };
      setTurnosPorDia((prev) => ({
        ...prev,
        [newTurno.fecha]: [...(prev[newTurno.fecha] || []), turnoConNombre],
      }));
      setModalNuevoOpen(false);
    } catch (err) {
      alert('Error al guardar el turno: ' + err.message);
    }
  };

  // ---- Handlers de editar turno ----
  const handleAbrirEditar = (turno, e) => {
    e.stopPropagation();
    setTurnoEditando({
      ...turno,
      fecha: turno.fecha?.split('T')[0] ?? turno.fecha,
    });
    setModalEditarOpen(true);
  };

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await turnosApi.updateEstado(turnoEditando.id, turnoEditando);
      const paciente = pacientes.find((p) => p.id === parseInt(turnoEditando.paciente_id));
      const actualizado = {
        ...turnoEditando,
        paciente_nombre: paciente?.nombre || turnoEditando.paciente_nombre,
      };
      setTurnosPorDia((prev) => {
        const nuevoMapa = {};
        for (const key of Object.keys(prev)) {
          const filtrados = prev[key].filter((t) => t.id !== turnoEditando.id);
          if (filtrados.length > 0) nuevoMapa[key] = filtrados;
        }
        const nuevaFecha = turnoEditando.fecha;
        nuevoMapa[nuevaFecha] = [...(nuevoMapa[nuevaFecha] || []), actualizado];
        return nuevoMapa;
      });
      setModalEditarOpen(false);
      setTurnoEditando(null);
    } catch (err) {
      alert('Error al editar el turno: ' + err.message);
    }
  };

  const handleEliminarDesdeEditar = async () => {
    if (!confirm('¿Seguro que querés eliminar este turno?')) return;
    try {
      await turnosApi.delete(turnoEditando.id);
      setTurnosPorDia((prev) => {
        const nuevoMapa = {};
        for (const key of Object.keys(prev)) {
          const filtrados = prev[key].filter((t) => t.id !== turnoEditando.id);
          if (filtrados.length > 0) nuevoMapa[key] = filtrados;
        }
        return nuevoMapa;
      });
      setModalEditarOpen(false);
      setTurnoEditando(null);
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  // ---- Formulario reutilizable ----
  const FormTurno = ({ data, onChange, onSubmit, onCancel, titulo, submitLabel, extraFooter }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Paciente</label>
        <select
          required
          value={data.paciente_id}
          onChange={(e) => onChange({ ...data, paciente_id: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar paciente...</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Servicio / Tratamiento</label>
        <select
          required
          value={data.servicio}
          onChange={(e) => onChange({ ...data, servicio: e.target.value })}
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
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fecha</label>
          <input
            required
            type="date"
            value={data.fecha}
            onChange={(e) => onChange({ ...data, fecha: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Horario</label>
          <input
            required
            type="time"
            value={data.hora}
            onChange={(e) => onChange({ ...data, hora: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {data.estado !== undefined && (
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estado</label>
          <select
            value={data.estado}
            onChange={(e) => onChange({ ...data, estado: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      )}
      <div className="flex justify-between items-center gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
        <div>{extraFooter}</div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onCancel} className="dark:bg-transparent dark:text-slate-300 dark:border-slate-700">
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" /> {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <TurneroSidebar />

      <div className="flex-1 ml-0 md:ml-64 flex flex-col overflow-hidden pt-[4.5rem] md:pt-0">

        {/* Header — separado del scroll */}
        <header className="shrink-0 bg-slate-50 dark:bg-slate-950 px-4 md:px-8 pt-4 md:pt-8 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white capitalize">
            Agenda {vista === 'mes' ? 'Mensual' : 'Semanal'}
          </h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">

            {/* Switch vista */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setVista('semana')}
                title="Vista semanal"
                className={`p-1.5 rounded transition-colors ${
                  vista === 'semana'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <AlignJustify size={16} />
              </button>
              <button
                onClick={() => setVista('mes')}
                title="Vista mensual"
                className={`p-1.5 rounded transition-colors ${
                  vista === 'mes'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Navegación */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 flex-1 sm:flex-none justify-between sm:justify-start">
              <button onClick={irAtras} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold text-slate-700 dark:text-slate-200 capitalize text-center text-sm flex-1 sm:w-44">
                {titulo}
              </span>
              <button onClick={irAdelante} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Área scrolleable — independiente del header */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-8 pt-2 pb-8">

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* ==========================================
            VISTA MENSUAL
            ========================================== */}
        {vista === 'mes' && (
          <>
            {/* ==============================
                VISTA DESKTOP — Grilla mensual 7 columnas
                ============================== */}
            <div className="hidden md:block">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {DIAS_SEMANA.map((dia) => (
                  <div key={dia} className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase py-2">
                    {dia}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {diasDelMes.map((dia, index) => {
                  if (!dia) return <div key={`empty-${index}`} />;
                  const fechaKey = formatFecha(dia);
                  const turnos = turnosPorDia[fechaKey] || [];
                  const esHoy = fechaKey === formatFecha(hoy);
                  return (
                    <div
                      key={fechaKey}
                      onClick={() => handleAbrirNuevo(fechaKey)}
                      className={`group min-h-28 rounded-xl border p-2 flex flex-col gap-1 transition-colors cursor-pointer bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 ${
                        esHoy ? 'border-blue-400 dark:border-blue-600' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          esHoy ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {dia.getDate()}
                        </div>
                        <Plus size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors" />
                      </div>
                      {loading ? (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
                        </div>
                      ) : turnos.length > 0 ? (
                        <div className="space-y-1 overflow-hidden">
                          {turnos.slice(0, 3).map((turno) => (
                            <div
                              key={turno.id}
                              onClick={(e) => handleAbrirEditar(turno, e)}
                              className={`px-1.5 py-0.5 rounded text-xs truncate flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity ${colorPorTipo(turno.servicio)}`}
                            >
                              <Clock size={9} className="shrink-0" />
                              <span className="truncate">{turno.hora?.slice(0, 5)} {turno.paciente_nombre}</span>
                            </div>
                          ))}
                          {turnos.length > 3 && (
                            <div className="text-xs text-slate-400 dark:text-slate-500 pl-1">+{turnos.length - 3} más</div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ==============================
                VISTA MOBILE — Lista compacta mensual
                ============================== */}
            <div className="md:hidden">
              {/* Mini grilla de días (solo números + punto indicador) */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-4">
                <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-800">
                  {DIAS_SEMANA.map((dia) => (
                    <div key={dia} className="text-center text-xs font-semibold text-slate-400 py-2">
                      {dia[0]}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {diasDelMes.map((dia, index) => {
                    if (!dia) return <div key={`empty-${index}`} className="h-10" />;
                    const fechaKey = formatFecha(dia);
                    const turnos = turnosPorDia[fechaKey] || [];
                    const esHoy = fechaKey === formatFecha(hoy);
                    return (
                      <div
                        key={fechaKey}
                        onClick={() => handleAbrirNuevo(fechaKey)}
                        className="h-10 flex flex-col items-center justify-center gap-0.5 cursor-pointer"
                      >
                        <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                          esHoy ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {dia.getDate()}
                        </span>
                        {turnos.length > 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lista de días con turnos */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                  Turnos del mes
                </p>
                {loading ? (
                  <div className="p-8 text-center text-slate-400 text-sm">Cargando...</div>
                ) : Object.keys(turnosPorDia).length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm italic">Sin turnos este mes</div>
                ) : (
                  Object.entries(turnosPorDia)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([fechaKey, turnos]) => {
                      const fecha = new Date(fechaKey + 'T00:00:00');
                      const esHoy = fechaKey === formatFecha(hoy);
                      return (
                        <div key={fechaKey} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                          <div
                            onClick={() => handleAbrirNuevo(fechaKey)}
                            className={`px-4 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 cursor-pointer ${
                              esHoy ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800/50'
                            }`}
                          >
                            <span className={`text-sm font-semibold capitalize ${esHoy ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                              {fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${esHoy ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                {turnos.length}
                              </span>
                              <Plus size={14} className={esHoy ? 'text-white/70' : 'text-slate-400'} />
                            </div>
                          </div>
                          <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {turnos.map((turno) => (
                              <div
                                key={turno.id}
                                onClick={(e) => handleAbrirEditar(turno, e)}
                                className={`px-4 py-2.5 flex items-center gap-3 text-sm cursor-pointer hover:opacity-80 transition-opacity ${colorPorTipo(turno.servicio)}`}
                              >
                                <div className="flex items-center gap-1.5 font-bold shrink-0">
                                  <Clock size={12} />
                                  {turno.hora?.slice(0, 5)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold truncate">{turno.paciente_nombre}</p>
                                  <p className="text-xs opacity-80 truncate">{turno.servicio}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </>
        )}

        {/* ==========================================
            VISTA SEMANAL
            ========================================== */}
        {vista === 'semana' && (
          <>
            {/* ==============================
                VISTA DESKTOP — Grilla semanal 7 columnas
                ============================== */}
            <div className="hidden md:flex gap-4 overflow-x-auto pb-2">
              {diasDeSemana.map((dia, index) => {
                const fechaKey = formatFecha(dia);
                const turnos = turnosPorDia[fechaKey] || [];
                const esHoy = fechaKey === formatFecha(hoy);
                return (
                  <div
                    key={fechaKey}
                    className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border overflow-hidden flex flex-col h-[420px] min-w-[200px] flex-1 transition-colors ${
                      esHoy ? 'border-blue-400 dark:border-blue-600' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div
                      onClick={() => handleAbrirNuevo(fechaKey)}
                      className={`group p-3 text-center border-b font-semibold text-sm transition-colors cursor-pointer ${
                        esHoy
                          ? 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {DIAS_SEMANA_FULL[index]}
                        <Plus size={12} className={`opacity-50 group-hover:opacity-100 transition-opacity ${esHoy ? 'text-white' : ''}`} />
                      </div>
                      <div className="text-xs font-normal opacity-80">
                        {dia.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                      </div>
                    </div>
                    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                      {loading ? (
                        <div className="h-full flex items-center justify-center text-slate-300 dark:text-slate-700 text-xs">Cargando...</div>
                      ) : turnos.length > 0 ? (
                        turnos.map((turno) => (
                          <div
                            key={turno.id}
                            onClick={(e) => handleAbrirEditar(turno, e)}
                            className={`p-3 rounded-lg text-sm cursor-pointer hover:opacity-80 transition-opacity ${colorPorTipo(turno.servicio)}`}
                          >
                            <div className="flex items-center gap-1 font-bold mb-1">
                              <Clock size={12} /> {turno.hora?.slice(0, 5)}
                            </div>
                            <div className="truncate font-medium">{turno.paciente_nombre}</div>
                            <div className="text-xs opacity-80">{turno.servicio}</div>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center text-slate-300 dark:text-slate-700 text-xs italic">Sin turnos</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ==============================
                VISTA MOBILE — Lista vertical semanal
                ============================== */}
            <div className="md:hidden space-y-3">
              {diasDeSemana.map((dia, index) => {
                const fechaKey = formatFecha(dia);
                const turnos = turnosPorDia[fechaKey] || [];
                const esHoy = fechaKey === formatFecha(hoy);
                return (
                  <div
                    key={fechaKey}
                    className={`bg-white dark:bg-slate-900 rounded-xl border overflow-hidden transition-colors ${
                      esHoy ? 'border-blue-400 dark:border-blue-600' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div
                      onClick={() => handleAbrirNuevo(fechaKey)}
                      className={`px-4 py-3 flex items-center justify-between cursor-pointer ${
                        esHoy
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <p className={`font-semibold text-sm ${esHoy ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                          {DIAS_SEMANA_FULL[index]}
                        </p>
                        <p className={`text-xs ${esHoy ? 'text-white/70' : 'text-slate-400'}`}>
                          {dia.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {turnos.length > 0 && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            esHoy ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            {turnos.length} turno{turnos.length !== 1 ? 's' : ''}
                          </span>
                        )}
                        <Plus size={14} className={esHoy ? 'text-white/70' : 'text-slate-400'} />
                      </div>
                    </div>

                    {loading ? (
                      <div className="p-4 text-center text-slate-400 text-xs">Cargando...</div>
                    ) : turnos.length === 0 ? (
                      <div className="px-4 py-3 text-slate-400 dark:text-slate-600 text-xs italic">Sin turnos</div>
                    ) : (
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {turnos.map((turno) => (
                          <div
                            key={turno.id}
                            onClick={(e) => handleAbrirEditar(turno, e)}
                            className={`px-4 py-2.5 flex items-center gap-3 text-sm cursor-pointer hover:opacity-80 transition-opacity ${colorPorTipo(turno.servicio)}`}
                          >
                            <div className="flex items-center gap-1.5 font-bold shrink-0">
                              <Clock size={12} />
                              {turno.hora?.slice(0, 5)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{turno.paciente_nombre}</p>
                              <p className="text-xs opacity-80 truncate">{turno.servicio}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        </div>{/* fin área scrolleable */}

      </div>{/* fin columna derecha */}

      {/* Modal — Nuevo turno */}
      <Modal
        isOpen={modalNuevoOpen}
        onClose={() => setModalNuevoOpen(false)}
        title="Nuevo Turno"
      >
        <FormTurno
          data={newTurno}
          onChange={setNewTurno}
          onSubmit={handleSaveTurno}
          onCancel={() => setModalNuevoOpen(false)}
          submitLabel="Guardar Turno"
        />
      </Modal>

      {/* Modal — Editar turno */}
      <Modal
        isOpen={modalEditarOpen}
        onClose={() => { setModalEditarOpen(false); setTurnoEditando(null); }}
        title="Editar Turno"
      >
        {turnoEditando && (
          <FormTurno
            data={turnoEditando}
            onChange={setTurnoEditando}
            onSubmit={handleGuardarEdicion}
            onCancel={() => { setModalEditarOpen(false); setTurnoEditando(null); }}
            submitLabel="Guardar Cambios"
            extraFooter={
              <button
                type="button"
                onClick={handleEliminarDesdeEditar}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={14} /> Eliminar turno
              </button>
            }
          />
        )}
      </Modal>

    </div>
  );
};

export default Agenda;
