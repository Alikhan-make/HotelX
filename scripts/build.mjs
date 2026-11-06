import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const [worker, styles, app, manifest] = await Promise.all([
  readFile(resolve(projectRoot, "worker/index.js"), "utf8"), readFile(resolve(projectRoot, "worker/styles.css"), "utf8"),
  readFile(resolve(projectRoot, "worker/app.js"), "utf8"), readFile(resolve(projectRoot, ".openai/hosting.json"), "utf8")
]);
const bundled = worker.replace('"__HOTELX_STYLES__"', JSON.stringify(styles)).replace('"__HOTELX_APP_JS__"', JSON.stringify(app));
await rm(distRoot, { recursive: true, force: true });
await mkdir(resolve(distRoot, "server"), { recursive: true }); await mkdir(resolve(distRoot, ".openai"), { recursive: true });
await writeFile(resolve(distRoot, "server/index.js"), bundled); await writeFile(resolve(distRoot, ".openai/hosting.json"), manifest);
await cp(resolve(projectRoot, "drizzle"), resolve(distRoot, "drizzle"), { recursive: true });
console.log(`Built ${distRoot}`);
