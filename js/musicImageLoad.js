/**
 * Created by Administrator on 2017/9/30.
 */
define(["jquery"],function(){
    function imageFinish(){
        var imageFlag=0;
        $(".mainImages img").on("load",function(){
            imageFlag++;
            if(imageFlag===6){
                $(".mainImages").addClass("show");
                $(".load1").css({display:"none"});
            }
        })
    }
//两秒后，不管图片有没有加载玩，都自动展示歌单图
    function twoSecond(){
        setTimeout(function(){$(".mainImages").addClass("show")
            $(".load1").css({display:"none"});
        },1000)
    }
//歌单图片全部下载完或者2s后，加载图片隐藏，歌单图片出现
    function imageLoad(){
        imageFinish();
        twoSecond();
    }
    imageLoad();
})