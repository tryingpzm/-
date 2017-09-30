/**
 * Created by Administrator on 2017/9/30.
 */
define(["musicSearchSongs"],function(searchSongs){
    var timer=null;
    $(".page3Input").on("input", function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            searchSongs()
        },300);
    });
})