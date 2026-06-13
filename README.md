# Stitchmate

App repository using [uv-core v1.0.1](https://github.com/uv-venky/uv-core/releases/tag/v1.0.1) for auth, database, migrations, and logging.

**No local clone of uv-core required** — it is installed from GitHub on `pnpm install`.

## Setup (clone only this repo)

```bash
git clone https://github.com/<your-org>/stitchmate.git
cd stitchmate
cp .env.example .env
# set DATABASE_URL and JWT_SECRET
pnpm install
pnpm run migrate
pnpm run dev
```

## uv-core dependency

```json
"uv-core": "github:uv-venky/uv-core#v1.0.1"
```

For local uv-core development (optional):

```json
"uv-core": "file:../uv-core"
```

## Default login

- Email: `admin@example.com`
- Password: `changeme`

## API routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Health check |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/logout` | Bearer | Logout |
| GET | `/api/profile` | Bearer | Current user |
| GET | `/api/dashboard` | Bearer | App dashboard |
| GET | `/api/admin` | Bearer + admin/root | Admin route |

## Configuration

- `config/default.yml` — `appId: stitchmate`
- `.env` — `DATABASE_URL`, `JWT_SECRET`, `APP_ID`
