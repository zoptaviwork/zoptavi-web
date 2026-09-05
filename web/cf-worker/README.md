# Zoptavi admin API (Cloudflare Worker + D1 + R2)

Free-tier only: one Worker, one D1 database (`zoptavi-admin`, id
`26eb88bd-7867-4fa0-95f9-ab9df2062655`), one R2 bucket (`zoptavi-media`, for
admin-uploaded images). No KV, no paid add-ons.

## Redeploy (do this now — picks up: careers open-roles CRUD, Our Services
## page photo, Zoptavi Bill page content, user-ID + password login, and the
## security hardening below)

From this `cf-worker` folder:

```
npx wrangler deploy
```

**Then set one new secret** (the login now needs a username, not just a
password — pick any admin ID you like, e.g. `zoptavi-admin` or your name):

```
wrangler secret put ADMIN_USERNAME
```

Your existing `ADMIN_PASSWORD` and `ADMIN_SECRET` secrets stay as they are —
you don't need to redo those. Wrangler will print the same Worker URL as
before.

## First-time deploy (if you're setting this up fresh)

```
npm install -g wrangler
wrangler login
wrangler secret put ADMIN_USERNAME
wrangler secret put ADMIN_PASSWORD
wrangler secret put ADMIN_SECRET
wrangler deploy
```

Then set `WORKER_URL` in `web/src/lib/adminApi.ts` to the printed URL.

## What it does

**Public (read-only, used by the live site):**
- `GET /api/services` — services & pricing
- `GET /api/content?page=X` — editable hero text for that page
- `GET /api/faqs` — FAQ list
- `GET /api/portfolio` — client showcase list
- `GET /api/nav` — nav menu links
- `GET /api/careers-roles` — careers open-roles list
- `GET /api/media/:key` — serves an uploaded image
- `POST /api/track` — records a pageview or CTA click
- `POST /api/login` — `{ username, password }` → `{ token }`

Every read route has a fallback: if the Worker is down or not yet deployed,
the site falls back to what's already bundled in the code, so a Worker
outage never breaks the public site — it just means edits made in `/admin`
won't show up until the Worker is back.

**Protected (`/admin` page only, needs a valid login token):**
- `PUT /api/admin/services`, `/content`, `/faqs`, `/portfolio`, `/nav`, `/careers-roles`
- `POST /api/admin/upload` — stores an image in R2, returns a key
- `GET /api/admin/analytics`

## Security notes (last audited: this deploy)

- **SQL injection:** every database query in `worker.js` uses D1's
  parameterized `.bind()` — no request data is ever concatenated into SQL
  text, so classic SQL injection isn't possible through this API.
- **Login:** now requires a **user ID and password**, both compared with a
  constant-time check (`timingSafeEqual`) so a wrong guess can't be
  fingerprinted by response timing.
- **Brute-force protection:** failed logins are logged per IP in a
  `login_attempts` table; after 8 failures in 15 minutes from the same IP,
  further attempts are rejected with a 429 until the window clears. Old
  attempt rows are pruned automatically so the table can't grow unbounded.
  You should still pick a password that isn't easily guessed — the
  `login_attempts` table can be queried via `wrangler d1 execute` if you
  ever want to check for signs of a sustained attack.
- **Auth tokens:** HMAC-signed (`ADMIN_SECRET`), expire after 12 hours,
  never stored server-side (stateless) — a leaked token still self-expires.
- **Image uploads:** content type is checked against an image allow-list
  (jpg/png/webp/gif/svg) and capped at 5MB before being written to R2, so
  the upload endpoint can't be used to host arbitrary files.
- **CORS:** API responses allow any origin (`*`) for the public GET routes,
  which is required since the marketing site calls this Worker
  cross-origin. This is safe because every write to `/api/admin/*` still
  requires the bearer token — origin alone grants no access, so this isn't
  a CSRF exposure (no cookies are used for auth).

If you ever want to go further: consider IP-allowlisting the `/admin` route
at the Vercel edge, and rotating `ADMIN_SECRET`/`ADMIN_PASSWORD` periodically.

## Cost

Workers free tier: 100,000 requests/day. D1 free tier: 5GB storage, ~5M rows
read/day. R2 free tier: 10GB storage, 1M reads + 1M writes/month. A small
business site will use a tiny fraction of any of these.
