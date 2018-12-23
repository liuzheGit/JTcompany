/**
 * Created by admin on 2017/7/10.
 */
$(document).ready(function () {

    var openid, subscribe;
    if (window.location.search == '') {

    } else {
        var search = window.location.search.substring(1);
        openid = search.split('&')[0].substring(7);
        subscribe = search.split('&')[1].substring(10);
        localStorage.setItem('ggcs_openid', openid);
        localStorage.setItem('ggcs_subscribe', subscribe);
    }
    if(localStorage.getItem('ggcs_coach_id')){
        window.location.replace('Managerlogin.html','_self');
    }

    var person_id = localStorage.getItem('ggcs_person_id');
    if (person_id) {
        var userTel = localStorage.getItem('ggcs_user_phone');
        var userPwd = localStorage.getItem('ggcs_user_pwd');
        stuLogin(userTel, userPwd);
    }

    //自动填充
    var autoTel;
    var userPhone = localStorage.getItem('ggcs_user_phone');
        //userReset = localStorage.getItem('ggcs-user-reset');
    //autoTel = userPhone ? userPhone:userReset;
    $('#login-tel').val(userPhone);
    //验证手机
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    $('#login-tel').on('blur', function () {
        if (reg.test($(this).val())) {
            $('.red-hint').html('');
        } else(
            $('.red-hint').html('手机号格式错误')
        )
    });
    var base64 = new Base64();
    //学员登录
    $('.stu-login').on('click', function () {
        var tel = $('#login-tel').val(),
            pwd = $('#login-pwd').val();
        if (tel == '' || pwd == '') {
            $('.red-hint').html('请填写您的手机号或者密码');
        } else if (reg.test(tel) == false) {
            $('.red-hint').html('手机号输入有误请重新输入');
        } else {
            pwd = base64.encode(pwd);
            pwd = (hex_md5(pwd)).toUpperCase();
            stuLogin(tel, pwd);
        }
    });

    function stuLogin(tel, pwd) {
        $.ajax({
            type: "post",
            url: URL.login,
            data: JSON.stringify({telephone: tel, salt: pwd, stype: 1}),
            async: false,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var ret = data.ret;
                var info = data.info;
                if (ret.code == 0) {
                    $('.red-hint').html('');
                    localStorage.setItem('ggcs_person_id', info.stuid);
                    localStorage.setItem('ggcs_user_phone', tel);
                    localStorage.setItem('ggcs_user_pwd', pwd);
                    localStorage.setItem('ggcs_user_schoolid', info.school_id);
                    localStorage.setItem('ggcs_user_km', info.km);
                    localStorage.setItem('ggcs_user_schoolname', info.school_name);
                    localStorage.setItem('ggcs_user_rnd', info.rnd);
                    localStorage.setItem('ggcs_user_coach_id', info.coach_id);
                    localStorage.setItem('ggcs_user_class_type', info.class_type);
                    localStorage.setItem('ggcs_user_product_name', info.product_name);
                    var openid = localStorage.getItem('ggcs_openid');
                    //信息绑定和存储openid
                    bingTel(tel,openid,1);
                    localStorage.setItem('ggcs_stype', 1);

                    eflower_alert.show('登录成功', '乖乖约车', function () {
                        window.location.replace('stuHome.html', '_self');
                    });
                } else if (ret.code == -4) {
                    $('.red-hint').html('账号不存在，请先注册后再登录');
                } else {
                    $('.red-hint').html('手机号或密码错误')
                }
            }
        })
    }

});