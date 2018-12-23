
//绑定
function bound(deviceid,openid,ticket,st){
    var bingData = {
        ticket:ticket,
        deviceid:deviceid,
        openid:openid,
        state:st
    };
    $.ajax({
        type:'POST',
        url:'https://guaiguaixueche.com/ggtools/towxbind',
        data: JSON.stringify(bingData),
        contentType: 'application/json;charset=utf-8',
        success:function(data){
            //
        }
    })

}

function gettime(){
    var curtime=new Date();
    var hour = curtime.getHours();
    var minute = curtime.getMinutes();
    var second = curtime.getSeconds();
    return hour+':'+minute+':'+second;
}


                    