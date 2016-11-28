$(function(){
	$('.deleteBlog').on('click',function(e){
		console.log('click')
		var target = $(e.target);
		var articleId = target.data("id")
    console.log('articleId',articleId)
		var tr =  $('.item-id-' + articleId);
		$.ajax({
			type:'DELETE',
			url:"/admin?id="+articleId
		}).done(function(result){
			if(result.success ===1){
				if(tr.length>0){
					tr.remove()
				}
			}
		})
	})


})