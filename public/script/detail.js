/**
 * Created by MengL on 16/9/22.
 */
$(function(){
  $('.blogDetail').on('click',function(){
    var articleId = $(this).parent('td').next().val();
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