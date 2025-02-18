const http = require('http');
const fs = require('fs');
const path = require('path')
const cors = require("cors");
const homepage = fs.readFileSync('./views/index.html');

app.use(cors());

// Function to determine the correct MIME type
function getContentType(ext) {
    switch (ext) {
      case '.html':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'application/javascript';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  }

// Create an HTTP server
const server = http.createServer((req, res) => {
    let filePath = './views' + (req.url === '/' ? '/index.html' : req.url);
    const ext = path.extname(filePath);

    // Serve the requested file
    fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': getContentType(ext) });
      res.end(content, 'utf-8');
    }
  });
});

// Specify the port to listen on
const port = 8080;

// Start the server
server.listen(port, '127.0.0.1', () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});