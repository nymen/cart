var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎：下面是如何换成html页面，不用jade
var ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'jade');

//中间件插件，拓展express服务的功能
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//请求拦截
//cookie的key过于简单的问题
app.use(function (req, res, next) {
  if(req.cookies.user || req.originalUrl === '/users/login' || req.originalUrl === '/users/logout' ||
     req.originalUrl === '/users/checkLogin' || req.originalUrl.indexOf('/goods?') > -1
  ) {
      next();
  } else {
      res.json({
        status: '1',
        msg: '您当前未登录！！',
        result: ''
      });
  }
})

app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
