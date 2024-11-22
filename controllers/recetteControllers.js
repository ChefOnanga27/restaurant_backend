import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from '../models/recetteModels.js';

// Créer une nouvelle recette
export const addRecipe = async (req, res) => {
  const { title, description, ingredients, instructions, userId } = req.body;

  try {
    const recipeId = await createRecipe(title, description, ingredients, instructions, userId);
    res.status(201).json({ message: 'Recette créée avec succès', recipeId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la recette', error });
  }
};

// Récupérer toutes les recettes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des recettes', error });
  }
};

// Récupérer une recette par ID
export const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la recette', error });
  }
};

// Mettre à jour une recette
export const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, instructions } = req.body;

  try {
    const updatedRows = await updateRecipe(id, title, description, ingredients, instructions);
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.status(200).json({ message: 'Recette mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la recette', error });
  }
};

// Supprimer une recette
export const removeRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await deleteRecipe(id);
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.status(200).json({ message: 'Recette supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la recette', error });
  }
};
