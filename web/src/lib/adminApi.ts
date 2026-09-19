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

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${WORKER_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
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

async function authedFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${WORKER_URL}${path}`, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || 'Request failed');
  return body;
}

/**
 * Fetches a JSON array from a public GET route, used by every admin list
 * editor (FAQ, portfolio, career roles, bill pillars/pricing/phases,
 * careers perks/hiring, about values/steps, etc). Always resolves to an
 * array — never throws, never returns something a .map() would choke on —
 * so a route that 404s (e.g. the Worker hasn't been redeployed with a new
 * route yet) shows an empty, editable list instead of crashing the whole
 * admin section to a blank screen.
 */
async function fetchArray<T>(path: string): Promise<T[]> {
  if (!WORKER_URL) return [];
  try {
    const res = await fetch(`${WORKER_URL}${path}`);
    if (!res.ok) return [];
    const body = await res.json();
    return Array.isArray(body) ? body : [];
  } catch {
    return [];
  }
}

/** Public URL for an uploaded image key, or a fallback if no key/Worker. */
export function mediaUrl(key?: string | null): string | undefined {
  if (!key) return undefined;
  if (key.startsWith('http') || key.startsWith('/')) return key; // already a full/static path
  return `${WORKER_URL}/api/media/${key}`;
}

export async function uploadImage(file: File): Promise<string> {
  const token = getToken();
  const res = await fetch(`${WORKER_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { 'Content-Type': file.type, Authorization: `Bearer ${token}` },
    body: file,
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error || 'Upload failed');
  return body.key;
}

// ---- Site-wide contact info (address, phone, email, WhatsApp) ----
// Backed by page_content with page="site" — reuses the same generic
// useLiveContent/PageContentEditor plumbing as every other page.
export type SiteContact = { address: string; phoneDisplay: string; phoneDigits: string; email: string };
const DEFAULT_SITE_CONTACT: SiteContact = {
  address: 'Hyderabad, Telangana, India',
  phoneDisplay: '+91 89786 05027',
  phoneDigits: '918978605027',
  email: 'hello@zoptavi.com',
};

export function useLiveSiteContact(): SiteContact {
  const content = useLiveContent('site');
  return {
    address: content.contact_address || DEFAULT_SITE_CONTACT.address,
    phoneDisplay: content.contact_phone_display || DEFAULT_SITE_CONTACT.phoneDisplay,
    phoneDigits: content.contact_phone_digits || DEFAULT_SITE_CONTACT.phoneDigits,
    email: content.contact_email || DEFAULT_SITE_CONTACT.email,
  };
}

export function whatsappUrl(phoneDigits: string): string {
  return `https://wa.me/${phoneDigits.replace(/\D/g, '')}`;
}
export function telUrl(phoneDigits: string): string {
  return `tel:+${phoneDigits.replace(/\D/g, '')}`;
}
export function mailUrl(email: string): string {
  return `mailto:${email}`;
}

// ---- page content (hero text etc.) ----
export type ContentField = { key: string; label: string; value: string; type: string };

export function useLiveContent(page: string): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/content?page=${encodeURIComponent(page)}`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(d => { if (!cancelled) setValues(d.values || {}); })
      .catch(() => { /* keep defaults */ });
    return () => { cancelled = true; };
  }, [page]);
  return values;
}

export async function fetchContentFields(page: string): Promise<ContentField[]> {
  if (!WORKER_URL) return [];
  try {
    const res = await fetch(`${WORKER_URL}/api/content?page=${encodeURIComponent(page)}`);
    if (!res.ok) return [];
    const body = await res.json();
    return Array.isArray(body.fields) ? body.fields : [];
  } catch {
    return [];
  }
}

export async function saveContent(page: string, values: Record<string, string>) {
  return authedFetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page, values }) });
}

// ---- FAQs ----
export type Faq = { id?: number; question: string; answer: string };

export function useLiveFaqs(fallback: Faq[]): Faq[] {
  const [faqs, setFaqs] = useState<Faq[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/faqs`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: Faq[]) => { if (!cancelled && d.length) setFaqs(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return faqs;
}

export async function fetchFaqs(): Promise<Faq[]> {
  return fetchArray<Faq>('/api/faqs');
}
export async function saveFaqs(faqs: Faq[]) {
  return authedFetch('/api/admin/faqs', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(faqs) });
}

// ---- Portfolio ----
export type PortfolioItem = { id?: number; key: string; name: string; url?: string; category: string; tier?: string; blurb: string; imageKey?: string };

export function useLivePortfolio(fallback: PortfolioItem[]): PortfolioItem[] {
  const [items, setItems] = useState<PortfolioItem[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/portfolio`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: PortfolioItem[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchPortfolio(): Promise<PortfolioItem[]> {
  return fetchArray<PortfolioItem>('/api/portfolio');
}
export async function savePortfolio(items: PortfolioItem[]) {
  return authedFetch('/api/admin/portfolio', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
}

// ---- Careers open roles ----
export type CareerRole = { id?: number; title: string; type: string; place: string; blurb: string };

export function useLiveCareerRoles(fallback: CareerRole[]): CareerRole[] {
  const [items, setItems] = useState<CareerRole[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/careers-roles`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: CareerRole[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchCareerRoles(): Promise<CareerRole[]> {
  return fetchArray<CareerRole>('/api/careers-roles');
}
export async function saveCareerRoles(roles: CareerRole[]) {
  return authedFetch('/api/admin/careers-roles', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(roles) });
}

// ---- Careers: "Why join" perks ----
export type CareersPerk = { id?: number; title: string; detail: string };

export function useLiveCareersPerks(fallback: CareersPerk[]): CareersPerk[] {
  const [items, setItems] = useState<CareersPerk[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/careers-perks`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: CareersPerk[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchCareersPerks(): Promise<CareersPerk[]> {
  return fetchArray<CareersPerk>('/api/careers-perks');
}
export async function saveCareersPerks(items: CareersPerk[]) {
  return authedFetch('/api/admin/careers-perks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
}

// ---- Careers: "How we hire" steps ----
export type CareersHiringStep = { id?: number; title: string; detail: string };

export function useLiveCareersHiringSteps(fallback: CareersHiringStep[]): CareersHiringStep[] {
  const [items, setItems] = useState<CareersHiringStep[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/careers-hiring-steps`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: CareersHiringStep[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchCareersHiringSteps(): Promise<CareersHiringStep[]> {
  return fetchArray<CareersHiringStep>('/api/careers-hiring-steps');
}
export async function saveCareersHiringSteps(items: CareersHiringStep[]) {
  return authedFetch('/api/admin/careers-hiring-steps', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
}

// ---- About: values ----
export type AboutValue = { id?: number; title: string; detail: string };

export function useLiveAboutValues(fallback: AboutValue[]): AboutValue[] {
  const [items, setItems] = useState<AboutValue[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/about-values`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: AboutValue[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchAboutValues(): Promise<AboutValue[]> {
  return fetchArray<AboutValue>('/api/about-values');
}
export async function saveAboutValues(items: AboutValue[]) {
  return authedFetch('/api/admin/about-values', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
}

// ---- About: "How we work" steps ----
export type AboutStep = { id?: number; title: string; detail: string };

export function useLiveAboutSteps(fallback: AboutStep[]): AboutStep[] {
  const [items, setItems] = useState<AboutStep[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/about-steps`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: AboutStep[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchAboutSteps(): Promise<AboutStep[]> {
  return fetchArray<AboutStep>('/api/about-steps');
}
export async function saveAboutSteps(items: AboutStep[]) {
  return authedFetch('/api/admin/about-steps', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
}

// ---- Nav links ----
export type NavLink = { id?: number; label: string; path: string };

export async function fetchNav(): Promise<NavLink[]> {
  return fetchArray<NavLink>('/api/nav');
}
export async function saveNav(links: NavLink[]) {
  return authedFetch('/api/admin/nav', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(links) });
}

// ---- Zoptavi Bill: pillars ----
export type BillPillar = { id?: number; title: string; detail: string };

export function useLiveBillPillars(fallback: BillPillar[]): BillPillar[] {
  const [items, setItems] = useState<BillPillar[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/bill-pillars`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: BillPillar[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchBillPillars(): Promise<BillPillar[]> {
  return fetchArray<BillPillar>('/api/bill-pillars');
}
export async function saveBillPillars(items: BillPillar[]) {
  return authedFetch('/api/admin/bill-pillars', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
}

// ---- Zoptavi Bill: pricing tiers ----
export type BillPricingTier = { id?: number; name: string; stores: string; users: string; features: string; perYear: number };

export function useLiveBillPricing(fallback: BillPricingTier[]): BillPricingTier[] {
  const [items, setItems] = useState<BillPricingTier[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/bill-pricing`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: BillPricingTier[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchBillPricing(): Promise<BillPricingTier[]> {
  return fetchArray<BillPricingTier>('/api/bill-pricing');
}
export async function saveBillPricing(items: BillPricingTier[]) {
  return authedFetch('/api/admin/bill-pricing', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
}

// ---- Zoptavi Bill: rollout phases ----
export type BillPhase = { id?: number; phase: string; items: string[] };

export function useLiveBillPhases(fallback: BillPhase[]): BillPhase[] {
  const [items, setItems] = useState<BillPhase[]>(fallback);
  useEffect(() => {
    if (!WORKER_URL) return;
    let cancelled = false;
    fetch(`${WORKER_URL}/api/bill-phases`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: BillPhase[]) => { if (!cancelled && d.length) setItems(d); })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);
  return items;
}

export async function fetchBillPhases(): Promise<BillPhase[]> {
  return fetchArray<BillPhase>('/api/bill-phases');
}
export async function saveBillPhases(phases: BillPhase[]) {
  return authedFetch('/api/admin/bill-phases', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(phases) });
}
