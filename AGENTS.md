# AGENTS.md

## Repository state

- `Frontend/` is scaffolded with Next.js App Router + TypeScript + Tailwind CSS v4; initial routes exist under `src/app/`, but feature work is still in progress.
- `Backend/` is scaffolded as a Go module (`website-desa-lerep/backend`) with Gin, pgx, a health endpoint, and a multi-stage Dockerfile.
- `README.md` is empty. The real documentation lives in `docs/`.
- No CI is configured. Verify test tooling before running test commands.
- Verify state with `git status` before claiming files/commands exist; at time of writing most docs are untracked.

## Frontend commands (run inside `Frontend/`)

- `npm run dev` — Next.js (Turbopack) dev server at `http://localhost:3000`.
- `npm run build` — production build.
- `npm run lint` — ESLint flat config.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run test` — requires Vitest config/tests, which do not exist yet.

Tailwind is v4: `postcss.config.mjs` uses `@tailwindcss/postcss` and the global import lives in `src/app/globals.css`; there is no `tailwind.config.js`. The `@/*` alias maps to `src/*`.

## Backend commands (run inside `Backend/`)

- `go run ./cmd/api` — run the API locally (defaults to `:8080`; DB-backed features are disabled when `DATABASE_URL` is empty).
- `go build ./...` — compile all packages.
- `go vet ./...` — static checks.
- `go test ./...` — run tests (no test files yet).
- `gofmt -w cmd internal` — format Go source.
- `docker build -t website-desa-lerep-backend:local .` — build the backend image.
- `GET /health` — infrastructure health check with application and database status.
- `GET /api/v1` — versioned API root using the standard success envelope.

## Docker Compose commands (run at repo root)

- `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build` — development stack with hot-reload frontend and backend.
- `docker compose -f docker-compose.yml -f docker-compose.dev.yml down` — stop the development stack.
- `docker compose up -d --build` — production-style stack with built images.
- `docker compose config` — validate the compose configuration.
- Dev entrypoints: nginx `http://localhost:${NGINX_PORT:-80}`, frontend `http://localhost:${FRONTEND_PORT:-3000}`, backend `http://localhost:${BACKEND_PORT:-8080}`.
- Access the app through nginx so browser requests to `/api/v1` stay same-origin. Direct frontend/backend ports are for debugging.
- Copy `.env.example` to `.env` before starting Compose; the file is gitignored.

## Sources of truth (read in this order)

1. `docs/PRD.md` — final product scope, modules, P0/P1/P2 priorities, acceptance criteria.
2. `docs/ARCHITECTURE.md` — **FINAL — LOCKED** technical decisions; follow them rather than proposing alternatives.
3. `docs/SCHEMA.md` — **draft (v1.8.1-review, not locked)**; 66-table model. Migrations become the implementation truth later.
4. `docs/DESIGN.md` — currently an empty placeholder.

If docs conflict with future config/scripts, trust executable config. Until then, docs are all there is.

## Locked stack and conventions (do not silently change)

- Frontend: Next.js App Router + TypeScript + Tailwind + shadcn/ui, feature-based architecture under `src/features/`.
- Backend: Go modular monolith, Gin, layered Handler -> Service -> Repository; base path `/api/v1`.
- Data: Supabase PostgreSQL, Supabase Auth, Supabase Storage; all DB access goes through the Go API. No direct DB access from Next.js; no Next.js API routes as a data backend.
- SQL: raw parameterized SQL via `pgx`/`pgxpool`; `golang-migrate` for schema. No GORM, no sqlc.
- API responses: envelope `{success, message, data}` / `{success, message, errors}` with `meta` for pagination.
- DB conventions: UUID PKs (`gen_random_uuid()`), plural `snake_case` tables, singular `snake_case` columns, FK `{entity}_id`, indexes `idx_{table}_{column}`.
- Time: store UTC `TIMESTAMPTZ`; display `Asia/Jakarta`; PostgreSQL `DATE` for date-only.
- Frontend data/state: native `fetch` + centralized API client and Next.js cache/ISR; React state + Context API. No TanStack Query, no extra global state library.
- Forms: React Hook Form + Zod only for complex forms; backend always revalidates.
- Explicitly out of scope unless PRD promotes them: TanStack Query, Redis, queues/background workers, PostGIS, Google Maps JavaScript API, automatic WhatsApp/email/push notifications, CI/CD, microservices/Kubernetes, admin self-registration, news comments, certified TTE.
- UI copy is Indonesian; support light/dark/system themes and mobile/tablet/desktop.

## Workflow constraints

- Architecture changes require a new ADR; scope changes must be checked against `docs/PRD.md` first (`docs/ARCHITECTURE.md` sections 29 and 33).
- Do not invent tables/features outside the draft schema/PRD. `docs/SCHEMA.md` still has open decisions (e.g. RLS V-08) to resolve before final migrations.
- When adding code, use the existing on-disk `Backend/` and `Frontend/` directories even though the architecture doc writes them lowercase.
- Deployment target is manual SSH + Docker Compose on one VPS (nginx/frontend/backend), with separate dev/prod Supabase projects. No CI/CD expected.
- Keep the backend commands above in sync with `Backend/go.mod` and `Backend/Dockerfile`.
