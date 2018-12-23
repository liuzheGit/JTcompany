/**
 * Created by admin on 2017/7/26.
 */
var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载
    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
    // 以下代码是用javascript强行关闭当前页面
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}
//微信扫一扫配置
var signData = {};
var windowHref = window.location.href;
$.ajax({
    async: false,
    type: 'post',
    url: "https://guaiguaixueche.com/ggtools/wxsign",
    data: JSON.stringify({url: windowHref}),
    contentType: 'application/json;charset=utf-8',
    success: function (data) {
        signData = {
            "verifyAppId": 'wx31c78285677a7222',
            "verifyTimestamp": data.timestamp,
            "verifySignType": "sha1",
            "verifyNonceStr": data.nonceStr,
            "verifySignature": data.signature
        };
        wx.config({
            beta: true,
            debug: false,
            appId: 'wx31c78285677a7222',
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                //微信限制
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'hideMenuItems',

                'scanQRCode',	//扫描二维码
                "openWXDeviceLib",      //初始化设备库（只支持蓝牙设备）
                "closeWXDeviceLib",     //关闭设备库（只支持蓝牙设备）
                "getWXDeviceInfos",     //获取当前用户已绑定的蓝牙设备列表
                "sendDataToWXDevice",   //发送数据给设备
                "startScanWXDevice",    //扫描设备（无论绑定还是未被绑定的设备都会扫描到）
                "stopScanWXDevice",     //停止扫描设备
                "connectWXDevice",      //连接设备
                "disconnectWXDevice",   //断开设备连接
                "getWXDeviceTicket",    //获取绑定或解绑硬件的操作凭证

                "onWXDeviceBindStateChange",    //监听硬件设备绑定状态
                "onWXDeviceStateChange",        //监听连接状态，可以监听连接中、已连接、连接断开
                "onReceiveDataFromWXDevice",    //监听接收来自硬件设备的数据
                "onScanWXDeviceResult",         //监听扫描到的设备
                "onWXDeviceBluetoothStateChange"  //监听手机蓝牙打开或关闭
            ]
        })
    }
});
