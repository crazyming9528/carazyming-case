/**
 *模板二js
 * by:向东
 * */


// var data={
//     "gameid": 6024,
//     "gamename": "亮亮捕鱼",
//     "desc": "捕鱼就能得红包中大奖",
//     "icon": "http://120.205.22.111:8111/upload/20190304/icon.gif",
//     "url": "http://down.chekchekoyuni.com:9108/sdkgame/llbyand_6024/llbyand_6024.apk",
//     "title_backcolor": "74,144,226,0.7",
//     "video_retation": [
//         "http://120.205.22.111:8111/upload/20190304/lun01.png",
//         "http://120.205.22.111:8111/upload/20190304/lun02.png",
//         "http://120.205.22.111:8111/upload/20190304/lun03.png"
//     ],
//     "retation_backimg": "http://120.205.22.111:8111/upload/20190304/202.png",
//     "top": 500,
//     "head_backimg": "http://120.205.22.111:8111/upload/20190304/201.png",
//     "custom_backimg": "http://120.205.22.111:8111/upload/20190304/203.png",
//     "download_img": "http://120.205.22.111:8111/upload/20190304/download2.png",
//     "suspend_img": "http://120.205.22.111:8111/upload/20190304/suspend.png"
//
// }
/**
 * 初始话参数
 * */
// var urlArr=[
//     "http://192.168.0.198:3000?game_id=6024&temp_id=1&agent_id=&jump=0",
//     "http://192.168.0.198:3000?game_id=6022&temp_id=1&agent_id=&jump=1",
//     "http://192.168.0.198:3000?game_id=6024&temp_id=2&agent_id=&jump=2"
// ]
var jump=$xd.queryString('jump')||''
var game_id=$xd.queryString('game_id')||'';
var temp_id=2;
var agent_id=$xd.queryString('agent_id');
var pageFrom=$xd.queryString('pageFrom')||'';
var orchestration=$xd.queryString('id')||'';
var title=document.querySelector('title');//页面标题
var data=null;
var Global = {
    from: null,
    gameId: null,
    agentId: null,
    tmpId: null,
    gameConf: null,
    gameModel: null,
    userId: null,
    version: null,
    deviceId: null,
    reportApi: $xd.upInfo,
    gameDataApi: "http://m.chekchekoyuni.com:9103/mapi.php/mobile/index/getAppDetailInfo/id/",
    downloadCenterUrl: 'http://wap.chekchekoyuni.com:9103/download_center/index.html#/game_download_center?from=unreport',
    isDownloading: false,
}
var imgArr=[]
//配置对象
var params={};
var my,timer,timers,timerss,progress,_appstatus,open,timerxd,xd=true,weixin,duan=false;//定义使用的变量;
var openvideo,weburl,imgArr,urlArr=[],danMuArr=[];

var shortLinkMap={
    "http://down.chekchekoyuni.com:9108/sdkgame/hbbyand_6416/hbbyand_6416_90008.apk": "https://url.cn/5yZ5jdF",
    // "http://down.chekchekoyuni.com:9108/sdkgame/hbbyand_6416/hbbyand_6416_90007.apk": "https://url.cn/5ybiQ7G",
}
//点击图片隐藏
document.querySelector('.share').querySelector('img').onclick=function () {
    document.querySelector('.share').style.display='none';
}
//初始化参数
function init() {
    var html='';
    title.innerHTML=data.gamename;
    //设置背景音乐 background_music
    if (data.background_music) {
        $xd('audio').src=data.background_music.path;
    }
    //设置弹幕
    danMuArr=data.danmu||'';
    console.log('danmu',danMuArr)
    //判断弹幕长度
    if (danMuArr){
        if (danMuArr.length < 10){
            html+=`<div class="danmu-box GPU">`
            for (let i = 0; i < danMuArr.length; i++) {
                html+=`<div class="danmu-item">${danMuArr[i]}</div>`
            }
            html+=`</div>`
            //设置弹幕
            $xd('danmu-box').innerHTML=html;
        }else  {
            html+=`<div class="danmu-box GPU" >`
            for (let i = 0; i <=10 ; i++) {
                html+=`<div class="danmu-item">${danMuArr[i]}</div>`
            }
            html+=`</div>`;
            //设置弹幕
            $xd('danmu-box').innerHTML=html;
            //换行
            html='';
            html+=`<div class="danmu clearfix" style="top:10rem ;">`
            html+=`<div class="danmu-box GPU">`
            for (let i = 10; i <danMuArr.length ; i++) {
                html+=`<div class="danmu-item" style="margin-right: 10px">${danMuArr[i]}</div>`
            }
            html+=`</div></div>`
            $xd('danmu-box1').innerHTML=html;
        }
    }



    //设置name和描述
    $xd('name').innerHTML = data.gamename;
    $xd('desc').innerHTML = data.desc.slice(0,55)+'......';
    //设置背景颜色
    $xd('top-down').setAttribute('style','background-color:rgba('+data.title_backcolor+')');
    //设置下载按钮
    $xd('btn-down').querySelector('img').src=data.suspend_img
    $xd('btn-dow').querySelector('img').src=data.download_img
    //设置图标
    $xd('icon').src=data.icon;
    //头部背景
    $xd('mid-bg').src=data.head_backimg;
    //底部背景
    $xd('footer').src=data.custom_backimg;
    //轮播图的背景
    $xd('mo').setAttribute('style','background-image: url('+data.retation_backimg+')')
    //设置轮播图的图片

    // $xd('lun5').querySelector('img').src=data.video_retation[1];
    $xd('lun1').querySelector('img').src=data.video_retation[0];
    $xd('lun2').querySelector('img').src=data.video_retation[1];
    $xd('lun3').querySelector('img').src=data.video_retation[2];
    $xd('lun4').querySelector('img').src=data.video_retation[3];
    my=initTicket()
    //定义请求参数对象
    params={
        id:game_id,
        name:data.gamename,
        desc:data.desc,
        downloadTime:0,
        progress:0,
        downloadPath:'',
        packageName:'',
        downloadId:'',
        image:data.icon
    }
    if (pageFrom == 'null'){
        pageFrom =''
    }
    //大数据上报
    Global.from=pageFrom;
    Global.tmpId=temp_id
    var uv = {
        pageFrom: pageFrom,
        businessFrom: pageFrom,
        pageId: 'temp2',
        pageType: 'game',
        eventType: '0',
        eventData: {
            game_id: game_id,
            agent_id: agent_id
        },
        businessId: "game",
        businessName: "game",
        dataType: "uv"
    };
    callAppFunc_getSomeParams(function (resData) {
        var resObj = JSON.parse(resData);
        Global.deviceId = resObj.deviceId;
        Global.userId = resObj.userId;
            Global.version = resObj.version;
        if (Global.deviceId) {
            uv.deviceId = Global.deviceId;
        }
        if (Global.userId) {
            uv.userId = Global.userId;
        }
        if (Global.version) {
            uv.version = Global.version;
        }
        $.post(Global.reportApi,{
            data:JSON.stringify(uv)
        },function (res) {
            console.log("uv上报成功");
            // alert("uv上传");
        })

    })
    getInfoGame()
}
//获取信息接口
function getInfo(){
    $.get($xd.info,{
        game_id:game_id,
        temp_id:2
    },function (res) {
        // console.log(res.data);
        if (res.code == 200){
            data = res.data;
            imgArr=data.video_retation;
            console.log(data)
            init()
        } else {
            alert(res.msg)
        }

    })
}
//获取游戏信息接口
function getInfoGame() {
    $.get($xd.gameUrl+'/'+game_id,{},function (res) {
        console.log(res)
        var mess = res.game_info;
        weburl=mess.androidurl;
        if (agent_id){
           weburl=mess.androidurl.replace(/.apk/,"_" +agent_id+ ".apk");
           for (var i in shortLinkMap){
                console.log(i)
               if (i == weburl){
                   duan=true;
                   weburl = shortLinkMap[i];
               } else {
                   weburl = weburl;
               }
           }
        } else {
            weburl=mess.androidurl
        }
        params.size=mess.size;
        params.status=0
    })
}
//实例化轮播插件
function initTicket() {
    return new Swiper('.swiper-container', {
        watchSlidesProgress: true,//查看进度
        slidesPerView: 3,//同时显示的数量/
        centeredSlides: true,
        loop:true,
        // parallax:true,
        // roundLengths:true,
        // autoplayDisableOnInteraction:true,
        loopAdditionalSlides:1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        on: {
            progress: function(progress){

                for (var i = 0; i < this.slides.length; i++){
                    //获取到当前的item
                    var slide = this.slides[i];
                    //获取到当前的style
                    var es = slide.style;
                    console.log(slide.progress)
                    //设置缩放
                    // if (slide.progress != 0 ){
                    //     es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform
                    //         = 'scale(' +0.8 + ')';
                    // }else {
                    //     es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform
                    //         = 'scale(' + (1 - Math.abs(slide.progress) / 3) + ')';
                    // }
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform
                        = 'scale(' + (1 - Math.abs(slide.progress) / 4) + ')';
                    // es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform
                    //     = 'scale(' +0.8 + ')';
                    // var opacity = 1 - Math.abs(slide.progress);
                    // opacity < 0 ? opacity = 0 : "";
                    slide.children[0].children[0].style.opacity = 0.8;
                    // slide.children[0].children[0].style.height = (opacity * 2.75) + "rem";
                    // slide.children[0].children[0].style.padding = ((1 - opacity) * 1) + "rem 0";
                }
            },
            //开启动画过渡效果
            setTransition: function(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }
            }
        }
    });
}


//判断浏览器类型
function typenavigator(){
    var browser = {
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
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {//在微信中打开
             weixin=true;
        }
        if (ua.match(/WeiBo/i) == "weibo") {//在新浪微博客户端打开

        }
        if (ua.match(/QQ/i) == "qq") {//在QQ空间打开

        }
        if (browser.versions.ios) {//是否在IOS浏览器打开
            // alert('请使用Android手机下载');
        }
        if(browser.versions.android){//是否在安卓浏览器打开
            $xd('btn-dow').addEventListener('click',queryStatus,false);
            $xd('btn-down').addEventListener('click',queryStatus,false)
            document.querySelector('.mid-bg').addEventListener('click',queryStatus,false)
        }
    }  else if (browser.versions.gecko) {//火狐
        //点击中间的下载按钮
        $xd('btn-dow').addEventListener('click',queryStatus,false);
        $xd('btn-down').addEventListener('click',queryStatus,false)
        document.querySelector('.mid-bg').addEventListener('click',queryStatus,false)
    }else if (browser.versions.presto) {//欧朋
        $xd('btn-dow').addEventListener('click',queryStatus,false);
        $xd('btn-down').addEventListener('click',queryStatus,false)
        document.querySelector('.mid-bg').addEventListener('click',queryStatus,false)
    }
}
//查询本地状态
function queryStatus() {
    clearInterval(timer)
    //下载上报
    var reportData = {
        pageFrom: Global.from,
        businessFrom: Global.from,
        pageId: 'temp2',
        pageType: 'game',
        eventType: '1',
        eventData: {
            game_id:game_id,
            agent_id: agent_id
        },
        businessId: "game",
        businessName: "game"
    };
    $.post(Global.reportApi,{
        data:JSON.stringify(reportData)
    },function (res) {

    })

    if (weixin && duan){
        console.log(weburl)
        location.href=weburl;
    }else if (weixin){

        document.querySelector('.share').style.display='block';
        console.log("123")
        console.log('wei',weburl)
    }else {

        console.log(weburl)
        location.href=weburl;

    }
}
//暂停状态使用的下载方法
function pasuedDown(){
    clearInterval(timerss);
    //下载上报
    var reportData = {
        pageFrom: Global.from,
        businessFrom: Global.from,
        pageId: 'temp2',
        pageType: 'game',
        eventType: '1',
        eventData: {
            game_id:game_id,
            agent_id: agent_id
        },
        businessId: "game",
        businessName: "game"
    };

    callAppFunc_getSomeParams(function (resData) {
        var resObj = JSON.parse(resData);
        Global.deviceId = resObj.deviceId;
        Global.userId = resObj.userId;
        Global.version = resObj.version;
        if (Global.deviceId) {
            reportData.deviceId = Global.deviceId;
        }
        if (Global.userId) {
            reportData.userId = Global.userId;
        }
        if (Global.version) {
            reportData.version = Global.version;
        }
    })

    // alert("第二次下载");
    timerss=setInterval(function () {
        callAppFunc_dbGet(game_id,function (resss) {
            var re=JSON.parse(resss);
            //    获取到实时进度
            var  __progress=re.progress;

            //    获取下载状态
            var  __appstatus=re.status;
            // alert(__appstatus+'状态')
            if (__progress == 100){
                //显示按钮
                $xd('no-down').style.display='block';
                $xd('downing').style.display='none';
                //清除定时器
                // clearInterval(timerss);
            }
            if ( __appstatus == 0){//下载中  隐藏下载按钮  显示进度条
                $xd('no-down').style.display='block';
                $xd('downing').style.display='none';
                //展示进度百分比

                $xd('jd').innerHTML=__progress+'%';

            }else if (__appstatus == 1){//下载完成等待安装
                clearInterval(timerss)
                //    安装游戏
                reportData.eventType = 4;
                $.post(Global.reportApi,{
                    data:JSON.stringify(reportData)
                },function (res) {
                    console.log("安装上报成功")
                })
                callAppFunc_installGame(game_id);
            }else if ( __appstatus == 2) {//已安装 点击打开APP
                $xd('no-down').style.display='block';
                $xd('downing').style.display='none';
                //    安装游戏
                reportData.eventType = 3;
                $.post(Global.reportApi,{
                    data:JSON.stringify(reportData)
                },function (res) {
                    console.log("打开上报成功")
                })
                clearInterval(timerss);
                // callAppFunc_openGame(game_id);
            }
        })
    },1000)
}
//查询轮询接口
function loopUrl() {
    //存在编排id http://120.205.22.111:8111/api/v7/landpage http://61.138.255.199:9103/api/v7/landpage
        $.get('http://sdk.uybeliq.com/api/v7/layout',{
            id:orchestration
        },function (res) {
            if (res.code == 200){
                urlArr=res.data;
                if (jump && urlArr.length > 0){
                    if (window.history && window.history.pushState){
                        $(window).on('popstate',function () {
                            window.history.pushState('forward',null,'#')
                            window.history.forward(1);
                            //获取到索引值
                            var num=parseInt(jump)+1;
                            if (num >= urlArr.length) {
                                num = 0;
                            }

                            //判断是web app
                            var isApp=window.location.href;
                            var jumpUrl='';
                            console.log('第一次',jumpUrl)
                            if (isApp.indexOf('index-app') != -1){
                                console.log("我是app")
                                jumpUrl=urlArr[num].replace(/index-web/,"index-app");
                            } else {
                                console.log("我是web")
                                jumpUrl=urlArr[num].replace(/index-app/,"index-web");
                                console.log('第二次',jumpUrl)
                            }
                            console.log('第三次',jumpUrl)
                            window.location.href=jumpUrl+'&pageFrom=temp2+'+game_id+'&id='+orchestration+'&agent_id='+agent_id;
                        })
                    }

                    window.history.pushState('forward',null,'#')
                    window.history.forward(1);
                }
            } else {
                alert(res.msg)
            }
        })
}


window.onload=function(){
    document.addEventListener("DOMContentLoaded", function() {
        var _h = document.body.scrollHeight;
        //让body占满整个屏幕
        document.getElementsByTagName("body")[0].setAttribute("style","min-height:"+ _h+'px');
        FastClick.attach(document.body);
    }, false);

    typenavigator()
    getInfo();
    document.addEventListener('touchend',function () {
        console.log("111")
       // 判断如果在播放状态 那么就不掉播放事件了
        if ( $xd('audio').paused) {
            $xd('audio').play();
        }
        // alert( $xd('audio').src)
    },true)
    if (jump && orchestration){
        loopUrl()
    }

    if (agent_id != null) {
        Global.agentId = agent_id;
    }
    if (pageFrom == 'null'){
        pageFrom = ''
    }
    if (game_id != null) {
        Global.gameId = game_id;
        var pvData = {
            pageFrom: pageFrom,
            businessFrom: pageFrom,
            pageId: 'temp2',
            pageType: 'game',
            eventType: '0',
            eventData: {
                game_id: game_id,
                agent_id: agent_id
            },
            businessId: "game",
            businessName: "game",
            dataType: "pv"
        };
        $.post(Global.reportApi,{
            data:JSON.stringify(pvData)
        },function (res) {

        })
    }

}

$xd('mid-bg').onload=function () {
    var that=this
    if (that.getAttribute("src") != "unknown") {
        if (that.complete){
            console.log("我是上次图")
            if (agent_id != null) {
                Global.agentId = agent_id;
            }
        if (pageFrom == 'null'){
            pageFrom = ''
        }
            if (game_id != null) {
                Global.gameId = game_id;
                var psData = {
                    pageFrom: pageFrom,
                    businessFrom: pageFrom,
                    pageId: 'temp2',
                    pageType: 'game',
                    eventType: '0',
                    eventData: {
                        game_id: game_id,
                        agent_id: agent_id
                    },
                    businessId: "game",
                    businessName: "game",
                    dataType: "ps"
                };
                $.post(Global.reportApi,{
                    data:JSON.stringify(psData)
                },function (res) {
                    console.log("ps上报成功")
                })
            }
        }
    }
}



