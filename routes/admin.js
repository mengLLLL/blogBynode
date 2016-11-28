/**
 * Created by MengL on 2016/11/28.
 */
var express = require('express');
var router = express.Router();
var user = require("../models/user.js");
var blog = require("../models/blog.js");
//超级管理员登录
router.get('/admin', function (req, res) {
  res.render('admin');
});

router.get('/admin/blogs', function (req, res) {
  blog.find({}, function (err, results) {
    if(err){
      return console.error(err)
    }
    res.render('admin_blogs',{
      title:'所有博客',
      blogs:results
    })
  })
})
router.delete('/admin', function (req, res) {
  if(req.xhr || req.accepts('json, html') === 'json'){
    blog.remove({_id:req.query.articleId}, function (err, msg) {
      console.log('delete msg', msg);
      res.redirect('back');
    })
  }
})

module.exports = router;