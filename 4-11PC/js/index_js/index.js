$(document).ready(function() {
 	//三部曲
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
    });
});



