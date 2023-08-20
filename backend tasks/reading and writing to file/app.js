const http = require('http');
const fs=require('fs');

const server = http.createServer((req, res) => {
  //res.end('<h1>Welcome to my Node Js project</h1>');
  if (req.url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
  
    // Read and display messages from the file
    fs.readFile('message.text', 'utf8', (err, data) => {
      if (!err) {
        res.write(data);
      }
      res.write('<form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="Submit"></form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  }  
  if(req.url==='/message' && req.method==='POST'){
    const body=[];
    req.on('data',(chunk)=>{
        body.push(chunk);
    });
    req.on('end',()=>{
        const parsedBody=Buffer.concat(body).toString();
        const message=parsedBody.split('=')[1];
        fs.writeFile('message.text',message,(err)=>{
            res.statusCode=302;
            res.setHeader('Location','/');
            return res.end();
        });
    });
    
  }
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
