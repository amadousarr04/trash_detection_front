import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

const ModelDownload = () => {
  const handleDownload = () => {
    // Lien direct Google Drive
    window.open('https://drive.google.com/file/d/1svK7ZveUHKDm4QYIP0jYmzwn3ftenN-v/view?usp=drive_link', '_blank');
  };

  return (
    <div className="glass-effect p-6 rounded-2xl border border-primary-500/30 animate-slide-up">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-r from-primary-500 to-emerald-500 p-4 rounded-xl">
          <Download className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">
            Modèle YOLOv9 Entraîné
          </h3>
          <p className="text-gray-300 text-sm">
            Téléchargez le modèle pré-entraîné pour la détection de poubelles
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <Download className="w-5 h-5" />
          Télécharger
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
            <span className="text-gray-300">Format: <span className="text-white font-semibold">.pt (PyTorch)</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span className="text-gray-300">Version: <span className="text-white font-semibold">YOLOv9c</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDownload;
