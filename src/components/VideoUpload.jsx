import React, { useState, useRef } from 'react';
import { Upload, Video as VideoIcon, Loader2, X } from 'lucide-react';

const VideoUpload = ({ onVideoSelect, isLoading, uploadProgress }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
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
    // Vérifier que c'est une vidéo
    if (!file.type.startsWith('video/')) {
      alert('Veuillez sélectionner un fichier vidéo');
      return;
    }

    // Vérifier la taille (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('La vidéo ne doit pas dépasser 100MB');
      return;
    }

    // Créer un aperçu
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    setFileName(file.name);

    // Envoyer le fichier au parent
    onVideoSelect(file);
  };

  const clearVideo = () => {
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onVideoSelect(null);
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
            accept="video/*"
            onChange={handleChange}
            className="hidden"
            disabled={isLoading}
          />
          
          <div className="flex flex-col items-center gap-4">
            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-16 h-16 text-primary-400 animate-spin" />
                {uploadProgress > 0 && (
                  <div className="w-64">
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-emerald-500 h-3 rounded-full transition-all duration-300 animate-gradient"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2 text-center font-semibold">
                      {uploadProgress < 100 ? `Upload: ${uploadProgress}%` : 'Traitement en cours...'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <VideoIcon className="w-16 h-16 text-purple-400 animate-float" />
                <div className="absolute inset-0 bg-purple-400 blur-xl opacity-20 animate-pulse-slow"></div>
              </div>
            )}
            
            <div>
              <p className="text-lg font-semibold text-white">
                {isLoading ? 'Analyse en cours...' : 'Déposez une vidéo ici'}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                ou cliquez pour sélectionner (max 100MB)
              </p>
            </div>
            
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-white/10 rounded">MP4</span>
              <span className="px-2 py-1 bg-white/10 rounded">AVI</span>
              <span className="px-2 py-1 bg-white/10 rounded">MOV</span>
              <span className="px-2 py-1 bg-white/10 rounded">MKV</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative animate-slide-up">
          <video
            src={preview}
            controls
            className="w-full h-auto rounded-2xl shadow-2xl max-h-96 border-2 border-white/20"
          />
          <div className="mt-4 flex items-center justify-between glass-effect p-4 rounded-xl">
            <p className="text-sm text-white truncate flex-1 font-semibold">
              🎥 {fileName}
            </p>
            {!isLoading && (
              <button
                onClick={clearVideo}
                className="ml-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full p-2 shadow-lg transition-all hover:scale-110 transform"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
