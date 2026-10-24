# Architecture Decision Records (ADR)
Virtual Laboratory for Computer Hardware Assembly

## DEC-001: Monorepo Architecture & Package Management
- **Date**: 2026-10-24
- **Status**: Accepted
- **Context**: The project requires tight synchronization between frontend types, backend validation schemas, and simulation logic.
- **Decision**: Use npm workspaces (`packages/*`, `apps/*`) with unified build, test, and lint scripts at the root level.
- **Consequences**: Fast local developer experience, type sharing via `@vlab/shared` without private registry overhead, and clear boundary enforcement.

## DEC-002: Shared Contract & Zod Validation Coupling
- **Date**: 2026-10-24
- **Status**: Accepted
- **Context**: The master specification defines exact names (`ComponentCategory`, `Component`, `BuildState`, `ValidationResult`, `BootResult`, `BuildEvent`, `/api/v1`).
- **Decision**: In `packages/shared`, define both TypeScript interfaces and paired Zod validation schemas (`ComponentSchema`, `BuildEventSchema`, `RegisterInputSchema`, etc.).
- **Consequences**: Zero discrepancy between runtime request parsing and compile-time TypeScript types across both frontend and backend.

## DEC-003: Database Engine Parity (SQLite for Dev, PostgreSQL for Docker)
- **Date**: 2026-10-24
- **Status**: Accepted
- **Context**: The requirements specify "PostgreSQL (SQLite for local dev) with Prisma".
- **Decision**: Configured Prisma with `provider = "sqlite"` and `DATABASE_URL="file:./dev.db"` for frictionless zero-dependency local runs. Model enums (`role`, `mode`, `status`) are modeled as `String` with Zod enforcement at the application layer to maintain 100% schema syntax compatibility with both SQLite and PostgreSQL.
- **Consequences**: Students and examiners can run the app immediately with `npm run dev` without needing a local PostgreSQL daemon running. Docker Compose provides a containerized PostgreSQL 16 service for containerized environments.

## DEC-004: Centralized Error Envelope
- **Date**: 2026-10-24
- **Status**: Accepted
- **Context**: Specifications demand error responses formatted as `{ error: { code, message } }`.
- **Decision**: Implemented custom `AppError` hierarchy (`NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ConflictError`, `ValidationError`) in Express with a catch-all middleware. Zod validation errors are mapped to `code: 'VALIDATION_ERROR'` with detailed field breakdown.
- **Consequences**: Predictable error handling on client-side and clean API contracts.

## DEC-005: Event Ingestion Batching & Optional Authentication
- **Date**: 2026-10-24
- **Status**: Accepted
- **Context**: Workbench operations generate high-frequency micro-events (drags, drops, clicks).
- **Decision**: `POST /api/v1/events` accepts both a single `BuildEvent` and an array of `BuildEvent` objects. Uses `optionalAuth` middleware: if a student is signed in, their `userId` is captured; if anonymous or guest, events are still logged for research telemetry.
- **Consequences**: Minimizes network round-trips from the frontend canvas while preserving comprehensive audit trails.
