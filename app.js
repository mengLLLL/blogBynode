var express = require('express')
var port = 8080;
var app = express();
var bodyParser = require("body-parser")
var serveStatic = require('serve-static')
var cookieParser = require('cookie-parser')
var path = require('path');
var credentials = require('./credentials');
var flash = require('connect-flash');
var session = require('express-session')
//上传文件的中间件
var formidable = require('formidable');
var util = require('util');

//var upload = require('jquery-file-upload-middleware');
var markdown = require('markdown').markdown;

//路由部分
var touristRoute = require('./routes/tourist')

var route = require('./routes/index');
//mongodb settings
var mongoose = require("mongoose");
var user = require("./models/user.js");
var blog = require("./models/blog.js");
mongoose.connect('mongodb://127.0.0.1:27017/blog')

//moment的使用
app.locals.moment = require("moment");


app.locals.markdown = markdown;
//cookie
app.use(cookieParser(credentials.cookirSecret))

app.use(session({
  secret:'secret',
  key:'db',
  cookie:{maxAge:60000},
  resave:false,
  saveUninitialized:true
}));
//flash
app.use(flash());

app.use(function (req, res, next) {
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
})


//jade settings
app.set('views','./views/pages/');
app.set('view engine','jade');

//bodyparser settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//路径解析
app.use(serveStatic('node_modules'))

//app.use(cookieParser())

//静态文件目录
app.use(express.static(path.join(__dirname,'public')))




route(app)
//监听
app.listen(port)