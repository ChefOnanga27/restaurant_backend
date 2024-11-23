import express from 'express';
import { register, login } from '../controllers/usersControllers.js';

const router = express.Router();

// Route pour l'inscription d'un nouvel utilisateur
router.post('/register', register);

// Route pour la connexion d'un utilisateur existant
router.post('/login', login);

export default router;
