Green Marketplace – Projet Green IT

Table des matières
1. Description du projet
2. Technologies
3. Installation & exécution
4. Configuration
5. Structure du projet
6. Fonctionnalités

Description du projet
Green Marketplace est une plateforme de mise en relation entre acheteurs et vendeurs d’objets reconditionnés afin de promouvoir l’économie circulaire et réduire l’empreinte carbone liée à la consommation de produits électroniques et autres objets.

Technologies
- Front‐end : Vue 3 + Vite, Tailwind CSS
- Back‐end : Node.js + Express
- Base de données : MySQL 
- Hébergement : Vercel (front)
- Outils Green IT : compression Brotli/GZIP, Website Carbon CLI, Lighthouse/EcoIndex

Installation & exécution

Prérequis
• Node.js ≥ 16  
• MySQL ou PostgreSQL  
• Git

1. Cloner le dépôt
   git clone https://github.com/ayms94/Projet_GreenIT.git
   cd Projet_GreenIT

2. Back‐end
   cd backend
   cp .env.example .env       # renseigner DB_HOST, DB_USER, etc.
   npm install
   npm start                  

3. Base de données
   mysql -u <user> -p green_marketplace < database/schema.sql

4. Front‐end
   cd ../frontend
   npm install
   npm run dev               

Configuration
Copier .env.example → .env et remplir :
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=secret
DB_NAME=green_marketplace
PORT=3000

Structure du projet
Projet_GreenIT/
├─ backend/         # API Node.js / Express
│  ├─ server.js
│  ├─ package.json
│  └─ .env.example
├─ database/        # Scripts SQL
│  ├─ schema.sql
│  └─ seed.sql
├─ frontend/        # Client Vue 3 + Vite
│  ├─ src/
│  ├─ public/
│  ├─ package.json
│  └─ vite.config.js
└─ README.txt

Fonctionnalités
• Gestion des utilisateurs (inscription, connexion, CRUD)  
• Catalogue général (recherche multicritères : catégorie, prix, locale, bio)  
• CRUD produits (ajout, modification, suppression, affichage en grille)  
• Panier & paiement simulé  
• Statistiques éco‐empreinte (total, moyen, répartition)  
• Formulaire de contact  
• Analyse carbone (script local & Website Carbon CLI/Lighthouse)

Projet by Ruben, Robin, Aymane, Samy et Nail!
