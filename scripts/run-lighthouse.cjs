/**
 * Run Lighthouse using Playwright's Chromium so CHROME_PATH does not need to be set.
 * Usage: node scripts/run-lighthouse.cjs [url] [--full] [--view] ...
 * Default url: http://localhost:3002 (dev; use http for localhost or Chrome will show a cert interstitial).
 * --full: all categories. Other flags (e.g. --view) are passed to Lighthouse.
 */
const { spawnSync } = require("child_process");

function getChromiumPath() {
  try {
    const { chromium } = require("playwright");
    return chromium.executablePath();
  } catch {
    return null;
  }
}

const args = process.argv.slice(2);
const full = args.includes("--full");
const rest = args.filter((a) => a !== "--full");
// First non-flag is URL; if none, use default. Rest (e.g. --view) go to Lighthouse.
const urlArg = rest.find((a) => !a.startsWith("-"));
const url = urlArg || "http://localhost:3002";
const extraFlags = rest.filter((a) => a !== urlArg);

const chromePath = getChromiumPath();
if (!chromePath) {
  console.error(
    "Playwright Chromium not found. Run: pnpm exec playwright install chromium"
  );
  process.exit(1);
}

const lighthouseArgs = [
  "lighthouse",
  url,
  "--output=html",
  "--chrome-flags=--headless",
  ...extraFlags,
];

if (full) {
  lighthouseArgs.push("--output-path=./lighthouse-report.html");
} else {
  lighthouseArgs.push(
    "--only-categories=accessibility",
    "--output-path=./lighthouse-a11y.html"
  );
}

const result = spawnSync("npx", lighthouseArgs, {
  stdio: "inherit",
  env: { ...process.env, CHROME_PATH: chromePath },
});

process.exit(result.status ?? 1);
