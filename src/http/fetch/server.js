const fs = require('fs'); // file system
const http = require('http');
const { ThrottleGroup } = require('stream-throttle');

const config = {
  bandWidthRate: 1500, // KB
};

const tg = new ThrottleGroup({ rate: config.bandWidthRate * 1024 });

const server = http.createServer((req, res) => {
  const filename = require('path').join(__dirname, req.url.slice(1) || 'index.html');
  const size = fs.statSync(filename).size;
  res.setHeader('Content-Length', size);
  const rstream = fs.createReadStream(filename);
  rstream.pipe(tg.throttle()).pipe(res);
});

server.listen(8000);
