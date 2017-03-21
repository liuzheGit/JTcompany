$(document).ready(function () {
    $(window).load(function () {
        var userinfostr = window.location.search;
        var openid = userinfostr.split('=')[1];

        var queryID = {"openid": openid};
        $.ajax({
            type: 'POST',
            url: 'https://guaiguaixueche.com/coupon/query_coupon_info',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(queryID),
            dataType: 'json',
            success: function (data) {
                //console.log(data);
//						var listID = [];
//						var lists = [];
//						for(var i in data){
//							listID.push(i);
//							lists.push(data[i]);
//						};
                //三种券的类型
                var list_unused = data.list_unused;
                var list_expired = data.list_expired;
                var list_used = data.list_used;

                //根据不同的类型添加到不同的 ul上

                if (list_unused) {
                    for (var i = 0; i < list_unused.length; i++) {
                        var unDesign_id = list_unused[i].design_id;
                        var unType = list_unused[i].coupon_type;
                        var unSchool = list_unused[i].school_name;
                        var unPs = '';
                        if (unType == 0) {
                            unPs = '(通用)'
                        } else {
                            unPs = '(指定)'
                        }
                        if (unSchool == null) {
                            unSchool = '';
                        }
                        var unEndTime = [], unStartTime = [];
                        var unSplitStartTime = list_unused[i].receive_time.split(' ')[0];
                        var unSplitEndTime = list_unused[i].invalid_time.split(' ')[0];
                        unStartTime.push(unSplitStartTime);
                        unEndTime.push(unSplitEndTime);
                        $('<li><img src="img/every_quan.png"/><div class="xinxi-tp"><p class="tp-lf">' + list_unused[i].coupon_name + unPs + '</br><b>' + unSchool + '</b></p><p class="tp-rt">' + list_unused[i].coupon_price + '</p></div><div class="youxiao-tm"><a href="../html/product_html/driving-school-product-list_A.html" alt="'+unDesign_id+'">立即使用</a>有效期: ' + unStartTime + '/' + unEndTime + '</div></li>').appendTo('.youhui-act .ul-wei');
                    }
                }
                if (list_expired) {
                    for (var j = 0; j < list_expired.length; j++) {
                        //var exDesign_id = list_unused[j].design_id;
                        var exType = list_expired[j].coupon_type;
                        var exSchool = list_expired[j].school_name;
                        var exPs = '';
                        if (exType == 0) {
                            exPs = '(通用)'
                        } else {
                            exPs = '(指定)'
                        }
                        if (exSchool == null) {
                            exSchool = '';
                        }
                        var exEndTime = [], exStartTime = [];
                        var exSplitStartTime = list_expired[j].receive_time.split(' ')[0];
                        var exSplitEndTime = list_expired[j].invalid_time.split(' ')[0];
                        exStartTime.push(exSplitStartTime);
                        exEndTime.push(exSplitEndTime);
                        $('<li><img src="img/due_quan.png"/><div class="xinxi-tp"><p class="tp-lf">' + list_expired[j].coupon_name + exPs + '</br><b>' + exSchool + '</b></p><p class="tp-rt">' + list_expired[j].coupon_price + '</p></div><div class="youxiao-tm">有效期: ' + exStartTime + '/' + exEndTime + '</div></li>').appendTo('.youhui-act .ul-guo');
                    }
                }
                if(list_used){
                    for (var k = 0; k < list_used.length; k++) {
                        //var usDesign_id = list_unused[k].design_id;
                        var usType = list_used[k].coupon_type;
                        var usSchool = list_used[k].school_name;
                        var usPs = '';
                        if (usType == 0) {
                            usPs = '(通用)'
                        } else {
                            usPs = '(指定)'
                        }
                        if (usSchool == null) {
                            usSchool = '';
                        }
                        var usEndTime = [], usStartTime = [];
                        var usSplitStartTime = list_used[k].receive_time.split(' ')[0];
                        var usSplitEndTime = list_used[k].invalid_time.split(' ')[0];
                        usStartTime.push(usSplitStartTime);
                        usEndTime.push(usSplitEndTime);
                        $('<li><img src="img/employ_quan.png"/><div class="xinxi-tp"><p class="tp-lf">' + list_used[k].coupon_name + usPs + '</br><b>' + usSchool + '</b></p><p class="tp-rt">' + list_used[k].coupon_price + '</p></div><div class="youxiao-tm">有效期: ' + usStartTime + '/' + usEndTime + '</div></li>').appendTo('.youhui-act .ul-yi');
                    }
                }

            //    添加点击立即使用
            //localStorage.setItem('design_id',list[index].design_id);
                $('.youhui-act a').click(function(){
                    localStorage.setItem('design_id',$(this).attr('alt'));
                })
            }
        });

        $('.li-wei').on('click', function () {
            $(this).siblings().removeClass("li-act");
            $(this).addClass("li-act");
            $('.ul-wei').siblings().removeClass("ul-act");
            $('.ul-wei').addClass("ul-act");
        });
        $('.li-yi').on('click', function () {
            $(this).siblings().removeClass("li-act");
            $(this).addClass("li-act");
            $('.ul-yi').siblings().removeClass("ul-act");
            $('.ul-yi').addClass("ul-act");
        });
        $('.li-guo').on('click', function () {
            $(this).siblings().removeClass("li-act");
            $(this).addClass("li-act");
            $('.ul-guo').siblings().removeClass("ul-act");
            $('.ul-guo').addClass("ul-act");
        });
    })
})




