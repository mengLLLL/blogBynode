/**
 * Created by MengL on 2016/11/17.
 */

//每个页面都要包含这个文件
$(function () {
  $('body').mousewheel(function (e) {
    //console.log(e.deltaX, e.deltaY)
    if (e.deltaY >= 0) {
      $('.detail-header').show()
    } else {
      $('.detail-header').hide()
    }
  })

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

  var flag = 1;
  //TODO 这里要修改一下
  $('#avatar').click(function (e) {

    e.preventDefault();
    console.log(flag)
    flag *= -1;
    if (flag < 0) {
      $('.m-dropdown').show();

    } else {
      $('.m-dropdown').hide();
    }
  })


  $('.articleName').on('click', function () {
    var articleId = $(this).parent().siblings("input").val();
    console.log('articleId', articleId)
    window.location.href = "/detail?articleId=" + articleId;
  })


  //setting part
  $('.setting-tabs a').click(function () {
    $('.setting-tabs a').removeClass('active');
    $(this).addClass('active');
    console.log($(this).attr('rel'));
    $('form').hide()
    $("#" + $(this).attr('rel') + "").show();
  })


  //upload avatar
  $('#triggerUpload').click(function () {
    $('#picture').click();
    $('#picture').on('change', function () {
      $('#upload').click();
    })
  })

  //sidebar part
  $('.sidebar .has-hover').hover(function () {
    $(this).children($('.hover-tips')).show()
  }, function () {
    //$(this).children($('.hover-tips')).hide()
    $(this).children().first().hide()
    console.log()
  })

  $('.deleteBlog').click(function (e) {
    var obj = {};
    console.log('click')
    var target = $(e.target);
    var Id = target.data("id");
    obj.id = Id;
    obj.type = "blog";
    var tr = $('.item-id-' + Id);
    $.ajax({
      data: obj,
      type: 'DELETE',
      dataType: 'json',
      url: "/admin",
      success: function (result) {
        if (result.success === true) {
          console.log('删除成功！')
          tr.remove();
        }
      }
    })
  })


  $('.deleteUser').click(function (e) {
    var obj = {};
    console.log('click')
    var target = $(e.target);
    var Id = target.data("id");
    obj.id = Id;
    obj.type = "user";
    var tr = $('.item-id-' + Id);
    $.ajax({
      data: obj,
      type: 'DELETE',
      dataType: 'json',
      url: "/admin",
      success: function (result) {
        if (result.success === true) {
          console.log('删除成功！')
          tr.remove();
        }
      }
    })
  })

  //publish page
  $("#createArticle").click(function () {
    console.log('createArtilce click')
    $('.publish-container .blog-panel').hide();
    $('.default-panel').hide();
    $('#newBlog').show()
  })

  $('#blogList .blog-item').click(function () {
    $('#newBlog').hide()
    var id = $(this).attr("id");
    var index = $(this).index()
    console.log('id', id,'index', index);
    $('.publish-container .blog-panel').hide();
    $('.publish-container .blog-panel').eq(index-1).show()

  });




})