var express = require('express');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var Music = require('./app/models/music');
var Member = require('./app/models/member');

//database
//mongoose.connect('mongodb://localhost/skolLineDB');

var router = new express.Router();

router.use(function(req, res, next){
    'use strict';

    console.log('EndPoint hit');
    next();
});

router.route('/music')
  .get(function(req, res){
      'use strict';

      res.json({Test: "Testing"});
  })
  .post(function(req, res){
      'use strict';

      var music = new Music();
      music.name = req.body.name;

      console.log('Creating new resource: ' + music);

      res.send('Resource has been created');
  });

router.route('/music/:music_id')
    .get(function(req, res){
      'use strict';

      var id = req.params.music_id;
      res.json({Test: id });
    })
    .put(function(req, res){
      'use strict';

      res.send('Resource has been updated');
    })
    .delete(function(req, res){
      'use strict';

      res.send('Resource has been deleted');
    });

router.route('/member')
      .get(function(req, res){
        'use strict';

        res.json({Data: "Gets all members"});
      })
      .post(function(req, res){
        'use strict';

        var member = new Member();
        member.name = req.body.name;
        member.instrument = req.body.instrument;
        member.phoneNumber = req.body.phoneNumber;
        member.email = req.body.email;

        console.log('Creating new resource: ' + member);

        res.send('Resource has been created');
      });

router.route('/member/:member_id')
      .get(function(req, res){
        'use strict';

        var id = req.params.member_id;
        res.json({Test: id });
      })
      .put(function(req, res){
        'use strict';

        res.send('Resource has been updated');
      })
      .delete(function(req, res){
        'use strict';

        res.send('Resource has been deleted');
      });

app.use('/api', router);

app.listen(port);
console.log('Web server is running on port ' + port);
