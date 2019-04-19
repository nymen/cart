let http = require('http');
let util = require('util');

http.get('http://mallvnm.t.imooc.io/goods/list?page=1&pageSize=8&sort=1&priceLevel=all', (res)=>{
    let data = '';
    res.on('data', (chunk)=>{
        data += chunk;
    });

    res.on('end', ()=>{
        let tempData = util.inspect(data);
        console.log(`data is ${tempData}`);
    });
});