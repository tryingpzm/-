/**
 * Created by Administrator on 2017/8/29.
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

function idSearchPromise(){
    var id = location.search.match(/id=(\w+)/)[1];
    var query = new AV.Query('Song');
    return query.get(id)
}
function addRemoveHidden(selector1,selector2){
    $(selector1).addClass("hidden");
    $(selector2).removeClass("hidden");
}
function playIconClick(audio){
    $(".playIcon").on("click",function(){
        audio.play();
        $(".playPageMiddle").removeClass("pauseAnimation").addClass("outerRotate");
        $(".middleCenter").removeClass("pauseAnimation").addClass("rotate")
        addRemoveHidden(this,".pauseIcon");
    })
}
function pauseIconClick(audio){
    $(".pauseIcon").on("click",function(){
        audio.pause();
        $(".playPageMiddle").addClass("pauseAnimation")
        $(".middleCenter").addClass("pauseAnimation");
        addRemoveHidden(this,".playIcon")
    })
}
function audioEnded(audio){
    audio.onended=function(){
        $(".playPageMiddle").removeClass("outerRotate");
        $(".middleCenter").removeClass("rotate")
        addRemoveHidden(".pauseIcon",".playIcon")
    }
}
function backgroundSet(image){
    $(".wrapperBackground").css("background-image", "url(" + image + ")");
    $(".middleCenter").css("background-image", "url(" + image + ")");
}
function lyricMap(lyricArr){
    return lyricArr.map(function (ele) {
        if (ele === "") return;
        var currentTime = ele.match(/\[(.+)\]/)[1]
        var currentTimeArr = currentTime.split(":")
        currentTime = currentTimeArr[0] * 60 + Number(currentTimeArr[1]);
        var currentLyric = ele.match(/\](.*)/)[1];
        var newP = $("<p class='lyricLine' data-time='" + currentTime + "'>" + currentLyric + "</p>")
        $(".lyricScroll").append(newP)
        return {
            time: currentTime,
            lyric: currentLyric,
            distance: newP.offset().top
        }
    });
}
function lyricToArr(resultsAttr){
    var lyric = JSON.parse(resultsAttr.lyric).lyric;
    var lyricArr = lyric.split("\n")
    $(".lyricTop").append("<apan class='songName'>" + resultsAttr.name + " - </apan><span class='songSinger'>" + resultsAttr.singer + "</span>")
    return lyricMap(lyricArr);
}

function lyricDisplay(lyricArrObj,audio) {
    setInterval(function () {
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
            //最后一行前面的歌词都按照这个规则显示
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
}
function setAudio(resultsAttr){
    var audio = document.createElement("audio")
    audio.src = resultsAttr.url;
    return audio;
}
function clickOverEvents(audio){
    playIconClick(audio);
    pauseIconClick(audio);
    audioEnded(audio);
}
idSearchPromise().then(function (results) {
    var audio=setAudio(results.attributes);
    clickOverEvents(audio);
    backgroundSet(results.attributes.image);
    lyricDisplay( lyricToArr(results.attributes),audio);
});