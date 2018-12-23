/**
 * Created by admin on 2017/7/11.
 */
$(document).ready(function () {
    var showList = [];
    var yueDet = localStorage.getItem('ggcs_person_id');
    var rnd = localStorage.getItem('ggcs_user_rnd');
    var classType = localStorage.getItem('ggcs_user_class_type');
    var productName = localStorage.getItem('ggcs_user_product_name');

    var search = window.location.search.substring(1);
    var searchArr = search.split('&');
    var coachid = searchArr[0].substring(9);
    var userName = decodeURIComponent(searchArr[1].substring(10));
    var tel = searchArr[2].substring(4);
    var userPic = searchArr[3].substring(9);
    if (userPic == '' || userPic == 'null') {
        userPic = '../images/Avatar.png';
    } else {

        userPic='https://school.guaiguaixueche.com/media/'+userPic;

    }
    var km = searchArr[4].substring(3);
    $('.msg-avatar img').attr('src',userPic);
    $('.msg-main .coach-name').html(userName);
    $('.msg-main .coach-tel').html(tel);
    $('.msg-right a').attr('href', 'tel:'+tel);


    if (km == 2) {
        $('.msg-main .msg-km').html('科目二');
    } else if (km == 3) {
        $('.msg-main .msg-km').html('科目三');
    }
    classNew(coachid);
    //获取信息函数
    function classNew(coachid) {
        $.ajax({
            type: "POST",
            url: URL.appointmentList,
            data: {coachid: coachid},
            async: false,
            cache: false,
            success: function (data) {
                var code = data.ret.code;
                if (code == 0) {
                    classesList = data.list;
                    $('.tabs .weekDay1').html(weekDay(2));
                    $('.tabs .weekDay2').html(weekDay(3));
                    $('.tabs .weekDay3').html(weekDay(4));
                    //时间函数
                    for (var i = 0; i < classesList.length; i++) {
                        var trainDate = classesList[i].train_date;
                        trainDate = trainDate.substring(5);
                        $($('.tabs .tab-date')[i]).html(trainDate);
                        if (i == 0) {
                            addclassList(classesList[i].list, $('#day1'));
                        } else if (i == 1) {
                            addclassList(classesList[i].list, $('#day2'));
                        } else if (i == 2) {
                            addclassList(classesList[i].list, $('#day3'));
                        } else if (i == 3) {
                            addclassList(classesList[i].list, $('#day4'));
                        } else if (i == 4) {
                            addclassList(classesList[i].list, $('#day5'));
                        }
                    }
                } else if (code == 1) {
                    $('.content-main').html($('<div class="not-data">此教练暂时没有排班信息</div>'))
                }
            }
        })
    }

    //封装添加到dom
    function addclassList(classesListArr, obj) {
        for (var j = 0; j < classesListArr.length; j++) {
            var train_date = classesListArr[j].train_date;
            var left_count = classesListArr[j].left_count;
            var start_time = classesListArr[j].start_time.substring(0, 5);
            var end_time = classesListArr[j].end_time.substring(0, 5);
            var class_id = classesListArr[j].class_id;
            var valid = classesListArr[j].valid;
            var payPri = classesListArr[j].train_price;
            var yuyuelist = classesListArr[j].list;

            var is_order = 0, state = '';
            if (yuyuelist.length !== 0) {
                for (var k = 0; k < yuyuelist.length; k++) {
                    if (yuyuelist[k].person_id == yueDet) {
                        is_order = 1;
                        if (yuyuelist[k].state == 1 || yuyuelist[k].state == 4) {
                            state = 1;
                            break;
                        } else {
                            state = 2;
                        }
                    }
                }
            }
            var $p1 = $('<p><span class="class-start">' + start_time + '</span>-<span class="class-end">' + end_time + '</span></p>')
            var $p2 = $('<p class="class-pic">￥' + payPri + '</p>');
            var classItem;
            if (is_order == 1 && state == 1) {
                classItem = $('<div class="class-item hasSub"></div>');
                showList.push(classesListArr[j]);
            } else {
                if (left_count > 0 && valid == 1) {
                    classItem = $('<div class="class-item able" class_id="' + class_id + '" traindate="' + train_date + '" startT="'+start_time+'" endT="'+end_time+'"></div>');
                } else {
                    classItem = $('<div class="class-item unable"></div>');
                }
            }
            classItem.append($p1).append($p2);
            $(obj).append(classItem);
        }
        $('.items .able').off().on('click', function () {
            $('.items .able').removeClass('selected');
            $(this).addClass('selected');
        })
    }


    var isClick = false;


    $('.content-bottom .ok-btn').off().on('click', function () {
        var userKm = localStorage.getItem('ggcs_user_km');
        var subscribe = localStorage.getItem('ggcs_subscribe');

        var hasClass = false;
        var $able = $('.active .able');
        for(var i=0;i<$able.length;i++){
            if($($able[i]).hasClass('selected')){
                hasClass = true;
                break;
            }
        }

        if (isClick == false && hasClass == true) {
            if (subscribe == 1) {
                isClick = true;
                var classId = $('.active .selected').attr('class_id');
                var startT = $('.active .selected').attr('startT');
                var endT = $('.active .selected').attr('endT');
                var trainD = $('.active .selected').attr('traindate').substring(5);
                eflower_alert.show('您确定要预约'+trainD+'日<br>'+startT+'-'+endT+'的班次吗？','乖乖学车',function(){
                    yuyueAjax(yueDet, classId,classType,productName);
                }, function () {isClick = false;});
            } else {
                eflower_alert.show('您还没有关注乖乖学车,可能导致您之后的支付无法进行,请先关注哦！', '乖乖学车', function () {
                });
            }
        }
    });

    //处理滚动的DOM
    var $km;
    if (km == 2) {
        $km ='科目二';
    } else if (km == 3) {
        $km ='科目三';
    }
    for(var i=0;i<showList.length;i++){
        var $hintLi = $('<div class="hint-li"></div>');
        var $liKm = $('<span class="li-km">'+$km+'</span>');
        var $liText = $('<span>已安排您<span class="li-date">'+showList[i].train_date+'</span><span class="li-class">'+showList[i].start_time+'</span><span class="li-KM">'+$km+'</span>练习</span>')
        $hintLi.append($liKm).append($liText);
        $('.top-hint .scrollDiv').append($hintLi);
    }


    //预约按钮1
    function yuyueAjax(yueDet, classId, classType,productName) {

        $.ajax({
            type: "POST",
            url: URL.subscribe,
            timeout: 5000,
            data: JSON.stringify({classid: classId, userid: yueDet, rnd: rnd,classType:classType,productName:productName}),
            async: false,
            cache: false,
            contentType: 'application/json;charset=utf-8',
            success: function (data) {

                isClick = false;
                if (data.code == 0) {
                    eflower_alert.show('预约成功，可以去预约管理查看',function(){

                        $('.active .selected').removeClass('able').addClass('hasSub').removeClass('selected').off('click');

                    })
                } else {
                    eflower_alert.show(data.msg,function(){})
                }
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    isClick = false;
                }
            }
        })
    }

    function weekDay(str) {
        var weekText;
        var d = new Date();
        var w = d.getDay() + str;
        w = w >= 7 ? w - 7 : w;

        switch (w) {
            case 0:
                weekText = '周日';
                break;
            case 1:
                weekText = '周一';
                break;
            case 2:
                weekText = '周二';
                break;
            case 3:
                weekText = '周三';
                break;
            case 4:
                weekText = '周四';
                break;
            case 5:
                weekText = '周五';
                break;
            case 6:
                weekText = '周六';
                break;
        }
        return weekText;
    }
    //滚动函数
    function autoScroll(){
        $('.scrollDiv').animate({
            marginTop:'-28px'
        },500,function(){
            $('.scrollDiv').css({marginTop : "-2px"}).find(".hint-li:first").appendTo(this);
        })
    }

    if(showList.length > 2){
        setInterval(autoScroll, 3000);
    }

    //setInterval(autoScroll, 3000);

    $('.content-top .top-hint').on('click',function(){
        window.location.href = 'subManage.html';
    })
});
