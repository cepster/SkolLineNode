var express = require('express');
//var mongoose = require('mongoose');

var app = express();
app.use(express.static('public'));

//database
//mongoose.connect('mongodb://localhost/skolLineDB');

app.get('/api', function(req, res){
  'use strict';
  res.send('Skol Line API is running');
});

app.route('/music/*')
  .get(function(req, res){
      'use strict';
      res.send('{"Test":"Testing"}');
  })
  .post(function(req, res){
      'use strict';
      res.send('Resource has been created');
  })
  .put(function(req, res){
    'use strict';
    res.send('Resource has been updated');
  })
  .delete(function(req, res){
    'use strict';
    res.send('Resource has been deleted');
  });

app.listen(8000);
