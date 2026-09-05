/**
 * Zoptavi admin API — Cloudflare Worker + D1 + R2.
 * Free-tier only: one Worker, one D1 database, one R2 bucket.
 *
 * Public routes:
 *   GET  /api/services            current services/pricing
 *   GET  /api/content?page=X      editable text for page X (hero headline etc.)
 *   GET  /api/faqs                FAQ list
 *   GET  /api/portfolio           portfolio/client showcase list
 *   GET  /api/nav                 nav menu links
 *   GET  /api/media/:key          serves an uploaded image
 *   POST /api/track               record a pageview or CTA click
 *   POST /api/login               { password } -> { token }
 *
 * Protected routes (Authorization: Bearer <token>):
 *   PUT  /api/admin/services
 *   PUT  /api/admin/content       { page, values: { key: value } }
 *   PUT  /api/admin/faqs          [{ question, answer }]
 *   PUT  /api/admin/portfolio     [{ key, name, url, category, tier, blurb, imageKey }]
 *   PUT  /api/admin/nav           [{ label, path }]
 *   POST /api/admin/upload        raw image body, header X-Filename -> { key }
 *   GET  /api/admin/analytics
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Filename",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function textEncode(str) {
  return new TextEncoder().encode(str);
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, textEncode(message));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function makeToken(secret, hours = 12) {
  const payload = JSON.stringify({ exp: Date.now() + hours * 3600 * 1000 });
  const b64 = btoa(payload).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const sig = await hmac(secret, b64);
  return `${b64}.${sig}`;
}

async function verifyToken(secret, token) {
  if (!token) return false;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;
  const expected = await hmac(secret, b64);
  if (expected !== sig) return false;
  try {
    const payload = JSON.parse(atob(b64.replace(/-/g, "+").replace(/_/g, "/")));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

async function requireAuth(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return verifyToken(env.ADMIN_SECRET, token);
}

async function getServices(db) {
  const [coreServices, websiteTiers, carePlans] = await Promise.all([
    db.prepare("SELECT key, name, what, revenue_type as revenueType, icon FROM core_services ORDER BY sort_order").all(),
    db.prepare("SELECT name, built_on as builtOn, gets, price FROM website_tiers ORDER BY sort_order").all(),
    db.prepare("SELECT name, includes, per_year as perYear FROM care_plans ORDER BY sort_order").all(),
  ]);
  return {
    coreServices: coreServices.results,
    websiteTiers: websiteTiers.results,
    carePlans: carePlans.results,
  };
}

function extFromType(type) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/svg+xml") return "svg";
  return "jpg";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // ================= PUBLIC READ ROUTES =================

      if (pathname === "/api/services" && request.method === "GET") {
        return json(await getServices(env.DB));
      }

      if (pathname === "/api/content" && request.method === "GET") {
        const page = url.searchParams.get("page") || "";
        const rows = await env.DB.prepare(
          "SELECT key, label, value, type FROM page_content WHERE page = ? ORDER BY sort_order"
        ).bind(page).all();
        const values = {};
        rows.results.forEach(r => { values[r.key] = r.value; });
        return json({ values, fields: rows.results });
      }

      if (pathname === "/api/faqs" && request.method === "GET") {
        const rows = await env.DB.prepare(
          "SELECT id, question, answer FROM faqs ORDER BY sort_order"
        ).all();
        return json(rows.results);
      }

      if (pathname === "/api/portfolio" && request.method === "GET") {
        const rows = await env.DB.prepare(
          "SELECT id, key, name, url, category, tier, blurb, image_key as imageKey FROM portfolio ORDER BY sort_order"
        ).all();
        return json(rows.results);
      }

      if (pathname === "/api/nav" && request.method === "GET") {
        const rows = await env.DB.prepare(
          "SELECT id, label, path FROM nav_links ORDER BY sort_order"
        ).all();
        return json(rows.results);
      }

      if (pathname === "/api/careers-roles" && request.method === "GET") {
        const rows = await env.DB.prepare(
          "SELECT id, title, type, place, blurb FROM careers_roles ORDER BY sort_order"
        ).all();
        return json(rows.results);
      }

      if (pathname.startsWith("/api/media/") && request.method === "GET") {
        const key = pathname.replace("/api/media/", "");
        const obj = await env.MEDIA.get(key);
        if (!obj) return json({ error: "Not found" }, 404);
        const headers = new Headers(CORS_HEADERS);
        obj.writeHttpMetadata(headers);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        return new Response(obj.body, { headers });
      }

      // ================= PUBLIC WRITE ROUTES (no auth needed) =================

      if (pathname === "/api/track" && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        const type = body.type === "click" ? "click" : "pageview";
        const path = String(body.path || "/").slice(0, 200);
        const label = body.label ? String(body.label).slice(0, 120) : null;
        await env.DB.prepare(
          "INSERT INTO events (type, path, label) VALUES (?, ?, ?)"
        ).bind(type, path, label).run();
        return json({ ok: true });
      }

      if (pathname === "/api/login" && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        if (!env.ADMIN_PASSWORD) return json({ error: "Server not configured" }, 500);
        if (body.password !== env.ADMIN_PASSWORD) return json({ error: "Wrong password" }, 401);
        const token = await makeToken(env.ADMIN_SECRET);
        return json({ token });
      }

      // ================= PROTECTED ROUTES =================

      if (pathname.startsWith("/api/admin/") && !(await requireAuth(request, env))) {
        return json({ error: "Unauthorized" }, 401);
      }

      if (pathname === "/api/admin/services" && request.method === "PUT") {
        const body = await request.json().catch(() => null);
        if (!body) return json({ error: "Invalid body" }, 400);
        const { coreServices = [], websiteTiers = [], carePlans = [] } = body;
        const stmts = [
          env.DB.prepare("DELETE FROM core_services"),
          env.DB.prepare("DELETE FROM website_tiers"),
          env.DB.prepare("DELETE FROM care_plans"),
        ];
        coreServices.forEach((s, i) => stmts.push(
          env.DB.prepare("INSERT INTO core_services (key, name, what, revenue_type, icon, sort_order) VALUES (?,?,?,?,?,?)")
            .bind(s.key, s.name, s.what, s.revenueType, s.icon || s.key, i)
        ));
        websiteTiers.forEach((t, i) => stmts.push(
          env.DB.prepare("INSERT INTO website_tiers (name, built_on, gets, price, sort_order) VALUES (?,?,?,?,?)")
            .bind(t.name, t.builtOn, t.gets, t.price, i)
        ));
        carePlans.forEach((c, i) => stmts.push(
          env.DB.prepare("INSERT INTO care_plans (name, includes, per_year, sort_order) VALUES (?,?,?,?)")
            .bind(c.name, c.includes, c.perYear, i)
        ));
        await env.DB.batch(stmts);
        return json({ ok: true, ...(await getServices(env.DB)) });
      }

      if (pathname === "/api/admin/content" && request.method === "PUT") {
        const body = await request.json().catch(() => null);
        if (!body || !body.page || !body.values) return json({ error: "Invalid body" }, 400);
        const stmts = Object.entries(body.values).map(([key, value]) =>
          env.DB.prepare(
            "UPDATE page_content SET value = ? WHERE page = ? AND key = ?"
          ).bind(String(value), body.page, key)
        );
        if (stmts.length) await env.DB.batch(stmts);
        return json({ ok: true });
      }

      if (pathname === "/api/admin/faqs" && request.method === "PUT") {
        const body = await request.json().catch(() => null);
        if (!Array.isArray(body)) return json({ error: "Invalid body" }, 400);
        const stmts = [env.DB.prepare("DELETE FROM faqs")];
        body.forEach((f, i) => stmts.push(
          env.DB.prepare("INSERT INTO faqs (question, answer, sort_order) VALUES (?,?,?)")
            .bind(f.question, f.answer, i)
        ));
        await env.DB.batch(stmts);
        return json({ ok: true });
      }

      if (pathname === "/api/admin/portfolio" && request.method === "PUT") {
        const body = await request.json().catch(() => null);
        if (!Array.isArray(body)) return json({ error: "Invalid body" }, 400);
        const stmts = [env.DB.prepare("DELETE FROM portfolio")];
        body.forEach((p, i) => stmts.push(
          env.DB.prepare(
            "INSERT INTO portfolio (key, name, url, category, tier, blurb, image_key, sort_order) VALUES (?,?,?,?,?,?,?,?)"
          ).bind(p.key, p.name, p.url || null, p.category, p.tier || null, p.blurb, p.imageKey || null, i)
        ));
        await env.DB.batch(stmts);
        return json({ ok: true });
      }

      if (pathname === "/api/admin/nav" && request.method === "PUT") {
        const body = await request.json().catch(() => null);
        if (!Array.isArray(body)) return json({ error: "Invalid body" }, 400);
        const stmts = [env.DB.prepare("DELETE FROM nav_links")];
        body.forEach((n, i) => stmts.push(
          env.DB.prepare("INSERT INTO nav_links (label, path, sort_order) VALUES (?,?,?)")
            .bind(n.label, n.path, i)
        ));
        await env.DB.batch(stmts);
        return json({ ok: true });
      }

      if (pathname === "/api/admin/careers-roles" && request.method === "PUT") {
        const body = await request.json().catch(() => null);
        if (!Array.isArray(body)) return json({ error: "Invalid body" }, 400);
        const stmts = [env.DB.prepare("DELETE FROM careers_roles")];
        body.forEach((r, i) => stmts.push(
          env.DB.prepare("INSERT INTO careers_roles (title, type, place, blurb, sort_order) VALUES (?,?,?,?,?)")
            .bind(r.title, r.type, r.place, r.blurb, i)
        ));
        await env.DB.batch(stmts);
        return json({ ok: true });
      }

      if (pathname === "/api/admin/upload" && request.method === "POST") {
        const contentType = request.headers.get("Content-Type") || "application/octet-stream";
        const key = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extFromType(contentType)}`;
        const bytes = await request.arrayBuffer();
        if (bytes.byteLength > 5 * 1024 * 1024) return json({ error: "Image too large (max 5MB)" }, 400);
        await env.MEDIA.put(key, bytes, { httpMetadata: { contentType } });
        return json({ key });
      }

      if (pathname === "/api/admin/analytics" && request.method === "GET") {
        const [totals, byPath, byLabel, last7d] = await Promise.all([
          env.DB.prepare("SELECT type, COUNT(*) as count FROM events WHERE created_at >= datetime('now','-30 days') GROUP BY type").all(),
          env.DB.prepare("SELECT path, COUNT(*) as count FROM events WHERE type='pageview' AND created_at >= datetime('now','-30 days') GROUP BY path ORDER BY count DESC LIMIT 20").all(),
          env.DB.prepare("SELECT label, COUNT(*) as count FROM events WHERE type='click' AND created_at >= datetime('now','-30 days') GROUP BY label ORDER BY count DESC LIMIT 20").all(),
          env.DB.prepare("SELECT date(created_at) as day, type, COUNT(*) as count FROM events WHERE created_at >= datetime('now','-7 days') GROUP BY day, type ORDER BY day").all(),
        ]);
        return json({
          totals: totals.results,
          topPages: byPath.results,
          topClicks: byLabel.results,
          last7Days: last7d.results,
        });
      }

      return json({ error: "Not found" }, 404);
    } catch (err) {
      return json({ error: String(err && err.message ? err.message : err) }, 500);
    }
  },
};
