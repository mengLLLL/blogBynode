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
			res.redirect('/index')
		}else{
			res.redirect('/login')
		}
	})
})

//登录或者注册成功之后的界面
app.get('/index',function(req,res){
  console.log('get cookie',req.cookies)
  var id = req.cookies;
  var userMsg;
//通过存取的cookie来获取用户信息

    user.findById(id,function(err,result){
      if(err){
        return console.error(err)
      }
      userMsg = result;
      console.log('userMsg',userMsg);
      return userMsg
    });

	res.render('index',{
		title:'欢迎～'
	})
})

//文章列表页,只进行查看
app.get('/list',function(req,res){
  blog.find({}, function (err, results) {
    if(err){
      return console.error(err)
    }
    res.render('list',{
      blogs:results,
      title:'文章列表~'
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
  console.log(userId)
  var blogObj = new blog({
    articleName:newBlog.articleName,
    articleAuthor:newBlog.articleAuthor,
    articleContent:newBlog.articleContent,
    authorId:userId.id
  });
  blogObj.save(function(err,newblog){
    if(err){
      return console.error(err)
    }else{
      console.log("new blog!")
      res.redirect('/list')
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





//监听
app.listen(port)