import db from '../config/db.js';

class Recipe {
  static getAll(callback) {
    const query = 'SELECT * FROM recipes';
    db.query(query, callback);
  }

  static create(userId, title, ingredients, instructions, callback) {
    const query = 'INSERT INTO recipes (user_id, title, ingredients, instructions) VALUES (?, ?, ?, ?)';
    db.query(query, [userId, title, ingredients, instructions], callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM recipes WHERE id = ?';
    db.query(query, [id], callback);
  }
}

export default Recipe;
