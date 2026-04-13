import { useEffect, useState } from "react";

export function useTheme() {
  // 1. Leemos del almacenamiento local o usamos 'light' por defecto
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 2. Limpiamos clases previas y aplicamos la actual
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // 3. Guardamos la preferencia para la próxima visita
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Función simple para alternar
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}