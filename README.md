# API de Recettes

Cette API permet de gérer des recettes de cuisine, incluant les informations telles que l'utilisateur qui a créé la recette, le titre, les ingrédients, et les instructions. Elle permet aussi d'ajouter, de récupérer, de modifier et de supprimer des recettes.

## Table des matières

1. [Technologies utilisées](#technologies-utilisées)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Endpoints](#endpoints)
   - [Créer une recette](#créer-une-recette)
   - [Récupérer toutes les recettes](#récupérer-toutes-les-recettes)
   - [Récupérer une recette](#récupérer-une-recette)
   - [Mettre à jour une recette](#mettre-à-jour-une-recette)
   - [Supprimer une recette](#supprimer-une-recette)
5. [Exemples de requêtes](#exemples-de-requêtes)
6. [Gestion des erreurs](#gestion-des-erreurs)
7. [Contributeurs](#contributeurs)

## Technologies utilisées

- **Node.js** : environnement d'exécution JavaScript.
- **Express.js** : framework pour créer l'API.
- **MySQL** : base de données relationnelle pour stocker les recettes.
- **mysql2** : module Node.js pour interagir avec MySQL.
- **body-parser** : middleware pour analyser les corps de requête JSON.

## Installation

1. Clonez ce repository :

   ```bash
   git clone https://github.com/ChefOnanga27/restaurant_backend.git
   Configuration
Avant de lancer l'application, assurez-vous que vous avez configuré une base de données MySQL. Vous pouvez créer une base de données avec la commande suivante :

sql
Copier le code
CREATE DATABASE recipes;
Ensuite, vous devrez configurer les informations de connexion à la base de données dans le fichier config/db.js :

js
Copier le code
module.exports = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recipes'
};
Endpoints
Créer une recette
Méthode : POST
URL : /recipes
Description : Ajoute une nouvelle recette.

Corps de la requête :

json
Copier le code
{
  "user_id": 1,
  "title": "Pancakes au chocolat",
  "ingredients": ["Farine", "Sucre", "Lait", "Beurre fondu", "Pépites de chocolat"],
  "instructions": ["1. Mélangez la farine et le sucre.", "2. Ajoutez les œufs et le lait."]
}
Réponse :

json
Copier le code
{
  "message": "Recette ajoutée avec succès"
}
Récupérer toutes les recettes
Méthode : GET
URL : /recipes
Description : Récupère toutes les recettes.

Réponse :

json
Copier le code
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Pancakes au chocolat",
    "ingredients": ["Farine", "Sucre", "Lait", "Beurre fondu", "Pépites de chocolat"],
    "instructions": ["1. Mélangez la farine et le sucre.", "2. Ajoutez les œufs et le lait."]
  }
]
Récupérer une recette
Méthode : GET
URL : /recipes/:id
Description : Récupère une recette par son ID.

Réponse :

json
Copier le code
{
  "id": 1,
  "user_id": 1,
  "title": "Pancakes au chocolat",
  "ingredients": ["Farine", "Sucre", "Lait", "Beurre fondu", "Pépites de chocolat"],
  "instructions": ["1. Mélangez la farine et le sucre.", "2. Ajoutez les œufs et le lait."]
}
Mettre à jour une recette
Méthode : PUT
URL : /recipes/:id
Description : Met à jour une recette existante.

Corps de la requête :

json
Copier le code
{
  "title": "Pancakes au chocolat améliorés",
  "ingredients": ["Farine", "Sucre", "Lait", "Beurre fondu", "Pépites de chocolat", "Vanille"],
  "instructions": ["1. Mélangez la farine et le sucre.", "2. Ajoutez les œufs, le lait et la vanille."]
}
Réponse :

json
Copier le code
{
  "message": "Recette mise à jour avec succès"
}
Supprimer une recette
Méthode : DELETE
URL : /recipes/:id
Description : Supprime une recette par son ID.

Réponse :

json
Copier le code
{
  "message": "Recette supprimée avec succès"
}
Exemples de requêtes
Créer une recette avec POST :
bash
Copier le code
curl -X POST http://localhost:3000/recipes -H "Content-Type: application/json" -d '{
  "user_id": 1,
  "title": "Pancakes au chocolat",
  "ingredients": ["Farine", "Sucre", "Lait", "Beurre fondu", "Pépites de chocolat"],
  "instructions": ["1. Mélangez la farine et le sucre.", "2. Ajoutez les œufs et le lait."]
}'
Récupérer une recette avec GET :
bash
Copier le code
curl http://localhost:3000/recipes/1
Gestion des erreurs
Les erreurs sont retournées avec un code de statut HTTP approprié et un message descriptif. Par exemple :

400 Bad Request : Lorsque les données envoyées sont invalides.
404 Not Found : Lorsque la recette demandée n'existe pas.
500 Internal Server Error : En cas de problème serveur.
Exemple de réponse en cas d'erreur :

json
Copier le code
{
  "message": "Recette non trouvée"
}


### Explications :
- Ce `README.md` explique le fonctionnement de l'API, les étapes d'installation, ainsi que les endpoints de l'API pour gérer les recettes.
- Il décrit également la manière dont les erreurs sont gérées et fournit des exemples de requêtes pour tester l'API.

