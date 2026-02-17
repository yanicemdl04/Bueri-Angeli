# APIs backend nécessaires au frontend Bueri-Angeli

Ce document liste toutes les API du backend et leur usage côté frontend (écrans actuels : Login, Admin, Enseignant, Parent).

---

## 1. Vue d’ensemble par écran

| Écran | APIs à consommer |
|-------|-------------------|
| **Login** | `POST /api/auth/login` |
| **Admin** | `/api/auth/me`, `/api/eleves`, `/api/classes`, `/api/cours`, `/api/evaluations`, `/api/notifications/me`, stats dérivées |
| **Enseignant** | `/api/auth/me`, `/api/enseignants/me`, `/api/classes`, `/api/eleves`, `/api/evaluations`, `/api/cours` |
| **Parent** | `/api/auth/me`, `/api/notifications/me`, *(à prévoir : lien Parent → Élève(s) pour bulletin / moyennes)* |

---

## 2. Auth (connexion et profil)

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| POST | `/api/auth/login` | — | `{ email, motDePasse }` | **Login** : envoyer identifiants, stocker `token` et `user` (dont `role`) |
| POST | `/api/auth/register` | — | `{ nom, postnom, email, motDePasse }` | Inscription publique → compte **Parent** uniquement |
| GET | `/api/auth/me` | Authentifié | — | Après login : récupérer le profil (id, nom, email, role, enseignant si lien) ; à appeler au chargement de l’app si token en localStorage |

---

## 3. Utilisateurs (Admin uniquement)

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| GET | `/api/utilisateurs` | Admin | — | Liste des utilisateurs (gestion des comptes) |
| POST | `/api/utilisateurs` | Admin | `{ nom, postnom, email, motDePasse, role }` | Créer Enseignant / Admin / Parent |
| GET | `/api/utilisateurs/:id` | Admin | — | Détail d’un utilisateur |
| PATCH | `/api/utilisateurs/:id` | Admin | champs optionnels | Modifier un utilisateur |
| DELETE | `/api/utilisateurs/:id` | Admin | — | Supprimer un utilisateur |

---

## 4. Élèves

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| GET | `/api/eleves` | Authentifié | `?idClasse=&search=&risquesDecrochageMin=` | **Admin** : liste (stats, élèves à risque) ; **Enseignant** : liste par classe |
| POST | `/api/eleves` | Enseignant/Admin | `{ nom, prenom, dateNaissance, sexe, adresse?, idClasse }` | Créer un élève |
| GET | `/api/eleves/:id` | Authentifié | `?includeNotes=true` | Détail élève (+ notes si besoin) |
| GET | `/api/eleves/:id/moyenne` | Authentifié | `?idCours=` (optionnel) | **Parent** (si lien élève) / Enseignant : moyenne générale ou par cours |
| PATCH | `/api/eleves/:id` | Enseignant/Admin | champs optionnels | Modifier un élève |
| PATCH | `/api/eleves/:id/risques` | Enseignant/Admin | `{ risquesDecrochage }` | Mise à jour du score IA de décrochage |
| DELETE | `/api/eleves/:id` | Enseignant/Admin | — | Supprimer un élève |

---

## 5. Classes

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| GET | `/api/classes` | Authentifié | `?niveau=&anneeScolaire=` | **Admin** : stats, graphique risque par classe ; **Enseignant** : mes classes (via `/enseignants/me` ou liste) |
| POST | `/api/classes` | Enseignant/Admin | `{ nomClasse, niveau, anneeScolaire }` | Créer une classe |
| GET | `/api/classes/:id` | Authentifié | `?includeEleves=true&includeEnseignants=true` | Détail classe (élèves, enseignants) |
| PATCH | `/api/classes/:id` | Enseignant/Admin | champs optionnels | Modifier une classe |
| PUT | `/api/classes/:id/enseignants` | Enseignant/Admin | `{ idEnseignants: [uuid, …] }` | Assigner les enseignants à la classe |
| DELETE | `/api/classes/:id` | Enseignant/Admin | — | Supprimer une classe |

---

## 6. Enseignants

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| GET | `/api/enseignants` | Authentifié | — | **Admin** : liste des enseignants |
| GET | `/api/enseignants/me` | Enseignant | — | **Enseignant** : mon profil + mes classes (pour tableau de bord) |
| POST | `/api/enseignants` | Admin | `{ specialite, telephone, idUtilisateur }` | Créer un enseignant (lien au compte) |
| GET | `/api/enseignants/:id` | Authentifié | — | Détail enseignant |
| PATCH | `/api/enseignants/:id` | Admin | champs optionnels | Modifier un enseignant |
| DELETE | `/api/enseignants/:id` | Admin | — | Supprimer un enseignant |

---

## 7. Cours

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| GET | `/api/cours` | Authentifié | — | Liste des matières (encodage notes, bulletins) |
| POST | `/api/cours` | Enseignant/Admin | `{ nomCours, ponderation? }` | Créer un cours |
| GET | `/api/cours/:id` | Authentifié | — | Détail cours |
| PATCH | `/api/cours/:id` | Enseignant/Admin | champs optionnels | Modifier un cours |
| DELETE | `/api/cours/:id` | Enseignant/Admin | — | Supprimer un cours |

---

## 8. Évaluations (notes)

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| GET | `/api/evaluations` | Authentifié | `?idEleve=&idCours=&idClasse=&type=` | **Admin** : tendance académique ; **Enseignant** : encodage notes, liste par classe/élève |
| POST | `/api/evaluations` | Enseignant/Admin | `{ valeur, type, date, idEleve, idCours }` | Encoder une note (Interrogation / Examen) |
| GET | `/api/evaluations/:id` | Authentifié | — | Détail d’une note |
| PATCH | `/api/evaluations/:id` | Enseignant/Admin | champs optionnels | Modifier une note |
| DELETE | `/api/evaluations/:id` | Enseignant/Admin | — | Supprimer une note |

---

## 9. Notifications

| Méthode | URL | Rôle | Body / Query | Usage frontend |
|---------|-----|------|--------------|----------------|
| GET | `/api/notifications/me` | Authentifié | `?nonLuesOnly=true` | **Tous** : liste des notifications (Parent : encart notifications) |
| POST | `/api/notifications/mark-all-read` | Authentifié | — | Marquer toutes comme lues |
| POST | `/api/notifications` | Authentifié | `{ titre, message, idUtilisateur }` | Créer une notification (ex. Admin vers un utilisateur) |
| GET | `/api/notifications/:id` | Authentifié | — | Détail notification |
| PATCH | `/api/notifications/:id/read` | Authentifié | — | Marquer une notification comme lue |
| DELETE | `/api/notifications/:id` | Authentifié | — | Supprimer une notification |

---

## 10. Health

| Méthode | URL | Rôle | Usage frontend |
|---------|-----|------|----------------|
| GET | `/api/health` | — | Vérifier que le backend est joignable (optionnel au démarrage ou en erreur) |

---

## 11. En-tête commun pour les requêtes authentifiées

Toutes les routes sauf `POST /api/auth/login`, `POST /api/auth/register` et `GET /api/health` doivent recevoir :

```
Authorization: Bearer <token>
```

Le token est obtenu via `POST /api/auth/login` et stocké côté frontend (ex. localStorage ou store).

---

## 12. Données dérivées côté frontend (pas d’API dédiée)

- **Admin – KPIs / tendance** : calculs à partir de `GET /api/eleves`, `GET /api/classes`, `GET /api/evaluations` (agrégations par période, par classe, risques).
- **Admin – Risque par classe** : `GET /api/classes` avec `includeEleves=true`, puis utilisation de `risquesDecrochage` des élèves pour agréger par classe.
- **Enseignant – Moyenne par classe** : `GET /api/enseignants/me` (classes) + pour chaque classe `GET /api/eleves?idClasse=...` + moyennes via `GET /api/eleves/:id/moyenne` ou agrégation des évaluations.

---

## 13. Point à prévoir pour le tableau de bord Parent

Le bulletin et la moyenne générale affichés sur le **Parent** supposent un lien entre le compte **Parent** et un ou plusieurs **Élèves**. Ce lien n’existe pas encore dans le schéma Prisma actuel. À prévoir :

- Soit une table de liaison (ex. `ParentEleve` avec `idUtilisateur`, `idEleve`),
- Soit un champ sur `Eleve` (ex. `idParent`).

En attendant, le frontend peut continuer à utiliser des mocks pour le Parent, ou afficher un message “Aucun élève rattaché” et consommer uniquement `GET /api/notifications/me`.

---

## Résumé : liste des APIs nécessaires au bon fonctionnement

- **Auth** : `POST /api/auth/login`, `GET /api/auth/me`, (optionnel : `POST /api/auth/register`)
- **Utilisateurs** : `GET/POST/GET/:id/PATCH/:id/DELETE/:id` sur `/api/utilisateurs` (Admin)
- **Élèves** : `GET`, `POST`, `GET/:id`, `GET/:id/moyenne`, `PATCH/:id`, `PATCH/:id/risques`, `DELETE/:id`
- **Classes** : `GET`, `POST`, `GET/:id`, `PATCH/:id`, `PUT/:id/enseignants`, `DELETE/:id`
- **Enseignants** : `GET`, `GET/me`, `POST`, `GET/:id`, `PATCH/:id`, `DELETE/:id`
- **Cours** : `GET`, `POST`, `GET/:id`, `PATCH/:id`, `DELETE/:id`
- **Évaluations** : `GET`, `POST`, `GET/:id`, `PATCH/:id`, `DELETE/:id`
- **Notifications** : `GET/me`, `POST/mark-all-read`, `POST`, `GET/:id`, `PATCH/:id/read`, `DELETE/:id`
- **Health** : `GET /api/health` (optionnel)

Ces APIs couvrent le bon fonctionnement du projet une fois le frontend branché sur le backend (hors lien Parent–Élève à implémenter pour le bulletin Parent).
