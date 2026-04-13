const hoy = new Date().toISOString().split('T')[0];

const diasDesdeHoy = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
};

export const DEMO_USER = {
  token: 'demo-token-local',
  nombre: 'Dr. Agustín',
  herramientas: ['turnero'],
};

export const SEED_PACIENTES = [
  { id: 1,  nombre: 'María González',    edad: 35, telefono: '+54 351 234-5678', email: 'maria@ejemplo.com',      fecha_registro: '2024-01-15T10:00:00Z' },
  { id: 2,  nombre: 'Carlos Rodríguez',  edad: 42, telefono: '+54 351 345-6789', email: 'carlos@ejemplo.com',     fecha_registro: '2024-02-20T10:00:00Z' },
  { id: 3,  nombre: 'Laura Martínez',    edad: 28, telefono: '+54 353 456-7890', email: 'laura@ejemplo.com',      fecha_registro: '2024-03-10T10:00:00Z' },
  { id: 4,  nombre: 'Juan Pérez',        edad: 55, telefono: '+54 351 567-8901', email: 'juan@ejemplo.com',       fecha_registro: '2024-04-05T10:00:00Z' },
  { id: 5,  nombre: 'Sofía López',       edad: 31, telefono: '+54 353 678-9012', email: 'sofia@ejemplo.com',      fecha_registro: '2024-05-12T10:00:00Z' },
  { id: 6,  nombre: 'Diego Fernández',   edad: 47, telefono: '+54 351 789-0123', email: 'diego@ejemplo.com',      fecha_registro: '2024-06-18T10:00:00Z' },
  { id: 7,  nombre: 'Ana Ramírez',       edad: 22, telefono: '+54 353 890-1234', email: 'ana@ejemplo.com',        fecha_registro: '2024-07-22T10:00:00Z' },
  { id: 8,  nombre: 'Pablo Torres',      edad: 38, telefono: '+54 351 901-2345', email: 'pablo@ejemplo.com',      fecha_registro: '2024-08-30T10:00:00Z' },
  { id: 9,  nombre: 'Valentina Cruz',    edad: 25, telefono: '+54 353 012-3456', email: 'valentina@ejemplo.com',  fecha_registro: '2024-09-14T10:00:00Z' },
  { id: 10, nombre: 'Roberto Sánchez',   edad: 60, telefono: '+54 351 123-4567', email: 'roberto@ejemplo.com',    fecha_registro: '2024-10-08T10:00:00Z' },
];

export const SEED_PACIENTES_INACTIVOS = [
  { id: 11, nombre: 'Florencia Herrera', edad: 33, telefono: '+54 351 234-5670', email: 'florencia@ejemplo.com', fecha_registro: '2023-11-10T10:00:00Z' },
  { id: 12, nombre: 'Martín Acosta',     edad: 44, telefono: '+54 353 345-6780', email: 'martin@ejemplo.com',    fecha_registro: '2023-12-05T10:00:00Z' },
];

export const SEED_SERVICIOS = [
  { id: 1, nombre: 'Consulta General',       duracion: 30 },
  { id: 2, nombre: 'Limpieza Dental',        duracion: 45 },
  { id: 3, nombre: 'Ortodoncia - Control',   duracion: 20 },
  { id: 4, nombre: 'Extracción',             duracion: 60 },
  { id: 5, nombre: 'Blanqueamiento',         duracion: 90 },
];

export const SEED_TURNOS = [
  // Hoy
  { id: 1,  paciente_id: 1,  paciente_nombre: 'María González',  servicio: 'Consulta General',     fecha: hoy,                hora: '09:00:00', estado: 'Confirmado' },
  { id: 2,  paciente_id: 3,  paciente_nombre: 'Laura Martínez',  servicio: 'Limpieza Dental',      fecha: hoy,                hora: '09:30:00', estado: 'Pendiente'  },
  { id: 3,  paciente_id: 5,  paciente_nombre: 'Sofía López',     servicio: 'Ortodoncia - Control', fecha: hoy,                hora: '10:00:00', estado: 'Confirmado' },
  { id: 4,  paciente_id: 7,  paciente_nombre: 'Ana Ramírez',     servicio: 'Blanqueamiento',       fecha: hoy,                hora: '11:00:00', estado: 'Pendiente'  },
  { id: 5,  paciente_id: 2,  paciente_nombre: 'Carlos Rodríguez',servicio: 'Extracción',           fecha: hoy,                hora: '11:30:00', estado: 'Cancelado'  },
  { id: 6,  paciente_id: 4,  paciente_nombre: 'Juan Pérez',      servicio: 'Consulta General',     fecha: hoy,                hora: '14:00:00', estado: 'Pendiente'  },
  { id: 7,  paciente_id: 6,  paciente_nombre: 'Diego Fernández', servicio: 'Limpieza Dental',      fecha: hoy,                hora: '15:00:00', estado: 'Confirmado' },
  // Próximos días (para la Agenda)
  { id: 8,  paciente_id: 8,  paciente_nombre: 'Pablo Torres',    servicio: 'Consulta General',     fecha: diasDesdeHoy(1),    hora: '09:00:00', estado: 'Confirmado' },
  { id: 9,  paciente_id: 9,  paciente_nombre: 'Valentina Cruz',  servicio: 'Ortodoncia - Control', fecha: diasDesdeHoy(1),    hora: '10:30:00', estado: 'Pendiente'  },
  { id: 10, paciente_id: 10, paciente_nombre: 'Roberto Sánchez', servicio: 'Extracción',           fecha: diasDesdeHoy(2),    hora: '09:00:00', estado: 'Pendiente'  },
  { id: 11, paciente_id: 1,  paciente_nombre: 'María González',  servicio: 'Limpieza Dental',      fecha: diasDesdeHoy(3),    hora: '11:00:00', estado: 'Confirmado' },
  // Días anteriores
  { id: 12, paciente_id: 3,  paciente_nombre: 'Laura Martínez',  servicio: 'Blanqueamiento',       fecha: diasDesdeHoy(-1),   hora: '10:00:00', estado: 'Confirmado' },
  { id: 13, paciente_id: 5,  paciente_nombre: 'Sofía López',     servicio: 'Consulta General',     fecha: diasDesdeHoy(-2),   hora: '14:00:00', estado: 'Cancelado'  },
];
