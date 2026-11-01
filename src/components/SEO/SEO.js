import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Fixed production origin. We must NOT derive this from window.location, because
// react-snap pre-renders these pages inside a headless browser running on
// http://localhost:45678. Using the live origin would bake a "localhost" canonical /
// og:url into the static HTML, which makes Google treat each real page as a
// duplicate of an unreachable URL and drop it from the index.
const SITE_ORIGIN = 'https://anabasisrpg.com';

export const SEO = ({ title, description, noindex = false }) => {
  // Router pathname rather than window.location: it excludes the basename, so
  // the canonical is right even while the site is served from a /repo-name/ path.
  const { pathname } = useLocation();

  useEffect(() => {
    // GitHub Pages serves each page's 200 response only at the trailing-slash
    // URL (it 301-redirects /page -> /page/), so the canonical must use the
    // trailing slash to point at the final URL rather than a redirect.
    const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const canonicalUrl = `${SITE_ORIGIN}${path}`;

    document.title = title ? `${title} | Anabasis` : 'Anabasis';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title ? `${title} | Anabasis` : 'ANABASIS');
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription && description) {
      ogDescription.setAttribute('content', description);
    }

    // Robots: only the catch-all 404 page passes noindex, so search engines
    // don't index "not found" responses. Every other page explicitly resets to
    // "index, follow" so client-side navigation away from the 404 restores
    // normal indexing (the static HTML already ships index,follow by default).
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute('content', noindex ? 'noindex, follow' : 'index, follow');
    }
  }, [pathname, title, description, noindex]);

  return null;
};
