/**
 * Created by admin on 2017/4/11.
 */
$(document).ready(function () {
    $('select').material_select();
    var lat, lng;
    var schoolList = [];
    citylocation = new qq.maps.CityService({
        complete: function (results) {
            lat = results.detail.latLng.lat;
            lng = results.detail.latLng.lng;
            getData(lat,lng);
        }
    });
    citylocation.searchLocalCity();
    function getData(lat,lng) {
        $.ajax({
            type: "POST",
            url: "https://guaiguaixueche.com.cn/api/wxrimschool",
            data: {lng: lng, lat: lat},
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data);
                schoolList = data.content;
                console.log(schoolList);

                
            }
        })
    }

});