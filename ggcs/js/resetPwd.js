/**
 * Created by admin on 2017/7/11.
 */
$(document).ready(function () {
    var typenum = window.location.search.substring(7);
    $('#reg-user-tel').focus(function () {
        $('.error-box').html('');
    });
    $('#reg-btn').on('click', function () {
        var reg = /^1(3|4|5|7|8)\d{9}$/;
        var tel = $('#reg-user-tel').val();
        if (reg.test(tel) == true) {
            $('.error-box').html('');
            resetpwd(tel);
        } else {
            $('.error-box').html('号码格式有误，请重新输入！');
        }
    });
    function resetpwd(tel) {
        $.ajax({
            type: "post",
            url: URL.resetpw,
            async: true,
            data: JSON.stringify({telephone: tel, stype: typenum}),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.ret.code == 0) {
                    eflower_alert.show('重置成功', function () {
                        if (typenum == 1) {
                            localStorage.setItem('ggcs_user_phone', tel);
                            window.open('login.html', '_self');

                        } else {
                            localStorage.setItem('ggcs_coach_phone', tel);
                            window.open('Managerlogin.html', '_self');
                        }
                    })

                } else {
                    eflower_alert.show(data.ret.msg,function(){});
                }
            }
        })
    }
})

