# FlowPilot

**Run your business smarter with AI.**

FlowPilot is a business operations platform that brings projects, tasks, customers, team and performance data into one calm, practical workspace — with a built-in assistant that helps you spot what needs attention. This repository contains a complete, production-quality **frontend implementation**: a marketing website and a fully interactive dashboard application, built to run entirely in the browser with no backend required.

> This is a frontend demo product. All business data (projects, customers, team members, revenue, etc.) is fictional sample data. The AI Assistant is a frontend simulation — see [AI Implementation](#ai-implementation) below.

---

## Overview

FlowPilot is built around one idea: software should help people see what matters without burying them in noise. The product has two halves:

1. A **marketing website** that explains the product the way a real SaaS company would — calm, specific, and human, not another generic "AI-powered" template.
2. A **dashboard application** where the actual work happens: projects, tasks, customers, team, calendar, analytics, reports, notifications and settings, plus an assistant that answers direct questions using the app's own data.

---

## Key Features

- Fully interactive business dashboard with 10 modules (Overview, Projects, Tasks, Customers, Team, Calendar, Analytics, Assistant, Reports, Notifications, Settings)
- Create projects, create tasks, change task status, and add customers — all through real forms with validation, persisted to `localStorage`
- Global search / command palette (`Ctrl+K` or `⌘K`) across projects, tasks, customers, team and reports
- Light and dark theme with a real, hierarchy-aware dark palette (not an inverted-colors hack), persisted across sessions
- Notification center with unread state, mark-as-read and mark-all-as-read
- Interactive analytics with 7-day / 30-day / 90-day / 12-month filters, built with Recharts
- Report generator across Revenue, Projects, Customers and Team Performance report types
- AI Assistant with suggested prompts and grounded, data-aware canned responses
- Month / week / day calendar views with clickable event details
- Responsive tables that convert to card layouts on mobile (Tasks, Customers)
- Loading skeletons, empty states, and toast notifications for success/error feedback throughout
- Fully responsive, accessible, keyboard-navigable UI across desktop, laptop, tablet and mobile

---

## Marketing Website

Public, SEO-friendly routes (each with its own `<title>` and meta description):

| Route | Description |
|---|---|
| `/` | Homepage — hero, dashboard preview, trust section, feature highlights, intelligent assistance, analytics, workflow, integrations, pricing, testimonials, FAQ, final CTA |
| `/features` | Full product feature breakdown |
| `/solutions` | Solutions by team type (agencies, operations teams, founders) |
| `/pricing` | Starter / Growth / Scale plans with monthly/yearly toggle |
| `/integrations` | Integration categories FlowPilot is designed to fit into |
| `/blog` | Editorial content grid with fictional posts |
| `/about` | Company story, values, and fictional team |
| `/contact` | Contact form (demo — does not send real messages) |
| `/login` | Demo login (any input signs you in) |
| `/signup` | Demo signup (any input creates a workspace) |

The marketing site uses a fully custom mobile navigation drawer (not a shrunk desktop nav) with proper focus handling, scroll locking, and an accessible close button.

---

## Dashboard

All dashboard routes live under `/dashboard` and share a collapsible sidebar (desktop) / drawer (mobile) and a top bar with global search, notifications, and an account menu.

| Route | Module |
|---|---|
| `/dashboard` | Overview — greeting, metrics, priorities, activity, upcoming events, team availability |
| `/dashboard/projects` | Projects — filterable cards, progress, team, priority, new project modal |
| `/dashboard/tasks` | Tasks — filterable table/cards, inline status change, new task modal |
| `/dashboard/customers` | Customers — searchable table/cards, account detail modal, add customer modal |
| `/dashboard/team` | Team — department filter, availability, workload |
| `/dashboard/calendar` | Calendar — month/week/day views, event detail modal |
| `/dashboard/analytics` | Analytics — revenue, customer growth, project/task completion, team performance |
| `/dashboard/assistant` | AI Assistant — see below |
| `/dashboard/reports` | Reports — Revenue / Projects / Customers / Team Performance report generator |
| `/dashboard/notifications` | Notifications — unread state, mark as read |
| `/dashboard/settings` | Settings — profile, preferences (theme/language/timezone), notification toggles, workspace |

---

## AI Assistant

The FlowPilot Assistant (`/dashboard/assistant`) is designed to feel like a business tool, not a chat novelty — no glowing orbs, no oversized branding. It offers a handful of suggested prompts ("What needs my attention today?", "Which projects are at risk?", etc.) and returns specific, data-flavored answers with follow-up action buttons (e.g. "View Tasks", "View Project").

**This is a frontend simulation.** Responses come from a local matching function (`src/data/assistant.ts`) written against the app's own sample data — there is no call to any AI model or external API. No API key is required or used. Connecting a real LLM (with a real API key stored server-side, never in the frontend) is listed under Future Improvements.

---

## Responsive Design

Every page — marketing and dashboard — was built mobile-first and checked across common breakpoints (360px, 375px, 390px, 414px, 430px, 768px, 820px, 1024px, 1280px, 1440px, 1920px). Notably:

- The mobile navigation (marketing site) and mobile sidebar drawer (dashboard) are dedicated components, not a shrunk desktop layout — full-height, scroll-locked, properly z-indexed, with accessible open/close controls.
- Tasks and Customers tables switch to card layouts below the `md` breakpoint instead of forcing horizontal scroll or hiding columns.
- Metric card grids reflow from 4 columns → 2 columns → 1 column as space narrows.
- Modals go full-width with safe margins on small screens and stay centered on larger ones.
- Typography uses `clamp()` for hero and section headings so text scales smoothly instead of jumping between fixed sizes.

---

## Dark Mode

Implemented as a real second theme, not an inverted filter. Light and dark each define their own values for background, surface, surface-muted, border, border-strong, and a full text hierarchy (ink / ink-muted / ink-faint), plus tuned brand, success, warning and danger colors for dark backgrounds. Theme preference is detected from the OS on first visit, can be toggled from the marketing navbar, the dashboard top bar, or Settings → Preferences, and is persisted to `localStorage`.

---

## Interactive Features

- **Projects** — create new projects via a modal form; filter by status; search by name/category
- **Tasks** — create new tasks; cycle or set status (To Do / In Progress / Completed) inline; filter by status
- **Customers** — add new customers; search and filter by status; view account detail modal
- **Calendar** — switch between month/week/day views; click any event for details
- **Analytics & Reports** — switch time ranges; generate a report with a simulated async delay and success toast
- **Assistant** — type a question or tap a suggested prompt; receive a response with a typing indicator and action buttons
- **Global search** — `Ctrl+K` / `⌘K` opens a command palette searching projects, tasks, customers, team and reports
- **Notifications** — mark individual or all notifications as read
- **Settings** — edit profile, toggle theme, change preferences and notification settings, all persisted

---

## Technology Stack

Taken directly from `package.json`:

- **React 19** + **TypeScript**
- **Vite** — build tooling and dev server
- **React Router v7** — client-side routing
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) — styling, using CSS custom properties for the design token system and theming
- **Recharts** — analytics and report charts
- **lucide-react** — icon set
- **clsx** — conditional class name composition

No backend framework, database, or server is used or required.

---

## Project Structure

```
src/
├── components/
│   ├── ui/            Reusable primitives: Button, Card, Badge, Modal, Dropdown,
│   │                   Input/Select/Textarea, Avatar, Tooltip, Toast (via context),
│   │                   Skeleton, MetricCard, Progress, Logo, ThemeToggle
│   ├── marketing/      Navbar, Footer, MarketingLayout, AuthLayout, DashboardPreview,
│   │                   PricingCard, FaqAccordion, PageHero
│   └── dashboard/      Sidebar, Topbar, DashboardLayout, CommandPalette, PageHeader,
│                       StatusBadge, ChartCard, RangeTabs, navigation.ts
├── context/            ThemeContext, ToastContext, AppDataContext (localStorage-backed state)
├── data/               Demo data: dashboard, projects, tasks, customers, team,
│                       notifications, assistant, calendar, analytics, reports, marketing
├── lib/                utils.ts (formatting helpers), storage.ts (localStorage helpers)
├── pages/
│   ├── marketing/      Home, Features, Solutions, Pricing, Integrations, Blog,
│   │                   About, Contact, Login, Signup
│   ├── dashboard/      Overview, Projects, Tasks, Customers, Team, Calendar,
│   │                   Analytics, Assistant, Reports, Notifications, Settings
│   └── NotFound.tsx
├── App.tsx             Route definitions and provider tree
├── main.tsx             Entry point
└── index.css            Design tokens (light/dark) and global styles
```

Demo data is fully separated from UI components, so a real API layer could replace `src/data/*.ts` and the `AppDataContext` persistence calls without touching page or component code.

---

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs the app locally, by default at **http://localhost:5173**.

## Production Build

```bash
npm run build
```

Type-checks the project (`tsc -b`) and produces an optimized build in `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Demo Data

All business data — projects, tasks, customers, team members, revenue figures, testimonials, blog posts, calendar events — is fictional and defined in `src/data/`. No real people, companies, emails or financial data are used anywhere in the project.

## Local Storage

The following state is persisted to `localStorage` so it survives a page refresh:

| Key | What it stores |
|---|---|
| `flowpilot.theme` | Light/dark theme preference |
| `flowpilot.tasks` | Task list, including status changes and newly created tasks |
| `flowpilot.projects` | Project list, including newly created projects |
| `flowpilot.customers` | Customer list, including newly added customers |
| `flowpilot.notifications` | Notification read/unread state |
| `flowpilot.settings` | Profile, preferences and notification settings |
| `flowpilot.sidebarCollapsed` | Dashboard sidebar collapsed/expanded state |

Clearing site data / localStorage resets the app back to its original seeded demo data.

## AI Implementation

**The AI Assistant is a frontend simulation.** It is not connected to OpenAI, Anthropic, or any other model provider — there is no API key in this project, and none should be added to frontend code. Responses are produced by a local, keyword-matching function against a small set of hand-written, data-aware answers (`src/data/assistant.ts`). This makes the demo fully functional offline and safe to publish publicly, while clearly representing what a real integration would feel like.

---

## Future Improvements

Realistic next steps to turn this into a production SaaS product:

- **Real authentication** — replace the demo login/signup with a real auth provider and session handling
- **Backend API** — replace `src/data/*.ts` and `AppDataContext` localStorage persistence with real API calls
- **Database** — persistent storage for projects, tasks, customers, team and settings per workspace
- **Real AI API** — connect the Assistant to a real LLM through a secure backend (never expose provider API keys in frontend code)
- **Real integrations** — actual OAuth connections for calendar, email, CRM, storage, messaging and payments
- **Payment processing** — real billing for the Starter/Growth/Scale plans
- **Real-time collaboration** — multi-user presence, live updates, and shared editing

---

## GitHub Setup

This project is ready to push to GitHub as-is:

- `.gitignore` excludes `node_modules`, `dist`, local env files, editor directories, and logs
- `.env.example` documents that no environment variables are currently required
- No API keys, secrets, or private information are present anywhere in the codebase
- All data is fictional/demo data

To publish:

```bash
git init
git add .
git commit -m "Initial commit: FlowPilot"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
