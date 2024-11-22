import bcrypt from 'bcrypt';
import { createUser, findUserByEmail} from '../models/usersModel.js';

// Créer un nouvel utilisateur
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const userId = await createUser(username, email, hashedPassword);
    res.status(201).json({ message: 'Utilisateur créé avec succès', userId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};

// Connexion d'un utilisateur
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Connexion réussie
    res.status(200).json({ message: 'Connexion réussie', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};
