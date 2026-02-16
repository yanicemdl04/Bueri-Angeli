# Backend Bueri-Angeli

API REST Express + Prisma 7 + PostgreSQL pour la gestion scolaire (Utilisateurs, Élèves, Classes, Enseignants, Cours, Évaluations, Notifications). IDs en **UUID** ; package **uuid** disponible pour génération côté code.

## Prérequis

- Node.js 20+
- PostgreSQL (pour `gen_random_uuid()`)
- npm ou yarn

## Installation

```bash
cd backend
npm install

# Éditer .env : DATABASE_URL (PostgreSQL), JWT_SECRET
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

## Lancement

```bash
npm run dev
```

API disponible sur `http://localhost:3000/api`.

## Structure

```
backend/
├── package.json
├── prisma.config.ts          # Config Prisma 7 (schema, datasource, migrations)
├── .env / .env.example
└── src/
    ├── server.js             # Point d'entrée
    ├── prisma/
    │   ├── schema.prisma     # Modèles (Utilisateur, Eleve, ClasseScolaire, etc.)
    │   ├── seed.js           # Données initiales
    │   └── migrations/
    ├── config/               # database.js, index.js (port, JWT, etc.)
    ├── middleware/           # auth, rbac, errorHandler, validate
    ├── repository/           # Accès données par entité
    ├── validators/            # express-validator par ressource
    ├── services/             # Logique métier
    ├── controllers/          # Handlers HTTP
    ├── routes/               # Routes par ressource
    └── utils/uuid.js         # Helper UUID (package uuid)
```

- **Base** : PostgreSQL (UUID pour toutes les PK).
- **UUID** : générés en base avec `gen_random_uuid()` ; package `uuid` disponible (`import { generateUUID } from './utils/uuid.js'`).

## API (résumé)

- **Auth** : `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me` (Bearer)
- **Utilisateurs** (Admin) : CRUD `/api/utilisateurs`
- **Élèves** : CRUD `/api/eleves`, `GET /api/eleves/:id/moyenne`
- **Classes** : CRUD `/api/classes`, `PUT /api/classes/:id/enseignants`
- **Enseignants** : CRUD `/api/enseignants`, `GET /api/enseignants/me`
- **Cours** : CRUD `/api/cours`
- **Évaluations** : CRUD `/api/evaluations` (filtres: idEleve, idCours, idClasse, type)
- **Notifications** : `GET /api/notifications/me`, marquer lues, CRUD

RBAC : Admin (données sensibles), Enseignant (cours/notes/élèves), Parent (lecture selon contexte).

### Création des utilisateurs et rôles

- **POST /api/auth/register** (inscription publique, sans token) : crée uniquement des comptes **Parent**. Pas de champ `role` dans le body ; le rôle est fixé à `Parent` côté serveur.
- **POST /api/utilisateurs** (réservé à l’**Admin**, token requis) : seul l’Admin peut créer ou ajouter des utilisateurs avec les rôles **Admin**, **Enseignant** ou **Parent** (champ `role` dans le body).
