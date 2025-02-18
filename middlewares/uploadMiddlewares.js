import multer from 'multer';
import path from 'path';

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Dossier où enregistrer les fichiers
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Nom unique
  }
});

// Vérification du type de fichier (images et vidéos autorisées)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'), false);
  }
};

// Middleware `multer`
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Limite de 10MB
});

export default upload;
