import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import path from 'path'; // Importe le module path pour gérer les chemins de fichiers
import fs from 'fs'; // Pour écrire les logs dans un fichier
import { fileURLToPath } from 'url'; // Importer fileURLToPath pour obtenir le chemin du fichier

dotenv.config();
const app = express();

// Obtenir __dirname avec import.meta.url
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); // Utiliser path.dirname pour obtenir le répertoire

// Configuration de CORS
app.use(cors({
  origin: '*', // Autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware JSON
app.use(express.json());

// Middleware pour logger les accès aux fichiers du dossier public
app.use('/public', (req, res, next) => {
  const logMessage = `Accès au fichier: ${req.originalUrl} à ${new Date().toISOString()}`;
  console.log(logMessage); // Affiche le log dans la console
  
  // Optionnel : Enregistrer le log dans un fichier
  fs.appendFile('access_logs.txt', logMessage + '\n', (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture dans le fichier de log:', err);
    }
  });

  next(); // Continue le traitement de la requête
});

// Servir les fichiers statiques à partir du dossier 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/comments', commentRoutes);

// Synchronisation de la base de données avec Sequelize
sequelize.sync({ force: false }) // Ne pas supprimer les tables à chaque lancement
  .then(() => console.log("Base de données synchronisée"));

// Port dynamique
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
