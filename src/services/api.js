import axios from 'axios';

const API_BASE_URL = 'https://trash-detection-uiv3.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes pour les vidéos
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const trashDetectionAPI = {
  /**
   * Vérifie l'état de santé de l'API
   */
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API indisponible: ' + error.message);
    }
  },

  /**
   * Récupère les informations du modèle
   */
  getModelInfo: async () => {
    try {
      const response = await api.get('/info');
      return response.data;
    } catch (error) {
      throw new Error('Impossible de récupérer les informations du modèle');
    }
  },

  /**
   * Analyse une image pour détecter les poubelles
   * @param {File} imageFile - Fichier image à analyser
   */
  predictImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await api.post('/predict/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail || 'Erreur lors de la prédiction');
      }
      throw new Error('Erreur de connexion à l\'API');
    }
  },

  /**
   * Analyse une vidéo pour détecter les poubelles
   * @param {File} videoFile - Fichier vidéo à analyser
   * @param {Function} onProgress - Callback pour suivre la progression
   */
  predictVideo: async (videoFile, onProgress) => {
    try {
      const formData = new FormData();
      formData.append('file', videoFile);

      const response = await api.post('/predict/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (onProgress) {
            onProgress(percentCompleted);
          }
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail || 'Erreur lors de la prédiction vidéo');
      }
      throw new Error('Erreur de connexion à l\'API');
    }
  },
};

export default trashDetectionAPI;
