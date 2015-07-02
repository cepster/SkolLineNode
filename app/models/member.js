var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
  name: String,
  instrument: String,
  phoneNumber: String,
  email: String
});

module.exports = mongoose.model('Member', MemberSchema);
