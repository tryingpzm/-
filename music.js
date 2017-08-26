/**
 * Created by Administrator on 2017/8/24.
 */
var globalTabs=document.querySelector(".globalTabs");
var tabsDivs=document.querySelectorAll(".globalTabs>li>div");
var tabsDivsSpans=document.querySelectorAll(".globalTabs>li>div>span");
var mainContentLis=document.querySelectorAll(".mainContent>li")

globalTabs.addEventListener("click",function(e){
    if(e.target.tagName!=="SPAN") return;
    var index;
    for(var i=0;i<tabsDivs.length;i++){
        if(hasClass(tabsDivs[i],"active")){
            tabsDivs[i].className=tabsDivs[i].className.replace("active","");
            mainContentLis[i].className=mainContentLis[i].className.replace("active","");
            break;
        }
    }
    for(var j=0;j<tabsDivsSpans.length;j++){
        if(e.target===tabsDivsSpans[j]){
            index=j;
            break;
        }
    }
    tabsDivs[index].className+=" active"
    mainContentLis[index].className+=" active"
})

function hasClass(ele,cls){
    return ele.className.indexOf(cls) > -1
}