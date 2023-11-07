### Start for local development:

Required:

- Node 18 / 20
- Docker

1. Run docker with Postgres:

```
docker-compose -f docker-compose.development.yml --env-file .env.local.development up
```

2. Run all apss:

```
npm run start:dev
```

### Access:

- Office: http://localhost:4200/
- API: http://localhost:4201/api/

[//]: # (```)

[//]: # (docker-compose up)

[//]: # (```)

[//]: # (<sub><sup>* Docker includes hot reload</sup></sub>)

### Monorepo structure:

```
|--apps
    |--office   - NextJS frontend app
    |--api      - NestJS backend app
|--libs
    |--schema   - Shemas and types for frontend-backend interactions
|--tools
    |--prisma   - ORM schema for PostgreSQL
```

### Stack:

- **Workspace:** NX Monorepo
- **Run:** Docke & Docker-compose
- **Frontend**:
    - **Framework:** NextJS
    - **State:** Effector & Effector-forms
    - **UI**: MaterialUI
    - **Libs:** Zod, Ky, Patronum
- **Backend:**
    - **Framework:** NestJS
    - **ORM**: Prisma
    - **DB**: PostgreSQL
- **Code Style:**
    - **ESLint**
    - **Stylelint**
    - **Prettier**
    - **Pre-commit hooks**
