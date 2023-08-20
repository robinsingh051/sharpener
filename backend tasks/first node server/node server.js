const http = require('http');

const server = http.createServer((req, res) => {
  //res.end('<h1>Welcome to my Node Js project</h1>');
  if (req.url === '/home') {
    res.end('<h1>Welcome home</h1>');
  } else if (req.url === '/about') {
    res.end('<h1>Welcome to About Us page</h1>');
  } else if (req.url === '/node') {
    res.end('<h1>Welcome to my Node Js project</h1>');
  } else {
    res.end('<h1>Page not found</h1>');
  }
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
