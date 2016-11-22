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

var userModel = require('../models/user');
var formidable = require('formidable');
var util = require('util');
var path = require('path')
var fs = require('fs')


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
      req.flash('info','login')
      res.redirect('/index')
    }else{
      req.flash('error','用户名或密码错误')
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
          user:results[0],
          avatar:results[0].avatar
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
    authorName:authorName
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
        user:results[0],
        avatar:results[0].avatar
      })
    }
  })
});

//上传头像
router.post('/upload', function (req, res) {
  //var avatar = req.files[0].path.split(path.sep).pop();
  //var avatar = req.files.avatar.path.split(path.sep).pop();
  //console.log(avatar)
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(process.cwd(),'public/img/');
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    if(err){
      res.redirect('index');
    }
    var extName = '';
    switch (files.avatar.type){
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }
    if(extName.length == 0){
      res.redirect('/setting');
      return;
    }
    var avatarName = req.cookies.authorName + '-' + Math.ceil(Math.random()*10000000) + '.' + extName;
    var newPath = form.uploadDir + avatarName;
    console.log('avatarName',avatarName)
    console.log('newpath',newPath);
    //意义何在
    fs.renameSync(files.avatar.path, newPath);

    user.find({_id:req.cookies.authorId}, function (err, results) {
      if(err){
        console.error(err)
      }else{
        var avatarPath = 'img/'+avatarName;
        console.log('avatarPath', avatarPath);
        user.update({_id:req.cookies.authorId},{$set:{avatar:avatarPath}},function(err){})
        res.render('settings',{
          title:'Aloha Setting',
          logged:true,
          user:results[0],
          avatar:avatarPath
        })
      }
    })

  })

});
//更新用户信息
router.post('/update', function (req, res) {
  var newMsg = req.body.user;
  user.find({username:newMsg.username}, function (err, results) {
    if(err){
      return console.error(err)
    }
    if(results.length>0){
      //数据库中有此用户
      console.log('have this')
      user.find({_id:req.cookies.authorId}, function (err, results) {
        if(err){
          return console.error(err)
        }
        if(results.length == 1){
          //也就是没有改用户名,是同一个用户
          console.log('same user');
          //TODO 总结一下更新
          user.update({_id:req.cookies.authorId},{$set:{password:newMsg.password}}, function (err) {});
          res.redirect('/setting')
        }else{
          console.lor('not same user,please change')
          res.redirect('/setting');
          req.flash('error','用户名已存在')
          return console.error('用户名已存在')
        }
      })
    }else{
      user.update({_id:req.cookies.authorId},{$set:{username:newMsg.username, password:newMsg.password}}, function (err) {})
      console.log('update success!');
      res.redirect('/setting')
    }
  })
})


//不用ajax实现的缺点是每提交一次评论并不能立即刷新评论部分，而是要整个页面刷新才可以看到刚刚发表的评论
//router.post('/comment', checkLogin, function(req, res){
//  var articleId = req.body.comment.articleId;
//  blog.find({_id: articleId}, function (err, blogResults) {
//    if(err){
//      return console.error(err)
//    }else{
//      user.find({_id:req.cookies.authorId}, function (err, userResults) {
//        if(err){
//          return console.error(err)
//        }else{
//          console.log('comment',req.body)
//          blogResults[0].comments.push({
//            commentName: userResults[0].username,
//            commentContent:req.body.comment.content,
//            commentId:44
//          })
//          blogResults[0].save();
//          console.log('blog comment save',blogResults[0]);
//          //res.redirect('/detail')
//        }
//      })
//    }
//  })
//
//})

router.post('/comment', function (req, res) {
  var results={};
  if(req.xhr || req.accepts('json,html') ==='json'){
    blog.find({_id:req.body.articleId}, function (err, blogResults) {
      if(err){
        return console.error(err)
      }else{
        user.find({_id: req.cookies.authorId}, function (err, userResults) {
          if(err){
            return console.error(err)
          }else{
            blogResults[0].comments.push({
              commentName:userResults[0].username,
              commentContent:req.body.commentContent,
              commentId:blogResults[0].comments.length+1
            });
            blogResults[0].save();
            results.comments = blogResults[0].comments;
            results.commentUser = userResults[0]
            res.send({
              results:results,
              success:true
            })
          }
        })
      }
    });
  }
});


module.exports = router;