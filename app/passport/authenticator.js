module.exports = {
  ensureAuthenticated: function(req, res, next){
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
  },
  ensureAdmin: function(req, res, next){
    console.log('Is Admin? ' + req.user.admin);
    if (req.isAuthenticated() && req.user && req.user.admin) {
      return next();
    }
    res.redirect('/');
  }
};
