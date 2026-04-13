# CoderZ — Client Portal & Appointment System

A full-featured web application built by **CoderZ**, a software development company. It includes a public landing page, a client portal with authentication, and an appointment management system (turnero) for healthcare professionals.

This repository runs in **demo mode** — no backend required. All data is mocked in memory.

> 📖 [Leer en Español](README.md)

---

## Features

**Landing Page**
- Animated hero section, services showcase, and client carousel
- Fully responsive (mobile + desktop)

**Client Portal**
- Login with demo credentials
- Dashboard showing tools assigned to the user

**Appointment System (Turnero)**
- Daily appointment board with status management (Confirmed / Pending / Cancelled)
- Weekly and monthly calendar views
- Patient management (create, edit, deactivate, reactivate)
- Service/treatment configuration
- Real-time updates via WebSocket *(live version only)*

**CV Page**
- Personal portfolio page at `/agustinesparza`

---

## Demo Access

| Field    | Value             |
|----------|-------------------|
| Email    | `demo@demo.com`   |
| Password | `demo1234`        |

> Data resets on page reload — this is expected behavior in demo mode.

---

## Tech Stack

| Category       | Technology                              |
|----------------|-----------------------------------------|
| Framework      | React 19 + Vite                         |
| Styling        | Tailwind CSS v4                         |
| UI Components  | Radix UI + shadcn/ui                    |
| Animations     | Framer Motion                           |
| Routing        | React Router v7                         |
| Icons          | Lucide React                            |
| Real-time      | Socket.io-client *(live version only)*  |

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/AEsparza17/CoderZ-Demo.git
cd CoderZ-Demo

# 2. Install dependencies
# (--legacy-peer-deps is required due to version conflicts between eslint@10 and its plugins)
npm install --legacy-peer-deps

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── components/          # Shared UI components (Navbar, Hero, Footer...)
├── features/
│   ├── portal/          # Client portal (login, register, dashboard)
│   ├── turnero/         # Appointment system (board, agenda, patients, config)
│   ├── cv/              # Personal CV page
│   └── politicas.../    # Privacy policy page
├── hooks/               # Custom hooks (useSocket, useTheme, useInView)
├── services/
│   ├── api.js           # Mock API — in-memory CRUD operations
│   └── mockData.js      # Seed data (patients, services, appointments)
└── lib/                 # Utilities
```

---

## Live Version

The production app connects to a real backend with persistent data, JWT authentication, and WebSocket real-time sync.

→ [coder-z.com](https://coder-z.com)
