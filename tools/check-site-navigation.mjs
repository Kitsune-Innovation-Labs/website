/**
 * Static navigation contract for the assembled KIL website.
 * Run after KitsuneOS and the Research Library are built:
 *   node tools/check-site-navigation.mjs _site
 *
 * Pages may have their own layouts and local navigation, but the global
 * destinations and shared header must be present everywhere.
 */
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] || "_site");
const pages = [
  "index.html",
  "charter/index.html",
  "gametable/index.html",
  "life/index.html",
  "companions/index.html",
  "design/index.html",
  "design/voice-lab/index.html",
  "design/research/index.html",
  "design/research/papers/semantic-invariance/index.html",
  "kitsuneos/index.html",
];
const destinations = [
  ["/", "Home"],
  ["/design/", "Kitsunebi"],
  ["/kitsuneos/", "KitsuneOS"],
  ["/gametable/", "GameTable"],
  ["/life/", "Kitsune Life"],
  ["/companions/", "Companions"],
  ["/design/research/", "Research"],
  ["/charter/", "Charter"],
];

const failures = [];
async function read(path) {
  try { return await readFile(join(root, path), "utf8"); }
  catch (error) {
    failures.push(`Missing file: ${path} (${error.code || error.message})`);
    return "";
  }
}

const header = await read("assets/kil-site-header.mjs");
await read("assets/kil-site-header.css");

for (const [href, label] of destinations) {
  if (!header.includes(`href=\\\"${href}\\\"`)) {
    failures.push(`Global menu is missing ${label} (${href})`);
  }
}

for (const path of pages) {
  const markup = await read(path);
  if (!markup) continue;
  if (!markup.includes("kil-site-header.mjs")) {
    failures.push(`${path} does not load the canonical navigation module`);
  }
  if (!markup.includes("kil-site-header.css")) {
    failures.push(`${path} does not load the canonical navigation stylesheet`);
  }
}

const kitsuneos = await read("kitsuneos/index.html");
if (kitsuneos && !kitsuneos.includes("data-kil-header")) {
  failures.push("KitsuneOS must mount the canonical header outside its React root");
}

for (const [route] of destinations) {
  await read(route === "/" ? "index.html" : route.slice(1) + "index.html");
}

if (failures.length) {
  console.error("KIL navigation contract failed:\\n" + failures.map(x => " - " + x).join("\\n"));
  process.exitCode = 1;
} else {
  console.log(`KIL navigation contract passed: ${pages.length} page surfaces, ${destinations.length} destinations.`);
}
