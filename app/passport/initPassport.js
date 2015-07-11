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

  // Generates hash using bCrypt
  var createHash = function(password){
   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

  //Create testUser if it doesn't exist
  var testUser = new User();
  testUser.username = 'admin';
  testUser.password = 'password';

  var testUser2 = new User();
  testUser2.username = 'member';
  testUser2.password = 'password';
  testUser2.name = "Michael Neimeyer";
  testUser2.email = "mrmattrichards@gmail.com";
  testUser2.instrument = "Snare";
  testUser2.phoneNumber = "(123)867-5309";
  testUser2.member = true;
  testUser2.admin = false;

  var nonMember = new User();
  nonMember.username = 'nonmember';
  nonMember.password = 'password';
  nonMember.name = 'sys admin';
  nonMember.email = "mrmattrichards@gmail.com";
  nonMember.member = false;
  nonMember.admin = false;

  var initTestUser = function(thisUser){
    User.findOne({ 'username': thisUser.username}, function(err, user){
        if(err){
          console.log('Error occurred while attempting to determine existence of test user');
        }

        if(user){
          console.log('Test user already found in DB');
        }
        else{
          thisUser.password = createHash(thisUser.password);
          thisUser.save(function(saveErr){
              if(saveErr){
                console.log('Unable to save test user');
              }
              else{
                console.log('Saved new test user: ' + thisUser.username);
              }
          });
        }
    });
  };

  initTestUser(testUser);
  initTestUser(testUser2);
  initTestUser(nonMember);

  var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
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
          console.log('Login Success!!!');
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
