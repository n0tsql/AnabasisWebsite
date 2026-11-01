# Anabasis Website

The website for [Anabasis](https://anabasisrpg.com): a React app with React Router,
pre-rendered to static HTML by react-snap and hosted on GitHub Pages. The
[Hephaestus Interactive page](https://anabasisrpg.com/hephaestus/hephaestus.html) is published
from this repo too, as a separate static page.

## How it works

- **Build:** `yarn build` compiles the app, then react-snap opens each route in a headless
  browser and saves the result as HTML. Search engines get the full page without running
  JavaScript, and React takes over in the browser (hydration).
- **Deploy:** every push to `main` runs `.github/workflows/site.yml`, which builds the site and
  publishes `build/` to the `gh-pages` branch. GitHub Pages serves that branch. You can also run
  the workflow by hand from the Actions tab. Each deploy replaces `gh-pages`, so don't edit it directly.
- **404s:** `/404.html` is listed in `reactSnap.include`, so react-snap renders the catch-all route
  into `404.html`. GitHub Pages serves that file with a real 404 status for any unknown URL.
- **Domain:** `homepage` in `package.json` and `public/CNAME` set the site's address. Keep both, or
  the next deploy removes the custom domain from Pages.
- **Hephaestus page:** `public/hephaestus/` is plain HTML, CSS and JavaScript that the build copies
  to `/hephaestus/` unchanged. It has its own stylesheet, script and images, and nothing from the
  Anabasis site loads on it. Keep it out of the React app, because every `<Route>` renders through
  `public/index.html`, which applies the Anabasis stylesheet. If a React page ever links to it, use
  the full `https://` URL: react-snap follows relative links and would overwrite the file with its
  own copy.

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
| Hephaestus page    | Edit the files in `public/hephaestus/`. Filenames must match their references exactly: GitHub Pages is case-sensitive, unlike Windows.                        |

## Known issues

- **DOOM:** the Konami code opens `DOOM_URL` from `src/pages/Home/Home.js`, but the DOOM files stayed
  on the old host when the domain moved, so it shows the 404 page. Commit them to
  `public/assets/doom/` and the existing URL works again.
