import db from '../config/db.js';

// Créer un utilisateur
export const createUser = async (username, email, password) => {
  const sql = `
    INSERT INTO users (username, email, password, created_at, updated_at)
    VALUES (?, ?, ?, NOW(), NOW())
  `;
  const [result] = await db.query(sql, [username, email, password]);
  return result.insertId;
};

// Trouver un utilisateur par email
export const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await db.query(sql, [email]);
  return rows[0];
};

// Trouver un utilisateur par ID
export const findUserById = async (id) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
};

// Mettre à jour un utilisateur
export const updateUser = async (id, username, email, password) => {
  const sql = `
    UPDATE users SET username = ?, email = ?, password = ?, updated_at = NOW() WHERE id = ?
  `;
  const [result] = await db.query(sql, [username, email, password, id]);
  return result.affectedRows;
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  const [result] = await db.query(sql, [id]);
  return result.affectedRows;
};
