
$(function(){

	var hasMore = $('.project').find('.more-info');
	
	$('.project').hover(function(){
		if(hasMore.length>0){
			$(this).find('.more-info').fadeIn();
		}else{
			return;
		}
	},function(){
		if(hasMore.length>0){
			$(this).find('.more-info').fadeOut();
		}
	});
	
});