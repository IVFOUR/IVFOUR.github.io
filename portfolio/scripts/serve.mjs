import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, extname, resolve, sep } from 'node:path';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.txt':'text/plain; charset=utf-8', '.png':'image/png' };
const server = http.createServer(async (req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}); res.end(); return; }
  try {
    const url = new URL(req.url, 'http://localhost');
    let path;
    try { path = decodeURIComponent(url.pathname); } catch { res.writeHead(400); res.end('Bad path'); return; }
    const target = resolve(root, `.${path}`);
    if (target !== root.replace(/\/$/,'') && !target.startsWith(root.endsWith(sep) ? root : root+sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    let file = target;
    if ((await stat(file)).isDirectory()) file = join(file,'index.html');
    const content = await readFile(file);
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD' ? undefined : content);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
    try { res.end(await readFile(join(root,'404.html'))); } catch { res.end('Not found'); }
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
