const http = require('http');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'dist', 'ronald-portfolio', 'browser');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.ico': 'image/x-icon'
};

const server = http.createServer((request, response) => {
  let filePath = request.url === '/' ? '/index.html' : request.url;
  filePath = filePath.split('?')[0]; // simple query param stripped
  let absPath = path.join(baseDir, filePath);

  if (!fs.existsSync(absPath)) {
    // SPA fallback
    absPath = path.join(baseDir, 'index.html');
  }

  const extname = String(path.extname(absPath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(absPath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        response.writeHead(404);
        response.end('File not found');
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});

server.listen(4200, () => {
  console.log('SPA Server statically running at http://localhost:4200/');
});
