/**
 * Created by MengL on 16/9/22.
 */
$(function(){
  var url = window.location.href;
  var articleId = url.split('=')[1];
  $('#hiddenArticleId').val(articleId);
  console.log($('#hiddenArticleId').val())
})