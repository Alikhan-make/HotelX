import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Script } from "node:vm";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const workerPath = resolve(projectRoot, "dist/server/index.js");
const manifestPath = resolve(projectRoot, "dist/.openai/hosting.json");
const migrationRoot = resolve(projectRoot, "dist/.openai/drizzle");

const [source, manifest, coreMigration, inventoryMigration, migrationJournal] = await Promise.all([
  readFile(workerPath, "utf8"),
  readFile(manifestPath, "utf8"),
  readFile(resolve(migrationRoot, "0000_hotelx_core.sql"), "utf8"),
  readFile(resolve(migrationRoot, "0001_nightly_room_inventory.sql"), "utf8"),
  readFile(resolve(migrationRoot, "meta/_journal.json"), "utf8"),
]);
JSON.parse(manifest);
assert.match(coreMigration, /CREATE TABLE `users`/);
assert.match(inventoryMigration, /CREATE TABLE `room_inventory`/);
assert.equal(JSON.parse(migrationJournal).entries.length, 2);
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const workerModule = await import(moduleUrl);
assert.equal(typeof workerModule.default?.fetch, "function", `${pathToFileURL(workerPath)} must export default.fetch`);
const appResponse = await workerModule.default.fetch(new Request("http://localhost/assets/app.js"), {});
assert.equal(appResponse.status, 200);
const appSource = await appResponse.text();
new Script(appSource, { filename: "dist:/assets/app.js" });
assert.match(appSource, /^const \$ =/);
assert.match(appSource, /^const \$\$ =/m);
console.log("Artifact is valid ESM with browser JavaScript and packaged D1 migrations");
