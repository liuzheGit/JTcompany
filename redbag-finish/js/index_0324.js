/**
 * Created by admin on 2017/3/24.
 */
$(document).ready(function () {
    console.log(localStorage);
    function bodyScale() {
        var devicewidth = document.documentElement.clientWidth;
        var scale = devicewidth / 640;
        document.body.style.zoom = scale;
    }

    //加载根据屏幕缩放，
    window.onload = window.onresize = function () {
        bodyScale();
        $('html,body').show();
        //$('.page_rain .for-login').css('display', 'none');
    };
    //红包雨结构不变
    var times = localStorage.getItem('times');  //次数
    var a = 0;
    var num = Math.ceil(Math.random() * 5);
    var Timerr = setInterval(aa, 1000);
    var removepackage = setInterval(function () {
        for (var jj = 0; jj < $('.div>div').size() / 5; jj++) {
            $('.div>div').eq($('.div>div').size() - jj).remove();
        }
    }, 400);
    function aa() {
        for (var i = 0; i < 5; i++) {
            var m = parseInt(Math.random() * 700 + 100);
            var j2 = parseInt(Math.random() * 300 + 1200);
            var j = parseInt(Math.random() * 1600 + 000);
            var j1 = parseInt(Math.random() * 300 + 300);
            var n = parseInt(Math.random() * 10 + (-10));
            $('.div').prepend('<div class="dd"></div>');
            $('.div').children('div').eq(0).css({'left': j, 'top': n});
            $('.div').children('div').eq(0).animate({'left': j - j1, 'top': $(window).height() + 20}, 3000);
        }
    }

    //点击rulBtn modal显示，不变
    $('#ruleBtn').on('click', function () {
        $('.modal').modal();
        $('#rule').modal('open');
    });
    //点击bottom
    //对查询字符串的逻辑
    var str = window.location.search;
    var arr = str.split('&');
    var openid = arr[0].substring(8, arr[0].length);
    var act_id = arr[1].substring(7, arr[1].length);
    //第一个接口，进入页面进行活动的判断
    $.ajax({
        type: "post",
        url: 'http://wx.guaiguaixueche.com/redbag/login',
        data: '{"openid":"' + openid + '","act_id":"' + act_id + '"}',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            //是否有活动  1.无活动； 2.有活动
            //有活动 弹出立即参与的提示  点击在进行登录的判断
            //    有活动可以存一下
            data = {times: 1, activer: 2000, person: 1000, redbag: 1100, code: 0};
            if (data.code == 0) {
                localStorage.setItem('act_id', act_id);
                $('.remaintime').text(data.times);
                $('#onlinepepnum').text(data.activer);
                $('#knumred').text(data.redbag);
                $('#knumpep').text(data.person);
                //等待页
                $('#leijinum').text(data.activer);
                $('#numred').text(data.redbag);
                $('#numpep').text(data.person);
                localStorage.setItem('times',data.times);
            }else {
                $('.for-login').css('display', 'none');
                $('.countbg').css('display', 'block');
                $('.redbagCom').text('本次活动已经结束,敬请期待下次活动');
                $('.countuptext').html('请继续关注乖乖学车,关注最新活动');
            }
        }
    });
    //点击分享码 不变
    $('#share2w').on('tap', function (){
        window.open('http://wx.guaiguaixueche.com/test/share/index.html' + '?openid=' + openid);
    });
    //点击分享码bottom

    //如果没活动
    var time = 10;
    var date3 = 30000;
    var localAct_id = localStorage.getItem('act_id');
    //获取localStorage里边的登录数据
    var localPerson = localStorage.getItem('person_id');
    var localPhone = localStorage.getItem('user_phone');

        $('#join-btn').on('tap', function () {
            if (localPerson) {
                $('.for-login').css('display', 'none');
                //判断时间 是否显示那个页面
                if (time > 100) {
                    $('.countbg').css('display', 'none');
                } else {
                    $('.countbg').css('display', 'block');
                    counttime = setInterval(function () {
                        if (date3 > 0) {
                            date3 = date3 - 1000;
                            if (date3 <= 0) {
                                $('.countbg').css('display', 'none');
                                clearInterval(counttime);
                            }
                            if (date3 > 0) {
                                if (date3 / 600000 == 1 || date3 / 300000 == 1 || date3 / 180000 == 1 || date3 / 60000 == 1 || date3 / 30000 == 1) {
                                    window.open('http://wx.guaiguaixueche.com/redbag/redbag2?openid=' + openid, '_self');
                                }
                            }
                            var thours = parseInt(date3 / (60 * 60 * 1000)) % 24;
                            if (thours < 10) {
                                thours = '0' + thours
                            }
                            var tminutes = parseInt(date3 / 1000 / 60) % 60;
                            if (tminutes < 10) {
                                tminutes = "0" + tminutes
                            }
                            var tseconds = parseInt(date3 / 1000) % 60;
                            if (tseconds < 10) {
                                tseconds = "0" + tseconds
                            }
                            $('#timedate').html(thours + '时' + tminutes + '分' + tseconds + '秒');
                            var date1 = new Date().getTime();
                            //加上对当前的判断
                            //var tenPM = new Date().setHours(22,0,0);
                            var sevenAM = new Date().setHours(9, 0, 0);
                            var eightAM = new Date().setHours(10, 0, 0);
                            //如果大于七点并且小于八点
                            if (sevenAM < date1 && date1 < eightAM) {
                                $('.countbg .redbagCom').text('一大波红包马上来袭');
                                //$('.countuptext').text('请稍等')
                            } else {
                                $('.countbg .redbagCom').text('还没到时间呢，每天早上8点开始');
                                $('.countuptext').text('');
                                $('.countbg').css('display', 'none');
                            }
                            //if (date1 - date2 >= 300000) {
                            //    alert('页面停留时间过久，请刷新一下页面哦');
                            //    window.open('http://wx.guaiguaixueche.com/redbag/redbag2?openid=' + openid, '_self');
                            //}
                        }
                    }, 1000);
                }
            } else {
                $('.start-box').css('display', 'none');
                $('.login-cont-box').css('display', 'block')
            }
        });
        if (!localPerson || !localPhone){
            //登录注册
            //密码是否可见的按钮
            $('#passshow').on('tap', function () {
                if ($('#login-user-pwd_hide').css('display') == 'block') {
                    $('#login-user-pwd_hide').css('display', 'none');
                    $('#login-user-pwd_show').css('display', 'block');
                    $('#login-user-pwd_show').val($('#login-user-pwd_hide').val());
                } else {
                    $('#login-user-pwd_show').css('display', 'none');
                    $('#login-user-pwd_hide').css('display', 'block');
                    $('#login-user-pwd_hide').val($('#login-user-pwd_show').val());
                }
            });
            //登录按钮
            $('#login-btn').on('tap', function () {
                var tel = $('#login-user-tel').val();
                var pwd;
                if ($('#login-user-pwd_hide').css('display') == 'block') {
                    pwd = $('#login-user-pwd_hide').val();
                } else {
                    pwd = $('#login-user-pwd_show').val();
                }
                //判断是否输入
                if (tel == '' || pwd == '') {
                    //dnoclick=false;
                    $('.error-box').eq(2).html('请填写您的手机号或者密码')
                }
                else {//用户账号和密码正确登录验证ajax
                    pwd = (hex_md5(pwd + 'salt_ggxc')).toUpperCase();
                    $.ajax({
                        type: 'post',
                        url: 'https://guaiguaixueche.com/employee/login',
                        data: JSON.stringify({telephone: tel, salt: pwd, openid: openid}),
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            console.log(data);
                            //成功登录后 1.更改次数和其他数字。。。
                            if (data.msgid == -4) {
                                $('.error-box').eq(2).html("账号不存在，请注册后登录！")
                            } else if (data.msgid == -5) {
                                $('.error-box').eq(2).html("手机号或密码有误，请重新输入！")
                            } else if (data.msgid == 0) {
                                //成功
                                $('.error-box').eq(2).html('');
                                $('.for-login').css('display', 'none');
                                // 2.存一下 person_id 和 user_phone
                                localStorage.setItem('person_id', data.msg);
                                localStorage.setItem('user_phone', tel);
                                //改次数
                            }
                        }
                    })
                }
            });
            //当有个人信息的时候
        }
        //判断次数
        $('.chuai').on('tap', function () {
            var person_id = localStorage.getItem('person_id');
            var tel = localStorage.getItem('user_phone');
            $('.chuai_box').css('display', 'block');
            $('.chuai').css('display', 'none');
            $('.win-money').css('display', 'block');
            $('.win-info').html('正在开启红包');
            //拆红包处理
            $.ajax({
                type: 'post',
                url: "http://wx.guaiguaixueche.com/redbag/zhong",
                data: '{"act_id":"' + act_id + '","openid":"' + openid + '","telephone":"' + tel + '","personid":"' + person_id + '"}',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    data = {
                        code: 0,
                        money: 10,
                        cishu: 1
                    };
                    localStorage.setItem('times', data.cishu - 1);
                    if ($('#faceimg')) {
                        $('#faceimg').remove();
                    }
                    $('.win-money').append('<img id="faceing"/>');
                    if (data.code == 0) {
                        $('.chuai_box').show();
                        $('.win-money').css('display', 'block');
                        $('.win-info').html('恭喜您抢得' + data.money + '元' + '<br/>' + '请到乖乖学车公众号红包中领取');
                        $('#faceimg').attr('src', 'img/qiangzhong.png');
                        $('.remaintime').text(data.cishu - 1);
                        $('.chuai_box').on('tap', function () {
                            $('.chuai_box').hide();
                            $('.win-money').css('display', 'none');
                        })
                    }
                    //if(data.code == 5){
                    //    $('.chuai_box').hide();
                    //    $('.win-money').css('display', 'none');
                    //    alert('你的次数为零');
                    //}
                }
            });//判断
            //拆红包函数结束
        });

        $(document).on('touchstart', '.dd', function () {
            if(localStorage.getItem('times')>0){
                $('.chuai_box').show();
                $('.chuai').css('display','block');
            }else {
                    alert('您的中奖次数为0，请点击上方我的分享码分享获取更多次数');
            }
        })
    // 拆红包结束
//信息展示
        function runup() {
            /*以下是列表*/
            $.ajax({
                async: false,
                type: 'post',
                url: "http://wx.guaiguaixueche.com/redbag/zlist",
                data: '{"act_id":"' + act_id + '"}',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    //活动关注人数
                    $('#onlinepepnum').text(data.activer);
                    $('#knumred').text(data.redbag);
                    $('#knumpep').text(data.person);
                    //等待页面
                    $('#leijinum').text(data.activer);
                    $('#numred').text(data.redbag);
                    $('#numpep').text(data.person);


                    if (data.list.length == 0) {
                        $('.no-winner').css('display', 'block');
                        $('.list-info').css('display', 'none');
                    } else if (data.list.length > 4) {//信息数量大于4
                        $('.no-winner').css('display', 'none');
                        $('.list-info').css('display', 'block');

                        if ($('.winli')) {//判断是否有信息
                            if ($('.winli').length < data.list.length) {//长度小于等于增加新数据
                                var addwinli = data.list.slice($('.winli').length);//增加的新数据截取保存数组

                                for (var i = 0; i < addwinli.length; i++) {
                                    var m;
                                    var money = addwinli[i].money;
                                    var phone = addwinli[i].phone;
                                    var phone2 = phone.substring(0, 3) + '****' + phone.substring(7, 11);
                                    if (money % 100 == 0) {
                                        m = money / 100 + '.00';
                                    } else {
                                        m = (money / 100).toFixed(2);
                                    }
                                    var oLi = $('<li class="winli"><b class="winner-tel">' + phone2 + '</b><span class="winner-money">' + m + '</span></li> ');
                                    $('#top ul').append(oLi);
                                }
                            }
                        } else {//不存在旧数据或者第一次进入，直接循环添加数据
                            for (var i = 0; i < data.list.length; i++) {
                                var m;
                                var money = data.list[i].money;
                                var phone = data.list[i].phone;
                                var phone2 = phone.substring(0, 3) + '****' + phone.substring(7, 11);
                                if (money % 100 == 0) {
                                    m = money / 100 + '.00';
                                } else {
                                    m = (money / 100).toFixed(2);
                                }
                                var oLi = $('<li class="winli"><b class="winner-tel">' + phone2 + '</b><span class="winner-money">' + m + '</span></li> ');
                                $('#top ul').append(oLi);
                            }
                        }//添加数据结束
                        //以下是不断滚动的效果
                        var interval = 1000;//两次滚动之间的时间间隔
                        //var stepsize=35;//滚动一次的长度，必须是行高的倍数,这样滚动的时候才不会断行
                        var stepsize = 36;
                        var objInterval = null;
                        $("#bottom").html($("#top").html());
                        StartScroll();
                        function StartScroll() {
                            objInterval = setInterval(verticalloop, interval);
                        }
                        function StopScroll() {
                            window.clearInterval(objInterval);
                        }
                        function verticalloop() {
                            //判断是否上部内容全部移出显示区域
                            //如果是，从新开始;否则，继续向上移动
                            if ($("#content").scrollTop() >= $("#top").outerHeight()) {
                                $("#content").scrollTop($("#content").scrollTop() - $("#top").outerHeight());
                            }
                            //使用jquery创建滚动时的动画效果
                            $("#content").stop(true).animate(
                                {"scrollTop": $("#content").scrollTop() + stepsize + "px"}, 1000);
                        }
                    } else if (data.list.length <= 4) {//信息数量小于4
                        $('#top ul').empty()
                        $('.no-winner').css('display', 'none');
                        $('.list-info').css('display', 'block');
                        for (var i = 0; i < data.list.length; i++) {
                            var m;
                            var money = data.list[i].money;
                            var phone = data.list[i].phone;
                            var phone2 = phone.substring(0, 3) + '****' + phone.substring(7, 11);
                            if (money % 100 == 0) {
                                m = money / 100 + '.00';
                            } else {
                                m = (money / 100).toFixed(2);
                            }
                            var oLi = $('<li><b class="winner-tel">' + phone2 + '</b><span class="winner-money">' + m + '</span></li>');
                            $('#top ul').append(oLi);
                        }
                    }
                }
            })
        }//移动函数
        runup();
        setInterval(runup, 10000);
});