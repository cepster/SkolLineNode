var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GigSchema = new Schema({
  name: String,
  date: String,
  startTime: String,
  endTime: String,
  notes: String
});

module.exports = mongoose.model('Gig', GigSchema);
