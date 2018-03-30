var getCity = null;
var mapObj = new AMap.Map('iCenter');
mapObj.plugin("AMap.CitySearch", function () {
    var citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity();
    //监听触发了调用定位时发生
    AMap.event.addListener(citysearch, "complete", function (result) {
        if (result && result.city && result.info == "OK") {
            getCity = result.city;
            var cityText = document.getElementById('city_text');         
            cityText.innerText = getCity
        }
    });
    //
    AMap.event.addListener(citysearch, "error", function (result) {
        throw '获取定位失败'
    });
});