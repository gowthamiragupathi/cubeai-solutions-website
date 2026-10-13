# CUBE AI SOLUTION — ENTERPRISE WEBSITE & CMS

A production-grade, cinematic enterprise web application and headless CMS engineered for **Cube AI Solution**. Built with an industrial technology aesthetic featuring near-black surfaces, electric lime neon accents, interactive 3D particle canvas, fluid Framer Motion animations, comprehensive enterprise services, business solutions, case studies, and a complete FastAPI + PostgreSQL admin CMS.

---

## 🏗 Architecture Overview

The workspace follows a strict, clean two-tier architecture:

```
f:/cube website/
├── frontend/                     # React 19 + Vite + Tailwind CSS + Framer Motion
│   ├── src/
│   │   ├── admin/                # Protected CMS Portal (Dashboard, Services, Projects, Insights, Settings, Enquiries)
│   │   ├── api/                  # Axios Client, Auth Interceptors & TanStack Query Endpoints
│   │   ├── components/           # Navbar, Footer, Hero, 3D Canvas, Stats, Services, Modals, Timeline
│   │   ├── context/              # JWT AuthContext Provider
│   │   ├── pages/                # Home, About, Services, Projects, Insights, Contact
│   │   ├── utils/                # cn Class Merger
│   │   ├── App.jsx               # Route definitions & Query Client Provider
│   │   ├── index.css             # Design tokens, glowing gradients & glassmorphism
│   │   └── main.jsx              # React DOM mounting
│   ├── index.html                # SEO metadata & Google Fonts
│   ├── package.json
│   ├── tailwind.config.js        # Lime neon theme tokens & surface colors
│   └── vite.config.js
│
├── backend/                      # Python FastAPI + SQLAlchemy 2 + PostgreSQL / SQLite + Alembic
│   ├── app/
│   │   ├── models/               # User, SiteSetting, Service, Project, Insight, Enquiry
│   │   ├── routers/              # Auth, Settings, Services, Projects, Insights, Enquiries, Media, Stats
│   │   ├── schemas/              # Pydantic v2 schemas
│   │   ├── utils/                # Argon2/JWT security & seed data generator
│   │   ├── config.py             # App settings & environment loader
│   │   ├── database.py           # Engine & Session factory (PostgreSQL with SQLite fallback)
│   │   └── main.py               # FastAPI entrypoint, CORS, static uploads mount
│   ├── alembic/                  # Alembic database migrations
│   ├── init_db.py                # Standalone DB initialization & seeding script
│   ├── requirements.txt
│   ├── alembic.ini
│   └── .env
│
├── .env.example                  # Environment template
└── README.md                     # Documentation & Runbook
```

---

## ⚡ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons, React Router 7, Axios, TanStack Query, React Hook Form, Zod, Canvas Confetti |
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy 2, Pydantic v2, PostgreSQL / SQLite fallback, Alembic, Passlib (Argon2 / BCrypt), Python-Jose (JWT) |
| **Styling** | Cyber-industrial dark aesthetic (`#05070c`), Electric Lime (`#a3e635`, `#bef264`), Glassmorphism, Micro-animations |

---

## 🚀 Quick Start Guide (Windows Powershell)

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24.19.0)
- **Python**: v3.10+
- **PostgreSQL**: Optional (automatic fallback to SQLite `cube.db` is built-in for zero-friction local development)

---

### 2. Backend Setup & Run

Open a PowerShell terminal:

```powershell
cd "f:\cube website\backend"

# (Optional) Create and activate virtual environment:
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies:
pip install -r requirements.txt

# Initialize database schema & seed sample enterprise content:
python init_db.py

# Launch FastAPI backend server on port 8001:
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

Backend will be available at:
- **API Base**: `http://127.0.0.1:8001/api`
- **Swagger Documentation**: `http://127.0.0.1:8001/docs`
- **Health Check**: `http://127.0.0.1:8001/api/health`

---

### 3. Frontend Setup & Run

Open a second PowerShell terminal:

```powershell
cd "f:\cube website\frontend"

# Install frontend dependencies:
npm install --legacy-peer-deps

# Launch Vite development server:
npm run dev
```

Frontend will be available at:
- **Public Website**: `http://127.0.0.1:5173/` (or `http://127.0.0.1:5174/` if 5173 is occupied)
- **Admin CMS Portal**: `http://127.0.0.1:5173/admin`
- **Admin CMS Login**: `http://127.0.0.1:5173/admin/login`

---

## 🔑 Default Admin CMS Credentials

The backend seeds a verified administrator account upon startup:

- **Email**: `admin@cubeai.com`
- **Password**: `Admin@Cube2026!`
- **Role**: `admin`

*(Credentials are configurable via environment variables in `backend/.env`)*

---

## 📋 Comprehensive Feature Checklist

### 1. Public Website & Cinematic Presentation
- [x] **Cinematic Hero**: Full-width industrial canvas with interactive 3D isometric rotating cube, neural particle graph, headline *"Engineering Intelligence. Building What's Next."*, floating real-time telemetry badge, and animated scroll indicator.
- [x] **Impact Statistics**: 4 large animated cards displaying configurable database metrics (*150+ Solutions Delivered*, *40+ Technologies Mastered*, *18+ Industries Served*, *320+ Projects Completed*).
- [x] **About Narrative**: Editorial layout with high-contrast imagery, mission statement, and core engineering principles (*Deterministic Precision, Data Sovereignty, Velocity*).
- [x] **Enterprise Services Portfolio**: 7 interactive image-led cards with hover zoom, capability tags, and deep-dive modal viewer:
  1. *AI & Machine Learning*
  2. *Generative AI & Autonomous Agents*
  3. *Web Application Development*
  4. *Full-Stack Software Engineering*
  5. *Data Analytics & Business Intelligence*
  6. *Intelligent Automation*
  7. *Cloud & Digital Transformation*
- [x] **Business Solutions Showcase**: Industry tab switcher for *Supply Chain Optimization*, *Sovereign Healthcare RAG*, *Semiconductor Edge Vision*, and *FinTech Liquidity Swarms*.
- [x] **Featured Case Studies**: Filterable project cards with category pills (*Enterprise AI, Generative AI, Computer Vision, Autonomous Agents*), verified metrics (+34% Efficiency, $18.2M Savings), and comprehensive case study modal (Problem, Solution, Outcome).
- [x] **Hardened Tech Stack**: Balanced 4-quadrant grid detailing *AI & Neural Models*, *Cloud & Distributed Systems*, *Modern Motion UI*, and *Enterprise Security*.
- [x] **How We Work**: 6-phase animated methodology (*Discover → Strategize → Design → Develop → Test → Deploy & Improve*).
- [x] **Engineering Insights**: Research publication cards with reading times, author avatars, tags, and reading modal dialog.
- [x] **Project Enquiry Form**: Real-time Zod validation, budget selector, capability picker, celebratory confetti feedback, and direct API submission stored to PostgreSQL.
- [x] **Premium Footer**: Complete navigation, quick capability links, system health badge (*All Systems Operational*), legal links, and consultation CTA.

### 2. Admin CMS & Headless Backend
- [x] **JWT Authentication**: Argon2 / BCrypt password hashing with HTTP Bearer token validation and automatic session expiration handling.
- [x] **Admin Dashboard**: Live telemetry counters for services, projects, insights, and client leads.
- [x] **Enquiries Manager**: Review incoming client specifications, filter by status (*new, contacted, in_progress, archived*), add notes, and delete submissions.
- [x] **Site Customizer**: Edit homepage headlines, supporting text, CTA labels, statistics counters, and company contact details with one-click live publishing.
- [x] **Services CRUD**: Create, edit, toggle visibility, and delete services with custom feature and capability JSON arrays.
- [x] **Projects CRUD**: Manage portfolio case studies, quantitative outcomes, technologies tags, and featured badges.
- [x] **Insights CRUD**: Author, edit, draft, and publish engineering whitepapers and articles.
- [x] **Media Asset Manager**: Secure file upload endpoint with MIME type whitelisting and file size boundaries.

---

## 🧪 Testing & Verification

1. **Production Build**: Verified clean Vite production compilation (`dist/index.html`, `dist/assets/index.js`, `dist/assets/index.css`) with zero errors.
2. **Browser Subagent Test**:
   - Loaded homepage and verified all animated sections.
   - Clicked "AI & Machine Learning" card and verified the detailed modal dialog.
   - Clicked "Autonomous Supply Chain Optimization Engine" and verified case study metrics modal.
   - Submitted test enterprise lead for `Dr. Evelyn Reed` (`evelyn.reed@biotech-research.org`).
   - Verified animated success feedback.
   - Verified submission persistence in backend database via authenticated API query.
