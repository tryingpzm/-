/**
 * Created by Administrator on 2017/9/6.
 */
console.log("fadf")
var APP_ID = 'p8oGkHwscTF8Bmo5SuCO5rAi-gzGzoHsz';
var APP_KEY = '8PReePu94MLda6uU4aCA285M';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var queryHot = new AV.Query("Song");
queryHot.contains("class","hot");
queryHot.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        var attr = results[i].attributes
        var Page2MusicNumber = i+1;
        var li2 = '<li><a href="./play.html?id=' + results[i].id + '"><span class="musicNumber">' + Page2MusicNumber + '</span><p>' + attr.name + '</p><small>' + attr.singer + '</small><apan class="playIcon icon"></apan></a></li>';
        console.log(li2)
        $(".songsList .musicList").append(li2);
    }
    $(".loadingImage").css("display","none");
}, function (error) {
    // console.log("对不起，没有匹配的结果" + error)
});