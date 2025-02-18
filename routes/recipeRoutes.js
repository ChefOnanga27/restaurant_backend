import express from 'express';
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeControllers.js';
import authMiddleware from '../middlewares/authMiddlewares.js';

const router = express.Router();

// Récupérer toutes les recettes
router.get('/', getAllRecipes);

// Créer une recette avec image (authentification requise)
router.post('/', authMiddleware, createRecipe);

// Modifier une recette avec image (authentification requise)
router.put('/:id', authMiddleware, updateRecipe);

// Supprimer une recette (authentification requise)
router.delete('/:id', authMiddleware, deleteRecipe);

export default router;
