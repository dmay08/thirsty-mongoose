var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//added this
var methodOverride = require('method-override');

// and this!!
require('./config/database');

//changed & added these
var indexRouter = require('./routes/index');
var barsRouter = require('./routes/bars');
var beersRouter = require('./routes/beers');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// added this
app.use(methodOverride('_method'));

//changed & added these
app.use('/', indexRouter);
app.use('/bars', barsRouter);
app.use('/beers', beersRouter);


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

module.exports = app;
