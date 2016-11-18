/**
 * Created by MengL on 2016/11/17.
 */

//每个页面都要包含这个文件
$(function () {
  $('.page-header').click(function () {
    window.location.href = '/index'
  })

  //文件上传
  //$('#upload').click(function () {
  //  var picture = $('#picture').val();
  //  if(picture.length == 0){
  //    console.log('please choose a picture');
  //  };
  //  var extName = picture.substring(picture.lastIndexOf('.'),picture.length).toLowerCase()
  //  console.log(extName)
  //  if(extName !='.png' && extName !='.jpg'){
  //    console.log('just png and jpg');
  //  }
  //})


  $('#avatar').click(function () {
    if($('.m-dropdown').css('display') == 'none'){
      $('.m-dropdown').show()
    }else {
      $('.m-dropdown').hide()
    }
  })

})
