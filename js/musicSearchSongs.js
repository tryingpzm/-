/**
 * Created by Administrator on 2017/9/30.
 */
define(["av","jquery"],function(AV,$){
    function searchSongs(){
        var value = $(".page3Input").val().trim();
        if (value.length === 0) return;
        databaseSearch(value);
    }
    function databaseSearch(value){
        var queryName = new AV.Query("Song")
        queryName.contains("name", value);
        var querySinger = new AV.Query("Song");
        querySinger.contains("singer", value);
        var query = AV.Query.or(queryName, querySinger);
        query.find().then(function (results) {
            resultInsert(value,results);
        });
    }
    function resultInsert(value,results){
        var searchResults = document.querySelector(".searchResults");
        if(results.length===0){
            searchResults.innerHTML="<p class='noResult'>对不起，无搜索结果</p>"
            return;
        }
        constructorResults(value,results,searchResults);
    }
    function constructorResults(value,results,searchResults){
        searchResults.innerHTML = "";
        var searchH2 = "<a href='#'><h2 class='searchH2 horizonLine'>搜索\"" + value + "\"</h2></a>";
        var searchOl=document.createElement("ol");
        var searchLis=fillSearchLis(results);
        searchOl.innerHTML=searchLis;
        searchResults.innerHTML=searchH2+searchOl.outerHTML;
    }
    function fillSearchLis(results){
        var searchLis="";
        for (var i = 0; i < results.length; i++) {
            var resultsAttr = results[i].attributes;
            var searchLi = "<li class='searchLi horizonLine'><a href='../html/play.html?id=" + results[i].id + "'><i class='inputIcon'></i><p>" + resultsAttr.name + "</p></a></li>"
            searchLis+=searchLi;
        }
        return searchLis;
    }
    return searchSongs;
})