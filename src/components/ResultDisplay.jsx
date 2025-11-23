import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Trash2, Package } from 'lucide-react';

const ResultDisplay = ({ result, type = 'image' }) => {
  console.log('ResultDisplay - result:', result);
  console.log('ResultDisplay - type:', type);
  
  if (!result) {
    console.log('ResultDisplay - No result, returning null');
    return null;
  }

  const getTrashStatus = (detections) => {
    if (!detections || detections.length === 0) {
      return { status: 'empty', label: 'Poubelle Vide', icon: Trash2, color: 'text-green-600', bgColor: 'bg-green-100' };
    }
    
    // Vous pouvez affiner cette logique selon vos classes
    const hasFullTrash = detections.some(d => 
      d.class_name?.toLowerCase().includes('full') || 
      d.class_name?.toLowerCase().includes('plein')
    );
    
    if (hasFullTrash) {
      return { status: 'full', label: 'Poubelle Pleine', icon: Package, color: 'text-red-600', bgColor: 'bg-red-100' };
    }
    
    return { status: 'detected', label: 'Poubelle Détectée', icon: AlertCircle, color: 'text-orange-600', bgColor: 'bg-orange-100' };
  };

  const trashStatus = getTrashStatus(result.detections);
  const StatusIcon = trashStatus.icon;

  console.log('ResultDisplay - trashStatus:', trashStatus);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Statut principal */}
      <div className={`glass-effect p-6 border-l-4 ${trashStatus.bgColor.replace('bg-', 'border-').replace('-100', '-500')}`}>
        <div className="flex items-center gap-4">
          <div className={`${trashStatus.bgColor} p-4 rounded-xl animate-float`}>
            <StatusIcon className={`w-12 h-12 ${trashStatus.color}`} />
          </div>
          <div>
            <h3 className={`text-2xl font-bold text-white`}>
              {trashStatus.label}
            </h3>
            <p className="text-gray-300 mt-1">
              {result.detections_count} détection(s) trouvée(s)
            </p>
          </div>
        </div>
      </div>

      {/* Image/Vidéo annotée */}
      <div className="card">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary-600" />
          Résultat de l'Analyse
        </h4>
        
        {type === 'image' ? (
          <img
            src={result.image}
            alt="Résultat de détection"
            className="w-full h-auto rounded-xl shadow-2xl border-2 border-gray-200"
          />
        ) : (
          <video
            src={result.video}
            controls
            className="w-full h-auto rounded-xl shadow-2xl border-2 border-gray-200"
          />
        )}
      </div>

      {/* Détails des détections */}
      {result.detections && result.detections.length > 0 && (
        <div className="card">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-600" />
            Détails des Détections
          </h4>
          <div className="space-y-3">
            {result.detections.map((detection, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-102 transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
                    {detection.class_name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                    detection.confidence > 0.8
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : detection.confidence > 0.6
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }`}>
                    {(detection.confidence * 100).toFixed(1)}% confiance
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  📍 Position: [{detection.bbox.map(v => v.toFixed(0)).join(', ')}]
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistiques vidéo */}
      {type === 'video' && result.video_info && (
        <div className="card">
          <h4 className="text-lg font-semibold mb-4">Statistiques Vidéo</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Frames traitées</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.frames_processed}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Détections totales</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.total_detections}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Moy. par frame</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.average_detections_per_frame}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">FPS</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.video_info.fps}
              </p>
            </div>
          </div>
          
          {result.detection_stats && Object.keys(result.detection_stats).length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Répartition des détections:
              </p>
              <div className="space-y-2">
                {Object.entries(result.detection_stats).map(([className, count]) => (
                  <div key={className} className="flex items-center justify-between bg-white p-2 rounded">
                    <span className="text-gray-700">{className}</span>
                    <span className="font-semibold text-primary-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
