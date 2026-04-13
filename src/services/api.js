const BASE_URL = import.meta.env.VITE_API_URL || 'https://backend.coder-z.com/portal';

const getToken = () => localStorage.getItem('coderz_token');

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem('coderz_token');
    localStorage.removeItem('coderz_nombre');
    window.location.href = '/portal';
    return;
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || 'Error del servidor');
  }

  return res.json();
};

export const pacientesApi = {
  getAll: () => request('/api/pacientes'),
  getInactivos: () => request('/api/pacientes/inactivos'),
  create: (data) => request('/api/pacientes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/pacientes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/api/pacientes/${id}`, { method: 'DELETE' }),
  reactivar: (id) => request(`/api/pacientes/${id}/reactivar`, { method: 'PUT' }),
};

export const serviciosApi = {
  getAll: () => request('/api/servicios'),
  create: (data) => request('/api/servicios', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request(`/api/servicios/${id}`, { method: 'DELETE' }),
};

export const turnosApi = {
  getAll: (fecha) => request(`/api/turnos${fecha ? `?fecha=${fecha}` : ''}`),
  getMes: (fecha_inicio, fecha_fin) => request(`/api/turnos?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`),
  create: (data) => request('/api/turnos', { method: 'POST', body: JSON.stringify(data) }),
  updateEstado: (id, data) => request(`/api/turnos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/api/turnos/${id}`, { method: 'DELETE' }),
};

export const authApi = {
  register: (nombre, email, password) =>
    request('/api/auth/register', { method: 'POST', body: JSON.stringify({ nombre, email, password }) }),
  logout: () => request('/api/auth/logout', { method: 'DELETE' }),
  logoutAll: () => request('/api/auth/logout/all', { method: 'DELETE' }),
  getSesiones: () => request('/api/auth/sesiones'),
};
