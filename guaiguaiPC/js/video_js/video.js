$(document).ready(function(){
        $('.btPlayPause').onclick = function(){
            if(v3.paused){
                v3.play();
                this.src="pause.png";
            }else {
                v3.pause();
                this.src="play.png";
            }
        }

        //鼠标离开容器则隐藏按钮，否则显示按钮
        //mouseenter <=> mouseleave
        //mouseover <=> mouseout
        var container = document.querySelector('.item');
        container.on('mouseenter',function(e){
            console.log('鼠标进入...');
            $('.btPlayPause').style.display = 'block';
        })
        container.on('mouseleave',function(){
            console.log('鼠标离开...');
            $('.btPlayPause').style.display = 'none';
        })
})
