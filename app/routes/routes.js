var Music = require('../models/music');
var Member = require('../models/member');
var Gig = require('../models/gig');
var ensureAuthenticated = require('../passport/authenticator');

module.exports = function(router){
  'use strict';

  router.route('/api/music')
    .get(ensureAuthenticated, function(req, res){
        Music.find(function(err, music){
          if(err){
            res.send(err);
          }

          res.json(music);
        });
    })
    .post(ensureAuthenticated, function(req, res){
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
      .get(ensureAuthenticated, function(req, res){
        Music.findById(req.params.music_id, function(err, music){
            if(err){
              res.send(err);
            }
            else{
              res.json(music);
            }
        });
      })
      .put(ensureAuthenticated, function(req, res){
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
      .delete(ensureAuthenticated, function(req, res){
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
        .get(ensureAuthenticated, function(req, res){
          Member.find(function(err, members){
            if(err){
              res.send(err);
            }
            else{
              res.json(members);
            }
          });
        })
        .post(ensureAuthenticated, function(req, res){
          var member = new Member();
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
        .get(ensureAuthenticated, function(req, res){
          Member.findById(req.params.member_id, function(err, member){
              if(err){
                res.send(err);
              }
              else{
                res.json(member);
              }
          });
        })
        .put(ensureAuthenticated, function(req, res){
          Member.findById(req.params.member_id, function(err, member){
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
        .delete(ensureAuthenticated, function(req, res){
          Member.remove({
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
        .get(ensureAuthenticated, function(req, res){
            Gig.find(function(err, gig){
              if(err){
                res.send(err);
              }

              res.json(gig);
            });
        })
        .post(ensureAuthenticated, function(req, res){
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
        .get(ensureAuthenticated, function(req, res){
          Gig.findById(req.params.gig_id, function(err, gig){
              if(err){
                res.send(err);
              }
              else{
                res.json(gig);
              }
          });
        })
        .put(ensureAuthenticated, function(req, res){
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
        .delete(ensureAuthenticated, function(req, res){
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
