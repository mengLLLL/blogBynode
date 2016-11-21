/**
 * Created by MengL on 2016/11/16.
 */
module.exports = function (app) {

  //app.use('/', require('./tourist'));
  //首页
  app.get('/index', require('./tourist'));
  app.get('/login', require('./tourist'));
  app.post('/register', require('./tourist'));
  app.get('/detail', require('./tourist'));

  app.post('/login', require('./registeredUser'));
  app.post('/publish', require('./registeredUser'));
  app.get('/publish', require('./registeredUser'));
  app.get('/logout', require('./registeredUser'));
  app.get('/setting', require('./registeredUser'));
  app.post('/upload', require('./registeredUser'));
  app.post('/update', require('./registeredUser'));
  app.post('/comment', require('./registeredUser'));
}