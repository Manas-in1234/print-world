# Print World — Deployment Guide

Complete instructions for deploying Print World to production on Vercel with Supabase.

## Prerequisites

- GitHub account
- [Vercel](https://vercel.com) account
- [Supabase](https://supabase.com) project
- (Optional) OpenAI API key for AI Studio
- (Optional) Razorpay credentials for live payments

---

## 1. GitHub

Push the repository to GitHub:

```bash
git add .
git commit -m "Prepare Print World for production deployment"
git push -u origin main
```

Ensure `.env.local` is **never** committed. Only `.env.example` (variable names, no secrets) should be in the repo.

---

## 2. Supabase Setup

### 2.1 Database schema

In **Supabase → SQL Editor**, run these scripts **in order**:

1. `supabase/FINAL_SETUP.sql` — idempotent schema, seed data, RLS policies
2. `supabase/fix_rls_recursion.sql` — fixes catalog infinite-recursion RLS (required)
3. `supabase/storage_setup.sql` — creates `uploads` (private) and `previews` (public) buckets

These scripts are safe to re-run. They do **not** drop customer orders or existing catalog data.

### 2.2 Authentication URLs

In **Authentication → URL Configuration**:

| Setting | Local | Production |
|---------|-------|------------|
| Site URL | `http://localhost:3000` | `https://your-app.vercel.app` |
| Redirect URLs | `http://localhost:3000/auth/callback` | `https://your-app.vercel.app/auth/callback` |

### 2.3 Storage buckets

After running `storage_setup.sql`, verify in **Storage**:

- `uploads` — private; original customer print files
- `previews` — public read; optimized AVIF previews

Original uploads are never replaced by previews.

### 2.4 Admin account

1. Sign up at `/signup` on your deployed or local site.
2. In Supabase SQL Editor:

```sql
UPDATE profiles SET is_admin = true WHERE email = 'your@email.com';
```

3. Visit `/admin` — only admin users can access the dashboard.

---

## 3. Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Fill in real values locally. In **Vercel → Project → Settings → Environment Variables**, add:

| Variable | Required | Server-only | Notes |
|----------|----------|-------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | No | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | **Yes** | Admin, uploads, order creation |
| `OPENAI_API_KEY` | No | **Yes** | Enables AI Studio |
| `RAZORPAY_KEY_ID` | No | No | Razorpay public key ID |
| `RAZORPAY_KEY_SECRET` | No | **Yes** | Never expose to browser |
| `NEXT_PUBLIC_SITE_URL` | No | No | Production URL for sitemap/SEO |

**Never** prefix secrets with `NEXT_PUBLIC_`. The following must stay server-side only:

- `OPENAI_API_KEY`
- `RAZORPAY_KEY_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 4. OpenAI (optional)

Add `OPENAI_API_KEY` in Vercel environment variables.

Without it:

- `/ai-studio` shows a clear configuration message
- `/api/ai/generate` returns HTTP 503
- No fake AI results are generated

---

## 5. Razorpay (optional)

Add both `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

Without them:

- Checkout shows **"Payment is not configured yet."**
- Orders are still created server-side with status Pending
- No simulated successful payments

With them:

- Razorpay checkout modal opens after order creation
- Payment verification happens server-side only

---

## 6. Vercel Deployment

1. Import the GitHub repository in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected).
3. Add all environment variables from section 3.
4. Deploy.

After first deploy, update Supabase auth redirect URLs to your Vercel domain.

---

## 7. Post-Deploy Verification

Test on desktop and mobile (320px–1440px):

- [ ] `/` — homepage, hero, featured products, hamburger nav
- [ ] `/products` — all six products from Supabase
- [ ] `/products/[slug]` — detail, customize, add to cart
- [ ] `/customize/[slug]` — editor (upload, text, shapes, save, cart)
- [ ] `/cart` — add/remove, quantity, persistence, no console errors
- [ ] `/login`, `/signup` — auth persists after refresh
- [ ] `/account`, `/account/designs` — saved designs CRUD
- [ ] `/checkout` — order summary, shipping, Razorpay or config message
- [ ] `/orders`, `/orders/[id]` — own orders only
- [ ] `/ai-studio` — AI features or configuration message
- [ ] `/admin` — admin-only, CRUD for products/categories/shapes/coupons

---

## 8. Mobile Testing

Open your Vercel URL on a phone browser. Verify:

- Hamburger menu opens and closes
- No horizontal scrolling at 320px, 375px, 390px, 430px
- Customization editor: preview above controls on mobile
- Checkout form fields are touch-friendly (min 44px tap targets)

---

## 9. Local Development

```bash
npm install
npm run dev
```

Before deploying:

```bash
npm run lint
npm run build
```

---

## 10. Troubleshooting

| Issue | Fix |
|-------|-----|
| Products page empty / RLS error | Run `supabase/fix_rls_recursion.sql` |
| Upload fails | Run `supabase/storage_setup.sql`; set `SUPABASE_SERVICE_ROLE_KEY` |
| Admin 403 | Set `is_admin = true` on your profile |
| AI not working | Add `OPENAI_API_KEY` server-side |
| Payment not working | Add Razorpay keys; message is expected without them |
| Catalog shows error | Check Supabase URL and publishable key in Vercel env |

---

## SEO

Production site title: **Print World — Premium Custom Printing & AI Design**

Verify: `/sitemap.xml`, `/robots.txt`, OpenGraph tags, favicon.
