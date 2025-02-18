import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();
const app = express();

// Configuration de CORS
app.use(cors({
  origin: '*', // Autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware JSON
app.use(express.json());

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
