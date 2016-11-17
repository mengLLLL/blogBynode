/**
 * Created by MengL on 2016/11/16.
 */
module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.cookies.authorName) {
      //req.flash('error', '未登录');
      return res.redirect('/login');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.cookies.authorName) {
      //req.flash('error', '已登录');
      //res.send({
      //  logged:true
      //})
      console.log('already login')
      return res.redirect('/index');//返回之前的页面
    }
    next();
  }
};
