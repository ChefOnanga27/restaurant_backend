import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Split sur l'espace après "Bearer"
  
  if (!token) {
    return res.status(403).json({ message: 'Accès refusé. Veuillez fournir un token.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }

    req.user = decoded;
    next(); // Passer au prochain middleware ou contrôleur
  });
};
