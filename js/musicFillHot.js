/**
 * Created by Administrator on 2017/9/30.
 */
define(["av","databaseInit"],function(AV){
    function hotPromise(){
        var queryHot = new AV.Query("Song");
        queryHot.contains("class","hot");
        return queryHot.find()
    }
    function hotFill(results){
        for (var i = 0; i < results.length; i++) {
            var attr = results[i].attributes
            var Page2MusicNumber = (i + 1) >= 10 ? (i + 1).toString() : ("0" + (i + 1).toString());
            var li2 = '<li><a href="../html/play.html?id=' + results[i].id + '"><span class="page2MusicNumber">' + Page2MusicNumber + '</span><p>' + attr.name + '</p><small><i class="SQIcon icon"></i>' + attr.singer + '</small><apan class="playIcon icon"></apan></a></li>';
            $(".contentPage2 .musicList").append(li2);
        }
    }
    hotPromise().then(function (results) {
        hotFill(results);
    }, function (error) {
        console.log(error);
    });
})