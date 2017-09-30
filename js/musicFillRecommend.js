/**
 * Created by Administrator on 2017/9/30.
 */
define(["av","databaseInit"],function(AV){
    function recommendPromise(){
        var query = new AV.Query('Song');
        query.contains("class","recommend");
        return query.find()
    }
//填充推荐歌曲
    function recommendFill(results){
        for (var i = 0; i < results.length; i++) {
            var attr = results[i].attributes
            var li = '<li><a href="../html/play.html?id=' + results[i].id + '"><p>' + attr.name + '</p><small><i class="SQIcon icon"></i>' + attr.singer + '</small><apan class="playIcon icon"></apan></a></li>';
            $(".contentPage1 .musicList").append(li);
        }
    }
    function recommendSongs(){
        recommendPromise().then(function (results) {
            recommendFill(results);
            $(".load2").css("display","none");
        }, function (error) {
        });
    }
    recommendSongs();
})