/**
 * Created by admin on 2017/7/10.
 */
$(document).ready(function () {
    if (localStorage.getItem('ggcs_person_id')) {
        var userid = localStorage.getItem('ggcs_person_id');
        getInfo(userid);
    } else {
        eflower_alert.show('您还未登录，请先登录！', '乖乖约车', function () {
            window.open('login.html', '_self')
        })
    }

    function getInfo(userid) {
        $.ajax({
            type: 'post',
            url: URL.listappointment,
            data: JSON.stringify({userid: userid}),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var ret = data.ret;
                var km2Manage, km3Manage;
                var info = data.info;
                if (ret.code == 0) {
                    for (var i = 0; i < info.length; i++) {
                        if (info[i].km == 2) {
                            km2Manage = info[i].list;
                            addManageList(km2Manage, $('#km1'));
                        } else if (info[i].km == 3) {
                            km3Manage = info[i].list;
                            addManageList(km3Manage, $('#km2'));
                        }
                    }
                } else {
                    $('.content-main').css('display', 'none');
                    $('.content-top').css('display', 'none');
                    $('#no-bespeak').css('display', 'block');
                }
                quitBespeak();
            }
        });
    }

//    展示
    function addManageList(list, obj) {
        var userid = localStorage.getItem('ggcs_person_id');
        for (var i = 0; i < list.length; i++) {
            var defaultImg = '../images/defaultImg.png';
            //5大主体
            var orderDiv = $('<div class="order"></div>'),
                orderMain = $('<div class="order-main"></div>'),
                orderBottom = $('<div class="order-bottom"></div>'),
                orderInfo = $('<div class="order-info"></div>'),
                infoMain = $('<div class="info-main"></div>');

            var coachAvatar = $('<div class="coach-avatar">' +
                '<img src="' + list[i].coach_icon + '"></div>');
            var infoTop, btnGroup, payBtn = '', cancelBtn = '', trainBtn = '';
            //如果状态不是1,就是待评价和无效
            if (list[i].state == 1) {
                infoTop = $('<div class="info-top">' +
                    '<div class="coach-name">' + list[i].coach_name + '</div>' +
                    '<div class="info-status status2">等待练车</div></div>');
                //有效且可以取消
                if (list[i].state == 1 && list[i].cancelstate == 1) {
                    cancelBtn = $('<div class="cancel-btn" data-num="' + i + '" classid="' + list[i].class_id + '" detailid="' + list[i].detail_id + '">取消订单</div>');
                    //没有支付显示支付
                    if (list[i].pay_state == 0 && list[i].train_price !== 0) {
                        payBtn = $('<div class="pay-btn">立即支付</div>');
                        //payBtn = $('<a href="../../html/student_html/pay.html" class="payBtn" addTime="'+list[i].add_time+'">去支付</a>');
                    }
                } else {
                    //trainBtn = $('<div class="train-btn">开始练车</div>')
                }
                btnGroup = $('<div class="btn-group"></div>');
                //btnGroup.append(cancelBtn).append(payBtn).append(trainBtn);
                btnGroup.append(cancelBtn).append(payBtn);
            } else if (list[i].state == 4) {
                infoTop = $('<div class="info-top">' +
                    '<div class="coach-name">' + list[i].coach_name + '</div>' +
                    '<div class="info-status status1">已经完成</div></div>');
                if (list[i].comment_state == 1) {
                    btnGroup = $('<div class="btn-group"><a class="eval-btn" <a>已评价</a></div>')
                } else {
                    btnGroup = $('<div class="btn-group"><a class="eval-btn" <a href="userEval.html?type=1&userid=' + userid + '&detailid=' + list[i].detail_id + '">评价</a></div>')
                }
            }else if(list[i].state == 2){
                infoTop = $('<div class="info-top">' +
                    '<div class="coach-name">' + list[i].coach_name + '</div>' +
                    '<div class="info-status status1">已取消</div></div>');
                btnGroup = $('<div class="btn-group"><div class="lose-btn">无效</div></div>')

            } else if(list[i].state == 3){
                infoTop = $('<div class="info-top">' +
                    '<div class="coach-name">' + list[i].coach_name + '</div>' +
                    '<div class="info-status status1">爽约</div></div>');
                btnGroup = $('<div class="btn-group"><div class="lose-btn">无效</div></div>')
            }else {
                infoTop = $('<div class="info-top">' +
                    '<div class="coach-name">' + list[i].coach_name + '</div>' +
                    '<div class="info-status status1">已经完成</div></div>');
                btnGroup = $('<div class="btn-group"><div class="lose-btn">无效</div></div>')
            }
            //info-main的内部
            var dateDiv = $('<div class="date-div info-div"><div class="info-title">培训日期</div><div class="info-val">' + list[i].train_date + '</div></div>'),
                classDiv = $('<div class="class-div info-div"><div class="info-title">培训班次</div><div class="info-val">' + list[i].start_time.substring(0, 5) + "~" + list[i].end_time.substring(0, 5) + '</div></div>'),
                telDiv = $('<div class="tel-div info-div"><div class="info-title">教练电话</div><div class="info-val">' + list[i].coach_phone + '</div></div>'),
                picDiv = $('<div class="pic-div info-div"><div class="info-title">支付金额</div><div class="info-val" style="color: #f00">￥' + list[i].train_price + '</div></div>')

            infoMain.append(dateDiv).append(classDiv).append(telDiv).append(picDiv);
            orderInfo.append(infoTop).append(infoMain);
            orderMain.append(coachAvatar).append(orderInfo);
            orderBottom.append(btnGroup);
            orderDiv.append(orderMain).append(orderBottom);
            $(obj).append(orderDiv);
            $('.coach-avatar img').error(function () {
                $(this).attr('src', defaultImg);
            });
        }
    }

    //取消
    var isClick = false;

    function quitBespeak() {
        $('.cancel-btn').off('click').on('click', function () {
            if (isClick == false) {
                isClick = true;
                var index = $(this).attr('data-num');
                var user = localStorage.getItem('ggcs_person_id');
                var rnd = localStorage.getItem('ggcs_user_rnd');
                var details_id = $(this).attr('detailid');
                var class_id = $(this).attr('classid');
                eflower_alert.show('你确定要取消此次预约？',function(){
                    $.ajax({
                        type: 'POST',
                        url: URL.unsubscribe,
                        timeout: 5000,
                        async: false,
                        data: JSON.stringify({userid: user, detailid: details_id, classid: class_id, rnd: rnd}),
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            isClick = false;
                            if (data.code == 0) {
                                eflower_alert.show('取消成功', '乖乖约车', function () {
                                    $('.active.listTab .info-status').eq(index).html('已经取消').removeClass('status1').addClass('status2');
                                    $('.active.listTab .btn-group').eq(index).html('<div class="lose-btn">无效</div>');
                                })
                            } else {
                                eflower_alert.show(data.msg, '乖乖约车', function () {

                                })
                            }
                        },
                        complete: function (XMLHttpRequest, status) {
                            if (status == 'timeout') {
                                alert('请求超时');
                                isClick = false;
                            }
                        }
                    })
                },function(){
                    isClick = false;
                });
            }

        });
    }

});
