/**
 * Created by admin on 2017/7/10.
 */
$(document).ready(function () {
    var base64 = new Base64();
    var tel, personid, stype;
    stype = window.location.search.substring(7);
    if (stype == 1) {
        personid = localStorage.getItem('ggcs_person_id');
        tel = localStorage.getItem('ggcs_user_phone');
        $('#login-tel').val(tel).attr('readonly', true);
    } else if (stype == 2) {
        personid = localStorage.getItem('ggcs_coach_id');
        tel = localStorage.getItem('ggcs_coach_phone');
        $('#login-tel').val(tel).attr('readonly', true);
    } else {
        eflower_alert.show('还没有登录，不能修改密码哦，现在去登录', function () {
            window.open('login.html', '_self');
        });
    }

    $('.login-btn').on('click', function () {
        var reg = /^[\w]{3,12}$/;
        var pwd = $('#login-pwd').val();
        if (pwd == '') {
            eflower_alert.show('请输入新密码');
        } else if (reg.test(pwd) == false) {
            eflower_alert.show('密码为3-12位的数字、字母或者下划线');
        } else {
            var newPwd = base64.encode(pwd);
            newPwd = (hex_md5(newPwd)).toUpperCase();
            $.ajax({
                type: "POST",
                url: URL.changePwd,
                data: JSON.stringify({userid: personid, stype: stype, passwd: newPwd}),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    var ret = data.ret;
                    if (ret.code == 0) {
                        eflower_alert.show(ret.msg, function () {
                            if (stype == 1) {
                                localStorage.removeItem('ggcs_person_id');
                                localStorage.setItem('ggcs_user_phone', tel);
                                window.open('login.html', '_self');
                            } else if (stype == 2) {
                                localStorage.removeItem('ggcs_coach_id');
                                localStorage.setItem('ggcs_coach_phone', tel);
                                window.open('Managerlogin.html', '_self');
                            }
                        });
                    } else {
                        eflower_alert.show(ret.msg);
                    }
                }
            });
        }
    })
});