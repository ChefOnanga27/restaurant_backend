import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); 
//app.use('/api/users', userRoutes); // Routes pour les utilisateurs
//app.use('/api/recipes', recipeRoutes); // Routes pour les recettes

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
