module.exports = function(req, res, next){
  'use strict';
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
