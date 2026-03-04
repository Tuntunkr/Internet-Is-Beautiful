# Internet Is Beautiful

A production-ready curated web platform inspired by InternetIsBeautiful — featuring Web3 apps, tools, and resources with a modern premium UI.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express, MongoDB
- **Services:** Stripe (fast-track), Nodemailer (email)

## Features

- Home page with curated website cards grid, trending, smart tag filtering
- Individual website detail pages
- Multi-step submission form with email confirmation
- Newsletter subscription (daily/weekly)
- Archive by month
- Privacy & Terms pages
- User dashboard (bookmarks, submission tracking)
- Live queue counter
- Stripe fast-track submission
- Admin panel (approve/reject)
- Dark/Light mode
- Glassmorphism cards, smooth animations, skeleton loading

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

For local dev, MongoDB defaults to `mongodb://localhost:27017/internetisbeautiful`. Ensure MongoDB is running.

### 3. Run development

**Frontend only** (uses mock data when API unavailable):

```bash
npm run dev
```

**Full stack** (frontend + backend):

```bash
npm run dev:full
```

- Frontend: http://localhost:5173
- API: http://localhost:3001

### 4. Build for production

```bash
npm run build
npm run server
```

Serve the `dist` folder with your preferred static host and run the server separately (or deploy both).

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # Theme, Bookmark context
│   ├── data/           # Mock data
│   ├── hooks/          # Custom hooks
│   ├── lib/            # API client
│   ├── pages/          # Route pages
│   └── ...
├── server/
│   ├── config/         # DB config
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/           # Email, queue helpers
└── public/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/websites` | List websites (tag, category, trending) |
| GET | `/api/websites/:id` | Get single website |
| POST | `/api/websites/submit` | Submit new website |
| POST | `/api/newsletter/subscribe` | Subscribe newsletter |
| GET | `/api/queue/status` | Queue status (ahead, avgTime) |
| POST | `/api/stripe/create-checkout` | Create Stripe checkout for fast-track |
| GET | `/api/submissions/status/:token` | Track submission status |
| GET | `/api/admin/submissions` | Admin: list submissions |
| POST | `/api/admin/submissions/:id/approve` | Admin: approve |
| POST | `/api/admin/submissions/:id/reject` | Admin: reject |

## Admin Panel

Visit `/admin` and enter your `ADMIN_KEY` (default for dev: `dev-admin-key`).

## Analytics & SEO

- **Visitor count:** Footer shows total visits (stored in MongoDB). Requires `npm run server`.
- **Google Analytics:** Add `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to `.env` for GA4.
- **Sitemap:** `public/sitemap.xml` — regenerate with `VITE_SITE_URL=https://yoursite.com npm run sitemap`.
- **robots.txt:** `public/robots.txt` — update Sitemap URL if deploying elsewhere.
- **OG image:** `public/og-image.svg` (1200×630). For Facebook/LinkedIn, add `og-image.png` (PNG preferred).

## Newsletter Content

Every week subscribers receive:

- Newly launched Web3 apps & websites
- Hidden gems in Web3
- Useful tools for blockchain builders
- Hand-picked articles and beginner-friendly videos
- Grants and incentive programs
