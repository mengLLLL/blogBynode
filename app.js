var express = require('express')
var port = 8080;
var app = express();
var bodyParser = require("body-parser")
var serveStatic = require('serve-static')
var cookieParser = require('cookie-parser')
var path = require('path');
var credentials = require('./credentials');

//上传文件的中间件
var formidable = require('formidable');
var util = require('util');


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

app.use(cookieParser(credentials.cookirSecret))

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

route(app)

//app.use(formidable({
//  encoding:'utf-8',
//  uploadDir:path.join(__dirname,'public/img'),
//  keepExtensions:true
//}));

////article delete
//app.delete('/admin/delete',function(req,res){
//  var id = req.query.id;
//  console.log(id)
//  if(id){
//    blog.remove({_id:id},function(err,result){
//      if(err){
//        console.log(err)
//      }else{
//        res.json({
//          success:1
//        })
//      }
//    })
//  }
//})
//



//监听
app.listen(port)