# Anabasis Website

The website for [Anabasis](https://anabasisrpg.com): a React app with React Router,
pre-rendered to static HTML by react-snap and hosted on GitHub Pages.

## How it works

- **Build:** `yarn build` compiles the app, then react-snap opens each route in a headless
  browser and saves the result as HTML. Search engines get the full page without running
  JavaScript, and React takes over in the browser (hydration).
- **Deploy:** every push to `main` runs `.github/workflows/site.yml`, which builds the site and
  publishes `build/` to the `gh-pages` branch. GitHub Pages serves that branch. You can also run
  the workflow by hand from the Actions tab. Each deploy replaces `gh-pages`, so don't edit it directly.
- **404s:** `/404.html` is listed in `reactSnap.include`, so react-snap renders the catch-all route
  into `404.html`. GitHub Pages serves that file with a real 404 status for any unknown URL.

## Development

Requires Node 20 (the version CI uses) and Yarn 1.

```
yarn install
yarn start    # dev server at http://localhost:3000/
yarn build    # production build, including the pre-render, into build/
```

## Making changes

| To change...       | Do this                                                                                                                                                       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Page content       | Edit `src/pages/Home/Home.js`.                                                                                                                                |
| Styling            | Edit `public/assets/styles/styles.css`. It is served as-is, so refresh the browser to see changes in `yarn start`.                                            |
| Images             | Files in `public/assets/` are published unchanged, at the same path.                                                                                          |
| Loot tooltips      | Commit an image to `public/assets/tooltips/`. The marquee is generated from that folder at build time, in filename order.                                     |
| Resource pack      | Replace `public/uploads/pack.zip` and commit. Each new version adds its full size to the repo's history, and GitHub rejects files over 100 MB.                |
| Add a page         | Add a `<Route>` in `src/App.js`, its path to `reactSnap.include` in `package.json`, and its source file to `STATIC_SOURCE` in `scripts/generate-sitemap.js`.  |

## Moving anabasisrpg.com to GitHub Pages

The repo is set up for the domain (`homepage` in `package.json` and `public/CNAME`; keep both, or
the next deploy removes the custom domain from Pages). The domain's DNS decides which site visitors
get, and it still points at the original host. The github.io address redirects to the domain, so
it shows the original site too until DNS changes.

To preview the GitHub Pages copy first, add `185.199.108.153 anabasisrpg.com` to your hosts file and
open http://anabasisrpg.com/ (plain HTTP). DOOM won't load while that line is there, because it also
reroutes the DOOM URL. Remove the line afterwards.

Before changing DNS, check what still lives only on the original host:

1. **Resource pack:** if it has changed since it was last committed here, commit the new one.
2. **DOOM:** `DOOM_URL` in `src/pages/Home/Home.js` loads from anabasisrpg.com, which is about to
   point somewhere else. Give those files a new address and update the URL.
3. **Anything else:** only files the page itself references were copied into this repo.

Then:

1. Lower the TTL on the domain's current DNS record ahead of time, then replace that record with
   these four `A` records. Leave `wiki` and `play` alone, because they are separate records.
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
2. Once GitHub has issued the certificate, tick **Enforce HTTPS** under Settings > Pages. Until
   then, HTTPS visitors and resource pack downloads can fail with a certificate error, so make
   the DNS change when few players are online.
