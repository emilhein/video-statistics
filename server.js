var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');
const dataFeeder = require('./helpers/datafeeder')

// Load environment variables from .env file
dotenv.load();

// Controllers
let HomeController = require('./controllers/home');
let models = require('./server/models')
let app = express();




let hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function (a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON: function (object) {
      return JSON.stringify(object);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', HomeController.index);


// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}



app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));

  //Use this to simulate ingoing datapoints 
  // dataFeeder.createRecordEveryXSecound(1);



  models.sequelize.sync()

  // WHEN RUNNING FIRST TIME
  // .then(() => dataFeeder.feedData())

  .then(res => console.log('synced and fed'))
  .catch(err => console.log('something went wrong', err))
});

module.exports = app;