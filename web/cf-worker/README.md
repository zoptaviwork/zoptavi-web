# Zoptavi admin API (Cloudflare Worker + D1 + R2)

Free-tier only: one Worker, one D1 database (`zoptavi-admin`, id
`26eb88bd-7867-4fa0-95f9-ab9df2062655`), one R2 bucket (`zoptavi-media`, for
admin-uploaded images). No KV, no paid add-ons.

## Redeploy (you already did the first deploy — do this again to pick up the
## new admin panel: page content, FAQ, portfolio, navigation, image uploads)

From this `cf-worker` folder:

```
npx wrangler deploy
```

That's it — the D1 and R2 bindings are already in `wrangler.toml`, and your
`ADMIN_PASSWORD`/`ADMIN_SECRET` secrets are already set from the first
deploy, so you don't need to redo those steps. Wrangler will print the same
Worker URL as before.

## First-time deploy (if you're setting this up fresh)

```
npm install -g wrangler
wrangler login
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
- `GET /api/media/:key` — serves an uploaded image
- `POST /api/track` — records a pageview or CTA click

Every one of these has a fallback: if the Worker is down or not yet
deployed, the site falls back to what's already bundled in the code, so a
Worker outage never breaks the public site — it just means edits made in
`/admin` won't show up until the Worker is back.

**Protected (`/admin` page only, needs the password):**
- `POST /api/login`
- `PUT /api/admin/services`, `/content`, `/faqs`, `/portfolio`, `/nav`
- `POST /api/admin/upload` — stores an image in R2, returns a key
- `GET /api/admin/analytics`

## Cost

Workers free tier: 100,000 requests/day. D1 free tier: 5GB storage, ~5M rows
read/day. R2 free tier: 10GB storage, 1M reads + 1M writes/month. A small
business site will use a tiny fraction of any of these.
