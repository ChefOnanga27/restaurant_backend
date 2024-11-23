import express from 'express';
import dotenv from 'dotenv';
import router from './routes/usersRoutes.js';
import recetteRoutes from './routes/recetteRoutes.js'
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
// Utilisation de body-parser pour parser les requêtes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users', router);
app.use('/api', recetteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`le serveur demarre sur le port ${PORT}`);
});
