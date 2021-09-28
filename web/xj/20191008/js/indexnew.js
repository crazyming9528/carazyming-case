/**
 *
 *
 */

/**
 * 初始化数据
 * */

//获取参数部分
var temp_id=1;
var game_id=$xd.queryString('game_id');
var agent_id=$xd.queryString('agent_id')||'';
var pageFrom=$xd.queryString('pageFrom')||'';
var jump=$xd.queryString('jump')||'';//跳转参数
var orchestration=$xd.queryString('id')||'';//编排id
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
var svgDom1=document.querySelectorAll('svg')[0].querySelectorAll('circle')[1];
var svgDom2=document.querySelectorAll('svg')[1].querySelectorAll('circle')[1];
var svgBg=document.querySelectorAll('.sv-box')[0];
var svgBg1=document.querySelectorAll('.sv-box')[1];
//实例化video
var video1=videojs('my-video',{},function () {

})
//定义配置对象
var params={
    id:"",           //游戏id
    name:"",        //游戏名称
    desc: "",        //游戏描述(游戏类型)
    image: "",    //游戏图片地址
    status:0,       //游戏状态
    downloadTime:"", //下载时间
    progress:0,     //下载进度(0~100)
    downloadPath:'', //apk下载路径
    packageName:"", //包名
    apkUrl:'',       //下载地址
    size:0,          //apk大小
    downloadId:''
}
//
var my,timer=null,timers=null,timerss,progress,_appstatus,open=false,xd=true,xdtime=false,xdt=false,urlArr=[];//定义使用的变量;
var timeArr={};
timeArr.timer='',timeArr.timerss=''


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
    moduleIcon.setAttribute('style','background-color:rgba('+255+','+255+','+255+','+0.5+')');
    //修改视频的src地址
    video1.src({
        src:data.video_retation[0],
        type: 'application/x-mpegURL'//在重新添加视频源的时候需要给新的type的值
    })
    //设置视频占位图片的src
    // $xd('xd-pa').style.backgroundImage=data.retation_backimg;
    $xd('xd-pa').setAttribute('style','background-image:url('+data.retation_backimg+')')
    //设置视频模块距离顶部
    videoMoule.style.top=(data.top*375/720/26)+'rem';
    // videoMoule.style.top=(data.top*0.03125)+'rem';
    //设置模块1的图片
    head_backimg.src=data.head_backimg;
    //模块4图片
    custom_backimg.src=data.custom_backimg;
    //底部按钮
    btnDowm.src=data.download_img;
    btnMid.src=data.download_img;
    //设置暂停键按钮
    // $xd('xd-pa').querySelector('button').setAttribute('style','background-image:'+data.    $xd('xd-pa').querySelector('button').setAttribute('style','background-image:'+data.    $xd('xd-pa').querySelector('button').setAttribute('style','background-image:'+data.suspend_img))
   // $xd('xd-pa').querySelector('button').setAttribute('style','background-image:url('+data.suspend_img+')')
    $xd('xd-pa').querySelector('button').setAttribute('style', 'background-image:url(' + data.suspend_img + ')')
    //显示文件描述信息
    $xd('size').innerHTML=data.desc.slice(0,55)+'......';
    $xd('size1').innerHTML=data.desc.slice(0,55)+'......';
    //定义请求参数对象
    params.id=game_id;
    params.name=data.gamename
    params.desc=data.desc
    params.downloadTime=0
    params.progress=0
    params.downloadPath=''
    params.packageName=''
    params.downloadId=''
    params.image=data.icon
    //大数据上报
     if (pageFrom == null){
         pageFrom ='';
     }
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
            console.log("uv上报成功");
            // alert("uv上传");
        })

})
    getInfoGame()

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
            // params.apkUrl='http://down.chekchekoyuni.com:9108/sdkgame/llbyand_6024/llbyand_6024.apk'
        }
        params.size=mess.size;
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
            console.log(res)
            init()
        }
    }).catch(function (res) {
        console.log(res)
        alert("信息接口错误")
    })
}
//查询本地状态
function queryStatus() {
    clearInterval(timeArr.timer);
    //下载上报
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

    callAppFunc_dbGet(game_id,function (json) {
        var status=(json == "null" || json == null || json == undefined || json == "");
        if (status){//没有下载过
            var list = [];
            open=false;
            //展示开始下载图标
            svgBg.style.backgroundImage="url(./img/pause.png)";
            svgBg1.style.backgroundImage="url(./img/pause.png)";
            //隐藏下载按钮 展示下载部分
            $xd('btn-mid').style.display='none';
            $xd('btn-down').style.display='none';
            $xd('jd').style.display='block';
            $xd('jd2').style.display='block';
            //展示进度条
            svgDom1.setAttribute('stroke-dasharray',0+' 180')
            svgDom2.setAttribute('stroke-dasharray',0+' 220');
            //下载上报
            $.post(Global.reportApi,{
                data:JSON.stringify(reportData)
            },function (res) {
                console.log("下载上报成功")
            })
            //传入到下载id列表
            callAppFunc_dbGet('download_model_id_list', function (json) {
                if (json && json.length > 0) {
                    var array = JSON.parse(json);
                    //存在id
                    if (array) {
                        //有多个id
                        if (array.length > 0) {
                            for (var i = 0; i != array.length; ++i) {
                                var item = array[i];
                                if (item != game_id) {
                                    list.push(item);
                                }
                            }
                        }
                    }
                    //
                    list.push(game_id);
                    callAppFunc_dbDelete('download_model_id_list');
                } else {
                    list.push(game_id);
                }
                //下载上报
                callAppFunc_dbSet('download_model_id_list', list);
            });
            callAppFunc_dbSet(game_id, params);
            callAppFunc_startDown(game_id);
            timeArr.timer=setInterval(function () {
                callAppFunc_dbGet(game_id,function (resss) {
                    var re=JSON.parse(resss);
                    //    获取到实时进度
                    var  __progress=re.progress;
                    //    获取下载状态
                    var  __appstatus=re.status;
                    params.status=re.status;
                    params.progress=re.progress;
                    params.downloadPath = re.downloadPath;
                    params.downloadId=re.downloadId;
                    if (__progress == 100){
                        //显示按钮
                        $xd('btn-mid').style.display='block';
                        $xd('btn-down').style.display='block';
                        $xd('jd').style.display='none';
                        $xd('jd2').style.display='none';
                        //清除定时器
                        clearInterval(timeArr.timer);
                    }

                    if ( __appstatus == 0){//下载中  隐藏下载按钮  显示进度条
                        //展示进度百分比
                        var pr1=__progress*0.9;
                        var pr2=__progress*1.15;
                        svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
                        svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
                        $xd('jindu').innerHTML = __progress + '%';
                        $xd('jindu1').innerHTML = __progress + '%';
                    }else if (__appstatus == 1){//下载完成等待安装
                        //    安装游戏
                        reportData.eventType = 4;
                        $.post(Global.reportApi,{
                            data:JSON.stringify(reportData)
                        },function (res) {
                            console.log("安装上报成功")
                        })
                        clearInterval(timeArr.timer)
                    }else if ( __appstatus == 2) {//已安装 点击打开APP
                        $xd('btn-mid').style.display = 'block';
                        $xd('btn-down').style.display = 'block';
                        $xd('jd').style.display = 'none';
                        $xd('jd2').style.display = 'none';
                        //打开上报
                        reportData.eventType = 3;
                        $.post(Global.reportApi,{
                            data:JSON.stringify(reportData)
                        },function (res) {
                            console.log("打开上报成功")
                        })
                        clearInterval(timeArr.timer)
                    }
                })
            },1000)
        } else {//下载过
            var model=JSON.parse(json);
            console.log(model);
            // alert(model.status);
            if (model){//并且存在
                if (model.status == 0){//旧状态是下载中
                    params.status = 4; //将状态设置为下载中
                    callAppFunc_dbSet(game_id,params);
                    callAppFunc_pauseDown(game_id);
                    pasuedDown()
                }
                if (model.status == 4){//旧暂停
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
                        $.post(Global.reportApi,{
                            data:JSON.stringify(reportData)
                        },function (res) {
                            console.log("下载上报成功")
                        })
                    })
                    params.status = 0; //将状态设置为下载中 原本的
                    callAppFunc_dbSet(game_id,params);
                    callAppFunc_startDown(game_id);
                    pasuedDown()
                }else if (model.status == 1){//等待安装
                    callAppFunc_installGame(game_id);
                    //安装上报
                    reportData.eventType = 4;
                    $.post(Global.reportApi,{
                        data:JSON.stringify(reportData)
                    },function (res) {
                        console.log("安装上报成功")
                    })
                }else if (model.status == 2) {//安装了 需要判断是否卸载
                    callAppFunc_isInstall(game_id,function (isInstalled) {
                        var has=(isInstalled == false || isInstalled == "false" || isInstalled == "0")
                        if (has){
                            params.status=0;
                            callAppFunc_dbSet(game_id,params);//原本的
                            callAppFunc_startDown(game_id);//原本的
                            pasuedDown()
                            return;
                        }else {
                            //打开上报
                            reportData.eventType = 3;
                            $.post(Global.reportApi,{
                                data:JSON.stringify(reportData)
                            },function (res) {
                                    console.log("打开上报成功")
                            })
                            callAppFunc_openGame(game_id);
                        }
                    })
                }else if (model.status == 3){
                    params.status =  0;
                    callAppFunc_dbSet(game_id,params);
                    callAppFunc_startDown(game_id);
                    pasuedDown()
                }
            }
        }

    })
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
    clearInterval(timeArr.timer)
    clearInterval(timeArr.timerss)
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
    // alert("第二次下载")
    clearInterval(timeArr.timerss);
    timeArr.timerss=setInterval(function () {
            callAppFunc_dbGet(game_id,function (resss) {
                var re=JSON.parse(resss);
                //    获取到实时进度
                var  __progress=re.progress;

                //    获取下载状态
                var  __appstatus=re.status;
                params.status = __appstatus;
                params.progress = __progress;
                params.downloadPath = re.downloadPath;
                params.downloadId = re.downloadId
                // alert(__appstatus+'状态')
                if (__progress == 100){
                    //显示按钮
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';
                    //清除定时器
                    clearInterval(timeArr.timerss);
                }
                if ( __appstatus == 0){//下载中  隐藏下载按钮  显示进度条
                    $xd('btn-mid').style.display='none';
                    $xd('btn-down').style.display='none';
                    $xd('jd').style.display='block';
                    $xd('jd2').style.display='block';
                    //展示进度百分比
                    var pr1=__progress*0.9;
                    var pr2=__progress*1.15
                    svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
                    svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
                    $xd('jindu').innerHTML = __progress + '%';
                    $xd('jindu1').innerHTML = __progress + '%';
                }else if (__appstatus == 1){//下载完成等待安装
                    clearInterval(timeArr.timerss)
                    //    安装游戏
                    reportData.eventType = 4;
                    $.post(Global.reportApi,{
                        data:JSON.stringify(reportData)
                    },function (res) {
                        console.log("安装上报成功")
                    })
                    callAppFunc_installGame(game_id);
                }else if ( __appstatus == 2) {//已安装 点击打开APP
                    $xd('btn-mid').style.display = 'block';
                    $xd('btn-down').style.display = 'block';
                    $xd('jd').style.display = 'none';
                    $xd('jd2').style.display = 'none';
                    //    安装游戏
                    reportData.eventType = 3;
                    $.post(Global.reportApi,{
                        data:JSON.stringify(reportData)
                    },function (res) {
                        console.log("打开上报成功")
                    })
                    clearInterval(timeArr.timerss);
                    // callAppFunc_openGame(game_id);
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
            //点击中间的下载按钮
            $xd('btn-mid').addEventListener('click',function () {
                location.href='http://t.cn/EVPAua5';
            },false);
//点击下面的按钮
            $xd('btn-down').addEventListener('click',function () {
                location.href='http://t.cn/EVPAua5';
            },false);

        }
        if (ua.match(/WeiBo/i) == "weibo") {//在新浪微博客户端打开

        }
        if (ua.match(/QQ/i) == "qq") {//在QQ空间打开

        }
        if (browser.versions.ios) {//是否在IOS浏览器打开

        }
        if(browser.versions.android){//是否在安卓浏览器打开
            $xd('btn-mid').addEventListener('click',queryStatus,false);
            $xd('btn-down').addEventListener('click',queryStatus,false);
            $xd('jd').addEventListener('click',pasued,false)
            $xd('jd2').addEventListener('click',pasued,false)
        }
    } else {
    }
}
//查询轮询接口
function loopUrl() {
    //存在编排id
    if (orchestration){
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
                            window.location.href=jumpUrl+'&pageFrom=temp1+'+game_id+'&id='+orchestration+'&agent_id='+agent_id;
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

}

//进入页面查询状态 这边只需要做状态处理 其他的都可以不用管
function inquire(){
    var reportData={
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
    }

    callAppFunc_getSomeParams(function (resData) {
        var resObj = JSON.parse(resData)
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
    //查询本地状态 清除定时器
    clearInterval(timeArr.timer)
    clearInterval(timeArr.timerss)
    callAppFunc_dbGet(game_id,function (json) {
        var status=(json == "null" || json == null || json == undefined || json == "");
        if (status){//没有下载过

        }else {
            var a=JSON.parse(json)
            if (a.status == 0 && a.progress != 100){
                open=true;//开关变量
                xd=false;
                xdt=true;
                xdtime=false;
                $xd('btn-mid').style.display='none';
                $xd('btn-down').style.display='none';
                $xd('jd').style.display='block';
                $xd('jd2').style.display='block';
                svgBg.style.backgroundImage="url(./img/pause.png)";
                svgBg1.style.backgroundImage="url(./img/pause.png)";
               var pr1=(a.progress)*0.9;
               var pr2=(a.progress)*1.15;
                svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
                svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
                $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
                $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
            //    定时器取状态
                pasuedDown()
            } else if (a.status == 4){
                open=true;//开关变量
                xd=false;
                svgBg.style.backgroundImage="url(./img/paly.png)";
                svgBg1.style.backgroundImage="url(./img/paly.png)";
                $xd('btn-mid').style.display='none';
                $xd('btn-down').style.display='none';
                $xd('jd').style.display='block';
                $xd('jd2').style.display='block';
                xdtime=true;
                xdt=false;
                params=a;
                params.status = 4;
                params.progress=a.progress;
                callAppFunc_dbSet(game_id,params);
                callAppFunc_pauseDown(game_id)
                var pr1=(a.progress)*0.9;
                var pr2=(a.progress)*1.15;
                svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
                svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
                $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
                $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
            }
        }
    })
    // if ( params.progress !=0 && params.progress != 100 && params.status == 0){
    //     svgBg.style.backgroundImage="url(./img/pause.png)";
    //     svgBg1.style.backgroundImage="url(./img/pause.png)";
    //     $xd('btn-mid').style.display='none';
    //     $xd('btn-down').style.display='none';
    //     $xd('jd').style.display='block';
    //     $xd('jd2').style.display='block';
    //     var pr1=params.progress*0.9;
    //     var pr2=params.progress*1.15
    //     svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //     svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //     $xd('jindu').innerHTML = params.progress+'%';
    //     $xd('jindu1').innerHTML =params.progress+'%';
    // } else if (params.progress !=0 && params.progress != 100 && params.status == 4){
    //     svgBg.style.backgroundImage="url(./img/paly.png)";
    //     svgBg1.style.backgroundImage="url(./img/paly.png)";
    //     var pr1=params.progress*0.9;
    //     var pr2=params.progress*1.15;
    //     $xd('btn-mid').style.display='none';
    //     $xd('btn-down').style.display='none';
    //     $xd('jd').style.display='block';
    //     $xd('jd2').style.display='block';
    //     svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //     svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //     $xd('jindu').innerHTML = '';
    //     $xd('jindu1').innerHTML ='';
    //     $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //     $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
    // }
    // if (params.status == 0 && params.progress == 0){//初始状态 不做改变
    //         alert("第一次下载")
    // } else if (params.status == 0 && params.progress != 0){//下载过的 将状态
    //     $xd('btn-mid').style.display='none';
    //     $xd('btn-down').style.display='none';
    //     $xd('jd').style.display='block';
    //     $xd('jd2').style.display='block';
    //     svgBg.style.backgroundImage="url(./img/paly.png)";
    //     svgBg1.style.backgroundImage="url(./img/paly.png)";
    //     params.status = 4;
    //     // callAppFunc_dbSet(game_id,params);
    //     // callAppFunc_pauseDown(game_id);
    //     // setTimeout(function () {
    //     //     pasuedDown();
    //     // },200)
    // } else if (params.status == 4 && params.progress !=0){
    //     // params.status = 0;
    //     // callAppFunc_dbSet(game_id,params);
    //     // callAppFunc_startDown(game_id);
    //     svgBg.style.backgroundImage="url(./img/paly.png)";
    //     svgBg1.style.backgroundImage="url(./img/paly.png)";
    // }
    // var pr1=params.progress*0.9;
    // var pr2=params.progress*1.15
    // svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    // svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    // $xd('jindu').innerHTML = '';
    // $xd('jindu1').innerHTML ='';
    // $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
    // $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
    // callAppFunc_dbGet(game_id,function (json) {
    //     var status=(json == "null" || json == null || json == undefined || json == "");
    //     if (!status){//下载过才做处理 没有下载过不做处理
    //         var model=JSON.parse(json);
    //         if (model){
    //             var  __progress=model.progress;
    //             // alert(__progress)
    //             //判断一下 如果进度是100%的话 那么就不显示进度条而是原本的按钮
    //             if (__progress != 100){
    //                 if (model.status == 0){
    //                     svgBg.style.backgroundImage="url(./img/pause.png)";
    //                     svgBg1.style.backgroundImage="url(./img/pause.png)";
    //                 } else if (model.status == 4) {
    //                     svgBg.style.backgroundImage="url(./img/paly.png)";
    //                     svgBg1.style.backgroundImage="url(./img/paly.png)";
    //                 }
    //                 $xd('btn-mid').style.display='none';
    //                 $xd('btn-down').style.display='none';
    //                 $xd('jd').style.display='block';
    //                 $xd('jd2').style.display='block';
    //                 //展示进度百分比
    //                 var pr1=__progress*0.9;
    //                 var pr2=__progress*1.15
    //                 svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //                 svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //                 $xd('jindu').innerHTML = '';
    //                 $xd('jindu1').innerHTML ='';
    //                 $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //                 $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //             }
    //         }
    //     }
    // })
}
//点击暂停的方法
function pasued(){
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
    if (xdtime){
        params.status=4
    }
    //根据开关变量来控制是继续下载还是暂停
    // alert(open);
    // if (open){//继续下载
    //     open = false;
    //     svgBg.style.backgroundImage="url(./img/pause.png)";
    //     svgBg1.style.backgroundImage="url(./img/pause.png)";
    //     $xd('m').innerHTML='چۈشۈۋاتىدۇ'
    //     $xd('m2').innerHTML='چۈشۈۋاتىدۇ'
    //
    //     // callAppFunc_dbGet(game_id,function (json) {
    //     //     var model=JSON.parse(json);
    //     //     // alert(model.status+'继续')
    //     //     if (model.status == 0){
    //     //         // model.status = 4; //将状态设置为下载中
    //     //         if (model.progress < 5){
    //     //             model.progress = model.progress
    //     //         } else {
    //     //             model.progress =  model.progress -2;
    //     //         }
    //     //         callAppFunc_dbSet(game_id,model);
    //     //         // callAppFunc_pauseDown(game_id);
    //     //         pasuedDown()
    //     //     } else if (model.status == 4) {
    //     //         callAppFunc_getSomeParams(function (resData) {
    //     //             var resObj = JSON.parse(resData);
    //     //             Global.deviceId = resObj.deviceId;
    //     //             Global.userId = resObj.userId;
    //     //             Global.version = resObj.version;
    //     //             if (Global.deviceId) {
    //     //                 reportData.deviceId = Global.deviceId;
    //     //             }
    //     //             if (Global.userId) {
    //     //                 reportData.userId = Global.userId;
    //     //             }
    //     //             if (Global.version) {
    //     //                 reportData.version = Global.version;
    //     //             }
    //     //             $.post(Global.reportApi,{
    //     //                 data:JSON.stringify(reportData)
    //     //             },function (res) {
    //     //                 console.log("下载上报成功")
    //     //             })
    //     //         })
    //     //         model.status = 0; //将状态设置为下载中 原本的
    //     //         if (model.progress < 5){
    //     //             model.progress = model.progress
    //     //         } else {
    //     //             model.progress =  model.progress - 2;
    //     //         }
    //     //         callAppFunc_dbSet(game_id,model);
    //     //         callAppFunc_startDown(game_id);
    //     //         pasuedDown();
    //     //     }
    //     //
    //     // })
    // } else {//暂停
    //     open = true;
    //     alert(params.status);
        if (params.status == 0){
            clearInterval(timeArr.timer)
            clearInterval(timeArr.timerss)
            svgBg.style.backgroundImage="url(./img/paly.png)";
            svgBg1.style.backgroundImage="url(./img/paly.png)";
            xdt=false;
            params.status =4;
            callAppFunc_dbSet(game_id,params);
            callAppFunc_pauseDown(game_id)
            $xd('jindu').innerHTML='';
            $xd('jindu2').innerHTML='';
        }else if (params.status == 4){
            svgBg.style.backgroundImage="url(./img/pause.png)";
            svgBg1.style.backgroundImage="url(./img/pause.png)";
            params.status = 0;
            xdtime=false;
            callAppFunc_dbGet(game_id,params)
            callAppFunc_startDown(game_id)
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
                        $.post(Global.reportApi,{
                            data:JSON.stringify(reportData)
                        },function (res) {
                            console.log("下载上报成功")
                        })
                    })
             pasuedDown()
        }else if (params.status == 3){
            params.status =  0;
            callAppFunc_dbSet(game_id,params);
            callAppFunc_startDown(game_id);
            pasuedDown()
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
    //获取信息接口
    getInfo();
    //判断浏览器
    typenavigator();
    //请求轮询URL带轮询id
    if (jump && orchestration){
        loopUrl()
    }
    if (pageFrom == 'null'){
        pageFrom = ''
    }
    if (agent_id != null) {
        Global.agentId = agent_id;
    }
    if (game_id != null) {
        Global.gameId = game_id;
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
            console.log("pv上报成功")
        })
    }
     inquire()
}
//页面滚动事件
var Height=document.body.clientHeight;
var gp=Height/2;
var f=document.querySelector('.module-footer');
window.onscroll=function () {
        if ($(window).scrollTop() > gp){
            $('.module-footer').show()
            console.log(2)
        }  else {
            $('.module-footer').hide()
            console.log(1)
        }
        console.log($(window).scrollTop())
}
//页面加载完毕 上报数据
$xd('custom_backimg').onload=function () {
    var that=this;
    if (that.getAttribute("src") != "unknown") {
        if (that.complete){
            if (agent_id != null) {
                Global.agentId = agent_id;
            }
            if (pageFrom == 'null'){
                pageFrom =''
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



