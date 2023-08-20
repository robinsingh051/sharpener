const fs=require('fs');

function requestHandler(req,res){
    const url=req.url,method=req.method;
    if (url === '/') {
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
    if(url==='/message' && method==='POST'){
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
}

module.exports=requestHandler;