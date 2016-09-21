var express = require('express')
var port = 8080;
var app = express();
var bodyParser = require("body-parser")
var serveStatic = require('serve-static')

//mongodb settings
var mongoose = require("mongoose");
var user = require("./models/user.js");
mongoose.connect('mongodb://127.0.0.1:27017/blog')

//jade settings
app.set('views','./views/pages/');
app.set('view engine','jade');
//bodyparser settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//路径解析
app.use(serveStatic('node_modules'))



//routes
//
//注册页面
app.get('/login',function(req,res){
	console.log('login page')
	res.render('login',{
		title:'注册页面'
	})
})
//注册操作
app.post('/index/new',function(req,res){
	console.log('index page');
	var User = req.body.newuser;
	console.log(User)	
	//对注册的数据进行验证，要求用户名唯一
	user.find({username:User.username},function(err,results){
		if(err){
			return console.error(err)
		}
		if(results.length>0){
			console.log('用户名已存在')
			res.redirect('/login')
		}else{
			var userObj = new user({
				username:User.username,
				password:User.password
			})
			userObj.save(function(err,newuser){
				if(err){
					return console.error(err);
				}else{
					console.log("注册成功")
					res.redirect('/index')
				}

			});
		}
	})
})
//登录操作
app.post('/index/old',function(req,res){
	var User = req.body.olduser;
	console.log(User)
	user.find({username:User.username,password:User.password},function(err,results){
		if(err){
			return console.error(err)
		}
		if(results.length==1){
			console.log('登录成功')
			res.redirect('/index')
		}else{
			res.redirect('/login')
		}
	})
})

//登录或者注册成功之后的界面
app.get('/index',function(req,res){
	res.render('index',{
		title:'欢迎～'
	})
})

//监听
app.listen(port)