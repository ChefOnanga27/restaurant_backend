import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './users.js';

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  steps: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,  // Stocke l'URL de l'image
    allowNull: true
  },
  videoUrl: {
    type: DataTypes.STRING,  // Stocke l'URL de la vidéo
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

export default Recipe;
