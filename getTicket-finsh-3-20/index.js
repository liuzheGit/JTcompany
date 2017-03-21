$(document).ready(function () {
    //获取本页信息的请求
    var name = [], price = [], startTime = [], endTime = [], couponID = [], dataLength,haveClick=[],getTic =[];
    $(window).load(function () {
        var userinfostr = window.location.search;
        var openidAll = userinfostr.split('=')[1];
        var openid = openidAll.split('&')[0];
        var getData = {openid:openid};
        $.ajax({
            type: 'POST',
            async: false,
            url: 'https://guaiguaixueche.com/coupon/getlist',
            data: JSON.stringify(getData),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.list.length; i++) {
                    name.push(data.list[i].coupon_name);
                    price.push(data.list[i].coupon_price);
                    haveClick.push(data.list[i].state);
                    var splitEndTime = data.list[i].end_time.split(' ')[0];
                    var splitStartTime = data.list[i].start_time.split(' ')[0];
                    endTime.push(splitEndTime);
                    startTime.push(splitStartTime);
                    couponID.push(data.list[i].coupon_id);
                    //判断是否领取过
                    getTic = $('#favor .getTicket');
                    if(haveClick[i] > 0){
                        $(getTic[i]).text('').css('display', 'none');
                        $(getTic[i]).wrap('<div>已领取</div>');
                        $(getTic[i]).parent().css({
                            'background-color': 'gray',
                            'font-size': '0.9em',
                            'margin': '0 30px',
                            'color': 'white',
                            'padding': '8px 0'
                        });
                    }
                }
                dataLength = data.list.length;

                //当数据只有一条的时候
                if (dataLength == 1) {
                    $('.vip-lf p').text(name[0]);
                    $('.vip-lf span').text('有效期:' + startTime[0] + '/' + endTime[0]);
                    $('.vip-rt p').html('<span>&yen;</span>' + price[0]);

                    $('.gnr-lf p').text('VIP班通用券');
                    $('.gnr-lf span').text('');
                    $('.gnr-rt p').html('<span>&yen;</span>' +200);
                    $('#favor .tDef').text('').css('display', 'none');
                    $('#favor .tDef').wrap('<div>不可用</div>');
                    $('#favor .tDef').parent().css({
                        'background-color': 'gray',
                        'font-size': '0.9em',
                        'margin': '0 30px',
                        'color': 'white',
                        'padding': '8px 0'
                    });
                } else {
                    $('.vip-lf p').text(name[0]);
                    $('.vip-lf span').text('有效期:' + startTime[0] + '/' + endTime[0]);
                    $('.vip-rt p').html('<span>&yen;</span>' + price[0]);

                    $('.gnr-lf p').text(name[1]);
                    $('.gnr-lf span').text('有效期:' + startTime[1] + '/' + endTime[1]);
                    $('.gnr-rt p').html('<span>&yen;</span>' + price[1]);
                }
                //当活动结束
                if (data.msgid == -1) {
                    var msg = '非常抱歉，活动已结束';
                    localStorage.mark = '-1';
                    Materialize.toast(msg, 1000, '', function () {
                        $('#toast-container').remove();
                    });
                    $('.vip-lf p').text('VIP优惠券');
                    $('.vip-lf span').text('有效期:2017-03-15/2017-03-24');
                    $('.vip-rt p').html('<span>&yen;</span>200');

                    $('.gnr-lf p').text('普通优惠券');
                    $('.gnr-lf span').text('有效期:2017-03-15/2017-03-24');
                    $('.gnr-rt p').html('<span>&yen;</span>50');
                    $('#favor .getTicket').text('').css('display', 'none');
                    $('#favor .getTicket').wrap('<div>已结束</div>');
                    $('#favor .getTicket').parent().css({
                        'background-color': 'gray',
                        'font-size': '0.9em',
                        'margin': '0 30px',
                        'color': 'white',
                        'padding': '8px 0'
                    });
                }
            }
        });
        //领取优惠券
        $('.getTicket').click(function (e) {
            var eClassName = e.target.className;
            var couponID2;
            $(e.currentTarget).text('').css('display', 'none');
            $(e.currentTarget).wrap('<div>已参加</div>');
            $(e.currentTarget).parent().css({
                'background-color': 'gray',
                'font-size': '0.9em',
                'margin': '0 30px',
                'color': 'white',
                'padding': '8px 0'
            });
            if (eClassName.indexOf('tVip') == -1) {
                couponID2 = couponID[1];
            } else {
                couponID2 = couponID[0];
            }
            var sendData = {"openid": openid, "coupon_id": couponID2};
            $.ajax({
                type: 'POST',
                url: 'https://guaiguaixueche.com/coupon/get_coupons_info',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(sendData),
                dataType: 'json',
                success: function (data) {
                    //不同的返回字段不同的msg
                    var msg = data.msgid;
                    switch (msg) {
                        case 0:
                            msg = '恭喜你，领取成功了';
                            break;
                        case -1:
                            msg = '非常抱歉，该活动已结束';
                            break;
                        case -2:
                            msg = '不好意思，你领取失败了';
                            break;
                        case -3:
                            msg = '抱歉，您的微信号不能为空';
                            break;
                        case -4:
                            msg = '非常抱歉，缺少活动信息';
                            break;
                        case -5:
                            msg = '非常抱歉，该活动已结束';
                            break;
                        case -6:
                            msg = '您已参加，不能重复参加';
                            break;
                        case -7:
                            msg = '非常抱歉，活动发生错误';
                            break;
                        case -8:
                            msg = '手慢了，活动已经结束';
                            break;
                    }
                    var $toastContent = $('<div>' + msg + '</div>');
                    Materialize.toast($toastContent, 3200, '', function () {
                        $('#toast-container').remove();
                    });
                }
            });
        });
        //查看优惠券
        $('.favor-look').click(function () {
            window.location.href = 'favor-find.html?openid=' + openid;
        });

    })
})