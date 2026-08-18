// Zoptavi business content — sourced from "ZOPTAVI — The Complete Playbook" (Hyderabad, 2026–2027)

export interface BundlePackage {
  key: 'starter' | 'growth' | 'complete';
  name: string;
  tagline: string;
  website: string;
  payments: string;
  billing: string;
  content: string;
  ads: string;
  fulfilment: string;
  support: string;
  setupFee: number;
  monthlyFee: number;
  separateYear1: number;
  bundleYear1: number;
  savings: number;
}

export const bundles: BundlePackage[] = [
  {
    key: 'starter',
    name: 'Starter',
    tagline: 'Small shops & clinics',
    website: '10-page business site',
    payments: 'WhatsApp ordering',
    billing: '1 store, stock + GST',
    content: '—',
    ads: '—',
    fulfilment: '—',
    support: '12 updates a year, WhatsApp',
    setupFee: 12000,
    monthlyFee: 700,
    separateYear1: 23499,
    bundleYear1: 20400,
    savings: 3099,
  },
  {
    key: 'growth',
    name: 'Growth',
    tagline: 'Established businesses',
    website: 'Online shop, 50 products',
    payments: 'UPI, cards, net banking',
    billing: 'Up to 3 stores, live stock',
    content: '4 reels a month',
    ads: 'Managed, ₹15–25k budget',
    fulfilment: '—',
    support: 'Unlimited, priority',
    setupFee: 22000,
    monthlyFee: 14000,
    separateYear1: 233999,
    bundleYear1: 190000,
    savings: 43999,
  },
  {
    key: 'complete',
    name: 'Complete',
    tagline: 'D2C brands',
    website: 'Full custom store, unlimited',
    payments: 'UPI, cards, EMI, wallets',
    billing: 'Unlimited stores + website sync',
    content: '8 reels + 1 drone shoot a month',
    ads: 'Managed, ₹25–60k budget',
    fulfilment: 'Pack & ship included',
    support: 'Unlimited, priority + reports',
    setupFee: 55000,
    monthlyFee: 28000,
    separateYear1: 441999,
    bundleYear1: 391000,
    savings: 50999,
  },
];

export interface CoreService {
  key: string;
  name: string;
  what: string;
  revenueType: string;
  icon: 'build' | 'bill' | 'studio' | 'reach' | 'fulfill';
}

export const coreServices: CoreService[] = [
  { key: 'build', name: 'Zoptavi Build', what: 'Websites — from template sites to fully custom stores', revenueType: 'One-time + yearly care plan', icon: 'build' },
  { key: 'bill', name: 'Zoptavi Bill', what: 'Offline billing and multi-store stock software', revenueType: 'Yearly subscription', icon: 'bill' },
  { key: 'studio', name: 'Zoptavi Studio', what: 'Reels, drone shoots, photography, editing', revenueType: 'Monthly retainer', icon: 'studio' },
  { key: 'reach', name: 'Zoptavi Reach', what: 'Meta ads management — leads and sales', revenueType: 'Monthly retainer', icon: 'reach' },
  { key: 'fulfill', name: 'Zoptavi Fulfill', what: 'Pack and ship for brands under 200 orders/month', revenueType: 'Per order + monthly', icon: 'fulfill' },
];

export const websiteTiers = [
  { name: 'Starter', builtOn: 'WordPress', gets: '5 pages, mobile, WhatsApp button, contact form', price: 7500 },
  { name: 'Business', builtOn: 'WordPress', gets: '10 pages, gallery, booking form, Maps, basic SEO', price: 15000 },
  { name: 'Shop', builtOn: 'WooCommerce', gets: 'Up to 50 products, UPI/card payment, order emails', price: 25000 },
  { name: 'Store Pro', builtOn: 'React + Supabase', gets: 'Unlimited products, admin panel, GST invoices', price: 60000 },
  { name: 'Brand Complete', builtOn: 'React + Supabase', gets: 'Store Pro + logo + photos + SEO + 1 month content', price: 85000 },
];

export const carePlans = [
  { name: 'Care Basic', includes: 'Hosting, domain, SSL, backups, uptime monitoring', perYear: 3000 },
  { name: 'Care Plus', includes: '+ 12 content updates, WhatsApp support', perYear: 6500 },
  { name: 'Care Pro', includes: '+ unlimited updates, priority, monthly report', perYear: 12000 },
];

export const studioPlans = [
  { name: 'Basic', gets: '4 reels, edited, captions, posting schedule', monthly: 8000 },
  { name: 'Growth', gets: '8 reels + 1 drone shoot + strategy', monthly: 15000 },
  { name: 'Premium', gets: '12 reels + 2 drone shoots + cinematography', monthly: 25000 },
];

export const adsPlans = [
  { name: 'Starter', budget: '₹15,000–25,000/month', fee: 8000 },
  { name: 'Growth', budget: '₹25,000–60,000/month', fee: 15000 },
  { name: 'Scale', budget: '₹60,000+/month', fee: '20% of spend' },
];

// Zoptavi Bill — the billing product (Vyapar-class, offline-first)
export const billPillars = [
  { title: 'Works offline', detail: "Shops lose internet and power constantly. Billing must never stop — bills save locally and sync when connection returns." },
  { title: 'Multi-store live stock', detail: 'Owner sees every branch from anywhere, instantly. Out-of-stock in one store, in-stock two streets away — the sale is saved, not lost.' },
  { title: 'Runs on what they own', detail: 'Any phone, tablet or old laptop. No ₹40,000 POS terminal, no hardware lock-in.' },
];

export const billPricing = [
  { name: 'Free', stores: '1', users: '1', features: 'Billing, printing, 100 items', perYear: 0 },
  { name: 'Shop', stores: '1', users: '2', features: '+ Stock, GST, reports, offline', perYear: 1999 },
  { name: 'Multi-Store', stores: 'up to 3', users: '6', features: '+ Live multi-store stock, transfers', perYear: 4999 },
  { name: 'Chain', stores: 'unlimited', users: 'unlimited', features: '+ Website sync, API, priority support', perYear: 9999 },
];

export const billPhases = [
  { phase: 'Phase 1 — Core billing', items: ['Item grid billing — tap to add, search by name or barcode', 'Thermal printing, 58mm & 80mm, no drivers', 'Offline mode — bills save locally, sync automatically', 'GST invoices — CGST/SGST split, HSN codes, GSTIN on every bill', 'Basic stock — quantity decrements on each sale'] },
  { phase: 'Phase 2 — Multi-store', items: ['Live stock by location, updating in real time', 'Out-of-stock alerts across branches', 'Stock transfers between branches', 'Variant tracking — size and colour', 'Staff accounts with per-cashier logs'] },
  { phase: 'Phase 3 — Platform', items: ['Play Store release (same PWA, wrapped)', 'Website order sync — online orders reduce shop stock automatically', 'WhatsApp bills sent straight to the customer', 'Low-stock automation and owner alerts'] },
];

// Zoptavi Pay — branded checkout, NOT a self-issued payment gateway.
// Money moves on Razorpay Route / Cashfree Easy Split's RBI licence; Zoptavi branding shows on checkout.
export const zoptaviPay = {
  name: 'Zoptavi Pay',
  strapline: 'One checkout brand across every Zoptavi store',
  howItWorks: [
    'Every client store checks out under the same "Zoptavi Pay" badge — UPI, cards, net banking, wallets.',
    'Underneath, settlement runs on Razorpay Route or Cashfree Easy Split — both RBI-licensed Payment Aggregators.',
    'Zoptavi never touches or holds customer money directly — no RBI PA licence is required to operate this.',
    'Zoptavi takes a small platform fee (e.g. 0.75%) that settles automatically alongside the payout.',
  ],
  whyNotOwnGateway: 'Holding customer funds in India requires an RBI Payment Aggregator licence — ₹15 crore net worth today, rising to ₹25 crore. Operating without it is a serious offence. Zoptavi Pay gets the same branded experience without the licence, the capital, or the risk.',
};

// Proof of scale — live stores built and run on the Zoptavi stack
export interface PortfolioSite {
  key: string;
  name: string;
  url: string;
  category: string;
  tier: string;
  blurb: string;
}

export const portfolio: PortfolioSite[] = [
  {
    key: 'meena-rajwada',
    name: 'Meena Rajwada',
    url: 'https://meenarajwada.com',
    category: 'Fashion & Jewellery',
    tier: 'Store Pro',
    blurb: 'A full custom storefront with unlimited products, GST-ready invoices and its own admin panel — live proof that Zoptavi ships real stores, not templates.',
  },
  {
    key: 'helmet-hub',
    name: 'Helmet Hub',
    url: 'https://helmethub.in',
    category: 'Automotive Retail',
    tier: 'Store Pro',
    blurb: "A multi-brand helmet retailer running live stock and checkout on the same Zoptavi backbone used across every client store.",
  },
];

// Market data — Part A
export const marketFacts = [
  { fact: 'India D2C market 2024', figure: '₹55,000 crore', source: 'IBEF 2024' },
  { fact: 'Projected 2027', figure: '₹1,10,000 crore', source: '20% CAGR' },
  { fact: 'Instagram sellers in India', figure: '50–80 lakh', source: 'Meta India Business Report' },
  { fact: 'Hyderabad population', figure: '1.1 crore', source: 'Census 2024' },
  { fact: 'Registered startups, Hyderabad', figure: '89,000+', source: 'Telangana Startup Report' },
  { fact: 'Small brands selling online, Hyderabad', figure: '40,000–60,000', source: 'Hashtag analysis' },
];

export const competitorComparison = [
  { capability: 'Website', freelancer: true, agency: true, vyapar: false, shopify: true, zoptavi: true },
  { capability: 'Billing software', freelancer: false, agency: false, vyapar: true, shopify: false, zoptavi: true },
  { capability: 'Reels & content', freelancer: false, agency: true, vyapar: false, shopify: false, zoptavi: true },
  { capability: 'Ads management', freelancer: false, agency: true, vyapar: false, shopify: false, zoptavi: true },
  { capability: 'Order fulfilment', freelancer: false, agency: false, vyapar: false, shopify: false, zoptavi: true },
  { capability: 'Affordable for small shops', freelancer: true, agency: false, vyapar: true, shopify: false, zoptavi: true },
];
