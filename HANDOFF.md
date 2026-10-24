# Virtual Laboratory for Computer Hardware Assembly - Handoff Guide

## Module M0: Foundation Handoff

### 1. What Was Built
- **Monorepo Structure**: Complete npm workspace containing `/apps/web`, `/apps/api`, `/packages/shared`, `/data`, `/docs`, with unified TypeScript configuration and scripts.
- **Shared Contract Package (`@vlab/shared`)**: Defined the entire shared domain model:
  - `ComponentCategory`, `Component`, `SlotId`, `ComponentId`
  - `Connection`, `BuildFlags`, `BuildEvent`, `BuildState`
  - `ValidationResult`, `ValidationSeverity`, `BootResult`, `BootStatus`
  - `UserRole`, `UserSafe`, `AuthResponse`, `ApiResponseError`
  - Zod validation schemas for all types and API payloads
  - `checkBuild()` and `simulateBoot()` stub functions annotated with `TODO(M1)`
- **Backend API (`apps/api`)**:
  - Express app listening on port 5000 with Helmet, CORS, and JSON parser
  - Centralized error handler returning `{ error: { code, message, details? } }`
  - Zod validation middlewares (`validateBody`, `validateQuery`, `validateParams`)
  - Swagger/OpenAPI 3.0 documentation served at `/api-docs`
  - JWT authentication system (`/auth/register`, `/auth/login`, `/auth/me`)
  - Role guard middleware (`requireRole('teacher')` / `requireRole('student')`)
  - Telemetry event logging supporting single and batch events (`POST /api/v1/events`)
- **Database & Prisma**:
  - Prisma schema with 10 entities: `User`, `Session`, `BuildAttempt`, `Event`, `QuizQuestion`, `QuizAttempt`, `Fault`, `TroubleshootAttempt`, `Badge`, `UserBadge`
  - Seed script populating 1 teacher (`teacher@vlab.edu`), 5 students (`student1@vlab.edu` through `student5@vlab.edu`), 1 badge, 1 fault scenario, and 1 quiz question
- **Frontend Client (`apps/web`)**:
  - React 18 + TypeScript + Vite + Tailwind CSS with dark theme baseline
  - React Router navigation with `Layout` and `Navbar` showing current user and role badge
  - `AuthContext` with persistent token storage and session recovery
  - `ProtectedRoute` with authentication verification and role restriction warnings
  - Pages implemented: Landing Home, Login (with 1-click demo autofill), Register, Workbench Lab placeholder (with test telemetry trigger), Quiz placeholder, Troubleshoot placeholder, Student Progress placeholder, and Teacher Dashboard placeholder
- **Data & Configuration**:
  - `/data` JSON datasets for components, compatibility rules, guided tutorial steps, quizzes, and faults
  - `docker-compose.yml` for multi-container orchestration (`db`, `api`, `web`)
  - `.env.example` with local SQLite and Docker PostgreSQL environment variables

### 2. Files & Endpoints Added
- **Files**:
  - Monorepo: `package.json`, `tsconfig.base.json`, `.gitignore`, `.env.example`, `docker-compose.yml`, `PLAN.md`, `DECISIONS.md`, `HANDOFF.md`
  - Shared: `packages/shared/package.json`, `packages/shared/tsconfig.json`, `packages/shared/src/types.ts`, `packages/shared/src/schemas.ts`, `packages/shared/src/stubs.ts`, `packages/shared/src/index.ts`
  - API: `apps/api/package.json`, `apps/api/tsconfig.json`, `apps/api/prisma/schema.prisma`, `apps/api/prisma/seed.ts`, `apps/api/src/config.ts`, `apps/api/src/db.ts`, `apps/api/src/middleware/errorHandler.ts`, `apps/api/src/middleware/validate.ts`, `apps/api/src/middleware/auth.ts`, `apps/api/src/swagger.ts`, `apps/api/src/routes/health.ts`, `apps/api/src/routes/auth.ts`, `apps/api/src/routes/events.ts`, `apps/api/src/routes/index.ts`, `apps/api/src/app.ts`, `apps/api/src/index.ts`
  - Web: `apps/web/package.json`, `apps/web/vite.config.ts`, `apps/web/tailwind.config.js`, `apps/web/src/App.tsx`, `apps/web/src/context/AuthContext.tsx`, `apps/web/src/components/ProtectedRoute.tsx`, `apps/web/src/pages/Home.tsx`, `apps/web/src/pages/Login.tsx`, `apps/web/src/pages/Register.tsx`, `apps/web/src/pages/LabPlaceholder.tsx`, etc.
  - Data: `data/components.json`, `data/rules.json`, `data/tutorial_steps.json`, `data/quizzes.json`, `data/faults.json`
- **Endpoints**:
  - `GET  /api/v1/health`
  - `POST /api/v1/auth/register`
  - `POST /api/v1/auth/login`
  - `GET  /api/v1/auth/me`
  - `POST /api/v1/events`
  - `GET  /api-docs`

### 3. How to Run It

#### A. Local Development (Node.js & SQLite)
```bash
# 1. Install dependencies across all workspaces
npm install

# 2. Build the shared contract package
npm run build:shared

# 3. Generate Prisma client and initialize SQLite database
npm --workspace=apps/api run prisma:push

# 4. Seed demo accounts (1 teacher, 5 students, starter data)
npm run seed

# 5. Run tests
npm test

# 6. Start API (port 5000) and Web (port 5173) concurrently
npm run dev
```

#### B. Docker Compose
```bash
docker compose up --build
```
- Web Application: http://localhost:5173
- API Server: http://localhost:5000/api/v1
- Swagger Docs: http://localhost:5000/api-docs

#### C. Seeded Demo Accounts
- **Teacher**: `teacher@vlab.edu` / `Password123!`
- **Student 1**: `student1@vlab.edu` / `Password123!`
- **Student 2-5**: `student2@vlab.edu` through `student5@vlab.edu` / `Password123!`

### 4. Known Limitations
- Workbench canvas, drag-and-drop, wiring, and quiz interfaces are functional placeholders scheduled for subsequent dedicated modules.
- `checkBuild` and `simulateBoot` in `@vlab/shared` return stubbed initial responses marked `TODO(M1)`.
- Database schema currently runs against local SQLite for development; switching to PostgreSQL in Docker uses the provided docker-compose configuration.

### 5. What the Next Module (M1: Compatibility & Simulation Engine) Should Know
- `checkBuild(build: BuildState, catalog: Component[]): ValidationResult[]` in `packages/shared/src/stubs.ts` is ready to be implemented with the full compatibility rules engine.
- Rules are defined in `data/rules.json` and components are defined in `data/components.json`.
- `simulateBoot(build: BuildState, catalog: Component[]): BootResult` should evaluate the assembly state, generate sequential BIOS POST lines, detect missing critical items (such as CPU, RAM, or 8-pin power), and emit beep codes with fault identifiers.
- API endpoints `POST /api/v1/build/validate` and `POST /api/v1/build/boot` will consume these functions directly from `@vlab/shared`.
