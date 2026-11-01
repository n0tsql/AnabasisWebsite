/**
 * Generates public/sitemap.xml.
 * Run automatically as part of the `prebuild` step (see package.json), or manually:
 *   node scripts/generate-sitemap.js
 *
 * Design goals (a "best practice" sitemap for this pre-rendered SPA):
 *   - The URL list is derived from reactSnap.include, so the sitemap can ONLY
 *     ever contain pages that are actually pre-rendered. A page that isn't
 *     pre-rendered would serve Googlebot an empty JS shell (soft 404) and must
 *     never appear here.
 *   - <lastmod> comes from each page's real last git commit date, so it is a
 *     signal Google can trust. (Google ignores <priority> and <changefreq>, so
 *     we deliberately omit them.)
 *   - <loc> values match each page's self-referential canonical exactly.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_ORIGIN = 'https://anabasisrpg.com';
const ROOT = path.join(__dirname, '..');

const pkg = require(path.join(ROOT, 'package.json'));
// /404.html is pre-rendered like any other route, but it isn't a page to index.
const routes = ((pkg.reactSnap && pkg.reactSnap.include) || ['/']).filter(
  (route) => route !== '/404.html',
);

// Maps a route to the source file whose git history best represents when that
// page's content last changed. Add new pages here.
const STATIC_SOURCE = {
  '/': 'src/pages/Home/Home.js',
};

const today = () => new Date().toISOString().slice(0, 10);

function lastmodForRoute(route) {
  const file = STATIC_SOURCE[route];
  if (!file || !fs.existsSync(path.join(ROOT, file))) return today();
  try {
    // %cs = committer date, short (YYYY-MM-DD). Requires full git history;
    // the CI checkout uses fetch-depth: 0 so this is accurate per file.
    const date = execSync(`git log -1 --format=%cs -- "${file}"`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : today();
  } catch (e) {
    return today();
  }
}

// GitHub Pages serves the 200 response at the trailing-slash URL (it
// 301-redirects /page -> /page/), so list that final URL to avoid a redirect hop
// in the sitemap and to match each page's self-referential canonical exactly.
const locForRoute = (route) => {
  const slashed = route === '/' ? '/' : `${route}/`;
  return `${SITE_ORIGIN}${slashed}`;
};

const body = routes
  .map((route) => {
    const loc = locForRoute(route);
    const lastmod = lastmodForRoute(route);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = path.join(ROOT, 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`generate-sitemap: wrote ${routes.length} URLs to public/sitemap.xml`);
