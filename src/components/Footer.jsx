import React from 'react';
import { Heart, Github, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-effect mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Trash Detector AI</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Solution intelligente de détection de poubelles utilisant l'intelligence artificielle YOLOv9 
              pour identifier l'état de remplissage en temps réel.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#documentation" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  API Reference
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center gap-2">
                  <Github className="w-3 h-3" />
                  Code Source
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@trashdetector.ai" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  contact@trashdetector.ai
                </a>
              </li>
              <li className="text-gray-300 text-sm">
                API: trash-detection-uiv3.onrender.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
            Fait par 
            <span className="gradient-text font-semibold">Amadou Dièye SARR</span>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            © 2025 Trash Detector AI. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
