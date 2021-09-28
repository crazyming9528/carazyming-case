/**
 *
 *
 */

/**
 * 初始化数据
 * */
// var cconsole=new VConsole();
//获取参数部分
var temp_id=1;
var game_id=$xd.queryString('game_id');
var agent_id=$xd.queryString('agent_id')||'';
var pageFrom=$xd.queryString('pageFrom')||'';
var jump=$xd.queryString('jump')||'';
var invoke_id = $xd.queryString('invoke_id') || '';
var orchestration=$xd.queryString('id')||'';
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


//获取DOM元素部分
var title=document.querySelector('title');//页面标题
var icon=document.querySelector('#module-icon-right');//icon
var iconFooter=document.querySelector('#xd-right');//底部icon
var video=document.querySelector('#source');//视频
var videoMoule=document.querySelector('.videoMoule');//视频模块
var moduleTop=document.querySelector('.module-top');//模块一
var head_backimg=document.querySelector('#head_backimg');//模块一图片
var custom_backimg=document.querySelector('#custom_backimg');//模块四图片
var btnDowm=document.querySelector('.btn-down').querySelector('img');//下部按钮
var btnMid=document.querySelector('.btn-mid').querySelector('img');//下部按钮
var mute=document.querySelector('.mute');//静音按钮
var moduleFooter=document.querySelector('.module-footer');//底部模块更换颜色
var moduleIcon=document.querySelector('.module-icon-left');//中间模板更换颜色
//实例化video
var video1=videojs('my-video',function () {

})
//定义配置对象
var params={}
//
var timer,timers,timerss,progress,_appstatus,open,timerxd,xd=true,weixin;//定义使用的变量
var openvideo,weburl,urlArr=[]


/**
 * 方法部分
 *
 * */
//初始化参数
function init() {
    //修改页面title和游戏name
    title.innerHTML=data.gamename;
    $xd('name').innerHTML=data.gamename;
    $xd('name1').innerHTML=data.gamename;
    //修改icon
    icon.src=data.icon;
    iconFooter.src=data.icon;
    //修改下载模块的背景颜色
    moduleFooter.setAttribute('style','background-color:rgba('+data.title_backcolor+')');
    moduleIcon.setAttribute('style','background-color:rgba('+data.title_backcolor+')');
    //修改视频的src地址
    video1.src({
        src:data.video_retation[0],
        type: 'application/x-mpegURL'//在重新添加视频源的时候需要给新的type的值
    })
    //设置视频占位图片的src
    // $xd('xd-pa').style.backgroundImage=data.retation_backimg
    // $xd('xd-pa').setAttribute('style','background-image:url('+data.retation_backimg+')')

    video1.poster=data.retation_backimg;
    console.log(video1.poster)
    //设置视频模块距离顶部
    videoMoule.style.top=(data.top*375/720/26)+'rem';
    //设置模块1的图片
    head_backimg.src=data.head_backimg;
    //模块4图片
    custom_backimg.src=data.custom_backimg;
    //底部按钮
    btnDowm.src=data.download_img;
    btnMid.src=data.download_img;
    //设置暂停键按钮
    // $xd('xd-pa').querySelector('button').setAttribute('style','background-image:'+data.    $xd('xd-pa').querySelector('button').setAttribute('style','background-image:'+data.    $xd('xd-pa').querySelector('button').setAttribute('style','background-image:'+data.suspend_img))
    $xd('xd-pa').querySelector('button').setAttribute('style','background-image:url('+data.suspend_img+')')
    //显示文件描述信息
    // $xd('size').innerHTML=data.desc;
    // $xd('size1').innerHTML=data.desc;
    $xd('size').innerHTML=data.desc.slice(0,55)+'......';
    $xd('size1').innerHTML=data.desc.slice(0,55)+'......';
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
        pageId: 'temp1',
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

        })

    })
    if (agent_id != null) {
        Global.agentId = agent_id;
    }
    if (game_id != null) {
        Global.gameId = game_id;
        if (pageFrom == 'null'){
            pageFrom = ''
        }
        var pvData = {
            pageFrom: pageFrom,
            businessFrom: pageFrom,
            pageId: 'temp1',
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
    //调用获取游戏信息的接口
    getInfoGame()
}
//点击图片隐藏
document.querySelector('.share').querySelector('img').onclick=function () {
    // $xd('dialog').style.display='none';
    console.log(1);
    document.querySelector('.share').style.display='none';
    document.querySelector('.videoMoule').style.display='block';
}
//获取游戏信息接口
function getInfoGame() {
    axios.get($xd.gameUrl+'/'+game_id).then(function (res) {
        var mess=res.data.game_info;
        //   判断渠道id 如果没有则不加上
        if (agent_id){
            params.apkUrl=mess.androidurl.replace(/.apk/,"_" +agent_id+ ".apk");
        } else {
            params.apkUrl=mess.androidurl
        }
        params.size=mess.size;
        params.status=mess.status
        //    查询本地状态


    }).catch(function (err) {
        console.log(err);
        alert("网络请求错误")
    })
}
//获取信息接口
function getInfo() {
    axios.get($xd.info,{
        params:{
            game_id:game_id,
            temp_id:temp_id
        }
    }).then(function (res) {
        if (res.status == 200){
            data = res.data.data;
            weburl = res.data.data.url;
            if (agent_id){
               weburl=weburl.replace(/.apk/,"_" +agent_id+ ".apk");
            } else {
               weburl=weburl
            }
            console.log(res)
            init()

            if (invoke_id){
                weburl ='';
                getInfoFromCms(invoke_id);
            }else {

            }
        }
    }).catch(function (res) {
        console.log(res)
        alert("信息接口错误")
    })
}

//从新的cms获取信息接口
function getInfoFromCms(key) {
    axios.get($xd.info_cms, {
        params: {
            key: key,
        }
    }).then(function (res) {

        if (res.status == 200) {

            if (res.data.data) {
                weburl = res.data.data.url;
                if (agent_id) {
                    weburl = weburl.replace(/.apk/, "_" + agent_id + ".apk");
                } else {
                    weburl = weburl
                }
            } else {
                weburl = "";
            }
            console.log("新地址", weburl);
            init()
        }
    }).catch(function (res) {
        console.log(res)
        alert("cms信息接口错误")
    })
}
//查询本地状态
function queryStatus() {

    // //下载上报
    var reportData = {
        pageFrom: Global.from,
        businessFrom: Global.from,
        pageId: 'temp1',
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
    if (weixin){
      document.querySelector('.videoMoule').style.display='none';
      // $xd('dialog').style.display='block';
        document.querySelector('.share').style.display='block'
    } else {
        location.href=weburl;
    }

}
//点击喇叭按钮
mute.onclick=function () {
    var now=video1.volume();
    if (now != 0){
        video1.volume(0);
        this.querySelector('img').src='./img/moban1_mute_ico.png';
    } else {
        video1.volume(1);
        this.querySelector('img').src='./img/moban1_voice_ico.png'
    }
}
//点击暂停
$xd('xd-pa').onclick=function () {
    if (xd){
        video1.play();
        this.querySelector('button').style.display='none';
        this.style.backgroundImage='none'
        xd=false;
    } else {
        video1.pause();
        this.querySelector('button').style.display='block';
        this.style.backgroundImage='none'
        xd=true;
    }
}


//暂停状态使用的下载方法
function pasuedDown(){
    timerss=setInterval(function () {
        callAppFunc_dbGet(game_id,function (resss) {
            var re=JSON.parse(resss);
            //    获取到实时进度
            var  __progress=re.progress;
            //    获取下载状态
            var  __appstatus=re.status;
            // alert(__appstatus)
            if (__progress == 100){
                //显示按钮
                $xd('btn-mid').style.display='block';
                $xd('btn-down').style.display='block';
                $xd('jd').style.display='none';
                $xd('jd2').style.display='none';
                //清除定时器
                clearInterval(timerss);
            }

            if ( __appstatus == 0){//下载中  隐藏下载按钮  显示进度条
                $xd('btn-mid').style.display='none';
                $xd('btn-down').style.display='none';
                $xd('jd').style.display='block';
                $xd('jd2').style.display='block';
                //展示进度百分比
                $xd('jindu').innerHTML=__progress;
                $xd('jindu1').innerHTML=__progress;
            }else if (__appstatus == 1){//下载完成等待安装
                //    安装游戏
                callAppFunc_installGame(game_id);
                clearInterval(timerss)
            }else if ( __appstatus == 2) {//已安装 点击打开APP
                $xd('btn-mid').style.display = 'block';
                $xd('btn-down').style.display = 'block';
                $xd('jd').style.display = 'none';
                $xd('jd2').style.display = 'none';
                callAppFunc_openGame(game_id);
                clearInterval(timerss)
            }
        })
    },1000)
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
            // rightHigShow.style.display = 'block';
            weixin=true;
            //点击中间的下载按钮
            $xd('btn-mid').addEventListener('click',queryStatus,false);
            //点击下面的按钮
            $xd('btn-down').addEventListener('click',queryStatus,false);
        }
        if (ua.match(/WeiBo/i) == "weibo") {//在新浪微博客户端打开

        }
        if (ua.match(/QQ/i) == "qq") {//在QQ空间打开

        }
        if (browser.versions.ios) {//是否在IOS浏览器打开
            // alert('请使用Android手机下载');
        }
        if(browser.versions.android){//是否在安卓浏览器打开
            // rightHigShow.style.display = 'none';
            // alert("安卓浏览器")
            //点击中间的下载按钮
            $xd('btn-mid').addEventListener('click',queryStatus,false);
            //点击下面的按钮
            $xd('btn-down').addEventListener('click',queryStatus,false);
        }
    } else if (browser.versions.gecko) {//火狐
        //点击中间的下载按钮
        $xd('btn-mid').addEventListener('click',queryStatus,false);
        //点击下面的按钮
        $xd('btn-down').addEventListener('click',queryStatus,false);
        document.querySelector('.mute').style.display='none';
        // rightHigShow.style.display = 'none';
        // alert("pc浏览器")
    }else if (browser.versions.presto) {//欧朋
        $xd('btn-mid').addEventListener('click',queryStatus,false);
        //点击下面的按钮
        $xd('btn-down').addEventListener('click',queryStatus,false);
    }
}
//查询轮询接口
function loopUrl() {
    if (orchestration){
        $.get('http://61.138.255.199:9103/api/v7/layout',{
            id:orchestration
        },function (res) {
            if (res.code == 200){
               urlArr=res.data;
// urlArr=['http://t1.crazyming.cn/11/index-app.html?game_id=6416&temp_id=2&jump=0','http://t1.crazyming.cn/11/index-app.html?game_id=6419&temp_id=2&jump=1']
                if (jump && urlArr.length > 0){
                    var count =parseInt($xd.queryString('count')) || 1;
                    if (count < urlArr.length) {
                        window.history.pushState('forward', null, '');
                        window.history.forward(1);
                    }

                    if (window.history && window.history.pushState){
                        $(window).on('popstate',function () {
                            // window.history.pushState('forward',null,'#')
                            // window.history.forward(1);
                            //获取到索引值

                            var num = parseInt(jump)+1;
                            if (num >= urlArr.length) {
                                // num =urlArr.length-1
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
                            console.log('第三次',jumpUrl);
                            count++;
                            setTimeout(function () {
                                window.location.replace(jumpUrl+'&pageFrom=temp1+'+game_id+'&id='+orchestration+'&agent_id='+agent_id+'&count='+count);
                            },100);

                            // window.location.href=jumpUrl+'&pageFrom=temp1+'+game_id+'&id='+orchestration+'&agent_id='+agent_id+'&over='+over;
                        })
                    }

                    // window.history.pushState('forward',null,'#')
                    // window.history.forward(1);
                }
            } else {
                alert(res.msg)
            }
        })
    }
}
//页面加载完毕
window.onload=function () {
    document.addEventListener("DOMContentLoaded", function() {
        var _h = document.body.scrollHeight;
        //让body占满整个屏幕
        document.getElementsByTagName("body")[0].setAttribute("style","min-height:"+ _h+'px');
        FastClick.attach(document.body);
        }, false);
    getInfo();
    typenavigator();
    if (jump && orchestration){
        loopUrl()
    }

}
//页面滚动事件
var Height=document.body.clientHeight;
var gp=Height/2;
var f=document.querySelector('.module-footer');
window.onscroll=function () {
    // $(window).scrollTop()>parseInt(Height/2) ?f.show():f.hide();
    if ($(window).scrollTop() > gp){
        $('.module-footer').show()
        console.log(2)
    }  else {
        $('.module-footer').hide()
        console.log(1)
    }
    console.log($(window).scrollTop())
}

$xd('custom_backimg').onload=function () {
    var that=this;
    if (that.getAttribute("src") != "unknown") {
        if (that.complete){
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
                    pageId: 'temp1',
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
