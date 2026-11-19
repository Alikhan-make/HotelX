import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const { editorialFilename } = await import("./build.mjs");
const generated = resolve(root, "vercel/worker.generated.js");
await mkdir(resolve(root, "vercel"), { recursive: true });
await writeFile(generated, await readFile(resolve(root, "dist/server/index.js")));
const { default: worker } = await import(pathToFileURL(generated));
const publicDir = resolve(root, "public");
await rm(publicDir, { recursive: true, force: true });
await mkdir(resolve(publicDir, "assets"), { recursive: true });
for (const [path, output] of [["/", "index.html"], ["/assets/app.js", "assets/app.js"], ["/assets/styles.css", "assets/styles.css"], ["/favicon.svg", "favicon.svg"]]) {
  const response = await worker.fetch(new Request("http://localhost" + path), { HOTELX_PUBLIC_PRESENTATION: "1" });
  if (!response.ok) throw new Error("Failed to build " + path);
  await writeFile(resolve(publicDir, output), Buffer.from(await response.arrayBuffer()));
}
await cp(resolve(root, "design/media"), resolve(publicDir, "assets"), { recursive: true });
const clientPath = "/assets/" + editorialFilename;
const client = await worker.fetch(new Request("http://localhost" + clientPath), {});
if (!client.ok) throw new Error("Failed to export editorial module");
await writeFile(resolve(publicDir, clientPath.slice(1)), await client.text());
console.log("Vercel demo built: public/ + api/entry.js");
