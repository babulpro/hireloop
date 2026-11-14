# HireLoop — The Modern Job Hunting Portal

HireLoop is a full-featured, AI-native career marketplace that bridges the gap between job seekers and employers. It streamlines job discovery, application management, subscription billing, and company recruitment into a unified, responsive platform.

Built with **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Recharts**, HireLoop satisfies 100% of the visual fidelity from Figma and the detailed platform specifications from `Project_requirements.md`.

---

## 🌟 Architecture & Core Portals

### 1. Public Marketplace Pages
* **Homepage (`/`)**:
  * **Hero Section**: Dual CTAs ("Search Jobs" and "Post a Job"), dual search inputs (role/skills and location), live platform stats (*50K Active Jobs, 12K Companies, 2M Seekers, 97% Satisfaction Rate*), and trending search pills.
  * **Featured Jobs Grid**: Filterable by category (*All, Engineering, Design, Product*), rich cards with salary bands, remote tags, and bookmarks.
  * **Platform Features Grid**: Highlighting Smart Search, Salary Insights, Top Companies, and Saved Jobs.
  * **Pricing Section**: Monthly vs. Yearly pricing plans with 25% discount logic.
  * **Footer**: Multi-column links for Job Seekers, Employers, and Company info.

* **Browse Jobs (`/jobs`)**:
  * Real-time search with keyword input and location filters.
  * Faceted filter sidebar: Job Type (*Full-time, Contract, Freelance, Internship*), Workplace (*Remote, Hybrid, On-site*), and Experience level.
  * Card grid with title, company, location, type, salary range, dynamic bookmarking, and pagination.

* **Job Details (`/jobs/[id]`)**:
  * Full job description, responsibilities, requirements, and benefits.
  * Company info card with logo, location, and verified checkmark.
  * Salary range and job type badges.
  * Interactive application modal with resume attachment and confirmation.
  * Similar job suggestions at the bottom.

* **Browse Companies (`/companies` & `/companies/[id]`)**:
  * Grid of approved registered companies with industry filter tabs (*Cloud Tech, Fintech, HealthTech, Design, CleanTech, AI, SaaS*).
  * Company cards with logo, industry, location, employee count, and open positions count.
  * Dedicated profile page with company mission, culture gallery, and live openings.

* **Pricing (`/pricing`)**:
  * Dual-tabbed toggle: **For Job Seekers** vs. **For Recruiters**.
  * **Seeker Plans**: Free ($0/forever, 3 applies/mo, 10 saves), Pro ($19/mo, 30 applies/mo, unlimited saves), Premium ($39/mo, unlimited applies).
  * **Recruiter Plans**: Free ($0/forever, 3 active jobs), Growth ($49/mo, 10 active jobs), Enterprise ($149/mo, 50 active jobs).
  * Interactive FAQ accordion section covering cancellation, refunds, payment methods, and plan switching.

* **Checkout Sandbox (`/checkout`)**:
  * Stripe payment simulation with BDT / USD currency conversion.

* **1-Click Persona Entry (`/sign-in`)**:
  * Instant demo persona switcher: **Candidate**, **Recruiter**, and **Super Admin**.

---

### 2. Unified Responsive Dashboard Layout (`/dashboard/...`)
Consistent across all three roles with a **Sidebar at the Left**:
* HireLoop logo (`/logo.png`)
* User profile card with Name, Avatar, Email, and Role badge
* Quick role switcher pill for testing and evaluation
* Dynamic navigation links based on the active role
* Public marketplace links (Home, Browse Jobs, Companies, Pricing)
* End Session & Logout button (redirects to `/`)
* Responsive mobile top header with slide-out drawer navigation

---

### 3. Seeker Dashboard (`/dashboard/seeker/...`)
* **Seeker Home (`/dashboard/seeker`)**:
  * **Stats Row**: Saved Jobs, Applications Submitted, Interviews Scheduled, Offers Received.
  * **Two-Column Analytics**: Left: Candidate profile card with photo URL and Edit button; Right: **Recharts PieChart** displaying real-time application pipeline status distribution (*Applied, Under Review, Shortlisted, Rejected, Offered*).
  * **Recent Activity**: Notification-style list of application updates and job alerts.
* **Browse & Apply (`/dashboard/seeker/jobs`)**:
  * In-dashboard search and filtering with interactive Apply modal (tracks monthly quota e.g., 8 / 30 used) and instant toast notification.
* **Saved Jobs (`/dashboard/seeker/saved`)**:
  * Bookmarked opportunities in table format with Remove and Apply actions.
* **My Applications (`/dashboard/seeker/applications`)**:
  * Table with relative dates (*"2 days ago"*, *"5 days ago"*), status badges, and View Details links.
* **Subscription & Billing (`/dashboard/seeker/billing`)**:
  * Current plan ($19/mo Pro), application quota progress bar, embedded Stripe checkout modal, and invoice table.
* **Seeker Settings (`/dashboard/seeker/settings`)**:
  * Edit profile, upload PDF resume with live preview, manage skills tag editor, and bio.

---

### 4. Recruiter Dashboard (`/dashboard/recruiter/...`)
* **Recruiter Home (`/dashboard/recruiter`)**:
  * **Stats Row**: Total Job Posts, Total Applicants, Active Jobs, Jobs Closed.
  * **Two-Column Analytics**: Left: Company profile card with Edit button; Right: **Recharts BarChart** showing applicant count per job post over the last 30 days.
  * **Recent Applications**: Notification-style list of latest candidate submissions.
* **My Company (`/dashboard/recruiter/company`)**:
  * Company details, status badge (*Pending / Approved / Rejected*), and Register/Edit Company form. Submitting updates status to *Pending* awaiting Admin review.
* **Manage Jobs (`/dashboard/recruiter/jobs`)**:
  * Table of all job posts with plan usage indicator (*7 / 10 active jobs used*), actions (*Edit, View Applicants, Close/Reopen, Delete with confirmation*), and Post New Job button.
* **Post a Job (`/dashboard/recruiter/jobs/new`)**:
  * Comprehensive form: Job Info, Category, Type, Salary Range, Currency, Remote toggle, Deadline, Description, Requirements, Benefits, and active job limit validation.
* **View Applicants (`/dashboard/jobs/[jobId]/applicants`)**:
  * Candidate management table for a specific job: Name, Email, Date Applied, Resume link, and Status dropdown (*Applied → Under Review → Shortlisted → Rejected → Offered*). Changing status triggers toast feedback and simulated email dispatch.
* **Employer Billing (`/dashboard/recruiter/billing`)**:
  * Active job capacity tracker, Stripe upgrade flow to Enterprise (50 active jobs, $149/mo), and transaction history.
* **Recruiter Settings (`/dashboard/recruiter/settings`)**:
  * Profile settings and linked employer entity card.

---

### 5. Super Admin Console (`/dashboard/admin/...`)
* **Admin Home (`/dashboard/admin`)**:
  * **Stats Row**: Total Users (124,892), Total Recruiters (12,405), Total Companies (4,281), Total Jobs Posted (8,920), Platform Revenue ($245,800).
  * **Recharts Data Visualizations**:
    * **Bar Chart**: Active job posts per category (*Engineering, Design, Sales, Marketing, Operations*).
    * **Line Chart**: 30-day user growth registration trajectory.
  * **Recent Payments**: Notification-style list of latest Stripe subscription charges.
* **Manage Users (`/dashboard/admin/users`)**:
  * Search by email, filter by role (*Seeker / Recruiter*), and action buttons: *Make Recruiter* (with confirmation), *Make Seeker* (with confirmation), and *Suspend / Activate* toggle.
* **Manage Companies (`/dashboard/admin/companies`)**:
  * Registration approval table with conditional *Approve* (sets Approved status, making company publicly visible) and *Reject* (sets Rejected status) buttons.
* **Manage Jobs (`/dashboard/admin/jobs`)**:
  * Search, category and status filters, with *View* and *Remove* (with confirmation) actions.
* **Payment & Subscriptions (`/dashboard/admin/payments`)**:
  * 4 Summary Cards: *Total Revenue ($245,800)*, *Monthly Revenue ($42,100)*, *Active Seeker Subscriptions (3,840)*, *Active Recruiter Subscriptions (1,210)*.
  * Platform payments ledger with absolute and relative dates (*"May 10, 2026 · 4 days ago"*), TX ID, and receipt downloads.
* **Admin Settings (`/dashboard/admin/settings`)**:
  * Root administrator identity, notification webhooks, and security settings.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 16.4.6 (App Router, Turbopack, Partial Prerendering, Server Components)
* **Frontend Library:** React 19.3.0
* **Data Visualizations:** Recharts 3.10.1 (ResponsiveContainer, BarChart, LineChart, PieChart, Tooltips)
* **Styling:** Tailwind CSS v4.3.3
* **Typography:** Geist Sans & Geist Mono
* **Authentication / Session Hooks:** Better Auth (`@better-auth/mongo-adapter`, `lib/auth-client.ts`)
* **Icons:** Custom scalable inline SVG registry (`app/components/Icons.tsx`)

---

## 📁 Key Directories & Routes

```text
├── app/
│   ├── components/                 # Reusable UI, Navbar, Hero, Recharts, Icons
│   ├── data/
│   │   └── site.ts                 # Single source of truth: jobs, companies, plans, metrics
│   ├── checkout/                   # Stripe payment sandbox
│   ├── companies/                  # Browse companies directory
│   │   └── [id]/                   # Dedicated company profile page
│   ├── jobs/                       # Public job search
│   │   └── [id]/                   # Job details & application modal
│   ├── pricing/                    # Dual-tabbed pricing plans ($0/$19/$39 & $0/$49/$149)
│   ├── sign-in/                    # Persona demo switcher
│   ├── dashboard/                  # UNIFIED RESPONSIVE DASHBOARD (Left Sidebar)
│   │   ├── layout.tsx              # Left Sidebar, User Card, Dynamic Role Nav, Logout
│   │   ├── seeker/                 # Candidate Portal
│   │   │   ├── page.tsx            # Seeker Home (Recharts PieChart status distribution)
│   │   │   ├── jobs/               # In-dashboard Browse & Apply with modal
│   │   │   ├── saved/              # Bookmarked jobs table (Remove & Apply)
│   │   │   ├── applications/       # My Applications table (relative dates & badges)
│   │   │   ├── billing/            # Seeker subscription & Stripe modal
│   │   │   └── settings/           # Profile editor with PDF resume upload
│   │   ├── recruiter/              # Recruiter Dashboard
│   │   │   ├── page.tsx            # Recruiter Home (Recharts BarChart applicant volume)
│   │   │   ├── company/            # My Company & registration form (Pending status)
│   │   │   ├── jobs/               # Manage Jobs table (usage limit, actions)
│   │   │   │   └── new/            # Post a Job form
│   │   │   ├── billing/            # Employer plan & active job limit upgrades
│   │   │   └── settings/           # Personal settings & company link
│   │   ├── jobs/[jobId]/applicants # View Applicants review table & status workflow
│   │   └── admin/                  # Super Admin Console
│   │       ├── page.tsx            # Admin Home (Recharts Bar & Line charts, payments)
│   │       ├── users/              # Manage Users (role switch & suspend/activate)
│   │       ├── companies/          # Company approvals (Approve / Reject)
│   │       ├── jobs/               # Job moderation table
│   │       ├── payments/           # Subscriptions & revenue ledger (4 summary cards)
│   │       └── settings/           # Administrator credentials & notification webhooks
│   ├── api/auth/[...all]/          # Better Auth Next.js API handler
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
├── lib/
│   └── auth-client.ts              # Better Auth client export
├── public/                         # Extracted Figma assets (logos, avatars, culture images)
├── next.config.ts                  # Redirects (/seeker/*, /recruiter/*, /admin/* -> /dashboard/*)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18.18+ (Node.js 20+ recommended)
* npm, pnpm, or yarn

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Run ESLint checks (0 errors, 0 warnings)
npm run lint

# 3. Generate production build with static prerendering
npm run build

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.
