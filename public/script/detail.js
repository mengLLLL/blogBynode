/**
 * Created by MengL on 16/9/22.
 */


var url = window.location.href;
var articleId = url.split('=')[1];
$('#hiddenArticleId').val(articleId);
console.log($('#hiddenArticleId').val());
var obj={};
obj.articleId = articleId;

$('#postComment').on('click', function (e) {
  e.preventDefault();
  console.log('postcomment click')
  obj.commentContent = $('#commentContent').val();
  $.ajax({
    data:obj,
    url:'/comment',
    type:"POST",
    dataType:'json',
    success: function (data) {
      if(data.success){
        console.log('data',data)
        var latest = data.results.comments.length - 1;
        //if($('.comment-list').children().length == 0){
          var html='';
          html = "<li class='comment-item'>" +
            "<div class='comment-avatar'>" +
            "<a class='commentAvatar' href='#'>" +
            "<img src='"+ data.results.commentUser.avatar + "'>" +
            "</a>" +
            "<a href='#' class='comment-username'>" + data.results.commentUser.username +
            "</a>" +
            "<div class='comment-post-time'>" + moment(data.results.comments[latest].commentTime).format('YYYY.MM.DD HH:mm:ss') +
            "</div>" +
            "<div class='comment-content' >" + data.results.comments[latest].commentContent +
            "</div>" +
            "</div>"

          $('.comment-list').append(html);
        //}else{
        //
        //}
      }
    }
  })
});