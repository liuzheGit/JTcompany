/**
 * Created by admin on 2017/7/11.
 */
$(document).ready(function () {
    if (localStorage.getItem('ggcs_person_id')) {
        var school_id = localStorage.getItem('ggcs_user_schoolid');
        var km = localStorage.getItem('ggcs_user_km');
        $.ajax({
            type: "POST",
            url: URL.listCoach,
            data: JSON.stringify({school_id: school_id, km: km}),
            contentType: 'application/json;charset=utf-8',
            async: false,
            success: function (data) {
                var user_coach_id = localStorage.getItem('ggcs_user_coach_id');
                var ret = data.ret;
                var coachList = data.list;
                var km2Coach, km3Coach;
                if (ret.code == 0) {
                    for (var i = 0; i < coachList.length; i++) {
                        if (coachList[i].km == 2) {
                            var resultKm2Coach = [];
                            km2Coach = coachList[i].list;
                            for (var j = 0; j < km2Coach.length; j++) {
                                if (user_coach_id == km2Coach[j].userid) {
                                    resultKm2Coach.push(km2Coach[j]);
                                }
                            }
                            if (resultKm2Coach.length == 0) {
                                resultKm2Coach = km2Coach;
                            }
                            addcoachlist(resultKm2Coach, $('#km1'));
                        } else if (coachList[i].km == 3) {
                            var resultKm3Coach = [];
                            km3Coach = coachList[i].list;
                            for (var k = 0; k < km3Coach.length; k++) {
                                if (user_coach_id == km3Coach[k].userid) {
                                    resultKm3Coach.push(km3Coach[k]);
                                }
                            }
                            if (resultKm3Coach.length == 0) {
                                resultKm3Coach = km3Coach;
                            }
                            addcoachlist(resultKm3Coach, $('#km2'));
                        }
                    }
                } else {
                    eflower_alert.show('暂无教练信息', '乖乖约车', function () {

                    })
                }
            }
        })
    } else {
        eflower_alert.show('您还未登录，请先登录！', '乖乖约车', function () {
            window.open('login.html', '_self')
        })
    }


    function addcoachlist(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            var mainItem = $('<div class="main-item"></div>');
            var itemTop;
            if (arr[i].km == 2) {
                itemTop = $('<div class="item-top">' +
                    '<div class="coach-name">' + arr[i].user_name + '</div>' +
                    '<div class="coach-km">科目二</div></div>');
            } else if (arr[i].km == 3) {
                itemTop = $('<div class="item-top">' +
                    '<div class="coach-name">' + arr[i].user_name + '</div>' +
                    '<div class="coach-km">科目三</div></div>');
            }
            var itemBottom = $('<div class="item-bottom">' +
                '<a href="tel:' + arr[i].telephone + '"><img src="../images/1_09.png">' +
                '<div class="text">联系教练</div></a>' +
                '<a coachId="' + arr[i].userid + '" href="subTrain.html?coach_id=' + arr[i].userid + '&user_name=' + arr[i].user_name + '&tel=' + arr[i].telephone + '&user_pic=' + arr[i].user_pic + '&km=' + arr[i].km + '" class="subBtn">' +
                '<img src="../images/1_11.png"><div class="text">我要预约</div></a></div>');
            mainItem.append(itemTop).append(itemBottom);
            $(obj).append(mainItem);
            var yycoach = localStorage.getItem('ggcs_user_yycoach');

            $('.item-bottom .subBtn').off().on('click', function (e) {
                var user_coach_id = localStorage.getItem('ggcs_user_coach_id');
                var coachId = $(this).attr('coachId');
                var isClick = false;
                if (yycoach == 0 && user_coach_id !== coachId && isClick == false) {
                    isClick = true;
                    $(this).removeAttr('href');
                    eflower_alert.show('只有驾校分配给学员的教练才能预约哦！', '乖乖约车', function () {
                        isClick = false;
                    });
                }
            })


        }
    }
});