const http = require('http');
const routes=require('./routes');

const server = http.createServer(routes);

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
