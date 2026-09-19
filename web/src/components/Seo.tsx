import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
  path: string; // e.g. '/services'
  noindex?: boolean;
};

const SITE_URL = 'https://zoptavi.com';
const DEFAULT_IMAGE = `${SITE_URL}/zoptavi-logo-final.png`;

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets a page-specific <title>, meta description, canonical URL and
 * Open Graph / Twitter tags on route change. This is on top of the strong
 * site-wide defaults already baked into index.html (which is what
 * non-JS crawlers and most AI answer engines read first) — this component
 * refines them per page for browser tabs, link previews, and JS-capable
 * crawlers.
 */
export default function Seo({ title, description, path, noindex }: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes('Zoptavi') ? title : `${title} | Zoptavi`;
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', `${SITE_URL}${path}`);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`);
    upsertMeta('property', 'og:image', DEFAULT_IMAGE);

    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE);
  }, [title, description, path, noindex]);

  return null;
}
