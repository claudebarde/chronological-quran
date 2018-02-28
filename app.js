var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var index = require('./routes/index');
var suratRoute = require('./routes/suratRoute');
var ayatRoute = require('./routes/ayatRoute');
const quranJS = require('./quranJS/quranJS');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// register partials folder
hbs.registerPartials(__dirname + '/views/partials');
// register helper for surahs list
const quranOrder = quranJS.chronologicalOrder();
hbs.registerPartial('sidenav', () => {
  let str = "";
  for(let item in quranOrder){
    if (quranOrder.hasOwnProperty(item)) {
        // console.log(quranOrder[item]["en"]);
        str += `<li class="sidenav__list__li"><a href="/quran/${quranOrder[item]["traditionalOrder"]}">${item} - ${quranOrder[item]["ar"]}</a><br /><small>(${quranOrder[item]["en"]})</small></li>`;
    }
  }

  return '<ul class="sidenav__list">' + str + "</ul>";
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/quran/:id', quranRoute);
app.use(index);
app.use(suratRoute);
app.use(ayatRoute);

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
