import express from 'express';
import { addRecipe, getRecipes, getRecipe, editRecipe, removeRecipe } from '../controllers/recetteController.js';

const router = express.Router();

// Route pour créer une nouvelle recette
router.post('/', addRecipe);

// Route pour récupérer toutes les recettes
router.get('/', getRecipes);

// Route pour récupérer une recette par ID
router.get('/:id', getRecipe);

// Route pour mettre à jour une recette
router.put('/:id', editRecipe);

// Route pour supprimer une recette
router.delete('/:id', removeRecipe);

export default router;
