import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import trashDetectionAPI from '../services/api';

const APIStatus = () => {
  const [status, setStatus] = useState('checking');
  const [modelInfo, setModelInfo] = useState(null);

  useEffect(() => {
    checkAPIStatus();
  }, []);

  const checkAPIStatus = async () => {
    try {
      const health = await trashDetectionAPI.checkHealth();
      const info = await trashDetectionAPI.getModelInfo();
      
      if (health.status === 'healthy' && health.model_loaded) {
        setStatus('online');
        setModelInfo(info);
      } else {
        setStatus('warning');
      }
    } catch (error) {
      setStatus('offline');
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          text: 'API en ligne'
        };
      case 'offline':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          text: 'API hors ligne'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          text: 'Problème détecté'
        };
      default:
        return {
          icon: Activity,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          text: 'Vérification...'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`glass-effect p-5 border ${statusConfig.bgColor.replace('bg-', 'border-').replace('-100', '-500/30')} animate-slide-up`}>
      <div className="flex items-center gap-3">
        <div className={`${statusConfig.bgColor} p-3 rounded-xl`}>
          <StatusIcon className={`w-6 h-6 ${statusConfig.color} ${status === 'checking' ? 'animate-pulse' : ''}`} />
        </div>
        <div className="flex-1">
          <p className={`font-semibold text-white`}>
            {statusConfig.text}
          </p>
          {modelInfo && (
            <p className="text-sm text-gray-300">
              Modèle: {modelInfo.model_type} | Classes: {modelInfo.num_classes}
            </p>
          )}
        </div>
        <button
          onClick={checkAPIStatus}
          className="text-sm text-gray-300 hover:text-white underline transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10"
        >
          Actualiser
        </button>
      </div>
    </div>
  );
};

export default APIStatus;
