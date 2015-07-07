var express = require('express');
var passport = require('passport');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var ensureAuthenticated = require('./app/passport/authenticator');

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
var router = new express.Router();

router.get('/', function(req, res){
  'use strict';
  res.render('index', { message: ''});
});

router.get('/home', ensureAuthenticated, function(req, res){
  'use strict';
  res.sendFile(path.join(__dirname, '/public/home.html'));
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/'
}));

var initRoutes = require('./app/routes/routes');
initRoutes(router);

app.set("view options", {layout: false});

app.use('/', router);

app.listen(port);
console.log('Web server is running on port ' + port);
