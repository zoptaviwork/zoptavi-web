# Zoptavi admin API (Cloudflare Worker + D1)

Free-tier only: one Worker, one D1 database (`zoptavi-admin`, already created —
id `26eb88bd-7867-4fa0-95f9-ab9df2062655` — and seeded with your current
services/pricing). No KV, no R2, no paid add-ons.

## Deploy (one time)

From this `cf-worker` folder, on a machine with Cloudflare CLI access:

```
npm install -g wrangler        # if you don't already have it
wrangler login                 # opens a browser to authorize your Cloudflare account
wrangler secret put ADMIN_PASSWORD   # you'll be prompted — type the password you want for /admin
wrangler secret put ADMIN_SECRET     # type any long random string (used to sign login tokens)
wrangler deploy
```

Wrangler will print your Worker's URL, e.g.
`https://zoptavi-admin.<your-subdomain>.workers.dev`.

## Wire it into the site

Open `web/src/lib/adminApi.ts` and set `WORKER_URL` to that URL. Rebuild and
redeploy the site as usual. That's the only code change needed — the /admin
page and the site's live services data both point at that one constant.

## What it does

- `GET /api/services` — public, read-only. The Services/Home pages fetch this
  on load; if the Worker isn't deployed yet (or the request fails), they fall
  back to the bundled data in `business.ts`, so the site never breaks.
- `POST /api/track` — public. Fired once per pageview and on a few key CTA
  clicks (WhatsApp, Book Consultation, See Our Services).
- `POST /api/login` — checks the password against `ADMIN_PASSWORD`, returns a
  signed token (12h expiry). No cookies, no sessions table — the token is
  just checked with HMAC on every admin request.
- `PUT /api/admin/services` — protected, replaces the services/tiers/care
  plans in D1. This is what the /admin page's "Save" button calls.
- `GET /api/admin/analytics` — protected, aggregated pageview/click counts
  for the last 30 days plus a 7-day daily breakdown.

## Cost

Workers free tier: 100,000 requests/day. D1 free tier: 5GB storage, ~5M rows
read/day. A small business site will use a tiny fraction of either.
