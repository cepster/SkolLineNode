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
// var apiRouter = new express.Router();
// var navRouter = new express.Router();


var router = new express.Router();
// var loginRouter = new express.Router();
// var homeRouter = new express.Router();

// function ensureAuthenticated(req, res, next) {
//   'use strict';
//   if (req.isAuthenticated()) {
//     console.log('User is authenticated');
//     return next();
//   }
//   console.log('User is not authenticated');
//   res.redirect('/');
// }

router.use(function(req, res, next){
    'use strict';

    console.log(req.method + ' ' + req.url);
    console.log('Checking user...authenticated? ' + req.isAuthenticated());

    if(!req.isAuthenticated() && req.path.indexOf('/index') !== -1){
      console.log('Redirecting...');
      res.redirect('/');
    }

    next();
});

router.get('/', function(req, res){
  'use strict';
  res.render('index', { message: ''});
});

router.get('/home', function(req, res){
  'use strict';
  res.render('public/home.html');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/'
}));

var initRoutes = require('./app/routes/routes');
initRoutes(router);

app.set("view options", {layout: false});

// app.use('/api', apiRouter);
app.use('/', router);
// app.use(express.static('public'));

// app.use(function(req, res, next) {
//   'use strict';
//
//   console.log('Checking user...');
//
//   if(!req.isAuthenticated() && req.path.indexOf('/index') === 0){
//     res.redirect('/index');
//   }
//
//   next();
// });

app.listen(port);
console.log('Web server is running on port ' + port);
