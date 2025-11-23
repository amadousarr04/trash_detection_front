import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, X } from 'lucide-react';

const ImageUpload = ({ onImageSelect, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image');
      return;
    }

    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 10MB');
      return;
    }

    // Créer un aperçu
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Envoyer le fichier au parent
    onImageSelect(file);
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(null);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full animate-slide-up">
      {!preview ? (
        <div
          className={`upload-zone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            disabled={isLoading}
          />
          
          <div className="flex flex-col items-center gap-4">
            {isLoading ? (
              <Loader2 className="w-16 h-16 text-primary-400 animate-spin" />
            ) : (
              <div className="relative">
                <Upload className="w-16 h-16 text-primary-400 animate-float" />
                <div className="absolute inset-0 bg-primary-400 blur-xl opacity-20 animate-pulse-slow"></div>
              </div>
            )}
            
            <div>
              <p className="text-lg font-semibold text-white">
                {isLoading ? 'Analyse en cours...' : 'Déposez une image ici'}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                ou cliquez pour sélectionner (max 10MB)
              </p>
            </div>
            
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-white/10 rounded">JPG</span>
              <span className="px-2 py-1 bg-white/10 rounded">PNG</span>
              <span className="px-2 py-1 bg-white/10 rounded">JPEG</span>
              <span className="px-2 py-1 bg-white/10 rounded">WEBP</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative animate-slide-up">
          <img
            src={preview}
            alt="Aperçu"
            className="w-full h-auto rounded-2xl shadow-2xl border-2 border-white/20"
          />
          {!isLoading && (
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110 transform"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
