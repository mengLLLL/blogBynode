/**
 * Created by MengL on 16/9/22.
 */
$(function(){
  $('.articleName').on('click',function(){
    var articleId = $(this).parent().siblings("input").val();
    console.log('articleId',articleId)
    //$.ajax({
    //  url:"http://localhost:8080/detail",
    //  method:"GET",
    //  data:{
    //    articleId:articleId
    //  },
    //  success:function(response){
    //    console.log(response)
    //  }
    //})
  window.location.href = "/detail?articleId=" + articleId;
  })
})