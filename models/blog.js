/**
 * Created by MengL on 16/9/22.
 */
var mongoose = require("mongoose");
var blogSchema = require("../schemas/blog.js")
var blog = mongoose.model('blog',blogSchema);
module.exports = blog