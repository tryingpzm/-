/**
 * Created by Administrator on 2017/9/30.
 */
define(["jquery"],function(){
    $(".globalTabs").on("click","li",function(e){
        var current=e.currentTarget;
        var index=$(".globalTabs>li").index(current);
        $(current).find("div").addClass("active");
        $(current).siblings().find("div").removeClass("active");
        $(".mainContent>li").eq(index).addClass("active").siblings().removeClass("active")
    });
});