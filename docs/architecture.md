# System Architecture & Technical Specifications
Virtual Laboratory for Computer Hardware Assembly

## 1. Monorepo Overview
- `apps/web`: React + Vite + Tailwind frontend application
- `apps/api`: Express + Node.js + TypeScript REST API
- `packages/shared`: Shared TypeScript types, Zod validation schemas, and calculation stubs
- `data/`: Canonical JSON datasets (Components, Compatibility Rules, Tutorial Steps, Quizzes, Faults)
- `docs/`: Technical manuals, design specifications, and architecture diagrams

## 2. Shared Contract
All modules strictly adhere to `@vlab/shared`:
- ComponentCategory: `'cpu'|'motherboard'|'ram'|'storage'|'psu'|'gpu'|'cooler'|'thermal_paste'|'cabinet'`
- Component: `{ id, category, name, brand, specs, description, whyItMatters }`
- BuildState: `{ placed, connections, flags: { thermalPasteApplied, ... }, stepLog }`
- ValidationResult: `{ ok, severity, ruleId, message, explanation }`
- BootResult: `{ status: 'success'|'failure', beepCode?, postLines, faults }`
- BuildEvent: `{ userId, sessionId, mode, stepId?, type, timestamp, payload }`
- API prefix: `/api/v1`
- Standard API Error format: `{ error: { code, message, details? } }`

## 3. Security & Authentication
- JWT bearer tokens issued upon registration and login
- Passwords hashed using bcrypt (10 rounds)
- Role-based access control with standard roles: `student` and `teacher`
- Role guard middleware (`requireRole('teacher')`) isolates instructor analytics and portals
