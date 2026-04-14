# CoderZ — Portal de Clientes y Sistema de Turnos

Aplicación web desarrollada por **CoderZ**, una empresa de desarrollo de software. Incluye una landing page pública, un portal de clientes con autenticación y un sistema de gestión de turnos.

Este repositorio corre en **modo demo** — no requiere backend. Todos los datos son simulados en memoria.

> 📖 [Read in English](README.en.md)

---

## Funcionalidades

**Landing Page**
- Hero animado, sección de servicios y carrusel de clientes
- Totalmente responsive (mobile + desktop)

**Portal de Clientes**
- Login con credenciales de demo
- Dashboard con las herramientas asignadas al usuario

**Sistema de Turnos (Turnero)**
- Tablero diario de turnos con gestión de estados (Confirmado / Pendiente / Cancelado)
- Vistas de calendario semanal y mensual
- Gestión de pacientes (crear, editar, dar de baja, reactivar)
- Configuración de servicios y tratamientos
- Actualizaciones en tiempo real via WebSocket *(solo en versión live)*

**Página de CV**
- Portfolio personal en `/agustinesparza`

---

## Acceso Demo

| Campo      | Valor             |
|------------|-------------------|
| Email      | `demo@demo.com`   |
| Contraseña | `demo1234`        |

> Los datos se resetean al recargar la página — este es el comportamiento esperado en modo demo.

---

## Stack Tecnológico

| Categoría      | Tecnología                              |
|----------------|-----------------------------------------|
| Framework      | React 19 + Vite                         |
| Estilos        | Tailwind CSS v4                         |
| Componentes UI | Radix UI + shadcn/ui                    |
| Animaciones    | Framer Motion                           |
| Ruteo          | React Router v7                         |
| Iconos         | Lucide React                            |
| Tiempo real    | Socket.io-client *(solo versión live)*  |

---

## Correr localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/AEsparza17/CoderZ-Demo.git
cd CoderZ-Demo

# 2. Instalar dependencias
# (--legacy-peer-deps es necesario por conflictos de versiones entre eslint@10 y sus plugins)
npm install --legacy-peer-deps

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Estructura del Proyecto

```
src/
├── components/          # Componentes UI compartidos (Navbar, Hero, Footer...)
├── features/
│   ├── portal/          # Portal de clientes (login, registro, dashboard)
│   ├── turnero/         # Sistema de turnos (tablero, agenda, pacientes, config)
│   ├── cv/              # Página de CV personal
│   └── politicas.../    # Política de privacidad
├── hooks/               # Hooks personalizados (useSocket, useTheme, useInView)
├── services/
│   ├── api.js           # API mock — operaciones CRUD en memoria
│   └── mockData.js      # Datos semilla (pacientes, servicios, turnos)
└── lib/                 # Utilidades
```

---

## Versión en Producción

La aplicación en producción se conecta a un backend real con datos persistentes, autenticación JWT y sincronización en tiempo real via WebSocket.

→ [coder-z.com](https://coder-z.com)
