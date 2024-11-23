import express from 'express';
import { getAllRecipes, createRecipe, getRecipeById } from '../controllers/recetteControllers.js';

const router = express.Router();

router.get('/recipes', getAllRecipes);
router.post('/recipes', createRecipe);
router.get('/recipes/:id', getRecipeById);

export default router;
