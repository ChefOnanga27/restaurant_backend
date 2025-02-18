import express from 'express';
import dotenv from 'dotenv';
import cors from'cors';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();
const app = express();

// Configuration de CORS
app.use(cors({
  origin: '*', // Autorise toutes les origines (⚠️ à limiter en production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers autorisés
}));
app.use(express.json());
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/comments', commentRoutes);

sequelize.sync().then(() => console.log("Base de données synchronisée"));

app.listen(5000, () => console.log("Serveur démarré sur le port 5000"));
