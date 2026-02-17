# Bueri-Angeli – Frontend

Interface React (Vite) pour le SIS Bueri-Angeli. Tableaux de bord Admin, Enseignant et Parent.

## APIs backend

Les écrans consomment les API du backend (Express). La liste des endpoints nécessaires et leur usage par écran est décrite dans le dépôt :

- **Backend** : `backend/docs/API-FRONTEND.md` — liste des APIs par ressource et mapping Login / Admin / Enseignant / Parent.

À l’heure actuelle, les données affichées viennent de mocks (`src/data/mock.ts`, `src/data/metrics.ts`). Pour brancher le frontend sur le backend : appeler `POST /api/auth/login` au lieu du choix de rôle, stocker le token (ex. localStorage), et utiliser les endpoints listés dans `API-FRONTEND.md` avec l’en-tête `Authorization: Bearer <token>`.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
