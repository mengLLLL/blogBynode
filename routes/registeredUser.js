/**
 * Created by MengL on 2016/11/16.
 */
/*
注册用户专有路由
*/

var express = require('express');
var router = express.Router();
var user = require("../models/user.js");
var blog = require("../models/blog.js");
var checkNotLogin = require("../middlewares/check.js").checkNotLogin;
var checkLogin = require("../middlewares/check.js").checkLogin;
var blogItemSum = 0;//TODO 这样能保证唯一吗？这是个问题。。。



//登录，登陆成功回到首页
//登录失败重新到login页面
//登录的时候要检查是否已经登录

router.post('/login', checkNotLogin, function (req, res) {
  var User = req.body.olduser;
  user.find({username:User.username,password:User.password}, function(err,results){
    if(err){
      console.error(err)
    }
    if(results.length == 1){
      console.log('welcome back ' + User.username);
      console.log(results);
      //这里的问题是cookie不能重写，目前只有清除cookie之后才可以用别的账号发布文章，否则不管是不是登录了别的账号，还是最开始的账号
      res.cookie('authorName',User.username);
      res.cookie('authorId',results[0]._id);
      res.redirect('/index')
    }else{
      res.redirect('/login')
    }
  })
});



//发表文章，要检测是否已登陆
router.get('/publish', checkLogin, function (req, res) {
  if(req.cookies.authorId){
    user.find({_id:req.cookies.authorId}, function (err, results) {
      if(err){
        return console.error(err)
      }else{
        res.render('publish',{
          title:'Aloha 写文章啦～_～',
          logged:true,
          user:results[0]
        })
      }
    })
  }else{
    res.redirect('/login')
  }
});

router.post('/publish', checkLogin, function (req, res) {

  var newBlog = req.body.blog;
  var authorId = req.cookies.authorId;
  var authorName = req.cookies.authorName;
  console.log('authorId', authorId);

  var blogObj = new blog({
    articleName:newBlog.articleName,
    articleContent: newBlog.articleContent,
    authorId:authorId,
    authorName:authorName,
    simpleId:++blogItemSum
  });
  blogObj.save(function (err, newblog) {
    if(err){
      return console.error(err)
    }else {
      console.log('published!')
      res.redirect('/index')
    }
  })
})


router.get('/logout', function (req, res) {
  res.clearCookie('authorName');
  res.clearCookie('authorId');
  blog.find({}, function (err, results) {
    if(err) {
      return console.error(err)
    }else{
      res.redirect('/index')
    }
  });
});

router.get('/setting', function (req, res) {
  user.find({_id:req.cookies.authorId}, function (err, results) {
    if(err){
      console.error(err)
    }else{
      res.render('settings',{
        title:'Aloha Setting',
        logged:true,
        user:results[0]
      })
    }
  })
})
module.exports = router;