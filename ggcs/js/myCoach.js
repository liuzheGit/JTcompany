/**
 * Created by admin on 2017/7/11.
 */
$(document).ready(function () {
    $('#zhuxiao').on('click', function () {
        localStorage.removeItem('ggcs_coach_id');
        localStorage.removeItem('ggcs_coach_rnd');
        localStorage.removeItem('ggcs_coach_pwd');
        //localStorage.removeItem('ggcs_coach_phone');
        localStorage.removeItem('ggcs_coach_schoolid');
        var tel = localStorage.getItem('ggcs_coach_phone');
        var openid = localStorage.getItem('ggcs_openid');
        bingTel(tel,openid,0);
        window.open('Managerlogin.html', '_self');

    });
    if (localStorage.getItem('ggcs_coach_id')) {
        var coachid = localStorage.getItem('ggcs_coach_id'),
            phone = localStorage.getItem('ggcs_coach_phone'),
            school_id = localStorage.getItem('ggcs_coach_schoolid'),
            rnd = localStorage.getItem('ggcs_coach_rnd');
        $('#coachname').html(phone);
        //头像处理
//		$('#coachimg').attr('src',coach_img);
        var stu_jindu = [];
        var detail_id = [];
        var class_id = [];
        chongxin(coachid);
        function chongxin(coachid) {
            $.ajax({
                type: 'post',
                url: URL.appointmentList,
                data: JSON.stringify({coachid: coachid}),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    //console.log(data);
                    if (data.ret.code == 0) {
                        var zoclass = data.list;
                        for (var i = 0, t = 1; i < zoclass.length; i++, t++) {
                            if (i == 0) {
                                addclasslist(zoclass[i], $('#tab1'), t);
                            } else if (i == 1) {
                                addclasslist(zoclass[i], $('#tab2'), t);
                            } else if (i == 2) {
                                addclasslist(zoclass[i], $('#tab3'), t);
                            }
                        }

                        $('#tab1 .sign-in').on('click', function () {
                            var index = $('.sign-in').index($(this));
                            signin(index);
                        })
                    } else if (data.ret.code == 1) {
                        $('#tab1').html(data.ret.msg);
                        $('#tab2').html(data.ret.msg);
                        $('#tab3').html(data.ret.msg);
                    }
                }
            })
        }

        //添加班次信息
        function addclasslist(arr, obj, t) {
            $('ul.tabs li:nth-child(' + t + ') a .date').html(arr.train_date);
            for (var i = 0; i < arr.list.length; i++) {
//  			console.log(arr.list[i]);
                if (arr.list[i].list.length > 0) {
                    var yesOrder = false;
                    var main_card = $('<div class="main-card"></div>');
                    var title = $('<div class="title"><span>' + arr.list[i].start_time.slice(0, 5) + '-' + arr.list[i].end_time.slice(0, 5) + '</span><span>剩余可约人数 ' + arr.list[i].left_count + '人</span></div>')
                    var content = $('<div class="content"></div>');
                    for (var k = 0; k < arr.list[i].list.length; k++) {
// 						console.log(arr.list[i].list[k]);
//                        var sign_img;
                        if (arr.list[i].list[k].state == '1') {
                            stu_jindu.push(arr.list[i].list[k].person_id);
                            detail_id.push(arr.list[i].list[k].detail_id);
                            class_id.push(arr.list[i].class_id);
                            //sign_img = $('<img class="sign-in" src="../images/sign-icon.svg">');
                        } else if (arr.list[i].list[k].state == '4') {
                            //sign_img = $('<img src="../images/signed-icon.svg">');
                        } else {
                            //sign_img = $('<img src="../images/sign-icon.svg">');
                        }
                        var stu_name = $('<span class="stu-jindu">' + arr.list[i].list[k].student_name + '</span>');
                        var evaluate = $('<a href="../html/userEval.html?type=2&userid=' + arr.list[i].list[k].person_id + '&detailid=' + arr.list[i].list[k].detail_id + '">评价</a>');
                        var item = $('<div class="item" ></div>');
                        var text1 = $('<div class="text"></div>'),
                            text2 = $('<div class="text"><span>' + arr.list[i].list[k].telephone + '</span><a href="tel:'+arr.list[i].list[k].telephone+'"><img src="../images/phone-icon.svg"></a></div>');
                        //text1.append(sign_img);
                        text1.append(stu_name);
                        if (arr.list[i].list[k].state == '4') {
                            text1.append(evaluate);
                        }
                        item.append(text1);
                        item.append(text2);
                        if (arr.list[i].list[k].state != '2') {
                            content.append(item);
                            yesOrder = true;
                        }
                    }
                    main_card.append(title);
                    main_card.append(content);
                    if (yesOrder == true) {
                        obj.append(main_card);
                        $('.gg-page-content div:nth-child(' + t + ') .no-stu').addClass('dis_none');
                    }
                }
            }
        }

        //添加签到功能
        function signin(i) {
            var userid = stu_jindu[i];
            var detail = detail_id[i];
            var classid = class_id[i];
            $.ajax({
                type: 'post',
                url: URL.trainsignin,
                data: JSON.stringify({userid: userid, detailid: detail, bcid: classid, schoolid: school_id}),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
//					console.log(data);
                    if (data.ret.code == '0') {
                        eflower_alert.show('签到成功','乖乖学车',function(){
                            $('.sign-in').eq(i).attr('src', '../images/signed-icon.svg').off('click').parent().append('<a href="../html/userEval.html?type=2&userid=' + userid + '&detailid=' + detail + '">评价</a>');
                        })
                    } else{
                        eflower_alert.show(data.ret.msg, '乖乖学车', function(){});
                    }
                }
            })
        }
    } else {
        eflower_alert.show('您还未登录请先登录');
        window.open('../html/Managerlogin.html','_self');
    }
})
