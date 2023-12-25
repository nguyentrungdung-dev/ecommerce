var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var toyRouter = require('./routes/toy');
var categoryRouter = require('./routes/category');

var app = express();

// 2. config 'mongoose' module
var mongoose = require('mongoose');
var uri = "mongodb+srv://TrungDung:Trungdung.203@trungdung.jtcdniz.mongodb.net/WebToy";
mongoose.set('strictQuery', true); //ignore mongoose warning
mongoose.connect(uri)
  .then(() => console.log('Connect Database Succeed !!!'))
  .catch((err) => console.log(err));

// 3. config 'body-parser' module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

/*//HBS
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));  */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 1B. config url path of routers
app.use('/users', usersRouter);
app.use('/toy', toyRouter);
app.use('/category', categoryRouter);

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

//4. config port (for cloud deployment)
app.listen(process.env.PORT || 4001, () => {
  console.log('Server running on PORT 4001 !')
});

module.exports = app;
