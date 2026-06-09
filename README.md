# Fortune DXB

Off-plan real estate platform for Dubai properties. Public-facing site (project listings, developer profiles, lead capture) plus an admin dashboard (manage projects, developers, leads, offers, testimonials).

The application code lives in [`FortuneDxb/`](FortuneDxb/).

## Tech Stack

- **Next.js 16** (App Router) with React 19 and React Compiler
- **MUI v7** (Material-UI) with Emotion
- **MySQL** via `mysql2/promise` — direct parameterized SQL, no ORM
- **Formik + Yup** for forms and validation
- **Leaflet / React Leaflet** for maps
- **Framer Motion** for animations
- **Nodemailer** (Gmail SMTP) for emails
- **Axios** for client-side HTTP

## Getting Started

```bash
cd FortuneDxb
npm install
npm run dev      # custom HTTP server (app.js), binds 0.0.0.0:3000, dev=false
```

For hot-reload development:

```bash
cd FortuneDxb
npx next dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Commands

```bash
npm run build    # next build
npm run lint     # eslint (flat config)
```

## Project Structure

- `app/(main)/` — public pages (home, projects, developers, about, contact)
- `app/(admin)/admin/` — admin dashboard (session auth)
- `app/api/` — REST API routes (CRUD)
- `lib/` — db pool, sessions, mailer, file uploads, theme
- `components/`, `hooks/`, `contexts/`, `data/`, `providers/`

## Environment Variables

Create `FortuneDxb/.env`:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
JWT_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
ERROR_NOTIFY_EMAIL=
NEXT_PUBLIC_BASE_URL=
```

## Database

MySQL with tables: `users`, `sessions`, `projects`, `developers`, `leads`, `offers`, `testimonials`, and related tables. No migrations framework — schema changes are manual SQL.
