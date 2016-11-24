/**
 * Created by MengL on 2016/11/16.
 */
/*
非注册用户
 */

var express = require('express');
var router = express.Router();

var user = require("../models/user.js");
var blog = require("../models/blog.js");

var checkNotLogin = require("../middlewares/check.js").checkNotLogin;
var checkLogin = require("../middlewares/check.js").checkLogin;

////对所有的页面检查是否有用户登录，如果登录显示用户名
// TODO 不大现实？
//router.use('/', function (req, res) {
//  if(req.cookies.authorId){
//    user.find({_id:req.cookies.authorId}, function (err, results) {
//      if(err){
//        return console.error(err)
//      }else{
//        console.log('results',results)
//        res.send({
//          user:results[0]
//        })
//      }
//    })
//  }
//})

// GET 注册操作
router.get('/login',function(req, res){
  //console.log('注册');
  res.render('login',{
    title:'Aloha'
  })
});

//POST 注册操作
router.post('/register', function (req, res) {
  var User = req.body.newuser;
  console.log(User)
  user.find({username:User.username}, function (err, results) {
    if(err){
      return console.error(err)
    }
    if(results.length > 0){
      req.flash('error', '用户名已存在，换一个')
      res.redirect('/login')
    }else{
      var userObj = new user({
        username:User.username,
        password:User.password,
        avatar:'img/default.png'
      })
      userObj.save(function (err, newuser) {
        if(err){
          return console.error(err)
        }else {
          req.flash('info','注册成功')
          console.log('zhuce success',newuser);
          res.cookie('authorName',newuser.username);
          res.cookie('authorId',newuser._id);
          res.redirect('/index')
        }
      })
    }
  })
});

//网站首页
router.get('/index', function (req, res) {
  blog.find({}, function (err, blogResults) {
    if(err) {
      return console.error(err)
    }else{
      var logged = false;
      if (req.cookies.authorId){
        logged=true;
        user.find({_id:req.cookies.authorId},function(err, results){
          if(err){
            return console.error(err);
          }else{
            res.render('index',{
              blogs:blogResults,
              title:'Aloha',
              logged:logged,
              user:results[0],
              avatar:results[0].avatar
            })
          }
        })
      }else {
        res.render('index',{
          blogs:blogResults,
          title:'Aloha',
          logged:logged,
          user:{}
        })
      }

    }
  });
})

//查看文章详情页
router.get('/detail', function(req, res){
  var articleId = req.query.articleId;
  console.log('res ddd',res)
  console.log('detail articleId', articleId)
  blog.find({_id : articleId}, function (err, blogResult) {
    if(err){
      return console.error(err)
    }
    if(req.cookies.authorId){
      user.find({_id:req.cookies.authorId}, function (err, userResults) {
        if(err){
          return console.error(err)
        }else{
          user.find({_id:blogResult[0].authorId}, function (err, authorResults) {
            if(err){
              return console.error(err)
            }else{
              res.render('detail',{
                blogDetail: blogResult[0],
                title:'Aloha Detail',
                logged:true,
                user:userResults[0],
                avatar:userResults[0].avatar,
                author:authorResults[0],
                comments:blogResult[0].comments
              })
            }
          })
        }
      })
    }else{
      user.find({_id:blogResult[0].authorId}, function (err, authorResults) {
        if(err){
          return console.error(err)
        }else{
          res.render('detail',{
            blogDetail: blogResult[0],
            title:'Aloha Detail',
            logged:false,
            user:{},
            author:authorResults[0],
            comments:blogResult[0].comments
          })
        }
      })
    }

  })
});


module.exports = router;

