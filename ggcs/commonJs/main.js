// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载
    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
    // 以下代码是用javascript强行关闭当前页面
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}

//微信配置
var url2 = window.location.href;
$.ajax({
    async:false,
    type:'post',
    url:"https://guaiguaixueche.com/ggtools/wxsign",
    data:JSON.stringify({url:url2}),
    contentType:'application/json;charset=utf-8',
    success:function(data){
        wx.config({
            debug: false,
            appId: 'wx31c78285677a7222',
            timestamp: data.timestamp,
            nonceStr:data.nonceStr,
            signature:data.signature,
            jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'hideMenuItems'

            ]
        })
    }
});
wx.ready(function () {
    wx.hideMenuItems({
        menuList:['menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook',
            'menuItem:share:QZone',
            'menuItem:copyUrl',
            'menuItem:openWithQQBrowser',
            'menuItem:openWithSafari']
    });
});