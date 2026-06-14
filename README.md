# Stitchmate

Next.js app using [uv-core](https://github.com/uv-venky/uv-core) for auth, database, migrations, UI components, and codegen.

**Single server** — one `pnpm dev` serves both the React UI and API routes (same pattern as metro-one-cop with core).

## Setup

```bash
git clone https://github.com/<your-org>/stitchmate.git
cd stitchmate
cp .env.example .env
# set DATABASE_URL and JWT_SECRET
pnpm install
pnpm run migrate
pnpm run dev
```

Open [http://localhost:3000/app/uv-users](http://localhost:3000/app/uv-users)

## uv-core dependency

For local uv-core development:

```json
"uv-core": "link:../uv-core"
```

For published uv-core:

```json
"uv-core": "github:uv-venky/uv-core#v1.0.19"
```

## Default login

- Email: `admin@example.com`
- Password: `changeme`

## Key routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/profile` | Current user |
| POST | `/api/action` | Server actions (env, config, etc.) |
| POST | `/api/ds` | DataSource queries |
| GET | `/login` | Login page |
| GET | `/codegen` | Code generator (dev only) |
| GET | `/app/uv-users` | Users page |

## Configuration

- `config/default.yml` — `appId: stitchmate`
- `.env` — `DATABASE_URL`, `JWT_SECRET`, `APP_ID`

## Legacy

The old split setup (`pnpm run server:legacy` + separate `frontend/` folder) is deprecated. Use `pnpm dev` only.
