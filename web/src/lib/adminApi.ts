import { useEffect, useState } from 'react';
import { coreServices as staticCoreServices, websiteTiers as staticWebsiteTiers, carePlans as staticCarePlans } from '../data/business';

// Set this to your deployed Worker URL once you've run `wrangler deploy`
// in web/cf-worker/ (see web/cf-worker/README.md). Leave blank to keep the
// site running purely on the bundled data in business.ts.
export const WORKER_URL = 'https://zoptavi-admin.zoptavi.workers.dev';

export type CoreService = { key: string; name: string; what: string; revenueType: string; icon: string };
export type WebsiteTier = { name: string; builtOn: string; gets: string; price: number };
export type CarePlan = { name: string; includes: string; perYear: number };
export type ServicesData = { coreServices: CoreService[]; websiteTiers: WebsiteTier[]; carePlans: CarePlan[] };

const TOKEN_KEY = 'zoptavi_admin_token';

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
export function setToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch { /* ignore */ }
}
export function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
}

/**
 * Live services/pricing, backed by the Worker + D1 when WORKER_URL is set,
 * falling back to the bundled business.ts data if the fetch fails or the
 * Worker hasn't been deployed yet — the site never breaks either way.
 */
export function useLiveServices(): ServicesData {
  const [data, setData] = useState<ServicesData>({
    coreServices: staticCoreServices,
    websiteTiers: staticWebsiteTiers,
    carePlans: staticCarePlans,
  });

  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/services`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: ServicesData) => { if (!cancelled) setData(d); })
      .catch(() => { /* keep static fallback */ });
    return () => { cancelled = true; };
  }, []);

  return data;
}

/** Fire-and-forget pageview/click tracking. No-op until WORKER_URL is set. */
export function track(type: 'pageview' | 'click', path: string, label?: string) {
  if (!WORKER_URL) return;
  fetch(`${WORKER_URL}/api/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, path, label }),
    keepalive: true,
  }).catch(() => { /* analytics should never break the site */ });
}

export async function login(password: string): Promise<string> {
  const res = await fetch(`${WORKER_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || 'Login failed');
  setToken(body.token);
  return body.token;
}

export async function saveServices(data: ServicesData): Promise<ServicesData> {
  const token = getToken();
  const res = await fetch(`${WORKER_URL}/api/admin/services`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || 'Save failed');
  return body;
}

export type Analytics = {
  totals: { type: string; count: number }[];
  topPages: { path: string; count: number }[];
  topClicks: { label: string; count: number }[];
  last7Days: { day: string; type: string; count: number }[];
};

export async function fetchAnalytics(): Promise<Analytics> {
  const token = getToken();
  const res = await fetch(`${WORKER_URL}/api/admin/analytics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || 'Failed to load analytics');
  return body;
}
