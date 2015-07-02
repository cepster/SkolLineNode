var User = require('../models/user');
var LocalStrategy = require('passport-local');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
  'use strict';

  passport.serializeUser(function(user, done){
      done(null, user._id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  var testUser = new User();
  testUser.username = 'admin';
  testUser.password = 'password';

  var isValidPassword = function(user, password){
    if(user === testUser.username){
      return password === testUser.password;
    }
    return bCrypt.compareSync(password, user.password);
  };

  // Generates hash using bCrypt
  var createHash = function(password){
   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ 'username': username },
        function(err, user) {
          // In case of any error, return using the done method
          if (err){
            return done(err);
          }

          if(!user && user === testUser.username){
            console.log('Found test user');
            user = testUser;
          }

          // Username does not exist, log error & redirect back
          if (!user){
            console.log('User Not Found with username ' + username);
            return done(null, false);
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false);
          }
          // User and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        }
      );
  }));

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    var findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({'username': username}, function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false,
             req.flash('message', 'User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.param('email');
          newUser.firstName = req.param('firstName');
          newUser.lastName = req.param('lastName');

          // save the user
          newUser.save(function(err2) {
            if (err2){
              console.log('Error in Saving user: ' + err2);
              throw err2;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    };

    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);

};
