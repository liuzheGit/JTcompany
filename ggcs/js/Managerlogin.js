/**
 * Created by admin on 2017/7/10.
 */
$(document).ready(function () {

    var coach_id = localStorage.getItem('ggcs_coach_id');
    if (coach_id) {
        var coachTel = localStorage.getItem('ggcs_coach_phone');
        var coachPwd = localStorage.getItem('ggcs_coach_pwd');
        coachLogin(coachTel, coachPwd);
    }

    //自动填充
    var autoTel;
    var coachPhone = localStorage.getItem('ggcs_coach_phone');
        //coachReset = localStorage.getItem('ggcs-coach-reset');
    //autoTel = coachPhone ? coachPhone:coachReset;
    $('#login-tel').val(coachPhone);

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

    //管理入口登录
    $('.coach-login').on('click', function () {
        var tel = $('#login-tel').val(),
            pwd = $('#login-pwd').val();
        if (tel == '' || pwd == '') {
            $('.red-hint').html('请填写您的手机号或者密码');
        } else if (reg.test(tel) == false) {
            $('.red-hint').html('手机号输入有误请重新输入');
        } else {
            pwd = base64.encode(pwd);
            pwd = (hex_md5(pwd)).toUpperCase();
            coachLogin(tel, pwd);
        }
    });
    function coachLogin(tel, pwd) {
        $.ajax({
            type: "post",
            url: URL.login,
            data: JSON.stringify({telephone: tel, salt: pwd, stype: 2}),
            async: false,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var ret = data.ret;
                var info = data.info;
                if (ret.code == 0) {
                    $('.red-hint').html('');
                    localStorage.setItem('ggcs_coach_id', info.coachid);
                    localStorage.setItem('ggcs_coach_phone', tel);
                    localStorage.setItem('ggcs_coach_pwd', pwd);
                    localStorage.setItem('ggcs_coach_schoolid', info.school_id);
                    localStorage.setItem('ggcs_coach_rnd', info.rnd);
                    var openid = localStorage.getItem('ggcs_openid');
                    //信息绑定和存储openid
                    bingTel(tel,openid,1);
                    localStorage.setItem('schoolid', info.school_id);
                    localStorage.setItem('ggcs_stype', 2);
                    eflower_alert.show('登录成功', '乖乖约车', function () {
                        window.location.replace('myCoach.html', '_self');
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