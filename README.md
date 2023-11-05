### Start for development:

```
docker compose up
```

<sub><sup>* Docker includes hot reload</sup></sub>

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

### Monorepo structure:

```
|--apps
    |--office   - NextJS frontend app
    |--api      - NestJS backend app
|--tools
    |--prisma   - ORM schema for PostgreSQL
```
