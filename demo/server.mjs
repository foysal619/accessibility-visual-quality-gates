import { createReadStream } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/visual.html', ['visual.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
]);

http.createServer((request, response) => {
  if (request.url === '/health') return response.end('ok');
  const entry = files.get(request.url ?? '');
  if (!entry) {
    response.writeHead(404);
    return response.end('Not found');
  }
  response.writeHead(200, { 'content-type': entry[1], 'cache-control': 'no-store' });
  return createReadStream(path.join(root, entry[0])).pipe(response);
}).listen(Number(process.env.PORT ?? 4173), '127.0.0.1', () => console.log('demo ready on http://127.0.0.1:4173'));
