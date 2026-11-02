# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Platform

**StudioSpace** is a full-stack peer-to-peer marketplace built for filmmakers, photographers, podcasters, musicians, and creative directors to discover, inspect, and reserve verified production studios by the hour—while enabling studio owners (hosts) to list, manage, and monetize their creative spaces.

---

## 1. Project Overview (For Clients, Hosts & Creators)

### For Studio Renters / Creators (Users)

- **Discover Verified Spaces:** Browse curated photography cyclorama lofts, NC-20 soundproof cinema stages, turnkey 4K video podcast lounges, Dolby Atmos music suites, and industrial art workshops.
- **Filter by Category:** Instantly filter workspaces across **Photo Studios**, **Sound Stages**, **Podcast Rooms**, **Music Suites**, and **Art Workshops**.
- **Inspect Technical Specs:** View high-resolution multi-angle studio galleries, square footage, crew capacity, power & acoustic specs, included equipment packages, verified host credentials, and crew reviews.
- **Instant Hourly Booking:** Select shoot date, call time, session duration, and crew headcount with transparent pricing (`Hourly Rate × Hours + Refundable Security Deposit`) and manage reservations from **My Bookings** (`/my-bookings`).

### For Studio Owners / Hosts (Clients)

- **List Your Space (`/add-studio`):** Publish production studios with custom hourly rates, refundable security deposits, crew capacity, location, image gallery URL, preset/custom equipment amenity tags, and detailed technical overviews.
- **Manage Listings (`/my-listings` & `/edit-studio/[id]`):** View all spaces published under your verified host email and update pricing, equipment packages, or specifications in real time.
- **Host Guarantee Protection:** Every studio listing highlights $2M commercial production liability coverage and verified equipment protection.

---

## 2. Key Features

- **Interactive Home Page (`/`):**
  - **Hero Carousel Slider:** 4-slide interactive studio showcase with autoplay, pagination tabs, and quick spec badges.
  - **Dynamic Featured Studios:** Fetches the top 6 studio spaces dynamically from MongoDB using `.limit(6)` wrapped in React `<Suspense>` with skeleton loading states.
  - **Browse by Studio Categories:** 5 interactive category cards linking directly to `/studios?category=<Category>`.
  - **How Booking Works & Host Guarantee Sections:** 4-step creator workflow and platform protection highlights.
- **Authentication & Security (`/login`, `/signup`):**
  - Powered by **Better Auth** (`better-auth`) with MongoDB adapter and **JWT (`jose`)** verification.
  - Email & Password registration with real-time password validation (**at least 1 uppercase letter, 1 lowercase letter, and minimum 6 characters**) + live profile photo preview.
  - One-click **Google Social Login (OAuth)** redirecting authenticated users to the platform.
  - Route protection via Next.js proxy (`src/proxy.ts`) and server-side session verification.
- **Studio Catalog & Details (`/studios`, `/studios/[id]`):**
  - Category filter pills, equal-height responsive studio cards, and smart Unsplash URL normalization (`StudioImage` + `/api/unsplash`).
  - Full technical sheet, multi-slide gallery carousel with thumbnail strip, amenity checklist, host profile card, and creator reviews.
  - Native `<dialog>` **Booking Modal** that saves reservations to the MongoDB `bookings` collection with initial status `"Pending"`.
- **Host Studio Management (`/add-studio`, `/my-listings`, `/edit-studio/[id]`):**
  - Private routes allowing authenticated hosts to create and edit studio listings in the MongoDB `studios` collection using JWT Bearer token authentication against the Express backend.
- **Booking System & My Bookings (`/my-bookings`):**
  - Private route displaying user reservations with KPI summary cards, status filter tabs, card grid, and responsive schedule ledger table.
  - Supports status badges for **`Pending`**, **`Confirmed`**, **`Completed`**, and **`Cancelled`**, with a **"Cancel Booking"** confirmation modal for pending slots.

---

## 3. Tech Stack

### Frontend (`studiospace-client`)

- **Framework:** Next.js 16 (App Router) with React 19 & TypeScript
- **Styling & Typography:** Tailwind CSS v4, `Montserrat` Google Font (`next/font/google`), `@base-ui/react`, `shadcn`, `lucide-react`
- **Carousel & UI Primitives:** `embla-carousel-react`, native HTML `<dialog>` modals, React `<Suspense>` & Skeleton loaders
- **Authentication:** `better-auth` (Email/Password, Google OAuth, `jwt()` plugin, `@better-auth/mongo-adapter`)

### Backend (`studiospace-server`)

- **Runtime & Framework:** Node.js & Express.js (`v5`)
- **Database:** MongoDB (`mongodb` official driver — database: `studiospace`, collections: `studios`, `bookings`, `user`, `session`, `account`, `jwks`)
- **Security:** `jose` (`createRemoteJWKSet` & `jwtVerify`) for verifying Better Auth JWT tokens on protected routes

---

## 4. Project Directory Structure

```text
Assignment8/
├── studiospace-client/                 # Next.js 16 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── add-studio/page.tsx     # Private Route: Add New Studio
│   │   │   ├── edit-studio/[id]/       # Private Route: Edit Existing Studio
│   │   │   ├── my-listings/            # Private Route: Host's Studio Listings
│   │   │   ├── my-bookings/            # Private Route: User's Studio Bookings
│   │   │   ├── studios/                # All Studios Catalog & Studio Details (/studios/[id])
│   │   │   ├── login/page.tsx          # User Login Page (Email + Google OAuth)
│   │   │   ├── signup/page.tsx         # User Registration Page with Password Validation
│   │   │   ├── api/                    # Better Auth Catch-all & Unsplash Image Resolver
│   │   │   ├── layout.tsx              # Root Layout (Navbar + Main + Footer + Montserrat Font)
│   │   │   ├── page.tsx                # Home Page
│   │   │   └── globals.css             # Tailwind v4 Theme & Custom Styles
│   │   ├── components/
│   │   │   ├── layout/                 # Sticky Navbar & Footer
│   │   │   ├── home/                   # HeroSlider, FeaturedStudios, StudioCategories, etc.
│   │   │   ├── studios/                # AddStudioForm, EditStudioForm, StudioDetailsClient, Skeletons
│   │   │   ├── bookings/               # MyBookingsClient & Status Badges
│   │   │   └── ui/                     # Reusable UI Components (Button, Card, Badge, StudioImage, etc.)
│   │   ├── db/index.ts                 # Shared MongoDB Client Connection
│   │   ├── lib/
│   │   │   ├── auth.ts                 # Better Auth Server Configuration
│   │   │   ├── auth-client.ts          # Better Auth Client Hooks
│   │   │   ├── studios.ts              # Studio Queries (getFeaturedStudios, getAllStudios, getStudioById)
│   │   │   └── utils.ts                # Class Merger & Unsplash Image URL Normalizer
│   │   ├── types/studio.ts             # TypeScript Interfaces
│   │   └── proxy.ts                    # Private Route Guard Matcher
│   └── package.json
│
└── studiospace-server/                 # Express.js Backend API Server
    ├── index.js                        # REST API Endpoints & JWT Verification Middleware
    ├── .env                            # Server Environment Variables
    └── package.json
```

---

## 5. Backend API Endpoints (`studiospace-server`)

| Method  | Endpoint           | Auth           | Description                                                              |
| :------ | :----------------- | :------------- | :----------------------------------------------------------------------- |
| `GET`   | `/`                | Public         | Health check endpoint (`{ message: "Server is running fine!" }`)         |
| `GET`   | `/studios`         | Public         | Fetch all studio listings from the `studios` collection                  |
| `GET`   | `/studios/:id`     | Public         | Fetch a single studio document by its MongoDB `_id`                      |
| `POST`  | `/add-studio`      | **JWT Bearer** | Create a new studio listing in the `studios` collection                  |
| `PUT`   | `/edit-studio/:id` | **JWT Bearer** | Update an existing studio listing by `_id`                               |
| `POST`  | `/bookings`        | Public/User    | Save a new studio reservation in `bookings` with status `"Pending"`      |
| `GET`   | `/bookings?email=` | Public/User    | Fetch reservations filtered by `userEmail`                               |
| `PATCH` | `/bookings/:id`    | Public/User    | Update booking status (e.g., cancel a `"Pending"` slot to `"Cancelled"`) |

---

## 6. Local Setup & Installation Guide

### Prerequisites

- **Node.js** `v20+`
- **MongoDB Atlas** URI (or local MongoDB instance)
- **Google OAuth Credentials** (Client ID & Client Secret for social login)

### Step 1: Configure & Run Backend (`studiospace-server`)

1. Open a terminal and navigate to the server directory:
   ```bash
   cd studiospace-server
   npm install
   ```
2. Create a `.env` file inside `studiospace-server/`:
   ```env
   PORT=8000
   MONGODB_URL="your_mongodb_connection_string"
   CLIENT_URL="http://localhost:3000"
   ```
3. Start the Express backend server:
   ```bash
   npm run dev
   ```
   The API server will run at [http://localhost:8000](http://localhost:8000).

### Step 2: Configure & Run Frontend (`studiospace-client`)

1. Open a second terminal and navigate to the client directory:
   ```bash
   cd studiospace-client
   npm install
   ```
2. Create a `.env` file inside `studiospace-client/`:
   ```env
   MONGODB_URL="your_mongodb_connection_string"
   BETTER_AUTH_SECRET="your_random_secret_key"
   BETTER_AUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 7. Useful Scripts (`studiospace-client`)

- `npm run dev` — Start the Next.js development server with Turbopack
- `npm run build` — Build the application for production
- `npm run start` — Start the production Next.js server
- `npx tsc --noEmit` — Run TypeScript type checking
- `npm run lint` — Run ESLint checks
