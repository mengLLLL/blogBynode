/**
 * Created by MengL on 16/9/22.
 */
var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
  articleName:String,
  articleContent:String,
  authorId:String,
  createAt:{
    type:Date,
    default:Date.now()
  }
});
module.exports = blogSchema;