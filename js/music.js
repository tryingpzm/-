/**
 * Created by Administrator on 2017/8/24.
 */
var globalTabs = document.querySelector(".globalTabs");
var tabsDivs = document.querySelectorAll(".globalTabs>li>div");
var tabsDivsSpans = document.querySelectorAll(".globalTabs>li>div>span");
var mainContentLis = document.querySelectorAll(".mainContent>li")

// var listImages=document.querySelectorAll(".mainImages li img");
// for(var i=0;i<listImages.length;i++){
//     listImages[i].setAttribute("src",listImages[i].getAttribute("data-src"));
// }
//思路，获取images,监听load事件，只要有一个
var $images=$(".mainImages img");
var ak=0;
$images.on("load",function(){
    ak++;
    if(ak===6){
        $(".mainImages").addClass("show");
        $(".load1").css({display:"none"});
    }
})
setTimeout(function(){$(".mainImages").addClass("show")
    $(".load1").css({display:"none"});
},2000)

globalTabs.addEventListener("click", function (e) {
    if (e.target.tagName !== "SPAN") return;
    var index;
    for (var i = 0; i < tabsDivs.length; i++) {
        if (hasClass(tabsDivs[i], "active")) {
            tabsDivs[i].className = tabsDivs[i].className.replace("active", "");
            mainContentLis[i].className = mainContentLis[i].className.replace("active", "");
            break;
        }
    }
    for (var j = 0; j < tabsDivsSpans.length; j++) {
        if (e.target === tabsDivsSpans[j]) {
            index = j;
            break;
        }
    }
    tabsDivs[index].className += " active"
    mainContentLis[index].className += " active"
})

function hasClass(ele, cls) {
    return ele.className.indexOf(cls) > -1
}

//数据库
var APP_ID = 'p8oGkHwscTF8Bmo5SuCO5rAi-gzGzoHsz';
var APP_KEY = '8PReePu94MLda6uU4aCA285M';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

//推荐歌曲和热门歌曲
var query = new AV.Query('Song');
query.contains("class","recommend");

query.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        var attr = results[i].attributes
        var li = '<li><a href="../html/play.html?id=' + results[i].id + '"><p>' + attr.name + '</p><small><i class="SQIcon icon"></i>' + attr.singer + '</small><apan class="playIcon icon"></apan></a></li>';
        $(".contentPage1 .musicList").append(li);
    }
    $(".load2").css("display","none");
}, function (error) {
});

var queryHot = new AV.Query("Song");
queryHot.contains("class","hot");
queryHot.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        var attr = results[i].attributes
        var Page2MusicNumber = (i + 1) >= 10 ? (i + 1).toString() : ("0" + (i + 1).toString());
        var li2 = '<li><a href="../html/play.html?id=' + results[i].id + '"><span class="page2MusicNumber">' + Page2MusicNumber + '</span><p>' + attr.name + '</p><small><i class="SQIcon icon"></i>' + attr.singer + '</small><apan class="playIcon icon"></apan></a></li>';
        $(".contentPage2 .musicList").append(li2);
    }
}, function (error) {
});

//input相关
var page3Input = document.querySelector(".page3Input");
var searchResults = document.querySelector(".searchResults");
var timer=null;
page3Input.addEventListener("input", function () {
    if(timer){
        clearTimeout(timer);
    }
    timer=setTimeout(function(){
        timer=null;
        searchResults.innerHTML = "";
        var value = page3Input.value.trim();
        if (value.length === 0) return;
        var searchH2 = "<a href='#'><h2 class='searchH2 horizonLine'>搜索\"" + value + "\"</h2></a>";
        var searchOl=document.createElement("ol");
        var searchLis="";
        var queryName = new AV.Query("Song")
        queryName.contains("name", value);
        var querySinger = new AV.Query("Song");
        querySinger.contains("singer", value);
        var query = AV.Query.or(queryName, querySinger);
        query.find().then(function (results) {
            if(results.length===0){
                searchResults.innerHTML="<p class='noResult'>对不起，无搜索结果</p>"
                return;
            }
            for (var i = 0; i < results.length; i++) {
                var resultsAttr = results[i].attributes;
                var searchLi = "<li class='searchLi horizonLine'><a href='../html/play.html?id=&haha" + results[i].id + "'><i class='inputIcon'></i><p>" + resultsAttr.name + "</p></a></li>"
                searchLis+=searchLi;
            }
            searchOl.innerHTML=searchLis;
            searchResults.innerHTML=searchH2+searchOl.outerHTML;
        });
    },300)
});

