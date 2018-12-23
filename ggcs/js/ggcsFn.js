/**
 * Created by admin on 2017/7/10.
 */
var ggycUrl = function () {
    var baseUrl = 'https://guaiguaixueche.com/ggtrain/';
    //学员登录
    this.login = baseUrl + 'login';
    //修改密码
    this.changePwd = baseUrl + 'xgmm';
    //重置密码
    this.resetpw = baseUrl + 'resetpw';
    //教练列表
    this.listCoach = baseUrl + 'listcoach';
    //教练预约排班信息
    this.appointmentList = baseUrl + 'listappointmentbycoach';
    //评价
    this.traincomment = baseUrl + 'traincomment';
    //信息绑定接口
    this.bindwxtelephone = baseUrl + 'bindwxtelephone';


    var baseUrl2 = 'https://guaiguaixueche.com/ggyc/';
    //预约
    this.subscribe = baseUrl2 + 'appointment/subscribe';

    //学员查看自己预约
    this.listappointment = baseUrl + 'listapponitment';
    //取消预约
    this.unsubscribe = baseUrl2 + 'appointment/unsubscribe';
    //签到
    this.trainsignin = baseUrl + 'trainsignin';
};
var URL = new ggycUrl();

function bingTel(tel,openid,state){
    var data = {
        telephone:tel,
        openid:openid,
        state:state
    };
    $.ajax({
        type:'POST',
        url:URL.bindwxtelephone,
        data:JSON.stringify(data),
        contentType:'application/json;charset=utf-8',
        success:function(data){
            alert('data的ret.code='+data.ret.code +'data的ret.msg='+data.ret.msg);
        }

    })
}

