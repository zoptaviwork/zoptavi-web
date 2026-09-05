/**
 * Zoptavi admin API — Cloudflare Worker + D1.
 * Free-tier only: one Worker, one D1 database, no KV/R2/queues.
 *
 * Routes:
 *   GET    /api/services                 public  — current services/pricing (used by the live site)
 *   POST   /api/track                    public  — record a pageview or CTA click
 *   POST   /api/login                    public  — { password } -> { token }
 *   PUT    /api/admin/services           protected — replace services/tiers/care-plans
 *   GET    /api/admin/analytics          protected — pageview + click summary
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // ---- public: read services ----
      if (pathname === "/api/services" && request.method === "GET") {
        const data = await getServices(env.DB);
        return json(data);
      }

      // ---- public: track a pageview or click ----
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

      // ---- public: login ----
      if (pathname === "/api/login" && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        if (!env.ADMIN_PASSWORD) {
          return json({ error: "Server not configured" }, 500);
        }
        if (body.password !== env.ADMIN_PASSWORD) {
          return json({ error: "Wrong password" }, 401);
        }
        const token = await makeToken(env.ADMIN_SECRET);
        return json({ token });
      }

      // ---- protected: replace services/pricing ----
      if (pathname === "/api/admin/services" && request.method === "PUT") {
        if (!(await requireAuth(request, env))) return json({ error: "Unauthorized" }, 401);
        const body = await request.json().catch(() => null);
        if (!body) return json({ error: "Invalid body" }, 400);
        const { coreServices = [], websiteTiers = [], carePlans = [] } = body;

        const stmts = [
          env.DB.prepare("DELETE FROM core_services"),
          env.DB.prepare("DELETE FROM website_tiers"),
          env.DB.prepare("DELETE FROM care_plans"),
        ];
        coreServices.forEach((s, i) => stmts.push(
          env.DB.prepare(
            "INSERT INTO core_services (key, name, what, revenue_type, icon, sort_order) VALUES (?,?,?,?,?,?)"
          ).bind(s.key, s.name, s.what, s.revenueType, s.icon || s.key, i)
        ));
        websiteTiers.forEach((t, i) => stmts.push(
          env.DB.prepare(
            "INSERT INTO website_tiers (name, built_on, gets, price, sort_order) VALUES (?,?,?,?,?)"
          ).bind(t.name, t.builtOn, t.gets, t.price, i)
        ));
        carePlans.forEach((c, i) => stmts.push(
          env.DB.prepare(
            "INSERT INTO care_plans (name, includes, per_year, sort_order) VALUES (?,?,?,?)"
          ).bind(c.name, c.includes, c.perYear, i)
        ));
        await env.DB.batch(stmts);
        const data = await getServices(env.DB);
        return json({ ok: true, ...data });
      }

      // ---- protected: analytics summary ----
      if (pathname === "/api/admin/analytics" && request.method === "GET") {
        if (!(await requireAuth(request, env))) return json({ error: "Unauthorized" }, 401);
        const [totals, byPath, byLabel, last7d] = await Promise.all([
          env.DB.prepare(
            "SELECT type, COUNT(*) as count FROM events WHERE created_at >= datetime('now','-30 days') GROUP BY type"
          ).all(),
          env.DB.prepare(
            "SELECT path, COUNT(*) as count FROM events WHERE type='pageview' AND created_at >= datetime('now','-30 days') GROUP BY path ORDER BY count DESC LIMIT 20"
          ).all(),
          env.DB.prepare(
            "SELECT label, COUNT(*) as count FROM events WHERE type='click' AND created_at >= datetime('now','-30 days') GROUP BY label ORDER BY count DESC LIMIT 20"
          ).all(),
          env.DB.prepare(
            "SELECT date(created_at) as day, type, COUNT(*) as count FROM events WHERE created_at >= datetime('now','-7 days') GROUP BY day, type ORDER BY day"
          ).all(),
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
