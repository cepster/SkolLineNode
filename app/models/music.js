var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  name: String,
  sounds: [{description: String, url: String}],
  music: [{description: String, url: String}],
  drill: [{description: String, url: String}]
});

module.exports = mongoose.model('Music', MusicSchema);
