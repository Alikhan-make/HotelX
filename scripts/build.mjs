import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildEditorial } from "./build-editorial.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const [worker, baseStyles, baseApp, manifest, assistant, editorial] = await Promise.all([
  readFile(resolve(projectRoot, "worker/index.js"), "utf8"), readFile(resolve(projectRoot, "worker/styles.css"), "utf8"),
  readFile(resolve(projectRoot, "worker/app.js"), "utf8"), readFile(resolve(projectRoot, ".openai/hosting.json"), "utf8"),
  readFile(resolve(projectRoot, "worker/demo-assistant.js"), "utf8"), buildEditorial(projectRoot)
]);
const styles = baseStyles + "\n" + editorial.css;
const app = baseApp.replace('"__HOTELX_EDITORIAL_HTML__"', () => JSON.stringify(editorial.markup)).replace("__HOTELX_EDITORIAL_FILE__", editorial.filename);
const assetVersion = createHash("sha256").update(styles).update(app).digest("hex").slice(0, 12);
const versionedWorker = worker.replaceAll("__HOTELX_ASSET_VERSION__", assetVersion);
// Replacement callbacks preserve literal `$$`; replacement strings convert `$$` to `$`.
const bundled = versionedWorker
  .replace('import { assistantInput, guestDemoReply, hotelDemoTopic, hotelDemoReply } from "./demo-assistant.js";', () => assistant.replace(/^export /gm, ""))
  .replace('"__HOTELX_EDITORIAL_HTML__"', () => JSON.stringify(editorial.markup))
  .replace('"__HOTELX_EDITORIAL_MEDIA__"', () => JSON.stringify(editorial.media))
  .replace('"__HOTELX_EDITORIAL_FILE__"', () => JSON.stringify(editorial.filename))
  .replace('"__HOTELX_EDITORIAL_JS__"', () => JSON.stringify(editorial.code))
  .replace('"__HOTELX_STYLES__"', () => JSON.stringify(styles))
  .replace('"__HOTELX_APP_JS__"', () => JSON.stringify(app));
if (bundled.includes("__HOTELX_")) throw new Error("Unresolved HotelX build placeholder");
await rm(distRoot, { recursive: true, force: true });
await mkdir(resolve(distRoot, "server"), { recursive: true }); await mkdir(resolve(distRoot, ".openai"), { recursive: true });
await writeFile(resolve(distRoot, "server/index.js"), bundled); await writeFile(resolve(distRoot, ".openai/hosting.json"), manifest);
await cp(resolve(projectRoot, "drizzle"), resolve(distRoot, ".openai", "drizzle"), { recursive: true });
console.log(`Built ${distRoot}`);

export const editorialFilename = editorial.filename;
