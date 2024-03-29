var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// var https = require('https')
global.__basedir = __dirname;
// var hsp = require('heroku-self-ping');


var https = require('https');
var fs = require('fs');

var key = fs.readFileSync('private.key');
var cert = fs.readFileSync( 'certificate.crt' );
var ca = fs.readFileSync( 'ca_bundle.crt' );

var options = {
  key: key,
  cert: cert,
  ca: ca
};


// routes
var routeUser = require('./app_server/routes/route.user.js');
var routeDesign = require('./app_server/routes/route.design.js');
var routeOrder = require('./app_server/routes/route.order.js');

var cors = require('cors')

var app = express();
app.use(cors());

// hsp.default(`https://${process.env.app_url}.herokuapp.com`);

// app.use(express.static(__dirname+'/client'));


// Set up mongoose connection
let dev_db_url = 'mongodb+srv://merchuser:merchpassword@merchdesignsclub-10qfo.mongodb.net/merchdb';
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
app.use('/order', routeOrder);


//pictures url
app.use('/profile', express.static(__dirname + '/profile/'));
app.use('/design', express.static(__dirname + '/designs/'));

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

// var port = process.env.PORT || 80;
var port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log('Server is up and running on port number ' + port);
// });


https.createServer(options, app).listen(443);

module.exports = app;

//https://www.skidrowreloaded.com/call-of-duty-modern-warfare-3-v1-9-461-all-dlcs/

//remove space from filename upload
