import assert from 'node:assert/strict';
import worker from '../dist/server/index.js';

const request = (path, env = {}) => worker.fetch(new Request('https://hotelx.test' + path), env);
const home = await (await request('/', { HOTELX_PUBLIC_PRESENTATION: '1' })).text();
assert.match(home, /id="hx-title"/);
assert.match(home, /media="\(max-width: 640px\)"/);
assert.doesNotMatch(await (await request('/hotel/dashboard', { HOTELX_PUBLIC_PRESENTATION: '1' })).text(), /id="hx-title"/);
assert.doesNotMatch(await (await request('/')).text(), /id="hx-title"/);

for (const [, path] of home.matchAll(/(?:src|srcSet)="(\/assets\/[^"]+\.webp)"/gi)) {
  const response = await request(path);
  assert.equal(response.headers.get('content-type'), 'image/webp', path);
  assert.equal(Buffer.from(await response.arrayBuffer()).toString('ascii', 8, 12), 'WEBP', path);
}
const source = await (await request('/assets/app.js')).text();
const modulePath = /import\('(\/assets\/editorial-[0-9a-f]+\.js)'\)/.exec(source)?.[1];
assert.ok(modulePath);
assert.match((await request(modulePath)).headers.get('content-type'), /javascript/);
console.log('PASS public first paint, workspace bootstrap, responsive WebP assets and lazy interaction module');
