# GermanyStudyTracker (Next.js + Supabase)

GermanyStudyTracker is a production-ready web app for Indian students planning a master's in Germany. It includes secure authentication, a personalized progress dashboard, checklist tracking, notes, and private proof document uploads.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + reusable UI components (shadcn-style)
- Supabase Auth + PostgreSQL + Storage
- `@supabase/ssr` for server/client session handling
- Realtime updates for checklist progress

## Features

- Email/password sign up, login, logout
- Protected routes (`/dashboard`, `/profile`) via middleware
- Automatic `profiles` row creation on new signup (DB trigger)
- 24-step Germany journey checklist with status, notes, and file proofs
- Realtime checklist updates (Supabase realtime channel)
- Progress bar + quick stats + step search
- Download checklist data as CSV
- Complete guide pages for application, post-arrival, and life in Germany
- Resources and FAQ pages

## 1. Create Supabase project

1. Go to Supabase and create a new project.
2. From **Project Settings > API**, copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key
3. In **Authentication > Providers > Email**:
   - Enable Email/Password.
   - Optional: enable email confirmation.

## 2. Configure environment variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Fill real values:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 3. Create tables + RLS + storage

Open Supabase SQL Editor and run:

- `supabase/migrations/001_init.sql`

This creates:

- `profiles` table
- `user_checklist_items` table
- RLS policies for user-owned access only
- Trigger to auto-create profile on `auth.users` signup
- Private storage bucket `user-documents` with per-user policies

## 4. Install and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5. Deploy to Vercel

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Deploy.

## Route overview

- `/` - Home
- `/login`, `/signup` - Auth pages
- `/dashboard` - Protected progress checklist
- `/profile` - Protected profile editor
- `/guide/application` - Application steps
- `/guide/post-arrival` - Post-arrival legal/admin steps
- `/guide/life-in-germany` - Costs + work rules + tips
- `/resources` - Official links
- `/faq` - Common Q&A

## Project structure

```text
app/
  (auth)/login/page.tsx
  (auth)/signup/page.tsx
  auth/callback/route.ts
  dashboard/page.tsx
  profile/page.tsx
  guide/application/page.tsx
  guide/post-arrival/page.tsx
  guide/life-in-germany/page.tsx
  resources/page.tsx
  faq/page.tsx
  layout.tsx
  page.tsx
components/
  auth/
  dashboard/
  profile/
  ui/
lib/
  checklist-data.ts
  env.ts
  supabase/
supabase/migrations/001_init.sql
```

## Notes for beginners

- If signup succeeds but login fails, check whether email confirmation is enabled in Supabase.
- If dashboard is empty, confirm SQL migration ran successfully and RLS policies exist.
- If upload fails, verify bucket `user-documents` and storage policies were created.

