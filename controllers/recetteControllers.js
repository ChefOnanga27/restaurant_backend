import Recipe from '../models/recetteModels.js';

// Récupérer toutes les recettes
export const getAllRecipes = (req, res) => {
  Recipe.getAll((err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des recettes :', err);
      return res.status(500).json({ message: 'Erreur lors de la récupération des recettes.' });
    }
    res.status(200).json(results);
  });
};

// Créer une nouvelle recette
export const createRecipe = (req, res) => {
  const { userId, title, ingredients, instructions } = req.body;
  instructions: JSON.stringify
  ingredients: JSON.stringify
  // Vérification des données
  if (!userId || !title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  Recipe.create(userId, title, ingredients, instructions, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la recette :', err);
      return res.status(500).json({ message: 'Erreur lors de l\'ajout de la recette.' });
    }
    res.status(201).json({ message: 'Recette ajoutée avec succès.' });
  });
};

// Récupérer une recette par son ID
export const getRecipeById = (req, res) => {
  const { id } = req.params;

  // Vérification de la validité de l'ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID invalide.' });
  }

  Recipe.getById(id, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de la recette :', err);
      return res.status(500).json({ message: 'Erreur lors de la récupération de la recette.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Recette non trouvée.' });
    }

    res.status(200).json(results[0]);
  });
};
