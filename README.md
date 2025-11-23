# Trash Detection Frontend

Interface web React pour la détection de poubelles (vides ou pleines) utilisant l'API YOLOv9.

## 🚀 Fonctionnalités

- ✅ Upload et analyse d'images
- ✅ Upload et analyse de vidéos
- ✅ Détection en temps réel du statut des poubelles (vide/plein)
- ✅ Affichage des résultats annotés
- ✅ Statistiques détaillées des détections
- ✅ Interface responsive et moderne
- ✅ Suivi de l'état de l'API

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 🌐 Configuration

L'API est configurée pour pointer vers:
```
https://trash-detection-uiv3.onrender.com/api
```

Pour changer l'URL de l'API, modifiez `src/services/api.js`:
```javascript
const API_BASE_URL = 'VOTRE_URL_API';
```

## 📁 Structure du Projet

```
trash-detection-frontend/
├── src/
│   ├── components/
│   │   ├── ImageUpload.jsx      # Upload d'images
│   │   ├── VideoUpload.jsx      # Upload de vidéos
│   │   ├── ResultDisplay.jsx    # Affichage des résultats
│   │   └── APIStatus.jsx        # Statut de l'API
│   ├── services/
│   │   └── api.js               # Service API
│   ├── App.jsx                  # Composant principal
│   ├── main.jsx                 # Point d'entrée
│   └── index.css                # Styles globaux
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Technologies

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📡 Endpoints API Utilisés

- `GET /api/health` - Vérifier l'état de l'API
- `GET /api/info` - Informations du modèle
- `POST /api/predict/image` - Analyse d'image
- `POST /api/predict/video` - Analyse de vidéo

## 🎯 Utilisation

1. Lancez l'application
2. Choisissez entre analyse d'image ou de vidéo
3. Glissez-déposez ou sélectionnez votre fichier
4. Cliquez sur "Analyser"
5. Consultez les résultats avec les détections annotées

## 📝 License

Ce projet fait partie du cours IA DR NOUROU.
