$(document).ready(function(){
	$('.km4-top').click(function(){
		$('.km1-top').removeClass('exam-top-km');
		$(this).addClass('exam-top-km');
		$('#km1-llmn').removeClass('tckm-active');
		$('#km4-llmn').addClass('tckm-active');
	});
	$('.km1-top').click(function(){
		$('.km4-top').removeClass('exam-top-km');
		$(this).addClass('exam-top-km');
		$('#km4-llmn').removeClass('tckm-active');
		$('#km1-llmn').addClass('tckm-active');
	});
	$('.km1-ks').click(function(){
		$('km1-qrks').addClass('exam-tcks-act');
	})
	$()
	$('.km4-ks').click(function(){
		$('km4-qrks').addClass('exam-tcks-act');
	})
})





