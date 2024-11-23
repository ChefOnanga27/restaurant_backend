import db from '../config/db.js'; // Importez votre fichier de connexion DB
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Enregistrement d'un nouvel utilisateur
export const register = (req, res) => {
  const { username, email, password } = req.body;

  // Vérification des données d'entrée
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  // Hachage du mot de passe
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Erreur de hachage du mot de passe :', err);
      return res.status(500).json({ message: 'Erreur de hachage du mot de passe.' });
    }

    // Requête pour insérer l'utilisateur dans la base de données
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'inscription :', err);
        return res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
      }

      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    });
  });
};

// Connexion d'un utilisateur
export const login = (req, res) => {
  const { email, password } = req.body;

  // Vérification des données d'entrée
  if (!email || !password) {
    return res.status(400).json({ message: 'L\'email et le mot de passe sont requis.' });
  }

  // Recherche de l'utilisateur par son email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erreur serveur :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = results[0]; // L'utilisateur trouvé

    // Comparaison des mots de passe
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur lors de la comparaison des mots de passe :', err);
        return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe.' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect.' });
      }

      // Génération du JWT si la connexion réussie
      const token = jwt.sign({ userId: user.id }, 'votre_clé_secrète', { expiresIn: '1h' });

      res.status(200).json({ message: 'Connexion réussie.', token });
    });
  });
};
