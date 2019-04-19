var user = require('./UserInfo');

console.log(`my email is ${user.email}, my name is ${user.userName}`);
//console.log(`I'm ${user.userName}, I say ${user.sayName()}`);
//console.log(`My name is ${userName}, my email is ${email}`);
//console.log(sayName());

// var {userName, email, favourite} = require('./UserInfo');
// console.log(`My name is ${userName}, my email is ${email}, my favourite is ${favourite}`);

var path = require('path')
console.log(`__dirname: ${__dirname}`)
console.log(`path: ${path.resolve(__dirname, '../../dist/index.html')}`)


let http = require('http');
let url = require('url');
let util = require('util');

http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; chartset=utf-8');
    let tempUrl = req.url;
    console.log(`req.url: ${tempUrl}`);
    let tempUrlStr = url.parse(tempUrl);  //Object
    console.log(`url.parse: ${tempUrlStr}`);
    let tempUrlObj = util.inspect(tempUrlStr);  //str
    console.log(`util.inspect: ${tempUrlObj}`);
    console.log('-------------------------------');
    //res.end(`hello NodeJS, ${tempUrlObj}`);

    console.log('===============================');

    res.end(util.inspect(url.parse('http://127.0.0.1:3000/index.html?name=adel#1234')));

    var relUrlStr = url.parse('http://127.0.0.1:3000/index.html?name=adel#1234');
    console.log(`relUrlStr are ${relUrlStr.query}`)
}).listen(3000, '127.0.0.1', ()=>{
    console.log(`服务已经启动，请通过http://127.0.0.1:3000来访问服务`)
});