import bcrypt from 'bcryptjs';
import db from '../config/db.js'; // Votre connexion à la base de données

const Utilisateur = {
  create: (username, email, password, callback) => {
    // Vérifiez que les données sont des chaînes de caractères
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return callback(new Error('Les champs doivent être des chaînes de caractères.'));
    }

    // Hachage du mot de passe avant d'insérer dans la base de données
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      });
    });
  },
};

export default Utilisateur;
