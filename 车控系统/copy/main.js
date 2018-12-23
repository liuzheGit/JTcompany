/**
 * Created by admin on 2017/7/27.
 */
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