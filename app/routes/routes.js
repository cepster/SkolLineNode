var Music = require('../models/music');
var User = require('../models/user');
var Gig = require('../models/gig');
var auth = require('../passport/authenticator');

module.exports = function(router){
  'use strict';

  router.route('/api/music')
    .get(auth.ensureAuthenticated, function(req, res){
        Music.find(function(err, music){
          if(err){
            res.send(err);
          }

          res.json(music);
        });
    })
    .post(auth.ensureAuthenticated, function(req, res){
        var music = new Music();
        music.name = req.body.name;

        music.save(function(err){
          if(err){
              res.send(err);
          }
          else{
              res.json({ message: 'Music Created!'});
          }
        });
    });

  router.route('/api/music/:music_id')
      .get(auth.ensureAuthenticated, function(req, res){
        Music.findById(req.params.music_id, function(err, music){
            if(err){
              res.send(err);
            }
            else{
              res.json(music);
            }
        });
      })
      .put(auth.ensureAuthenticated, function(req, res){
        Music.findById(req.params.music_id, function(err, music){
            if(err){
              res.send(err);
            }
            else{
              music.name = req.body.name;
              music.save(function(err2){
                  if(err2){
                    res.send(err2);
                  }
                  else{
                    res.json({message: "Music Updated!"});
                  }
              });
            }
        });
      })
      .delete(auth.ensureAuthenticated, function(req, res){
        Music.remove({
          _id: req.params.music_id
        }, function(err){
          if(err){
            res.send(err);
          }
          else{
            res.json({message: "Music has been deleted"});
          }
        });
      });

  router.route('/api/member')
        .get(auth.ensureAuthenticated, function(req, res){
          User.find({member: true}, function(err, members){
            if(err){
              res.send(err);
            }
            else{
              res.json(members);
            }
          });
        })
        .post(auth.ensureAdmin, function(req, res){
          var member = new User();
          member.name = req.body.name;
          member.instrument = req.body.instrument;
          member.phoneNumber = req.body.phoneNumber;
          member.email = req.body.email;

          member.save(function(err){
            if(err){
              res.send(err);
            }
            else{
              res.json({message: "Member has been created"});
            }
          });
        });


  router.route('/api/member/:member_id')
        .get(auth.ensureAuthenticated, function(req, res){
          User.findById(req.params.member_id, function(err, member){
              if(err){
                res.send(err);
              }
              else{
                res.json(member);
              }
          });
        })
        .put(auth.ensureAdmin, function(req, res){
          User.findById(req.params.member_id, function(err, member){
              if(err){
                res.send(err);
              }
              else{
                member.name = req.body.name;
                member.instrument = req.body.instrument;
                member.phoneNumber = req.body.phoneNumber;
                member.email = req.body.email;
                member.save(function(err2){
                    if(err2){
                      res.send(err2);
                    }
                    else{
                      res.json({message: "Member Updated!"});
                    }
                });
              }
          });
        })
        .delete(auth.ensureAdmin, function(req, res){
          User.remove({
            _id: req.params.member_id
          }, function(err){
            if(err){
              res.send(err);
            }
            else{
              res.json({message: "Member has been deleted"});
            }
          });
        });

  router.route('/api/gig')
        .get(auth.ensureAuthenticated, function(req, res){
            Gig.find(function(err, gig){
              if(err){
                res.send(err);
              }

              res.json(gig);
            });
        })
        .post(auth.ensureAdmin, function(req, res){
            var gig = new Gig();
            gig.name = req.body.name;
            gig.date = req.body.date;
            gig.startTime = req.body.startTime;
            gig.endTime = req.body.endTime;
            gig.note = req.body.note;

            gig.save(function(err){
              if(err){
                  res.send(err);
              }
              else{
                  res.json({ message: 'Gig Created!'});
              }
            });
        });

  router.route('/api/gig/:gig_id')
        .get(auth.ensureAuthenticated, function(req, res){
          Gig.findById(req.params.gig_id, function(err, gig){
              if(err){
                res.send(err);
              }
              else{
                res.json(gig);
              }
          });
        })
        .put(auth.ensureAuthenticated, function(req, res){
          Gig.findById(req.params.gig, function(err, gig){
              if(err){
                res.send(err);
              }
              else{
                gig.name = req.body.name;
                gig.date = req.body.date;
                gig.startTime = req.body.startTime;
                gig.endTime = req.body.endTime;
                gig.note = req.body.note;

                gig.save(function(err2){
                    if(err2){
                      res.send(err2);
                    }
                    else{
                      res.json({message: "Gig Updated!"});
                    }
                });
              }
          });
        })
        .delete(auth.ensureAuthenticated, function(req, res){
          Gig.remove({
            _id: req.params.gig_id
          }, function(err){
            if(err){
              res.send(err);
            }
            else{
              res.json({message: "Gig has been deleted"});
            }
          });
        });
};
