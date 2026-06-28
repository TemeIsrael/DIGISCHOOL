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
