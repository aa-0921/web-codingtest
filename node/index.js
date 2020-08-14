const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
   const endpoint = req.url;
   if( endpoint==='/start' ){
      fs.readFile('./index.html',(err, data)=>{
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write(data);
         res.end();
      });
   }
   if (endpoint === '/api') {
      if (req.method == 'POST') {
         var body = ''
         req.on('data', function (data) {
            body += data
         })
         req.on('end', function () {
            var result = [];

            for (var i = 1; i < 31; i++) {
               const list = JSON.parse(body).obj.reverse();
               const found = list.find(element => i % element.num === 0);
               if (found !== undefined) {
                  result.push(found.text);
               }else{
                  result.push(i.toString());
               }
            }
            resultList = result.join(', ');
            res.writeHead(200, { 'Content-Type': 'text/html' });

            body = JSON.stringify(resultList).replace(/[\"]/g,"")
            
            const responseData = { data: body }
            res.write(JSON.stringify(responseData));
            res.end();
         });
      }
   }
});
server.listen(8080); 
