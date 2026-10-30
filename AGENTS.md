<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# AGENTS.md — StudioSpace Client

This file provides context, architectural guidelines, and coding conventions for AI coding agents working on `studiospace-client`.

## 1. Project Overview
- **Name:** `studiospace-client`
- **Purpose:** Frontend / Full-stack web client for StudioSpace (booking, managing, and discovering studio spaces).
- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS & modern UI components (shadcn/ui conventions)
- **Authentication:** Better Auth (`better-auth`)

## 2. Directory Structure
```text
studiospace-client/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts   # Better Auth API catch-all handler
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home / landing page
│   │   └── globals.css            # Global styles and Tailwind directives
│   ├── components/                # Reusable UI & feature components
│   ├── lib/
│   │   ├── auth.ts                # Better Auth server configuration
│   │   ├── auth-client.ts         # Better Auth client instance (React hooks & methods)
│   │   └── utils.ts               # Helper utilities (e.g., cn)
│   └── types/                     # Shared TypeScript interfaces & types
├── public/                        # Static assets
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration (`@/*` -> `./src/*`)
└── package.json
```

## 3. Authentication Guidelines (Better Auth)
- **Server Auth (`src/lib/auth.ts`):**
  - Configures `betterAuth(...)` for server-side session validation and API routes.
  - Use `auth.api.getSession({ headers: await headers() })` inside Server Components, Server Actions, or Route Handlers.
- **Client Auth (`src/lib/auth-client.ts`):**
  - Exports `authClient` created via `createAuthClient` from `better-auth/react`.
  - Use `authClient.signIn`, `authClient.signOut`, `authClient.signUp`, and `authClient.useSession()` in Client Components (`"use client"`).
- **Route Handler (`src/app/api/auth/[...all]/route.ts`):**
  - Mounts Better Auth handlers (`toNextJsHandler(auth)`) for `GET` and `POST` requests.

## 4. Coding & Architecture Conventions
- **Server vs. Client Components:**
  - Default to **React Server Components (RSC)** inside `src/app/`.
  - Add `"use client"` at the top of a file **only** when using React state/lifecycle hooks (`useState`, `useEffect`), browser APIs, event listeners, or `authClient.useSession()`.
- **Path Aliases:**
  - Always use the `@/` path alias (mapped to `./src/*` in `tsconfig.json`) instead of deep relative paths (e.g., `import { authClient } from "@/lib/auth-client"`).
- **TypeScript Strictness:**
  - Avoid `any`. Define explicit interfaces or types for props, API responses, and form payloads.
- **Data Fetching & Forms:**
  - Prefer Server Components for initial data fetching.
  - Ensure loading states (`loading.tsx` or `<Suspense>`), error states, and empty states are handled gracefully.
- **Styling & Accessibility:**
  - Use responsive Tailwind CSS utility classes (mobile-first: `sm:`, `md:`, `lg:`).
  - Use semantic HTML elements (`<main>`, `<nav>`, `<section>`, `<button>`) and proper `aria-*` attributes.

## 5. Common Commands
- **Install dependencies:** `npm install` (or `pnpm install`)
- **Run development server:** `npm run dev`
- **Build for production:** `npm run build`
- **Type check:** `npx tsc --noEmit`
- **Lint:** `npm run lint`