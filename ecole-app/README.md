# DIGISCHOOL

DIGISCHOOL est une application de gestion scolaire moderne pour l'écosystème DIGISCHOOL.

## Structure du projet

Ce projet est un monorépo géré par `pnpm workspaces` :

- `apps/api` : L'API backend construite avec Express, Sequelize et MySQL.
- `apps/web` : Le client frontend SPA construit avec React, Vite et TailwindCSS.
- `packages/shared` : Les types TypeScript et schémas de validation Zod partagés.

## Prérequis

- Node.js >= 20
- pnpm >= 8
- Docker et Docker Compose (optionnel)

## Installation

Installez les dépendances à la racine du projet :

```bash
pnpm install
```

## Démarrage en développement

```bash
pnpm dev
```

## Construction pour la production

```bash
pnpm build
```

## Schéma de base de données – Table `Personne`

| Champ | Type | Null | Défaut | Description |
|-------|------|------|--------|-------------|
| `idPers` | `INT` | NOT NULL | auto‑increment | Clé primaire |
| `login` | `VARCHAR(100)` | NOT NULL | – | Nom d'utilisateur |
| `password` | `VARCHAR(100)` | NOT NULL | – | Mot de passe hashé (bcrypt) |
| `typePersonne` | `TINYINT` | NOT NULL | – | 1 = Enseignant, 2 = Parent |
| `actif` | `BOOLEAN` | NOT NULL | `true` | Compte actif |
| `isDelete` | `BOOLEAN` | NOT NULL | `false` | Suppression logique |
| `nom` | `VARCHAR(60)` | NULL | `''` | Nom de famille |
| `prenom` | `VARCHAR(60)` | NULL | `''` | Prénom |
| `sexe` | `CHAR(1)` | NULL | `'M'` | Sexe |
| `dateNaissance` | `DATE` | NULL | `2000-01-01` | Date de naissance |
| `email` | `VARCHAR(100)` | NULL | `''` | Adresse e-mail |
| `telephone1` | `VARCHAR(30)` | NULL | `''` | Numéro de téléphone |
| `idALNYA` | `VARCHAR(15)` | NOT NULL | `''` | Identifiant interne (numérique, max 15 chiffres) — modifiable par l'utilisateur depuis son profil |
| `photoURL` | `TEXT LONG` | NULL | – | URL ou base64 de la photo de profil |
| `langue` | `VARCHAR(10)` | NOT NULL | `'fr'` | Langue de l'interface |
| `created_at` | `DATETIME` | NULL | `NOW()` | Date de création |
| `updated_at` | `DATETIME` | NULL | `NOW()` | Date de dernière mise à jour |

> **Note** : Le champ `idALNYA` est obligatoire mais initialisé à une chaîne vide par défaut. L'utilisateur peut le renseigner ou le modifier depuis sa page de profil (`/profile`). La valeur doit être composée uniquement de chiffres (0‑9), avec une longueur maximale de 15 caractères.
