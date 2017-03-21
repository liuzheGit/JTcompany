//防止页面刷新倒计时失效
/**
 * 
 * @param  obj  获取验证码按钮
 */
function monitor(obj) {
    var LocalDelay = getLocalDelay();
    var timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
    if (timeLine > LocalDelay.delay) {
        console.log("过期");
    } else {
        _delay = LocalDelay.delay - timeLine;
        obj.text(_delay).addClass("code-disabled");
        var timer = setInterval(function() {
            if (_delay > 1) {
                _delay--;
                obj.text(_delay);
                setLocalDelay(_delay);
                console.log(obj.val())
            } else {
                clearInterval(timer);
                obj.text("获取验证码").removeClass("code-disabled");
            }
        }, 1000);
    }
};




//设置setLocalDelay
function setLocalDelay(delay) {
    //location.href作为页面的唯一标识，可能一个项目中会有很多页面需要获取验证码。
    localStorage.setItem("delay_" + location.href, delay);
    localStorage.setItem("time_" + location.href, new Date().getTime());
}

//getLocalDelay()
function getLocalDelay() {
    var LocalDelay = {};
    LocalDelay.delay = localStorage.getItem("delay_" + location.href);
    LocalDelay.time = localStorage.getItem("time_" + location.href);
    return LocalDelay;
}