/**
 * Created by MengL on 2016/11/28.
 */
var express = require('express');
var router = express.Router();
var user = require("../models/user.js");
var blog = require("../models/blog.js");
//超级管理员登录
router.get('/admin', function (req, res) {
  if(req.cookies.authorName == "" || req.cookies.authorName !=='admin'){
    res.redirect('/index');
  }
  if(req.cookies.authorName == 'admin'){
    res.render('admin',{
      admin_title:'超级管理员！哈哈'
    });
  }
});

// TODO 如果改成/admin/blogs会出现静态资源找不到的问题
router.get('/blogs', function (req, res) {
  blog.find({}, function (err, results) {
    if(err){
      return console.error(err)
    }
    res.render('adminBlogs',{
      title:'Aloha',
      admin_title:'所有博客',
      blogs:results
    })
  })
});


router.get('/users', function (req, res) {
  user.find({}, function (err, users) {
    if(err){
      return console.error(err)
    }
    res.render('admin_users',{
      title:"Aloha",
      admin_title:'所有用户',
      users:users
    })
  })
})
//删除博客或用户
router.delete('/admin', function (req, res) {
  if(req.xhr || req.accepts('json, html') === 'json'){
    if(req.body.type ==="blog"){
      blog.remove({_id:req.body.id}, function (err, msg) {
        if(err){
          return console.error(err)
        }
        res.send({
          success:true
        })
      })
    }
    if(req.body.type === "user"){
      user.remove({_id:req.body.id}, function (err, msg) {
        if(err){
          return console.error(err)
        }
        res.send({
          success:true
        })
      })
    }
  }
});


module.exports = router;
