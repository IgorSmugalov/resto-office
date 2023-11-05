### Start for development:

```
docker compose up
```

includes:

- hot reload for apps
- PostgreSQL

### Monorepo structure:

Based on NX Monorepo

```
|--apps
    |--office   - NextJS frontend app
    |--api      - NestJS backend app
|--tools
    |--prisma   - ORM schema for PostgreSQL
```
