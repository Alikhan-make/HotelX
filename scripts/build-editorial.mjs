import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

export async function buildEditorial(root) {
  const options = { absWorkingDir: root, jsx: 'automatic', bundle: true, write: false,
    minify: true, define: { 'process.env.NODE_ENV': '"production"' } };
  const stylesheet = resolve(root, 'design/editorial.css');
  const [client, server, style, files] = await Promise.all([
    build({ ...options, entryPoints: ['design/client.tsx'], format: 'esm', platform: 'browser', target: 'es2020' }),
    build({ ...options, entryPoints: ['design/static.tsx'], format: 'cjs', platform: 'node', packages: 'external' }),
    readFile(stylesheet, 'utf8').then(css => postcss([tailwind({ base: root, optimize: true })]).process(css, { from: stylesheet })),
    readdir(resolve(root, 'design/media')),
  ]);
  // Render trusted, repository-owned components at build time. Worker runtime stays dependency-free.
  const module = { exports: {} };
  new Function('module', 'exports', 'require', server.outputFiles[0].text)(module, module.exports, createRequire(import.meta.url));
  const code = client.outputFiles[0].text;
  const filename = 'editorial-' + createHash('sha256').update(code).digest('hex').slice(0, 12) + '.js';
  const media = Object.fromEntries(await Promise.all(files.map(async name => [name, (await readFile(resolve(root,'design/media',name))).toString('base64')])));
  return { markup: module.exports.markup, filename, code, css: style.css, media };
}
