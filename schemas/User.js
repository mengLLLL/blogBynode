var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
  avatar:String
})



// newUserSchema.methods.checkname=function(name,cb){
// 		return this.find({username:name}).exec(cb)
// 	}




module.exports = UserSchema;
//坑：定义的和输出的名字要一模一样才可以