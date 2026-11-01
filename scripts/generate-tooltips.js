/**
 * Generates src/pages/Home/tooltips.json from public/assets/tooltips/.
 * Run automatically by the `prestart` and `prebuild` steps (see package.json).
 *
 * The old PHP page listed that folder on every request, so uploading an image
 * was all it took to add it to the loot marquee. A static site can't read a
 * folder at runtime, so this keeps that behaviour at build time instead: commit
 * an image to the folder and the next build picks it up.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOLTIP_DIR = path.join(ROOT, 'public', 'assets', 'tooltips');
const OUT_PATH = path.join(ROOT, 'src', 'pages', 'Home', 'tooltips.json');

const names = fs
  .readdirSync(TOOLTIP_DIR)
  .filter((name) => /\.(png|jpe?g|gif|webp)$/i.test(name))
  .sort();

fs.writeFileSync(OUT_PATH, `${JSON.stringify(names, null, 2)}\n`);
console.log(`generate-tooltips: wrote ${names.length} images to src/pages/Home/tooltips.json`);
