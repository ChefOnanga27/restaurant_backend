import fs from 'fs';
import path from 'path';
import Recipe from '../models/recipe.js';

// ✅ Récupérer toutes les recettes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des recettes", error });
  }
};

// ✅ Créer une recette avec image
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps } = req.body;
    const imageUrl = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;

    if (!title || !description || !ingredients || !steps) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      imageUrl,
      userId: req.user.id
    });

    res.status(201).json({ message: "Recette créée avec succès", recipe });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la recette", error });
  }
};

// ✅ Modifier une recette avec image
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, steps } = req.body;
    const imageUrl = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;

    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    if (recipe.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cette recette" });
    }

    // Mise à jour des champs
    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.steps = steps || recipe.steps;
    recipe.imageUrl = imageUrl || recipe.imageUrl;

    await recipe.save();

    res.status(200).json({ message: "Recette mise à jour avec succès", recipe });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la recette", error });
  }
};

// ✅ Supprimer une recette avec image
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    if (recipe.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette recette" });
    }

    // Supprimer le fichier image s'il existe
    if (recipe.imageUrl) {
      const imagePath = path.join('uploads', path.basename(recipe.imageUrl));
      fs.unlink(imagePath, (err) => {
        if (err) console.error(`Erreur lors de la suppression du fichier : ${err}`);
      });
    }

    // Supprimer la recette de la base de données
    await recipe.destroy();

    res.status(200).json({ message: "Recette supprimée avec succès" });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la recette", error });
  }
};
