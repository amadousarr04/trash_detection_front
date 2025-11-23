import React, { useState } from 'react';
import { Trash2, Menu, X, Github, Home, Info, Settings } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-effect sticky top-0 z-50 mb-8 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-emerald-500 p-3 rounded-xl shadow-lg animate-float">
              <Trash2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Trash <span className="gradient-text">Detector</span>
              </h1>
              <p className="text-xs text-gray-300">Powered by YOLOv9 AI</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-white hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Accueil
            </a>
            <a href="#about" className="text-white hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
              <Info className="w-4 h-4" />
              À propos
            </a>
            <a href="#settings" className="text-white hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Paramètres
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 border border-white/20"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 animate-slide-up">
            <a href="#home" className="block text-white hover:text-primary-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10">
              <Home className="w-4 h-4 inline mr-2" />
              Accueil
            </a>
            <a href="#about" className="block text-white hover:text-primary-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10">
              <Info className="w-4 h-4 inline mr-2" />
              À propos
            </a>
            <a href="#settings" className="block text-white hover:text-primary-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10">
              <Settings className="w-4 h-4 inline mr-2" />
              Paramètres
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-white hover:text-primary-400 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <Github className="w-4 h-4 inline mr-2" />
              GitHub
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
