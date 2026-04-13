import turneroLogo from '../assets/img/turnero.png';
import ecommerceLogo from '../assets/img/e-commerce.png';
import vpsLogo from '../assets/img/vps.png';

export const services = [
  {
    id: 1,
    herramienta: "ecommerce",
    title: "E-commerce",
    description: "Sitios modernos con React y Vite.",
    image: ecommerceLogo,
    path: "/portal/ecommerce",
    active: false
  },
  {
    id: 2,
    herramienta: "turnero",
    title: "Turnero online",
    description: "Gestión de turnos y citas.",
    image: turneroLogo,
    path: "/portal/turnero",
    active: true
  },
  {
    id: 3,
    herramienta: "vps",
    title: "VPS Management",
    description: "Despliegue y seguridad Linux.",
    image: vpsLogo,
    path: "/portal/vps",
    active: false
  },
];