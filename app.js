var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors')
let mongoose = require('mongoose');
var logger = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dbConfig = require('./config/database.config.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

var app = express();

const swaggerDefinition = {
  info: {
    title: 'FarmaLabour Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test Application',
  },
  // host: 'localhost:3003',
  // basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);


app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.use(cors());
// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db connection
mongoose.connect(dbConfig.url,{ useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(jwt());
app.use('/', indexRouter);
app.use('/users', usersRouter);

require('./routes/api-routes')(app);

app.use(errorHandler);

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
