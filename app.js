var express = require('express')
var port = 8080;
var app = express();
var bodyParser = require("body-parser")
var serveStatic = require('serve-static')
var cookieParser = require('cookie-parser')
var path = require('path');


//mongodb settings
var mongoose = require("mongoose");
var user = require("./models/user.js");
var blog = require("./models/blog.js");
mongoose.connect('mongodb://127.0.0.1:27017/blog')

//moment的使用
app.locals.moment = require("moment");

//jade settings
app.set('views','./views/pages/');
app.set('view engine','jade');
//bodyparser settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//路径解析
app.use(serveStatic('node_modules'))

app.use(cookieParser())

//静态文件目录
app.use(express.static(path.join(__dirname,'public')))

//注册页面
app.get('/login',function(req,res){
	console.log('login page')
	res.render('login',{
		title:'Aloha'
	})
})
//注册操作
app.post('/index/new',function(req,res){
	console.log('index page');
	var User = req.body.newuser;
	//对注册的数据进行验证，要求用户名唯一
	user.find({username:User.username},function(err,results){
		if(err){
			return console.error(err)
		}
		if(results.length>0){
			console.log('user existed')
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
					console.log("log success")
          //设置cookie,expires设置过期时间
          res.cookie('_id',newuser._id)
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
			console.log('welcome back')
      //设置cookie,expires设置过期时间
      res.cookie('_id',results[0]._id)
			res.redirect('/admin')
		}else{
			res.redirect('/login')
		}
	})
})

//登录或者注册成功之后的界面，也就是文章列表页
app.get('/admin',function(req,res){
  console.log('get cookie',req.cookies)
  var id = req.cookies;//用户id
  var userMsg;
  blog.find({authorId:id._id},function(err,results){
    if(err){
      console.error(err)
    }
    console.log('blog find',results)
    res.render('admin',{
        title:'欢迎～',
        blogs:results
    })
  })
})


//发布文章
app.get('/publish',function(req,res){
  res.render('publish',{
    title:"录入文章"
  })
})
app.post('/published',function(req,res){
  var newBlog = req.body.blog;
  //获取cookie
  var userId = req.cookies;
  console.log('authorId publish html',userId)
  console.log(userId)
  var blogObj = new blog({
    articleName:newBlog.articleName,
    articleContent:newBlog.articleContent,
    authorId:userId._id
  });
  blogObj.save(function(err,newblog){
    if(err){
      return console.error(err)
    }else{
      console.log("new blog!")
      res.redirect('/admin')
    }
  })
})

//blog详细页post
app.post('/postdetail',function(req,res){
  var Id = req.body.articleId;
  console.log('back id ',Id)
  blog.find({_id:Id},function(err,result){
    if(err){
      console.log(err)
    }
    res.redirect('detail',{
      blogDetail:result[0],
      title:"文章详情~"
    })
  })
})

app.get('/detail',function(req,res){
  var Id = req.query.articleId;
  console.log('back id ',Id)
  blog.find({_id:Id},function(err,result){
    if(err){
      console.log(err)
    }
    console.log('result',result[0])
    res.render('detail',{
      blogDetail:result[0],
      title:"文章详情~"
    })
  })
})
//article delete
app.delete('/admin/delete',function(req,res){
  var id = req.query.id;
  console.log(id)
  if(id){
    blog.remove({_id:id},function(err,result){
      if(err){
        console.log(err)
      }else{
        res.json({
          success:1
        })
      }
    })
  }
})




//index 展示所有博客的页面

//发表评论

//删除评论

//上传头像

//设置（修改）个人信息

//监听
app.listen(port)