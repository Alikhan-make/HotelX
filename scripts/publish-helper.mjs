import { execFileSync, spawnSync } from "node:child_process";
import { createInterface } from "node:readline";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function run(command, args, options = {}) {
  const output = execFileSync(command, args, { cwd: projectRoot, encoding: "utf8", stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit", env: options.env || process.env });
  return typeof output === "string" ? output.trim() : "";
}

function hideInput() {
  if (!process.stdin.isTTY) return () => {};
  spawnSync("stty", ["-echo"], { stdio: ["inherit", "ignore", "ignore"] });
  return () => spawnSync("stty", ["echo"], { stdio: ["inherit", "ignore", "ignore"] });
}

process.stdout.write("Ready for Site workflow JSON on stdin (input is hidden).\n");
const restore = hideInput();
const rl = createInterface({ input: process.stdin, terminal: false });
const line = await new Promise((accept, reject) => {
  rl.once("line", accept);
  rl.once("error", reject);
});
restore();
rl.close();
process.stdout.write("\n");

const input = JSON.parse(line);
const credential = input.credential;
if (!credential?.remote_url || !credential?.branch) throw new Error("Missing source repository credential");

run("npm", ["run", "build"]);
run("npm", ["test"]);
run("node", ["scripts/validate-artifact.mjs"]);

if (!existsSync(resolve(projectRoot, ".git"))) run("git", ["init", "-b", credential.branch]);
run("git", ["config", "user.name", "Codex"]);
run("git", ["config", "user.email", "codex@openai.com"]);
run("git", ["add", "-A"]);
const hasStagedChanges = spawnSync("git", ["diff", "--cached", "--quiet"], { cwd: projectRoot }).status !== 0;
if (hasStagedChanges) run("git", ["commit", "-m", "Build HotelX adaptive AI hospitality platform"]);

const remotes = run("git", ["remote"], { capture: true }).split(/\s+/).filter(Boolean);
if (remotes.includes("origin")) run("git", ["remote", "set-url", "origin", credential.remote_url]);
else run("git", ["remote", "add", "origin", credential.remote_url]);

const gitEnv = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
if (credential.auth_mode === "http_extra_header") {
  if (!credential.token) throw new Error("Missing ephemeral repository token");
  gitEnv.GIT_CONFIG_COUNT = "1";
  gitEnv.GIT_CONFIG_KEY_0 = "http.extraHeader";
  gitEnv.GIT_CONFIG_VALUE_0 = `Authorization: Bearer ${credential.token}`;
}
run("git", ["push", "--set-upstream", "origin", `HEAD:${credential.branch}`], { env: gitEnv });

const commitSha = run("git", ["rev-parse", "HEAD"], { capture: true });
const archivePath = resolve(input.archivePath || resolve(projectRoot, "outputs/hotelx-site.tar.gz"));
await mkdir(dirname(archivePath), { recursive: true });
run("tar", ["-czf", archivePath, "-C", resolve(projectRoot, "dist"), "."]);

process.stdout.write(JSON.stringify({ project_id: input.project_id, commit_sha: commitSha, archive: archivePath }) + "\n");
