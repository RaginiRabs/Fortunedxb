# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fortune DXB is an off-plan real estate platform for Dubai properties. It has a public-facing site (project listings, developer profiles, lead capture) and an admin dashboard (manage projects, developers, leads, offers, testimonials). The Next.js app lives entirely in `FortuneDxb/` (the repo root is `Fortunedxb_next/`).

## Commands

```bash
cd FortuneDxb
npm install          # install dependencies
npm run build        # next build
npm run dev          # starts custom HTTP server (app.js) — NOTE: dev=false hardcoded, not HMR
npm run lint         # eslint (flat config)
```

The custom server (`app.js`) binds to `0.0.0.0:3000` with `dev: false`. For actual hot-reload development, run `npx next dev` instead.

## Tech Stack

- **Next.js 16** (App Router) with React 19 and React Compiler
- **MUI v7** (Material-UI) with Emotion for styling
- **MySQL** via mysql2/promise — direct SQL queries, no ORM
- **Formik + Yup** for form handling and validation
- **Leaflet / React Leaflet** for maps
- **Framer Motion** for animations
- **Nodemailer** (Gmail SMTP) for emails
- **Axios** for client-side HTTP

## Architecture

### Routing

App Router with **route groups** to separate concerns:
- `app/(main)/` — public pages (home, projects, developers, about, contact, etc.)
- `app/(admin)/admin/` — admin dashboard (behind session auth)
- `app/api/` — API routes (REST endpoints for all CRUD operations)

Dynamic route: `/(main)/[city]/[developer]/[project]/page.jsx` for individual project pages.

### Path Alias

`@/*` maps to the `FortuneDxb/` root (`"@/*": ["./*"]` in `jsconfig.json`). Imports look like `@/lib/db`, `@/lib/theme`, `@/components/home/Hero`.

### Database Layer (`lib/db.js`)

MySQL connection pool as a global singleton (survives Next.js hot reloads). Exports `query(sql, params)` and `queryOne(sql, params)`. Pool auto-reconnects on transient errors; fatal errors (ECONNREFUSED, ACCESS_DENIED) call `process.exit(1)` for PM2 restart. Keep-alive ping every 3 minutes.

### Authentication (`lib/session.js`)

Database-backed sessions — not JWT for session management. Sessions stored in MySQL `sessions` table with an HTTP-only cookie (`admin_session`). Key functions: `createSession`, `verifySession`, `getCurrentUser`, `deleteSession`. The admin layout checks session validity on every load.

### API Pattern (`lib/apiHandler.js`)

API routes wrap handlers with `apiHandler(handler, { context })` which catches errors, logs them, and sends error notification emails (with 5-min dedup cooldown). Returns standardized `{ success, message }` JSON responses.

### State Management

No Redux/Zustand — uses React Context + custom hooks:
- `LeadCaptureContext` — manages lead popup state with **pending actions** (brochure download, WhatsApp, floor plan view, phone call are gated behind lead form submission)
- `ProjectFormContext` — multi-step project creation form state in admin

### Custom Hooks (`hooks/`)

Each domain has a hook: `useLeadHook`, `useProjectHook`, `useDeveloperHook`, `useUserHook`, `useTestimonialsHook`, `useFiltersHook`. The generic `useApi` hook handles loading/error state and response parsing. `useAdminTable` manages pagination, sorting, and filtering for admin tables.

### File Uploads (`lib/fileUpload.js`)

Files stored under `FortuneDxb/` (uploads dir). Validated by type with configs in `lib/constants.js` (FILE_CONFIG). Categories: Logo (2MB), Gallery (5MB), Floorplan (5MB, allows PDF), Brochure (5MB, PDF only).

### Email (`lib/mailer.js`)

Nodemailer with Gmail SMTP. Transporter cached globally. Used for error notifications, seller lead confirmations, and OTP flows. Templates in `lib/emails/`.

### Theme & Colors (`lib/theme.js`) — SINGLE SOURCE OF TRUTH

Custom MUI theme with a luxury aesthetic, exporting **both `lightTheme` and `darkTheme`**. Wrapped via `providers/ThemeProvider.jsx` (Emotion + MUI Next.js adapter); the active mode is toggled through `contexts/ThemeContext.jsx` / `useThemeToggle()` (a 🌙 toggle lives in the Navbar).

**All UI colors are centralized in `lib/theme.js`.** Components must NOT hardcode hex/rgba — use theme tokens so a single edit propagates everywhere and light/dark mode works automatically. Tokens defined at the top of `theme.js`:
- `GOLD` (brand gold `#D4AF37` + light/dark/pale) → `palette.primary` and `palette.gold`
- `NAVY` (`#0B1A2A` + light/dark) → `palette.navy` (dark structural section backgrounds)
- `SLATE` scale (50–900) → `palette.grey` (text, borders, surfaces)
- `palette.text.primary` **flips** navy (light) ↔ cream (dark); `text.secondary`, `text.disabled`
- `palette.background.default | paper | subtle | hover`
- `palette.success | error | warning | info` (semantic)
- `BRAND_COLORS` named export = fixed social/channel colors (whatsapp, facebook, linkedin, instagram) — intentionally NOT theme-driven

**How to use in components:**
- sx string shortcuts: `color: 'text.primary'`, `bgcolor: 'background.paper'`, `borderColor: 'divider'`, `'primary.main'`, `'gold.main'`, `'navy.main'`, `'grey.200'`, `'success.main'`, etc.
- lucide icon `color` props / gradients / `alpha()`: use `theme.palette.X` (via `useTheme()`); import `alpha` from `@mui/material/styles`.
- **Flipping vs fixed:** text/surfaces on a normal page use `text.primary` / `background.*` (flip with mode). Elements on a **gold button** keep navy text (`navy.main`), and elements over a **photo/hero/dark overlay** keep `common.white` — these are correct in both modes and must stay fixed.

**To re-skin the whole site:** change `GOLD` / `NAVY` / `SLATE` (or any `palette.*`) in `lib/theme.js` only.

## Environment Variables

Required in `FortuneDxb/.env`:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` — MySQL connection
- `JWT_SECRET` — token signing
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — email (Gmail)
- `ERROR_NOTIFY_EMAIL` — recipient for API error alerts
- `NEXT_PUBLIC_BASE_URL` — app URL for internal API calls

## Database

MySQL with tables: `users`, `sessions`, `projects`, `developers`, `leads`, `offers`, `testimonials`, and related tables. SQL backups are in the repo root (`*.sql` files). No migrations framework — schema changes are manual SQL.

## Key Conventions

- API routes return `{ success: true/false, data?, message? }` consistently
- Client-side API calls go through the Axios instance in `lib/axios.js` (has interceptors)
- Static data (amenities, highlights, location types, popular areas) lives in `data/` as JS exports
- Lead capture is a core flow: many user actions (download brochure, WhatsApp, view pricing) trigger the lead form first if no lead exists (tracked via localStorage)
- Admin routes are grouped under `(admin)` with a shared layout that includes sidebar navigation and session verification

## Rules

Project rules live in [.claude/rules/](.claude/rules/). Read and follow these before coding:

- [always-do.md](.claude/rules/always-do.md) — required practices (try/catch, db helper, logging, is_active checks)
- [never-do.md](.claude/rules/never-do.md) — hard prohibitions (SQL interpolation, ES modules in backend, Redux, Hindi/Hinglish in UI text)
- [code-style.md](.claude/rules/code-style.md) — backend/frontend conventions (CommonJS, camelCase, parameterized SQL, functional components, Tailwind)
- [git-rules.md](.claude/rules/git-rules.md) — commit and staging rules (conventional commits, pull before commit)
- [response-style.md](.claude/rules/response-style.md) — answer format (2–3 lines max, ask before writing code, no fluff)
