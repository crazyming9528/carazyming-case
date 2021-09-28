/**
 * @Description:
 * @author xiangdong
 * @date 2019-04-10
*/

/**
 * 封装常用方法
 *
 * */
var Qx=(function () {
    // DOM操作
    /**
     * 隐藏
     * param dom
     * */
    function hide(param) {
        param.style.display='none';
    }
    /**
     * 显示
     * param dom
     * */
    function show(param) {
        param.style.display='block'
    }
    /**
     * 添加属性
     * param dom
     * style 需要添加的样式
     * */
    function addStyle(param,style) {
        param.setAttribute('style',`${style}`)
    }

    /**
     *
     * @returns {string} 返回的浏览器类型
     */
    function typenavigator() {
        let browser = {
            versions: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return { //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
            let ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
            if (ua.match(/MicroMessenger/i) == "micromessenger") {//在微信中打开
                return 'weixin'
            }
            if (ua.match(/WeiBo/i) == "weibo") {//在新浪微博客户端打开
                    return 'weibo'
            }
            if (ua.match(/QQ/i) == "qq") {//在QQ空间打开
                    return 'qq'
            }
            if (browser.versions.ios) {//是否在IOS浏览器打开
               return 'ios'
            }
            if(browser.versions.android){//是否在安卓浏览器打开
                return 'android'
            }
        }  else if (browser.versions.gecko) {//火狐
                return 'huohu'
        }else if (browser.versions.presto) {//欧朋
                return 'oupeng'
        }
    }


    function initDOM() {
        document.addEventListener('DOMContentLoaded',function () {
            let _h=document.body.scrollHeight;
            document.getElementsByTagName("body")[0].setAttribute('style',`min-height:${_h}px`)
        },false)
    }







    //网络请求
    /**
     *
     * @param url
     * @param param get参数 为对象
     */
    function get(url,param) {
        return new Promise((resolve, reject) => {
            $.get(url,param,res => {
                if (res.code == 200){
                   resolve(res.data)
                } else {
                    reject(res.msg)
                }
            })
        })
    }

    /**
     *
     * @param url
     * @param param post参数 对象
     */
    function post(url,param) {
        return new Promise((resolve, reject) => {
            $.post(url,{
                param
            },res => {
                if (res.code == 200){
                    resolve(res.data)
                } else {
                    reject(res.msg)
                }
            })
        })
    }




    return {
        hide:hide,
        show:show,
        addStyle:addStyle,
        typenavigator:typenavigator,
        initDOM:initDOM,
        get:get,
        post:post
    }
}());