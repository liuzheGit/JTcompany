$(document).ready(function(){
	
	$('.answer li').click(function(){
		//如果答对  提示
		var $toastContent;
		// 此处  添加 判断 答题 是否正确的 条件
		if(false){
			$toastContent = $('<span>恭喜您，答对了</span>');
		}else{
			$toastContent = $('<span>很遗憾，答错了</span>');
		}
  		Materialize.toast($toastContent, 500);
  		$(this).siblings().removeClass('orange lighten-1  white-text');
		$(this).addClass('orange lighten-1 white-text');
	})
})




