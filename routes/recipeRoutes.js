import express from 'express';
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeControllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
import upload from '../middlewares/uploadMiddlewares.js';

const router = express.Router();

// Récupérer toutes les recettes
router.get('/', getAllRecipes);

// Créer une recette avec image et vidéo (authentification requise)
router.post('/', authMiddleware, upload.fields([{ name: 'image' }, { name: 'video' }]), createRecipe);

// Modifier une recette avec image et vidéo (authentification requise)
router.put('/:id', authMiddleware, upload.fields([{ name: 'image' }, { name: 'video' }]), updateRecipe);

// Supprimer une recette (authentification requise)
router.delete('/:id', authMiddleware, deleteRecipe);

export default router;
