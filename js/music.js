/**
 * Created by Administrator on 2017/8/24.
 */
requirejs.config({
    paths: {
        jquery: 'jquery-3.2.0',
        av:'av-min'
    }
});
requirejs(["musicImageLoad","musicGlobalTab","musicFillRecommend","musicFillHot","musicThrottling"],function(){

})

