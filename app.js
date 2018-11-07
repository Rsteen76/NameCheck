var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config()

var app = express()
app.use(cors())

// const index = require('./server/routes/index');
const {apiRoutes} = require('./server/routes/index')
const {webRoutes} = require('./server/routes/index')

// Setup mongoose
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(process.env.MONGO_URI, {
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))

app.use(logger('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: 'false'
}))
app.use(express.static(path.join(__dirname, 'dist')))

// ### This is where you setup routes ###
app.use('/api', apiRoutes)
app.use('/web', webRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404;
  next(err);
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
