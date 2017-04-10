$(document).ready(function() { 

 	//三部曲之一
    var item2Right = $('.options .vip').css('right');
    var item3Right = $('.options .chaozhi').css('right');
    var a = 0;
    function changeFn(){
        if(a == 0){
            $('.options .vip').animate({right:item3Right});
            $('.options .chaozhi').animate({right:item2Right});
            a = 1;
        }else{
            $('.options .vip').animate({right:item2Right});
            $('.options .chaozhi').animate({right:item3Right});
            a = 0;
        }
    }
    var myinterval = window.setInterval(changeFn,4000);
    $('.options .item').mouseenter(function(){
        //debugger;
        window.clearInterval(myinterval);
    });
    $('.options .item').mouseleave(function () {
        myinterval = window.setInterval(changeFn,4000);
    })
	//三部曲之一end



});

//滚动显示
var options = [
	{selector: '.xie_img', offset: 100, callback: function(el) {
		Materialize.fadeInImage($(el));
    }},
    {selector: '.idx-img1', offset: 100, callback: function(el) {
		Materialize.fadeInImage($(el));
    }},
    {selector: '.idx-img2', offset: 200, callback: function(el) {
		Materialize.fadeInImage($(el));
    }},
    {selector: '.idx-img3', offset: 34, callback: function(el) {
		Materialize.fadeInImage($(el));
    }},
    {selector: '.gg-footer', offset: 50, callback: function(el) {
		Materialize.fadeInImage($(el));
    }},
    
];
Materialize.scrollFire(options);


