import React, { useState } from 'react';
import { Trash2, Image as ImageIcon, Video as VideoIcon, Info, Zap, Target, TrendingUp, Activity } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import VideoUpload from './components/VideoUpload';
import ResultDisplay from './components/ResultDisplay';
import APIStatus from './components/APIStatus';
import Header from './components/Header';
import Footer from './components/Footer';
import StatsCard from './components/StatsCard';
import trashDetectionAPI from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('image'); // 'image' ou 'video'
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalAnalyses, setTotalAnalyses] = useState(0);
  const [totalDetections, setTotalDetections] = useState(0);

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  const handleVideoSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile) return;

    console.log('Starting image analysis...', selectedFile);
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await trashDetectionAPI.predictImage(selectedFile);
      console.log('API Response:', response);
      setResult(response);
      setTotalAnalyses(prev => prev + 1);
      setTotalDetections(prev => prev + (response.detections_count || 0));
    } catch (err) {
      console.error('Error during analysis:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeVideo = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setUploadProgress(0);

    try {
      const response = await trashDetectionAPI.predictVideo(
        selectedFile,
        (progress) => setUploadProgress(progress)
      );
      setResult(response);
      setTotalAnalyses(prev => prev + 1);
      setTotalDetections(prev => prev + (response.total_detections || 0));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Détection de <span className="gradient-text">Poubelles</span>
            </h1>
            <div className="h-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"></div>
          </div>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            Analysez vos images et vidéos pour détecter automatiquement l'état des poubelles 
            grâce à l'intelligence artificielle YOLOv9
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={Activity}
            title="Analyses Total"
            value={totalAnalyses}
            color="primary"
          />
          <StatsCard
            icon={Target}
            title="Détections"
            value={totalDetections}
            color="blue"
          />
          <StatsCard
            icon={Zap}
            title="Précision"
            value="98%"
            subtitle="YOLOv9"
            color="purple"
          />
          <StatsCard
            icon={TrendingUp}
            title="Temps Réel"
            value="<1s"
            subtitle="par image"
            color="orange"
          />
        </div>

        {/* API Status */}
        <div className="mb-8">
          <APIStatus />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleTabChange('image')}
            className={`flex-1 py-5 px-8 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'image'
                ? 'bg-gradient-to-r from-primary-600 to-emerald-600 text-white shadow-2xl shadow-primary-500/50'
                : 'glass-effect text-white hover:bg-white/20'
            }`}
          >
            <ImageIcon className="w-6 h-6 inline-block mr-2" />
            Analyse d'Image
          </button>
          <button
            onClick={() => handleTabChange('video')}
            className={`flex-1 py-5 px-8 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50'
                : 'glass-effect text-white hover:bg-white/20'
            }`}
          >
            <VideoIcon className="w-6 h-6 inline-block mr-2" />
            Analyse de Vidéo
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card-dark">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-lg flex items-center justify-center">
                {activeTab === 'image' ? <ImageIcon className="w-5 h-5 text-white" /> : <VideoIcon className="w-5 h-5 text-white" />}
              </div>
              {activeTab === 'image' ? 'Télécharger une Image' : 'Télécharger une Vidéo'}
            </h2>

            {activeTab === 'image' ? (
              <ImageUpload
                onImageSelect={handleImageSelect}
                isLoading={isLoading}
              />
            ) : (
              <VideoUpload
                onVideoSelect={handleVideoSelect}
                isLoading={isLoading}
                uploadProgress={uploadProgress}
              />
            )}

            {selectedFile && !isLoading && !result && (
              <button
                onClick={activeTab === 'image' ? handleAnalyzeImage : handleAnalyzeVideo}
                className="btn-primary w-full mt-6 text-lg"
              >
                🔍 Analyser {activeTab === 'image' ? 'l\'image' : 'la vidéo'}
              </button>
            )}

            {error && (
              <div className="mt-6 glass-effect border border-red-500/50 text-red-200 px-6 py-4 rounded-xl animate-slide-up">
                <p className="font-semibold text-red-300">⚠️ Erreur:</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="card-dark">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              Résultats de l'Analyse
            </h2>

            {!result && !isLoading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-6">
                  <Info className="w-20 h-20 text-gray-600 animate-float" />
                  <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-20"></div>
                </div>
                <p className="text-gray-400 text-lg">
                  Les résultats de la détection apparaîtront ici
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Uploadez un fichier et lancez l'analyse
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-primary-500 mb-6"></div>
                  <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-30"></div>
                </div>
                <p className="text-white font-semibold text-lg">
                  Analyse en cours...
                </p>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <p className="text-gray-400 text-sm mt-2">
                    Upload: {uploadProgress}%
                  </p>
                )}
              </div>
            )}

            {result && <ResultDisplay result={result} type={activeTab} />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
