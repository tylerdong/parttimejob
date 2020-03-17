const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const siteRouter = require('./routes/site');

const app = express();

// 设置渲染引擎
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//解析 application/json
app.use(bodyParser.json());
//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/base', indexRouter);  // 基本路由
app.use('/api/user', usersRouter);  // 用户相关
app.use('/', siteRouter)            // 网站访问

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.use(express.static('public'))

module.exports = app;
