import {
  DEMO_USER,
  SEED_PACIENTES,
  SEED_PACIENTES_INACTIVOS,
  SEED_SERVICIOS,
  SEED_TURNOS,
} from './mockData.js';

// Estado en memoria — se resetea al recargar la página (comportamiento esperado en demo)
let pacientes          = [...SEED_PACIENTES];
let pacientesInactivos = [...SEED_PACIENTES_INACTIVOS];
let servicios          = [...SEED_SERVICIOS];
let turnos             = [...SEED_TURNOS];
let nextId             = 100;

const delay = () => new Promise((r) => setTimeout(r, 250));

// ─── Pacientes ────────────────────────────────────────────────────────────────

export const pacientesApi = {
  getAll: async () => {
    await delay();
    return [...pacientes];
  },

  getInactivos: async () => {
    await delay();
    return [...pacientesInactivos];
  },

  create: async (data) => {
    await delay();
    const nuevo = { ...data, id: ++nextId, fecha_registro: new Date().toISOString() };
    pacientes = [nuevo, ...pacientes];
    return nuevo;
  },

  update: async (id, data) => {
    await delay();
    pacientes = pacientes.map((p) => (p.id === id ? { ...p, ...data } : p));
    return pacientes.find((p) => p.id === id);
  },

  delete: async (id) => {
    await delay();
    const eliminado = pacientes.find((p) => p.id === id);
    pacientes = pacientes.filter((p) => p.id !== id);
    if (eliminado) pacientesInactivos = [eliminado, ...pacientesInactivos];
  },

  reactivar: async (id) => {
    await delay();
    const reactivado = pacientesInactivos.find((p) => p.id === id);
    pacientesInactivos = pacientesInactivos.filter((p) => p.id !== id);
    if (reactivado) pacientes = [reactivado, ...pacientes];
  },
};

// ─── Servicios ────────────────────────────────────────────────────────────────

export const serviciosApi = {
  getAll: async () => {
    await delay();
    return [...servicios];
  },

  create: async (data) => {
    await delay();
    const nuevo = { ...data, id: ++nextId };
    servicios = [...servicios, nuevo];
    return nuevo;
  },

  delete: async (id) => {
    await delay();
    servicios = servicios.filter((s) => s.id !== id);
  },
};

// ─── Turnos ───────────────────────────────────────────────────────────────────

export const turnosApi = {
  getAll: async (fecha) => {
    await delay();
    if (!fecha) return [...turnos];
    return turnos.filter((t) => t.fecha === fecha);
  },

  getMes: async (fecha_inicio, fecha_fin) => {
    await delay();
    return turnos.filter((t) => t.fecha >= fecha_inicio && t.fecha <= fecha_fin);
  },

  create: async (data) => {
    await delay();
    const paciente = pacientes.find((p) => p.id === parseInt(data.paciente_id));
    const nuevo = { ...data, id: ++nextId, paciente_nombre: paciente?.nombre || '' };
    turnos = [...turnos, nuevo];
    return nuevo;
  },

  updateEstado: async (id, data) => {
    await delay();
    turnos = turnos.map((t) => (t.id === id ? { ...t, ...data } : t));
    return turnos.find((t) => t.id === id);
  },

  delete: async (id) => {
    await delay();
    turnos = turnos.filter((t) => t.id !== id);
  },
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: async (email, password) => {
    await delay();
    if (email === 'demo@demo.com' && password === 'demo1234') {
      return { ...DEMO_USER };
    }
    throw new Error('Credenciales incorrectas');
  },

  register: async () => {
    await delay();
  },

  logout: async () => {
    await delay();
  },

  logoutAll: async () => {
    await delay();
  },

  getSesiones: async () => {
    await delay();
    return { total: 1 };
  },
};
