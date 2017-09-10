/**
 * Created by Administrator on 2017/8/29.
 */
var search = location.search;
var id = search.match(/id=(\w+)/)[1];
var APP_ID = 'p8oGkHwscTF8Bmo5SuCO5rAi-gzGzoHsz';
var APP_KEY = '8PReePu94MLda6uU4aCA285M';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('Song');
//通过id获取歌曲之后进行操作
query.get(id).then(function (results) {
    var resultsAttr = results.attributes;
    var url = resultsAttr.url;
    var name = resultsAttr.name;
    var singer = resultsAttr.singer;
    var image = resultsAttr.image;
    var lyricJSON = resultsAttr.lyric;
    var audio = document.createElement("audio")
    audio.src = url;
    // audio.play();
    //播放按钮点击开始播放并转动
    $(".playIcon").on("click",function(){
        audio.play();
        $(".playPageMiddle").removeClass("pauseAnimation").addClass("outerRotate");
        $(".middleCenter").removeClass("pauseAnimation").addClass("rotate")
        $(this).addClass("hidden");
        $(".pauseIcon").removeClass("hidden");
    })
    $(".pauseIcon").on("click",function(){
        audio.pause();
        $(".playPageMiddle").addClass("pauseAnimation")
        $(".middleCenter").addClass("pauseAnimation");
        $(this).addClass("hidden");
        $(".playIcon").removeClass("hidden");

    })
    //播放结束停止转动
    audio.onended=function(){
        // clearInterval(ly);
        $(".playPageMiddle").removeClass("outerRotate");
        $(".middleCenter").removeClass("rotate")
        $(".playIcon").removeClass("hidden").on("click",function(){

        });
        $(".pauseIcon").addClass("hidden");

    }
    //背景设置
    $(".wrapperBackground").css("background-image", "url(" + image + ")");
    $(".middleCenter").css("background-image", "url(" + image + ")");

    //歌词处理
    var lyric = JSON.parse(lyricJSON).lyric;
    var lyricArr = lyric.split("\n")
    $(".lyricTop").append("<apan class='songName'>" + name + " - </apan><span class='songSinger'>" + singer + "</span>")
    var lyricArrObj = lyricArr.map(function (ele, index) {
        if (ele === "") return;
        var RexExp = /\[(.+)\]/;
        var RexExp2 = /\](.*)/;
        var currentTime = ele.match(RexExp)[1]
        var currentTimeArr = currentTime.split(":")
        currentTime = currentTimeArr[0] * 60 + Number(currentTimeArr[1]);
        var currentLyric = ele.match(RexExp2)[1];
        var newP = $("<p class='lyricLine' data-time='" + currentTime + "'>" + currentLyric + "</p>")
        $(".lyricScroll").append(newP)
        return {
            time: currentTime,
            lyric: currentLyric,
            distance: newP.offset().top
        }
    })
    //歌词部分
    var ly=setInterval(function () {
        for (var i = 0; i < lyricArrObj.length; i++) {
            var audioTime = audio.currentTime;
            var lyricTime = lyricArrObj[i].time;
            //如果到达了最后一句歌词，就改变规则
            if(!lyricArrObj[i+1]){
                if (audioTime >= lyricTime) {
                    $(".lyricLine[data-time*='" + lyricTime + "']").addClass("highlight").siblings().removeClass("highlight");
                }
                return;
            }
            //前面的歌词都按照这个规则显示
            if (audioTime >= lyricTime && audioTime < lyricArrObj[i + 1].time) {
                if (lyricArrObj[i].lyric === "") return;
                var currentElement = $(".lyricLine[data-time*='" + lyricTime + "']").eq(0)
                currentElement.addClass("highlight").siblings().removeClass("highlight");
                var process = lyricArrObj[i].distance - $(".lyricContent").offset().top - 24
                $(".lyricScroll").css("transform", "translateY(-" + process + "px)");
                break;
            }
        }
    }, 200)
});