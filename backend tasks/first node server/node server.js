const http = require('http');

const server = http.createServer((req, res) => {
  res.end('My name is Robin Singh');
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
