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
  },
  authorName:String,
  comments:[{
    commentName:String,
    commentTime:{
      type:Date,
      default:Date.now()
    },
    commentContent:String,
    commentId:{
      type:Number,
      default:0
    }
  }]
});
module.exports = blogSchema;