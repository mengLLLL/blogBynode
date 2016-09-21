var mongoose = require("mongoose");
var UserSchema = require("../schemas/User.js")
var user = mongoose.model('user',UserSchema);

module.exports = user
