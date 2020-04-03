var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
global.__basedir = __dirname;


// routes
var routeUser = require('./app_server/routes/route.user.js');
var routeDesign = require('./app_server/routes/route.design.js');

var cors = require('cors')

var app = express();
app.use(cors())

// app.use(express.static(__dirname+'/client'));


// Set up mongoose connection
let dev_db_url = 'mongodb://localhost:27017/merchdesign';
const mongoDB = process.env.dev_db_url ||  dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB connected…'))
.catch(err => console.log(err));

// upd
// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes call
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Merch Backend"
})
});


app.use('/user', routeUser);
app.use('/design', routeDesign);


//pictures url
app.use('/profile', express.static(__dirname + '/uploads/profile/'));
app.use('/design', express.static(__dirname + '/uploads/designs/'));

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

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});



module.exports = app;

//https://www.skidrowreloaded.com/call-of-duty-modern-warfare-3-v1-9-461-all-dlcs/
