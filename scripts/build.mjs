import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const [worker, styles, app, manifest, assistant] = await Promise.all([
  readFile(resolve(projectRoot, "worker/index.js"), "utf8"), readFile(resolve(projectRoot, "worker/styles.css"), "utf8"),
  readFile(resolve(projectRoot, "worker/app.js"), "utf8"), readFile(resolve(projectRoot, ".openai/hosting.json"), "utf8"),
  readFile(resolve(projectRoot, "worker/demo-assistant.js"), "utf8")
]);
const assetVersion = createHash("sha256").update(styles).update(app).digest("hex").slice(0, 12);
const versionedWorker = worker.replaceAll("__HOTELX_ASSET_VERSION__", assetVersion);
// Replacement callbacks preserve literal `$$`; replacement strings convert `$$` to `$`.
const bundled = versionedWorker
  .replace('import { assistantInput, guestDemoReply, hotelDemoTopic, hotelDemoReply } from "./demo-assistant.js";', () => assistant.replace(/^export /gm, ""))
  .replace('"__HOTELX_STYLES__"', () => JSON.stringify(styles))
  .replace('"__HOTELX_APP_JS__"', () => JSON.stringify(app));
if (bundled.includes("__HOTELX_")) throw new Error("Unresolved HotelX build placeholder");
await rm(distRoot, { recursive: true, force: true });
await mkdir(resolve(distRoot, "server"), { recursive: true }); await mkdir(resolve(distRoot, ".openai"), { recursive: true });
await writeFile(resolve(distRoot, "server/index.js"), bundled); await writeFile(resolve(distRoot, ".openai/hosting.json"), manifest);
await cp(resolve(projectRoot, "drizzle"), resolve(distRoot, ".openai", "drizzle"), { recursive: true });
console.log(`Built ${distRoot}`);
