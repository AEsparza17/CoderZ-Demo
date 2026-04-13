import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CVPage from '@/features/cv/pages/CVPage.jsx';
import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import WhatWeDo from '@/components/WhatWeDo';
import ClientsCarousel from '@/components/ClientsCarousel';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

//Imports del turnero
import TurneroApp from '@/features/turnero/pages/TurneroApp.jsx';
import Agenda from '@/features/turnero/pages/Agenda';         
import Pacientes from '@/features/turnero/pages/Pacientes'
import Configuracion from '@/features/turnero/pages/Configuracion'; 

//Imports del portal
import PortalLogin from '@/features/portal/pages/PortalLogin.jsx';
import PortalRegister from '@/features/portal/pages/PortalRegister.jsx';
import PortalDashboard from '@/features/portal/pages/PortalDashboard.jsx';

//Import de politicas de privacidad
import PrivacyPolicy from '@/features/politicas de privacidad/PrivacyPolicy.jsx';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('coderz_token');
  if (!token) return <Navigate to="/portal" replace />;
  return children;
};

const ToolRoute = ({ tool, children }) => {
  const token = localStorage.getItem('coderz_token');
  if (!token) return <Navigate to="/portal" replace />;
  const herramientas = JSON.parse(localStorage.getItem('coderz_herramientas') || '[]');
  if (!herramientas.includes(tool)) return <Navigate to="/portal/dashboard" replace />;
  return children;
};

function App() {
  return (
    <> {/* Fragmento global para envolver todo */}
      
      <Routes>
        {/* RUTA 1: La Landing Page (Home) */}
        <Route path="/" element={
          <>
            <Helmet>
              <title>CoderZ - Innovación en Software Empresarial</title>
              <meta name="description" content="Desarrollamos chatbots inteligentes..." />
            </Helmet>
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
              <Navbar />
              <HeroSection />
              <WhatWeDo />
              <ClientsCarousel />
              <Footer />
            </div>
          </>
        } />

        {/* === PORTAL DE CLIENTES === */}
        <Route path="/portal" element={<PortalLogin />} />
        <Route path="/portal/register" element={<PortalRegister />} />
        <Route path="/portal/dashboard" element={<ProtectedRoute><PortalDashboard /></ProtectedRoute>} />

        {/* === SISTEMA DE TURNERO === */}
        <Route path="/portal/turnero" element={<ToolRoute tool="turnero"><TurneroApp /></ToolRoute>} />
        <Route path="/portal/turnero/agenda" element={<ToolRoute tool="turnero"><Agenda /></ToolRoute>} />
        <Route path="/portal/turnero/pacientes" element={<ToolRoute tool="turnero"><Pacientes /></ToolRoute>} />
        <Route path="/portal/turnero/configuracion" element={<ToolRoute tool="turnero"><Configuracion /></ToolRoute>} /> 

        {/* === SISTEMA DE CV === */}
        <Route path="/agustinesparza" element={<CVPage />} />

        {/* === SISTEMA POLITICAS DE PRIVACIDAD === */}
        <Route path="/politicas-privacidad" element={<PrivacyPolicy />} />

      </Routes>

      {/*Toaster global*/}
      <Toaster />
      
    </>
  );
}

export default App;