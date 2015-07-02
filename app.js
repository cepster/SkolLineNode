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
mongoose.connect('mongodb://localhost:27017/skolLine');

//routes
var router = new express.Router();

router.use(function(req, res, next){
    'use strict';

    console.log(req.method + ' ' + req.url);
    next();
});

router.get('/', function(req, res){
  'use strict';
  res.render('index', { message: ''});
});

router.route('/login')
  .post(passport.authenticate('login', {
    successRedirect: '/home.html',
    failureRedirect: '/'
  }));

var initRoutes = require('./app/routes/routes');
initRoutes(router);

app.use('/api', router);

app.listen(port);
console.log('Web server is running on port ' + port);
