import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './users.js';
import Recipe from './recipe.js';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Recipe,
      key: 'id'
    }
  }
});

export default Comment;
