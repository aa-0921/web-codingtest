const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
   // url = new URL(req.url)
   // console.log('url.search', url.searchreq)
   // console.log('url.hash', url.hash)


   const endpoint = req.url;
   if( endpoint==='/start' ){
      fs.readFile('./index.html',(err, data)=>{
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write(data);
         res.end();
      });
   }
   if (endpoint === '/api') {
      console.info('req.method', req.method)
      console.info('req.query',req.query)
      
      if (req.method == 'POST') {
         console.info('POST')
         var body = ''
         req.on('data', function (data) {
            body += data
            console.info('Partial body: ' + body)
         })
         req.on('end', function() {
            console.log(body);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const responseData = {data: body}
            res.write(JSON.stringify(responseData));
            res.end();
         });
      }
   }
});
server.listen(8080); 
