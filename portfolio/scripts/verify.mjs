import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, extname, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const errors = [];
const htmlFiles = [];
async function walk(dir) {
  for (const item of await readdir(dir, {withFileTypes:true})) {
    const path = join(dir,item.name);
    if (item.isDirectory()) await walk(path);
    else if (extname(path)==='.html') htmlFiles.push(path);
  }
}
await walk(root);
const pages = new Map();
for (const path of htmlFiles) {
  const source = await readFile(path,'utf8');
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  pages.set(path, {source, ids});
  if (new Set(ids).size!==ids.length) errors.push(`${path}: duplicate IDs`);
  if ((source.match(/<h1\b/g)||[]).length!==1) errors.push(`${path}: expected one h1`);
  if (!source.includes('<html lang="ko">')) errors.push(`${path}: missing document language`);
  for (const tag of source.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]+"/.test(tag[0])) errors.push(`${path}: image needs descriptive alt`);
  // Private source material must never end up in published output.
  if (/docs\.google\.com|slack\.com|\/Users\/|\/home\/|@addd\.co\.kr/.test(source)) errors.push(`${path}: private source reference found`);
}
let links=0;
for (const [path, {source}] of pages) {
  for (const [,raw] of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(raw)) continue;
    const value=raw.replaceAll('&amp;','&');
    let [pathname,fragment]=value.split('#');
    const siteBase=process.env.SITE_BASE_PATH || '';
    if (siteBase && pathname.startsWith(siteBase+'/')) pathname=pathname.slice(siteBase.length);
    let target=pathname ? resolve(pathname.startsWith('/')?root:dirname(path), pathname.replace(/^\//,'')) : path;
    try {
      if ((await stat(target)).isDirectory()) target=join(target,'index.html');
      await stat(target);
      if (fragment && pages.has(target) && !pages.get(target).ids.includes(fragment)) errors.push(`${path}: missing anchor ${value}`);
    } catch { errors.push(`${path}: missing local resource ${value}`); }
    links++;
  }
}
execFileSync(process.execPath,['--check',join(root,'app.js')]);
if (errors.length) {console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`Verified ${htmlFiles.length} pages and ${links} local links/assets; JS syntax, image labels, unique IDs, and public content boundary OK.`);
