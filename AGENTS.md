<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# AGENTS.md — StudioSpace Client

This file provides context, product specifications, UI/UX design rules, and architectural conventions for AI coding agents working on `studiospace-client`.

## 1. Project Overview
- **Name:** `studiospace-client` (StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform)
- **Domain:** A high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners and hosts can list their creative spaces (photography cyc walls, cinema sound stages, podcast lounges, music recording suites, art workshops), while creators can discover, filter, inspect dynamic availability, and reserve studio slots with transparent pricing and real-time booking management.
- **Tech Stack:**
  - **Framework:** Next.js 16 (App Router) with React 19 & TypeScript
  - **Styling & UI:** Tailwind CSS v4, `@base-ui/react`, `shadcn`, `lucide-react`, `embla-carousel-react`
  - **Database & Auth:** MongoDB (`mongodb`) + Better Auth (`better-auth` with `@better-auth/mongo-adapter`)

## 2. Feature & Page Specifications

### 2.1 Layout Structure (`src/app/layout.tsx` & Layout Components)
- **Header / Navbar (Sticky with Active Route Indicators):**
  - **Brand Logo:** Clean `StudioSpace` logo with an aperture or studio spotlight icon on the left, matching the main heading style/size consistency.
  - **Navigation Links:**
    - `Home` (`/`)
    - `Explore Studios` (`/studios`)
    - `How It Works` (`/#how-it-works` or `/how-it-works`)
    - `About Us` (`/about` or `/#about`)
  - **Unauthenticated State:** Displays `Login` and `Register` action buttons.
  - **Authenticated State:** Displays user profile photo/avatar; on hover/click, displays user name and a dropdown menu containing:
    - `Dashboard`
    - `Add New Studio`
    - `My Studio Listings`
    - `My Bookings`
    - `Logout` button
- **Footer:**
  - Consistent branding featuring the `StudioSpace` logo, mission statement, and copyright & terms notice.
  - Quick navigation links, popular studio categories, and a newsletter subscription input.
  - Social links using the **new X logo** (never use the old Twitter bird icon).

### 2.2 Home Page (`src/app/page.tsx`)
1. **Banner / Hero Slider:**
   - Interactive slider with **at least 3 slides** (using `embla-carousel-react` / Swiper / slider component).
   - High-res studio visuals, punchy headline, subtext, and primary CTA buttons (`"Explore Studios"` / `"Host Your Space"`) linking to `/studios`.
2. **Featured Studios Section (Dynamic):**
   - Fetched dynamically from MongoDB using `.limit(6)` (6 top-rated or newest studio spaces).
   - Each card displays: studio image, category badge, title, hourly rate (`$XX / hr`), rating badge, location, and a `"View Details"` button.
3. **Browse by Studio Categories:**
   - Interactive category cards:
     - `Photo Studios`
     - `Sound Stages`
     - `Podcast Rooms`
     - `Music Suites`
     - `Art Workshops`
   - Clicking any category redirects to `/studios?category=<Category>` with that specific category pre-selected.
4. **Extra Home Section 1 — How Booking Works:**
   - 4-step workflow: `1. Discover Spaces` → `2. Select Shoot Hours` → `3. Book Instantly` → `4. Create & Produce`.
5. **Extra Home Section 2 — Host Guarantee & Creator Support:**
   - Platform assurances covering liability protection, verified profiles, equipment safety, and 24/7 host support.

## 3. UI Design & Responsiveness Requirements
- **Unique & Cohesive Visual Identity:** Editorial, studio-grade aesthetic tailored for creative professionals.
- **Typography & Heading Consistency:** Keep main section heading styles (font family, size scale, tracking, color) consistent across all sections and the Navbar logo. Keep paragraph line-height and spacing balanced for easy readability.
- **Uniform Grid, Card & Image Dimensions:**
  - Use CSS Grid layouts with equal card heights and widths (`h-full flex flex-col`) across studio listings, categories, and feature cards.
  - Maintain uniform image aspect ratios (e.g., `aspect-[16/10]` or `aspect-[4/3]` with `object-cover`) and consistent spacing.
- **Button Consistency:** Use the same button hierarchy, border-radius, and hover transitions across the Navbar, Hero, Cards, and Footer.
- **Brand Icons:** Always use the **new X logo** (SVG) instead of the legacy Twitter bird icon.
- **Full Responsiveness:** Mobile-first responsive layouts across mobile (`<640px`), tablet (`sm:` / `md:`), and desktop (`lg:` / `xl:`) viewports, including a responsive mobile navigation drawer/menu.

## 4. Directory Structure
```text
studiospace-client/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts   # Better Auth API catch-all handler
│   │   ├── layout.tsx             # Root layout (Navbar + Main + Footer)
│   │   ├── page.tsx               # Home page (Hero, Featured Studios, Categories, Workflow, Guarantee)
│   │   └── globals.css            # Tailwind v4 & theme CSS variables
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── home/                  # HeroSlider, FeaturedStudios, CategoryGrid, HowItWorks, HostGuarantee
│   │   └── ui/                    # Reusable UI primitives (Button, DropdownMenu, Card, Badge, etc.)
│   ├── lib/
│   │   ├── db.ts                  # Shared MongoClient & database helper
│   │   ├── auth.ts                # Better Auth server configuration (mongodbAdapter)
│   │   ├── auth-client.ts         # Better Auth client instance (createAuthClient)
│   │   └── utils.ts               # Helper utilities (cn)
│   └── types/                     # Shared TypeScript interfaces (Studio, Booking, Category)
├── public/                        # Static assets
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration (`@/*` -> `./src/*`)
└── package.json
```

## 5. Authentication & Database Conventions
- **Server Auth (`src/lib/auth.ts`):**
  - Uses `betterAuth` with `mongodbAdapter(db, { client })`.
  - Use `auth.api.getSession({ headers: await headers() })` inside Server Components, Server Actions, or Route Handlers.
- **Client Auth (`src/lib/auth-client.ts`):**
  - Exports `authClient` from `better-auth/react` (`authClient.useSession()`, `authClient.signIn`, `authClient.signUp`, `authClient.signOut`).
- **Server vs. Client Components:**
  - Read `node_modules/next/dist/docs/` for Next.js 16 conventions.
  - Default to React Server Components (RSC) for MongoDB data fetching (e.g., Featured Studios `.limit(6)`).
  - Add `"use client"` only to interactive components (Navbar dropdown/mobile menu, Hero carousel slider).

## 6. Common Commands
- **Install dependencies:** `npm install`
- **Run development server:** `npm run dev`
- **Build for production:** `npm run build`
- **Type check:** `npx tsc --noEmit`
- **Lint:** `npm run lint`