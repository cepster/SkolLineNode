var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var Music = require('./app/models/music');
var Member = require('./app/models/member');

//database
mongoose.connect('mongodb://localhost:27017/skolLine');

var router = new express.Router();

router.use(function(req, res, next){
    'use strict';

    console.log(req.method + ' ' + req.url);
    next();
});

router.route('/music')
  .get(function(req, res){
      'use strict';

      Music.find(function(err, music){
        if(err){
          res.send(err);
        }

        res.json(music);
      });
  })
  .post(function(req, res){
      'use strict';

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

      console.log('Creating new resource: ' + music);

      res.send('Resource has been created');
  });

router.route('/music/:music_id')
    .get(function(req, res){
      'use strict';

      Music.findById(req.params.music_id, function(err, music){
          if(err){
            res.send(err);
          }
          else{
            res.json(music);
          }
      });
    })
    .put(function(req, res){
      'use strict';

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
    .delete(function(req, res){
      'use strict';

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

router.route('/member')
      .get(function(req, res){
        'use strict';

        Member.find(function(err, members){
          if(err){
            res.send(err);
          }
          else{
            res.json(members);
          }
        });
      })
      .post(function(req, res){
        'use strict';

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


router.route('/member/:member_id')
      .get(function(req, res){
        'use strict';

        Member.findById(req.params.member_id, function(err, member){
            if(err){
              res.send(err);
            }
            else{
              res.json(member);
            }
        });
      })
      .put(function(req, res){
        'use strict';

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
      .delete(function(req, res){
        'use strict';

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

app.use('/api', router);

app.listen(port);
console.log('Web server is running on port ' + port);
