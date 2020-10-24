// installed 3rd party packages
/* James Kuzhilaparambil Id:301119040  date 10/09/2020 */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passportlocal.Strategy;
let flash = require('connect-flash');



// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true,useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open',()=>{
console.log('connected to mongoDB...');
})
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let BooksRouter = require('../routes/book');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express  -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// set up express session
app.use(session({
  secret:"some secret"
  saveuninitialized: false,
  resave: false
}));
//initialize flash
app.use(flash());
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration
//create a user model instance
let userModel = require('../models/user');
let User= userModel.User;
// implement a user authentication strategy
passport.use(User.createStrategy());


// serialize and deserialize userinfo
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book-list', BooksRouter);



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
  res.render('error', { title: 'Error'});
});

module.exports = app;
