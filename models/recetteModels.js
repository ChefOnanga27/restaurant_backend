import db from '../config/db.js';

// Créer une recette
export const createRecipe = async (title, description, ingredients, instructions, userId) => {
  const sql = `
    INSERT INTO recipes (title, description, ingredients, instructions, user_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;
  const [result] = await db.query(sql, [title, description, ingredients, instructions, userId]);
  return result.insertId;
};

// Récupérer toutes les recettes
export const getAllRecipes = async () => {
  const sql = `SELECT * FROM recipes`;
  const [rows] = await db.query(sql);
  return rows;
};

// Récupérer une recette par ID
export const getRecipeById = async (id) => {
  const sql = `SELECT * FROM recipes WHERE id = ?`;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
};

// Mettre à jour une recette
export const updateRecipe = async (id, title, description, ingredients, instructions) => {
  const sql = `
    UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, updated_at = NOW() WHERE id = ?
  `;
  const [result] = await db.query(sql, [title, description, ingredients, instructions, id]);
  return result.affectedRows;
};

// Supprimer une recette
export const deleteRecipe = async (id) => {
  const sql = `DELETE FROM recipes WHERE id = ?`;
  const [result] = await db.query(sql, [id]);
  return result.affectedRows;
};
