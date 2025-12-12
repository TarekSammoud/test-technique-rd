Jeu de Mémoire

Ce projet est un jeu de mémoire développé avec React pour le front-end et Node.js/Express pour le back-end.

Structure du projet:
- frontend/ : Contient l'application React.
- backend/ : Contient le serveur Node.js avec Express et MongoDB.

Prérequis:
- Node.js
- npm
- MongoDB

Installation:

Back-end:
1. Aller dans le dossier backend :
   cd backend
2. Installer les dépendances :
   npm install
3. Démarrer le serveur :
   npm run dev
Le serveur écoute par défaut sur le port 3000.

Front-end:
1. Aller dans le dossier frontend :
   cd frontend
2. Installer les dépendances :
   npm install
3. Démarrer l'application React :
   npm run dev
L'application React s'exécute par défaut sur le port 5173.

Fonctionnalités:
- Jouer au jeu de mémoire.
- Afficher et soumettre les meilleurs scores.
- Filtrer les scores par difficulté.
- Timer pour mesurer le temps de jeu.

API:
Le back-end expose les routes suivantes :
- GET /scores : Récupère les 5 meilleurs scores.
- POST /scores : Soumet un score.

Exemple de corps pour POST /scores :
{
  "username": "Tarek",
  "coups": 15,
  "timeInSeconds": 34,
  "difficulty": 16
}

Captures:
![Main Menu](./.screenshots/main-menu.jpg "Main Menu")
![Main Mobile](./.screenshots/main-mobile.jpg "Main Mobile")
![Game](./.screenshots/game.jpg "Game")
![Game Mobile](./.screenshots/game-mobile.jpg "Game Mobile")
![Win](./.screenshots/win.jpg "Win")


Notes:
- Le front-end utilise fetch pour communiquer avec le back-end.
- Assurez-vous que le back-end est lancé avant de jouer.
- Le back-end est protégé par CORS pour accepter les requêtes du front-end.