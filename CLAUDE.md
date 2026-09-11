# AirLab — Project Guide

AirLab is a laboratory management tool for antibody-based research, developed at BodenmillerLab (University of Zurich). It is a TypeScript monorepo with a NestJS backend, Vue 2 frontend, async worker, and shared type library.

## Monorepo Structure

Managed with **Yarn Workspaces** and **Lerna**. Four packages:

| Package | Path | Purpose |
|---|---|---|
| `@airlab/shared` | `packages/shared` | Shared TypeScript types and DTOs |
| `@airlab/backend` | `packages/backend` | NestJS REST API (Express platform) |
| `@airlab/frontend` | `packages/frontend` | Vue 2 SPA (Vue CLI / webpack) |
| `@airlab/worker` | `packages/worker` | NestJS microservice for async tasks |

## Common Commands

Run from the repo root unless noted.

```bash
# Install / link all packages
yarn bootstrap

# Development
yarn serve:frontend           # Frontend dev server on port 9999
yarn start:backend:debug      # Backend with debug on 0.0.0.0:9229
yarn workspace @airlab/worker start:dev

# Build
yarn build                    # All packages
yarn build:frontend
yarn build:backend
yarn build:worker

# Lint
yarn lint                     # All packages
yarn lint:frontend
yarn lint:backend

# Tests
yarn test                     # All packages
yarn workspace @airlab/backend test:watch

# Database migrations
yarn migration:run
yarn migration:revert
```

The frontend dev server requires the legacy OpenSSL provider — this is already set in `package.json` via `NODE_OPTIONS=--openssl-legacy-provider`.

## Tech Stack

### Backend (`@airlab/backend`)
- **NestJS 11** on Express
- **TypeORM 1.1** with **PostgreSQL**
- **JWT + Passport** authentication (Bearer tokens, bcryptjs password hashing)
- **Redis** (ioredis) for caching
- **RabbitMQ** (amqplib) for message queue to worker
- **Swagger/OpenAPI** docs at `/docs`; API base path: `/api/v1`
- **PM2** for production process management

### Frontend (`@airlab/frontend`)
- **Vue 2.7.16** — do not migrate to Vue 3
- **All 92 components are class-based** using `vue-class-component` + `vue-property-decorator` decorators (`@Component`, `@Watch`, `@Prop`, etc.)
- **Vuetify 2.7** (Material Design UI)
- **Vue Router 3** (history mode, lazy-loaded chunks)
- **Vuex 3** with `vuex-smart-module`; `vuex-persist` syncs state to localStorage
- **Vue CLI 5** (webpack-based build)
- Dev server proxies `/api/*` to localhost backend

### Worker (`@airlab/worker`)
- **NestJS 11** microservice
- Consumes tasks from RabbitMQ
- Debug port: `0.0.0.0:9230`

### Shared (`@airlab/shared`)
- TypeScript-only library; compiled with `tsc` to `./lib`
- Contains entity types, DTOs, and interfaces shared between backend and frontend

We are fixed for the time being on Vue version 2.

## TypeScript Configuration

All packages enable `experimentalDecorators` and `emitDecoratorMetadata` (required by NestJS and vue-class-component).

| Package | Target | Strict |
|---|---|---|
| shared | ES2020 | No (`noImplicitAny: false`, `strictNullChecks: false`) |
| backend | ES2020 | No (`ignoreDeprecations: "7.0"`) |
| frontend | ESNext | Yes |
| worker | ES2020 | No |

The frontend uses `moduleResolution: bundler` and path alias `@/*` → `src/*`.

The newest version of TypeScript this project can work with is currently up to 6.0.x.
When updating dependencies, do not move past Typescript 6.0.

## ESLint

Uses the new **flat config** format (`eslint.config.js`) with ESLint 10. Parser: `@typescript-eslint/parser`. Prettier is integrated via `eslint-plugin-prettier`. Explicit function return types are disabled. Per-package `eslint.config.js` files exist alongside the root one.

## Testing

All packages use **Jest** with `ts-jest`. Test files match `**/*.spec.ts`.

- Backend/worker: Node environment, standard Jest config
- Frontend: `@vue/cli-plugin-unit-jest` preset (`typescript-and-babel`); stubs in `tests/jest.stubs.js`; transforms exclude `ky` and `lodash-es`

## Environment Variables

Copy `.env.template` to `.env`. Key variables:

| Variable | Purpose |
|---|---|
| `JWT_SECRET` | Required — signs JWT tokens |
| `TYPEORM_*` | PostgreSQL connection (host, user, password, database, port) |
| `REDIS_HOST` / `REDIS_PORT` | Redis connection |
| `OPEN_USER_REGISTRATION` | `true` to allow self-registration |
| `SMTP_*` | Email/notification settings |
| `DOMAIN` / `PROTOCOL` | Used by Traefik reverse proxy in production |

## Docker / Deployment

- `docker-stack.yml` defines the full stack (backend, frontend/nginx, worker, postgres, redis, rabbitmq, Traefik)
- Dockerfiles: Node 22-alpine for backend/worker; multi-stage (build + nginx 1.20-alpine) for frontend
- `Makefile` targets: `bootstrap`, `build`, `build-push`, `deploy-development`, `deploy-staging`, `deploy-production`, `db-migration`
- Deploy scripts in `scripts/deploy-{development,staging,production}.sh`

## Domain Model

Core entities: User, Group, Member, Protein, Provider, Species, Tag, Clone, Lot, Conjugate, Panel, PanelElement, Validation, ValidationFile. Migrations live in `packages/backend/src/migrations/`.
