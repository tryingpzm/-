/**
 * Created by Administrator on 2017/9/6.
 */

function databaseInit(){
    var APP_ID = 'p8oGkHwscTF8Bmo5SuCO5rAi-gzGzoHsz';
    var APP_KEY = '8PReePu94MLda6uU4aCA285M';

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}
databaseInit();

function hotPromise(){
    var queryHot = new AV.Query("Song");
    queryHot.contains("class","hot");
    return queryHot.find()
}
function hotFill(results){
    for (var i = 0; i < results.length; i++) {
        var attr = results[i].attributes
        var Page2MusicNumber = i+1;
        var li2 = '<li><a href="../html/play.html?id=' + results[i].id + '"><span class="musicNumber">' + Page2MusicNumber + '</span><p>' + attr.name + '</p><small>' + attr.singer + '</small><apan class="playIcon icon"></apan></a></li>';
        $(".songsList .musicList").append(li2);
    }
}

hotPromise().then(function (results) {
    hotFill(results);
    $(".loadingImage").css("display","none");
}, function (error) {
    console.log(error);
});
