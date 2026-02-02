# Copilot Instructions for AI Agents

## Project Overview
- This is a modern React (TypeScript) web application using Vite, Tailwind CSS, and Vitest for testing.
- The main entry point is `src/main.tsx`, which loads `App.tsx`.
- UI is component-driven, with most UI logic in `src/components/` and reusable primitives in `src/components/ui/`.
- Calculator logic is in `src/components/Calculator/`.
- Supabase integration is in `src/integrations/supabase/`.

## Key Patterns & Conventions
- **Component Structure:**
  - Use functional components and hooks (see `src/hooks/`).
  - UI primitives (buttons, dialogs, etc.) are in `src/components/ui/` and should be reused.
  - Major sections (e.g., About, FAQ, Calculator) are in `src/components/`.
- **Styling:**
  - Tailwind CSS is used for all styling. Avoid custom CSS unless necessary.
  - Global styles: `src/index.css`, `src/App.css`.
- **State & Data Flow:**
  - Local state via React hooks.
  - Cross-component communication via props or context (no Redux/mobx).
  - Supabase is used for backend data (see `src/integrations/supabase/`).
- **Testing:**
  - Vitest is used for unit tests (see `src/test/`).
  - Test files use `.test.ts` or `.test.tsx` suffix.
- **TypeScript:**
  - Strict typing enforced. Use types from `src/integrations/supabase/types.ts` for backend data.

## Developer Workflows
- **Build:** `npm run build` (uses Vite)
- **Dev Server:** `npm run dev`
- **Test:** `npm run test` (Vitest)
- **Lint:** `npm run lint`

## Integration Points
- **Supabase:**
  - Client config in `src/integrations/supabase/client.ts`.
  - Types in `src/integrations/supabase/types.ts`.
- **Public assets:** in `public/` (e.g., `robots.txt`).

## Project-Specific Notes
- Use the provided UI primitives for consistency.
- Follow the file/folder structure for new features.
- Refer to `tailwind.config.ts` for custom Tailwind settings.
- Use `vite.config.ts` for Vite-specific customizations.

## Examples
- To add a new modal, create it in `src/components/`, reuse primitives from `src/components/ui/`, and style with Tailwind.
- For new backend data, update types in `src/integrations/supabase/types.ts` and access via the Supabase client.

---
For questions, review the structure in `src/` and existing patterns in `src/components/` and `src/components/ui/`.
