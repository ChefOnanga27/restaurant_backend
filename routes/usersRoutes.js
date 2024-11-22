import express from 'express';
import { registerUser, loginUser } from '../controllers/usersController.js';

const router = express.Router();

// Route pour l'inscription
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

export default router;
