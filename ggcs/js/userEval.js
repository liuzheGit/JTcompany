/**
 * Created by admin on 2017/7/10.
 */
$(document).ready(function () {
    function evaInfo(obj1, obj2) {
        var aLi = obj1;
        var leng = aLi.length;
        var arr2 = ['../images/1_04.png', '../images/1_04.png', '../images/1_04.png', '../images/1_04.png', '../images/1_04.png'];
        var s1 = '';
        aLi.on('click', function () {
            var i = $(this).index();
            if (i < 2) {
                for (var j = 0; j <= i; j++) {
                    aLi.eq(j).find('img').attr('src', '../images/1_38.png');
                    arr2[j] = aLi.eq(j).find('img').attr('src');
                }
            } else {
                for (var j = 0; j <= i; j++) {
                    aLi.eq(j).find('img').attr('src', '../images/1_38.png');
                    arr2[j] = aLi.eq(j).find('img').attr('src');
                }
            }
            ;

            for (var k = i + 1; k < leng; k++) {
                arr2[k] = '../images/1_04.png';
                aLi.eq(k).find('img').attr('src', arr2[k]);
            }
            ;
            obj2.text((i + 1) + '.0');
        });
    }

    evaInfo($('.skill-star-box li'), $('.skill-score-box'));
    evaInfo($('.service-star-box li'), $('.service-score-box'));
    evaInfo($('.health-star-box li'), $('.health-score-box'));

    //判断是学员对教练还是教练对学员
    var searchArr = window.location.search.substring(1).split('&');
    var type = searchArr[0].substring(5);
    var userid = searchArr[1].substring(7);
    var detailid = searchArr[2].substring(9);

    //如果是对学员的评价，则隐藏星星
    if (type == 2) {
        $('.content-top').css('display', 'none');
    }
    $('.content-bottom').on('click', function () {
        var skill = parseInt($('.skill-score-box').html());
        var service_attitude = parseInt($('.service-score-box').html());
        var car_health = parseInt($('.health-score-box').html());
        var com = $('#comment-coach-cont').val();
        $.ajax({
            type: 'post',
            url: URL.traincomment,
            data: JSON.stringify({
                userid: userid,
                detailid: detailid,
                stype: type,
                comment: com,
                train_skills: skill,
                service_attitude: service_attitude,
                car_health: car_health
            }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                console.log(data);
                if (data.ret.code == 0) {
                    eflower_alert.show('评价成功！', function () {
                        history.back().reload();
                    })
                } else {
                    eflower_alert.show('评价失败！', function () {

                    })
                }
            }
        })
    });
});
