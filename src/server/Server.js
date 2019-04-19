let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

http.createServer((req, res)=>{
    let pathName = url.parse(req.url).pathname;
    let pathTemp = './../../' + pathName.substring(1);
    console.log(`pathTemp: ${pathTemp}`);
    fs.readFile(pathTemp, (err, data)=>{
        if(err) {
            res.writeHead('404', 'failure', {
                'Content-Type': 'text/html'
            });
        } else {
            res.writeHead('200', 'success', {
                'Content-Type': 'text/html',
                'chartset': 'utf-8'
            });
            res.write(data.toString());
        }
        res.end();
    });
}).listen(3000, '127.0.0.1', ()=>{
    console.log(`服务已经启动，请通过http://127.0.0.1:3000来访问服务`)
});
