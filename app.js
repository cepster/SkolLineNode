var express = require('express');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(expressSession({secret: 'my secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var initPassport = require('./app/passport/initPassport');
initPassport(passport);

//database
var dbUrl = process.env.DB || 'mongodb://skol:vikings@ds053312.mongolab.com:53312/skolline';
mongoose.connect(dbUrl);

//routes
var apiRouter = new express.Router();
var navRouter = new express.Router();


// var router = new express.Router();
// var loginRouter = new express.Router();
// var homeRouter = new express.Router();

function ensureAuthenticated(req, res, next) {
  'use strict';
  if (req.isAuthenticated() || true) {
    console.log('User is authenticated');
    return next();
  }
  console.log('User is not authenticated');
  res.redirect('/');
}

apiRouter.use(function(req, res, next){
    'use strict';

    console.log(req.method + ' ' + req.url);
    next();
});

navRouter.get('/', function(req, res){
  'use strict';
  res.render('index', { message: ''});
});

navRouter.get('/home', ensureAuthenticated, function(req, res){
  'use strict';
  res.render('public/home.html');
});

navRouter.post('/login', passport.authenticate('login', {
  successRedirect: '/home.html',
  failureRedirect: '/'
}));

var initRoutes = require('./app/routes/routes');
initRoutes(apiRouter);

app.use('/api', apiRouter);
app.use('/', navRouter);
app.use(express.static('public'), ensureAuthenticated);

app.listen(port);
console.log('Web server is running on port ' + port);
