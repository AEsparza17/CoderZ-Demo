import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/95 backdrop-blur-lg shadow-2xl'
        : 'bg-black/80 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            CoderZ
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-200 hover:text-blue-400 transition-colors font-medium"
            >
              Nuestros Productos
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-200 hover:text-blue-400 transition-colors font-medium"
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-200 hover:text-blue-400 transition-colors font-medium"
            >
              Contacto
            </button>
            <a
              href="https://wa.me/543534204353"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
              Contáctanos
            </a>
            <Link
              to="/portal"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
              Portal Clientes
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>


      {/* Seccion mobile   */}


      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-lg"
        >
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-gray-200 hover:text-blue-400 transition-colors font-medium py-2"
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-gray-200 hover:text-blue-400 transition-colors font-medium py-2"
            >
              Nuestros Productos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-200 hover:text-blue-400 transition-colors font-medium py-2"
            >
              Contacto
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-centerclear bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-full font-semibold"
            >
              Contáctanos
            </Button>
            <Link
              to="/portal"
              onClick={() => setIsMobileMenuOpen(false)}
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
              Portal Clientes
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;