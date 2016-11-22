/**
 * Created by MengL on 2016/11/17.
 */

//每个页面都要包含这个文件
$(function () {


  $('#login-new').click(function (e) {
    e.preventDefault();
    $(this).siblings('a').removeClass('active')
    $('.login-new').show();
    $('.login-old').hide();
    $(this).addClass('active');
  })
  $('#login-old').click(function (e) {
    e.preventDefault();
    $(this).siblings('a').removeClass('active')
    $('.login-old').show();
    $('.login-new').hide();
    $(this).addClass('active');
  })




  $('.page-header').click(function () {
    window.location.href = '/index'
  })

  $('#avatar').click(function () {
    if($('.m-dropdown').css('display') == 'none'){
      $('.m-dropdown').show()
    }else {
      $('.m-dropdown').hide()
    }
  })


  $('.articleName').on('click',function(){
    var articleId = $(this).parent().siblings("input").val();
    console.log('articleId',articleId)
    window.location.href = "/detail?articleId=" + articleId;
  })
})
