var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    instrument: String,
    phoneNumber: String,
    member: Boolean,
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
