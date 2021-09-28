'use strict';

/**
 *模板二js
 * by:向东
 * */

/**
 * 初始话参数
 * */
var game_id = $xd.queryString('game_id');
var temp_id = 2;
var agent_id = $xd.queryString('agent_id') || '';
var pageFrom = $xd.queryString('pageFrom') || '';
var jump = $xd.queryString('jump') || '';
var orchestration = $xd.queryString('id') || '';
var title = document.querySelector('title'); //页面标题
var svgDom1 = document.querySelectorAll('svg')[0].querySelectorAll('circle')[1];
var svgDom2 = document.querySelectorAll('svg')[1].querySelectorAll('circle')[1];
var svgBg = document.querySelectorAll('.sv-box')[0];
var svgBg1 = document.querySelectorAll('.sv-box')[1];
var data = null;
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
    isDownloading: false
};

var imgArr = [];
//配置对象
var params = {
    id: "", //游戏id
    name: "", //游戏名称
    desc: "", //游戏描述(游戏类型)
    image: "", //游戏图片地址
    status: 0, //游戏状态
    downloadTime: "", //下载时间
    progress: 0, //下载进度(0~100)
    downloadPath: '', //apk下载路径
    packageName: "", //包名
    apkUrl: '', //下载地址
    size: 0, //apk大小
    downloadId: ''
};
var my,
    timer = null,
    timers = null,
    timerss,
    progress,
    _appstatus,
    open = false,
    xd = true,
    xdtime = false,
    xdt = false,
    urlArr = []; //定义使用的变量;
var timeArr = {};
timeArr.timer = '', timeArr.timerss = '';
var danMuArr = [];

//初始化参数
function init() {
    var html = '';
    title.innerHTML = data.gamename;
    //设置背景音乐 background_music
    if (data.background_music) {
        $xd('audio').src = data.background_music.path;
    }

    //设置弹幕
    danMuArr = data.danmu || '';
    console.log('danmu', danMuArr);
    //判断弹幕长度
    //判断弹幕长度
    if (danMuArr) {
        if (danMuArr.length < 10) {
            html += '<div class="danmu-box GPU">';
            for (var i = 0; i < danMuArr.length; i++) {
                html += '<div class="danmu-item">' + danMuArr[i] + '</div>';
            }
            html += '</div>';
            //设置弹幕
            $xd('danmu-box').innerHTML = html;
        } else {
            html += '<div class="danmu-box GPU" >';
            for (var _i = 0; _i <= 10; _i++) {
                html += '<div class="danmu-item">' + danMuArr[_i] + '</div>';
            }
            html += '</div>';
            //设置弹幕
            $xd('danmu-box').innerHTML = html;
            //换行
            html = '';
            html += '<div class="danmu clearfix" style="top:10rem ;">';
            html += '<div class="danmu-box GPU">';
            for (var _i2 = 10; _i2 < danMuArr.length; _i2++) {
                html += '<div class="danmu-item" style="margin-right: 10px">' + danMuArr[_i2] + '</div>';
            }
            html += '</div></div>';
            $xd('danmu-box1').innerHTML = html;
        }
    }

    //设置name和描述
    $xd('name').innerHTML = data.gamename;
    $xd('desc').innerHTML = data.desc.slice(0, 80) + '......';
    //设置背景颜色
    $xd('top-down').setAttribute('style', 'background-color:rgba(' + data.title_backcolor + ')');
    //设置下载按钮
    $xd('btn-down').querySelector('img').src = data.suspend_img;
    $xd('btn-dow').querySelector('img').src = data.download_img;
    //设置图标
    $xd('icon').src = data.icon;
    //头部背景
    $xd('mid-bg').src = data.head_backimg;
    //底部背景
    $xd('footer').src = data.custom_backimg;
    //轮播图的背景
    $xd('mo').setAttribute('style', 'background-image: url(' + data.retation_backimg + ')');
    //设置轮播图的图片
    $xd('lun1').querySelector('img').src = data.video_retation[0];
    $xd('lun2').querySelector('img').src = data.video_retation[1];
    $xd('lun3').querySelector('img').src = data.video_retation[2];
    $xd('lun4').querySelector('img').src = data.video_retation[3];
    my = initTicket();

    params.id = game_id;
    params.name = data.gamename;
    params.desc = data.desc;
    params.downloadTime = 0;
    params.progress = 0;
    params.downloadPath = '';
    params.packageName = '';
    params.downloadId = '';
    params.image = data.icon;
    if (pageFrom == 'null') {
        pageFrom = '';
    }
    //大数据上报
    Global.from = pageFrom;
    Global.tmpId = temp_id;
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
        $.post(Global.reportApi, {
            data: JSON.stringify(uv)
        }, function (res) {
            console.log("uv上报成功");
        });
    });
    getInfoGame();
}
//获取信息接口
function getInfo() {
    //需要修改
    $.get($xd.info, {
        game_id: game_id,
        temp_id: 2
    }, function (res) {
        if (res.code == 200) {
            data = res.data;
            console.log(data);
            imgArr = data.video_retation;
            console.log(data);
            init();
        } else {
            alert(res.msg);
        }
    });
}
//获取游戏信息接口
function getInfoGame() {
    $.get($xd.gameUrl + '/' + game_id, {}, function (res) {
        console.log(res);
        var mess = res.game_info;
        if (agent_id) {
            params.apkUrl = mess.androidurl.replace(/.apk/, "_" + agent_id + ".apk");
        } else {
            params.apkUrl = mess.androidurl;
        }
        params.size = mess.size;
    });
}
//查询轮询接口
function loopUrl() {
    //存在编排id
    $.get('http://61.138.255.199:9103/api/v7/layout', {
        id: orchestration
    }, function (res) {
        if (res.code == 200) {
            urlArr = res.data;
           // urlArr=['http://t1.crazyming.cn/22/index-app.html?game_id=6416&temp_id=2&jump=0','http://t1.crazyming.cn/22/index-app.html?game_id=6419&temp_id=2&jump=1'];
            if (jump && urlArr.length > 0) {
                var count =parseInt($xd.queryString('count')) || 1;
                if (count < urlArr.length) {
                    window.history.pushState('forward', null, '');
                    window.history.forward(1);
                }
                if (window.history && window.history.pushState) {
                    $(window).on('popstate', function () {
                        // window.history.pushState('forward', null, '#');
                        // window.history.forward(1);
                        //获取到索引值
                        var num = parseInt(jump) + 1;
                        if (num >= urlArr.length) {
                            num = 0;
                        }
                        //判断是web app
                        var isApp = window.location.href;
                        var jumpUrl = '';
                        console.log('第一次', jumpUrl);
                        if (isApp.indexOf('index-app') != -1) {
                            console.log("我是app");
                            jumpUrl = urlArr[num].replace(/index-web/, "index-app");
                        } else {
                            console.log("我是web");
                            jumpUrl = urlArr[num].replace(/index-app/, "index-web");
                            console.log('第二次', jumpUrl);
                        }
                        console.log('第三次', jumpUrl);
                        count++;
                        setTimeout(function () {
                            window.location.replace(jumpUrl + '&pageFrom=temp2+' + game_id + '&id=' + orchestration + '&agent_id=' + agent_id+'&count='+count);
                        },100);
1
                        // window.location.href = jumpUrl + '&pageFrom=temp2+' + game_id + '&id=' + orchestration + '&agent_id=' + agent_id;
                    });
                }

                // window.history.pushState('forward', null, '#');
                // window.history.forward(1);
            }
        } else {
            alert(res.msg);
        }
    });
}

//实例化轮播插件
function initTicket() {
    return new Swiper('.swiper-container', {
        watchSlidesProgress: true, //查看进度
        slidesPerView: 3, //同时显示的数量/
        centeredSlides: true,
        loop: true,
        loopAdditionalSlides: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        on: {
            progress: function progress(_progress) {
                for (var i = 0; i < this.slides.length; i++) {
                    //获取到当前的item
                    var slide = this.slides[i];
                    //获取到当前的style
                    var es = slide.style;
                    //设置缩放
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'scale(' + (1 - Math.abs(slide.progress) / 4) + ')';
                    slide.children[0].children[0].style.opacity = 0.8;
                }
            },
            //开启动画过渡效果
            setTransition: function setTransition(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    slide.transition(transition);
                }
            }
        }
    });
}
//判断浏览器类型
function typenavigator() {
    var browser = {
        versions: function () {
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
    };
    if (browser.versions.mobile) {
        //判断是否是移动设备打开。browser代码在下面
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开
            $xd('btn-dow').addEventListener('click', function () {
                location.href = 'http://t.cn/EVPAua5';
            }, false);
            $xd('btn-down').addEventListener('click', function () {
                location.href = 'http://t.cn/EVPAua5';
            });
            document.querySelector('.mid-bg').addEventListener('click', function () {
                location.href = 'http://t.cn/EVPAua5';
            });
        }
        if (ua.match(/WeiBo/i) == "weibo") {//在新浪微博客户端打开

        }
        if (ua.match(/QQ/i) == "qq") {//在QQ空间打开

        }
        if (browser.versions.ios) {//是否在IOS浏览器打开
            // alert('请使用Android手机下载');
        }
        if (browser.versions.android) {
            //是否在安卓浏览器打开
            $xd('btn-dow').addEventListener('click', queryStatus, false);
            $xd('btn-down').addEventListener('click', queryStatus, false);

            $xd('downing2').addEventListener('click', pasued, false);
            $xd('downing').addEventListener('click', pasued, false);
            // alert(open)
            if (xd) {
                document.querySelector('.mid-bg').addEventListener('click', queryStatus, false);
            } else {
                document.querySelector('.mid-bg').addEventListener('click', pasued, false);
            }
        }
    } else {//PC浏览器打开
        // rightHigShow.style.display = 'none';
        // alert("pc浏览器")
    }
}
//查询本地状态
function queryStatus() {

    clearInterval(timeArr.timer);
    //下载上报
    var reportData = {
        pageFrom: Global.from,
        businessFrom: Global.from,
        pageId: 'temp2',
        pageType: 'game',
        eventType: '1',
        eventData: {
            game_id: game_id,
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
    });
    callAppFunc_dbGet(game_id, function (json) {
        var status = json == "null" || json == null || json == undefined || json == "";
        if (status) {
            lay(null)
            //没有下载过
            var list = [];
            open = false;

            callAppFunc_dbGet('download_model_id_list', function (json) {
                if (json && json.length > 0) {
                    var array = JSON.parse(json);
                    if (array) {
                        if (array.length > 0) {
                            for (var i = 0; i != array.length; ++i) {
                                var item = array[i];
                                if (item != game_id) {
                                    list.push(item);
                                }
                            }
                        }
                    }
                    list.push(game_id);
                    callAppFunc_dbDelete('download_model_id_list');
                } else {
                    list.push(game_id);
                }
                //下载上报
                $.post(Global.reportApi, {
                    data: JSON.stringify(reportData)
                }, function (res) {
                    console.log("下载上报成功");
                });
                callAppFunc_dbSet('download_model_id_list', list);
            });
            callAppFunc_dbSet(game_id, params);
            callAppFunc_startDown(game_id);
            timeArr.timer = setInterval(function () {
                callAppFunc_dbGet(game_id, function (resss) {
                    var re = JSON.parse(resss);
                    console.warn("第一次调用");
                    //    获取到实时进度
                    var __progress = re.progress;
                    //    获取下载状态
                    var __appstatus = re.status;
                    // setTime()
                    if (__progress == 100) {
                        //显示按钮
                        $xd('no-down').style.display = 'block';
                        $xd('btn-down').style.display = 'block';
                        $xd('downing').style.display = 'none';
                        $xd('downing2').style.display = 'none';
                        //清除定时器
                        clearInterval(timeArr.timer);
                    }
                    //存入本地
                    params.status = re.status;
                    params.progress = re.progress;
                    params.downloadId = re.downloadId;
                    params.downloadPath = re.downloadPath;
                    if (__appstatus == 0) {
                        //下载中  隐藏下载按钮  显示进度条
                        $xd('no-down').style.display = 'none';
                        $xd('btn-down').style.display = 'none';
                        $xd('downing').style.display = 'block';
                        $xd('downing2').style.display = 'block';
                        //展示进度百分比
                        $xd('jd').innerHTML = __progress + '%';
                        $xd('jd2').innerHTML = __progress + '%';
                        var pr1 = __progress * 0.9;
                        var pr2 = __progress * 1.15;
                        svgBg.style.backgroundImage = "url(./img/pause.png)";
                        svgBg1.style.backgroundImage = "url(./img/pause.png)";
                        svgDom1.setAttribute('stroke-dasharray', pr1 + ' 180');
                        svgDom2.setAttribute('stroke-dasharray', pr2 + ' 220');
                    } else if (__appstatus == 1) {
                        //下载完成等待安装
                        clearInterval(timeArr.timer);
                        //    安装游戏
                        $xd('no-down').style.display = 'block';
                        $xd('btn-down').style.display = 'block';
                        $xd('downing').style.display = 'none';
                        $xd('downing2').style.display = 'none';
                        reportData.eventType = 4;
                        $.post(Global.reportApi, {
                            data: JSON.stringify(reportData)
                        }, function (res) {
                            console.log("安装上报成功");
                        });
                    } else if (__appstatus == 2) {
                        //已安装 点击打开APP
                        clearInterval(timeArr.timer);
                        $xd('no-down').style.display = 'block';
                        $xd('btn-down').style.display = 'block';
                        $xd('downing').style.display = 'none';
                        $xd('downing2').style.display = 'none';
                        //打开上报
                        reportData.eventType = 3;
                        $.post(Global.reportApi, {
                            data: JSON.stringify(reportData)
                        }, function (res) {
                            console.log("打开上报成功");
                        });
                    }
                });
            }, 1000);
        } else {
            //下载过
            var model = JSON.parse(json);
            console.log(model);
            if (model) {
                //并且存在
                if (model.status == 0) {
                    //旧状态是下载中
                    params.status = 4;
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_pauseDown(game_id);
                    pasuedDown();
                }
                if (model.status == 4) {
                    //旧暂停
                    params.status = 0; //将状态设置为下载中 原本的
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
                        // $.post(Global.reportApi,{
                        //     data:JSON.stringify(reportData)
                        // },function (res) {
                        //     console.log("下载上报成功")
                        // })
                    });
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                    pasuedDown();
                } else if (model.status == 1) {
                    //等待安装
                    callAppFunc_installGame(game_id);
                    //安装上报
                    reportData.eventType = 4;
                    $.post(Global.reportApi, {
                        data: JSON.stringify(reportData)
                    }, function (res) {
                        console.log("安装上报成功");
                    });
                } else if (model.status == 2) {
                    //安装了 需要判断是否卸载
                    callAppFunc_isInstall(game_id, function (isInstalled) {
                        var has = isInstalled == false || isInstalled == "false" || isInstalled == "0";
                        if (has) {
                            params = model;
                            params.status = 0;
                            console.table(params);
                            callAppFunc_dbSet(game_id, params); //原本的
                            callAppFunc_startDown(game_id); //原本的
                            pasuedDown();
                            return;
                        } else {
                            //打开上报
                            reportData.eventType = 3;
                            $.post(Global.reportApi, {
                                data: JSON.stringify(reportData)
                            }, function (res) {
                                console.log("打开上报成功");
                            });
                            callAppFunc_openGame(game_id);
                        }
                    });
                } else if (model.status == 3) {
                    params.status = 0;
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                    pasuedDown();
                }
            }
        }
    });
}
//暂停状态使用的下载方法
function pasuedDown() {
    clearInterval(timeArr.timer);
    clearInterval(timeArr.timerss);
    var reportData = {
        pageFrom: Global.from,
        businessFrom: Global.from,
        pageId: 'temp2',
        pageType: 'game',
        eventType: '1',
        eventData: {
            game_id: game_id,
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
    });
    clearInterval(timeArr.timerss);
    timeArr.timerss = setInterval(function () {
        console.log("我是第二个执行");
        callAppFunc_dbGet(game_id, function (resss) {
            var re = JSON.parse(resss);
            //    获取到实时进度
            var __progress = re.progress;
            // alert(__progress)
            //    获取下载状态
            var __appstatus = re.status;
            // alert(re.status)
            params.status = __appstatus;
            params.progress = __progress;
            params.downloadId = re.downloadId;
            params.downloadPath = re.downloadPath;
            if (__progress == 100) {
                clearInterval(timeArr.timerss);
            }
            // alert(__appstatus+'状态')
            if (__progress != 100) {
                //显示按钮
                $xd('no-down').style.display = 'none';
                $xd('btn-down').style.display = 'none';
                $xd('downing').style.display = 'block';
                $xd('downing2').style.display = 'block';
                //展示进度百分比
                // $xd('jd').innerHTML=__progress+'%';
                // $xd('jd2').innerHTML=__progress+'%';
            } else {
                $xd('no-down').style.display = 'block';
                $xd('btn-down').style.display = 'block';
                $xd('downing').style.display = 'none';
                $xd('downing2').style.display = 'none';
            }
            if (__appstatus == 0) {
                //下载中  隐藏下载按钮  显示进度条
                $xd('no-down').style.display = 'none';
                $xd('btn-down').style.display = 'none';
                $xd('downing').style.display = 'block';
                $xd('downing2').style.display = 'block';
                //展示进度百分比
                $xd('jd').innerHTML = __progress + '%';
                $xd('jd2').innerHTML = __progress + '%';
                var pr1 = __progress * 0.9;
                var pr2 = __progress * 1.15;
                svgDom1.setAttribute('stroke-dasharray', pr1 + ' 180');
                svgDom2.setAttribute('stroke-dasharray', pr2 + ' 220');
                svgBg.style.backgroundImage = "url(./img/pause.png)";
                svgBg1.style.backgroundImage = "url(./img/pause.png)";
                $xd('m').innerHTML = 'چۈشۈۋاتىدۇ';
                $xd('m2').innerHTML = 'چۈشۈۋاتىدۇ';
            } else if (__appstatus == 1) {
                //下载完成等待安装
                clearInterval(timeArr.timerss);
                //    安装游戏
                reportData.eventType = 4;
                $.post(Global.reportApi, {
                    data: JSON.stringify(reportData)
                }, function (res) {
                    console.log("安装上报成功");
                });
                callAppFunc_installGame(game_id);
            } else if (__appstatus == 2) {
                //已安装 点击打开APP
                $xd('no-down').style.display = 'block';
                $xd('downing').style.display = 'none';
                //    安装游戏
                reportData.eventType = 3;
                $.post(Global.reportApi, {
                    data: JSON.stringify(reportData)
                }, function (res) {
                    console.log("打开上报成功");
                });
                clearInterval(timeArr.timerss);
                // callAppFunc_openGame(game_id);
            }
        });
    }, 1000);
}
//点击暂停的方法
function pasued() {
    var reportData = {
        pageFrom: Global.from,
        businessFrom: Global.from,
        pageId: 'temp2',
        pageType: 'game',
        eventType: '1',
        eventData: {
            game_id: game_id,
            agent_id: agent_id
        },
        businessId: "game",
        businessName: "game"
    };
    if (xdtime) {
        params.status = 4;
    }
    if (params.status == 0) {
        clearInterval(timeArr.timerss);
        clearInterval(timeArr.timer);
        svgBg.style.backgroundImage = "url(./img/paly.png)";
        svgBg1.style.backgroundImage = "url(./img/paly.png)";
        xdt = false;
        params.status = 4;
        callAppFunc_pauseDown(game_id);
        callAppFunc_dbSet(game_id, params);

        $xd('jd').innerHTML = '';
        $xd('jd2').innerHTML = '';
    } else if (params.status == 4) {
        svgBg.style.backgroundImage = "url(./img/pause.png)";
        svgBg1.style.backgroundImage = "url(./img/pause.png)";
        params.status = 0;
        xdtime = false;
        console.log("我点击下载了");
        callAppFunc_dbGet(game_id, params);
        callAppFunc_startDown(game_id);
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
            // $.post(Global.reportApi,{
            //     data:JSON.stringify(reportData)
            // },function (res) {
            //     console.log("下载上报成功")
            // })
        });
        pasuedDown();
    } else if (params.status == 3) {
        params.status = 0;
        callAppFunc_dbSet(game_id, params);
        callAppFunc_startDown(game_id);
        pasuedDown();
    }
}

//进入页面查询状态 这边只需要做状态处理 其他的都可以不用管
function inquire() {
    // //读取本地缓存
    // var s=localStorage.getItem('status') || 0;
    // var p=localStorage.getItem('progress') || 0;
    // if (s == 0 && p == 0){
    //
    // } else if ( s == 0 && p != 0 && p != 100 ){
    // //        展现继续下载和进度
    //     svgBg.style.backgroundImage="url(./img/pause.png)";
    //     svgBg1.style.backgroundImage="url(./img/pause.png)";
    //     $xd('no-down').style.display='none';
    //     $xd('btn-down').style.display='none';
    //     $xd('downing').style.display='block';
    //     $xd('downing2').style.display='block';
    //     //展示进度百分比
    //     var pr1=p*0.9;
    //     var pr2=p*1.15;
    //     svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //     svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //     $xd('jd').innerHTML = p + '%';
    //     $xd('jd2').innerHTML = p + '%';
    //     $xd('m').innerHTML='چۈشۈرۈلدى' ;
    //     $xd('m2').innerHTML='چۈشۈرۈلدى' ;
    //     timers=setInterval(function () {
    //         //展示进度百分比
    //         var pr1=localStorage.getItem('progress')*0.9;
    //         var pr2=localStorage.getItem('progress')*1.15;
    //         svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //         svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //         $xd('jd').innerHTML = localStorage.getItem('progress') + '%';
    //         $xd('jd2').innerHTML = localStorage.getItem('progress')+ '%';
    //         $xd('m').innerHTML='چۈشۈرۈلدى' ;
    //         $xd('m2').innerHTML='چۈشۈرۈلدى' ;
    //     },100)
    //
    // }else  if (s == 4){
    //     open=true;//开关变量
    //     xd=false;
    //     svgBg.style.backgroundImage="url(./img/paly.png)";
    //     svgBg1.style.backgroundImage="url(./img/paly.png)";
    //     $xd('no-down').style.display='none';
    //     $xd('btn-down').style.display='none';
    //     $xd('downing').style.display='block';
    //     $xd('downing2').style.display='block';
    //     $xd('jd').innerHTML = '';
    //     $xd('jd2').innerHTML = '';
    //     $xd('m').innerHTML=' داۋاملىق چۈشۈرۈش' ;
    //     $xd('m2').innerHTML=' داۋاملىق چۈشۈرۈش' ;
    //
    // }
    var reportData = {
        pageFrom: Global.from,
        businessFrom: Global.from,
        pageId: 'temp2',
        pageType: 'game',
        eventType: '1',
        eventData: {
            game_id: game_id,
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
    });
    //查询本地状态 清除定时器
    clearInterval(timeArr.timerss);
    clearInterval(timeArr.timer);
    callAppFunc_dbGet(game_id, function (json) {
        var status = json == "null" || json == null || json == undefined || json == "";
        if (status) {//没有下载过

        } else {
            //下载过
            var a = JSON.parse(json);
            if (a.status == 0 && a.progress != 100) {
                open = true; //开关变量
                xd = false;
                xdt = true;
                xdtime = false;
                svgBg.style.backgroundImage = "url(./img/pause.png)";
                svgBg1.style.backgroundImage = "url(./img/pause.png)";
                $xd('no-down').style.display = 'none';
                $xd('btn-down').style.display = 'none';
                $xd('downing').style.display = 'block';
                $xd('downing2').style.display = 'block';
                var pr1 = a.progress * 0.9;
                var pr2 = a.progress * 1.15;
                svgDom1.setAttribute('stroke-dasharray', pr1 + ' 180');
                svgDom2.setAttribute('stroke-dasharray', pr2 + ' 220');
                $xd('m').innerHTML = 'چۈشۈرۈلىۋاتىدۇ';
                $xd('m2').innerHTML = 'چۈشۈرۈلىۋاتىدۇ';
                //定时器取状态
                pasuedDown();
                // lay(pasuedDown)
            } else if (a.status == 4) {
                open = true; //开关变量
                xd = false;
                svgBg.style.backgroundImage = "url(./img/paly.png)";
                svgBg1.style.backgroundImage = "url(./img/paly.png)";
                $xd('no-down').style.display = 'none';
                $xd('btn-down').style.display = 'none';
                $xd('downing').style.display = 'block';
                $xd('downing2').style.display = 'block';
                xdtime = true;
                xdt = false;
                params = a;
                params.status = 4;
                params.progress = a.progress;
                // alert(a.status+'暂停里面的')
                callAppFunc_dbSet(game_id, params);
                callAppFunc_pauseDown(game_id);
                // alert(params.status+'暂停里面的')
                var pr1 = a.progress * 0.9;
                var pr2 = a.progress * 1.15;
                svgDom1.setAttribute('stroke-dasharray', pr1 + ' 180');
                svgDom2.setAttribute('stroke-dasharray', pr2 + ' 220');
                $xd('m').innerHTML = 'داۋاملىق چۈشۈرۈش';
                $xd('m2').innerHTML = 'داۋاملىق چۈشۈرۈش';
            }else {
                lay(queryStatus)
            }
        }
    });
    // callAppFunc_dbGet(game_id,function (json) {
    //     var status=(json == "null" || json == null || json == undefined || json == "");
    //     if (!status){//下载过
    //         var a=JSON.parse(status)
    //
    //         if (a.status==0 && a != 100){
    //             open=true;//开关变量
    //             xd=false;
    //             svgBg.style.backgroundImage="url(./img/pause.png)";
    //             svgBg1.style.backgroundImage="url(./img/pause.png)";
    //             $xd('no-down').style.display='none';
    //             $xd('btn-down').style.display='none';
    //             $xd('downing').style.display='block';
    //             $xd('downing2').style.display='block';
    //             //展示进度百分比
    //             var pr1=(a.progress||0)*0.9;
    //             var pr2=(a.progress||0)*1.15;
    //             svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //             svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //             $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //             $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //             xdtime=setInterval(function () {
    //                 callAppFunc_dbGet(game_id,function (json) {
    //                     var status=(json == "null" || json == null || json == undefined || json == "");
    //                     if (!status){//下载过才做处理 没有下载过不做处理
    //                         var model=JSON.parse(json);
    //                         if (model){
    //                             var  __progress=model.progress;
    //                             if (model.progress == 100){
    //                                 $xd('no-down').style.display='block';
    //                                 $xd('btn-down').style.display='block'
    //                                 $xd('downing').style.display='none';
    //                                 $xd('downing2').style.display='none';
    //                             }
    //                             if (model.status == 0){
    //                                 $xd('no-down').style.display='none';
    //                                 $xd('btn-down').style.display='none'
    //                                 $xd('downing').style.display='block';
    //                                 $xd('downing2').style.display='block';
    //                                 //展示进度百分比
    //                                 $xd('jd').innerHTML=__progress+'%';
    //                                 $xd('jd2').innerHTML=__progress+'%';
    //                                 var pr1=__progress*0.9;
    //                                 var pr2=__progress*1.15;
    //                                 svgBg.style.backgroundImage="url(./img/pause.png)";
    //                                 svgBg1.style.backgroundImage="url(./img/pause.png)";
    //                                 svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //                                 svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //                                 console.log("我")
    //                             } else if (model.status == 1){
    //                                 $xd('no-down').style.display='block';
    //                                 $xd('btn-down').style.display='block'
    //                                 $xd('downing').style.display='none';
    //                                 $xd('downing2').style.display='none';
    //                                 reportData.eventType = 4;
    //                                 $.post(Global.reportApi,{
    //                                     data:JSON.stringify(reportData)
    //                                 },function (res) {
    //                                     console.log("安装上报成功")
    //                                 })
    //                                 clearInterval(xdtime)
    //                             } else if (model.status == 2){
    //                                 $xd('no-down').style.display='block';
    //                                 $xd('btn-down').style.display='block'
    //                                 $xd('downing').style.display='none';
    //                                 $xd('downing2').style.display='none';
    //                                 clearInterval(timers)
    //                                 //打开上报
    //                                 reportData.eventType = 3;
    //                                 $.post(Global.reportApi,{
    //                                     data:JSON.stringify(reportData)
    //                                 },function (res) {
    //                                     console.log("打开上报成功")
    //                                 })
    //                                 clearInterval(xdtime)
    //                             }
    //                             //判断一下 如果进度是100%的话 那么就不显示进度条而是原本的按钮
    //                             // if (model.status==0 && __progress != 100){
    //                             //     svgBg.style.backgroundImage="url(./img/pause.png)";
    //                             //     svgBg1.style.backgroundImage="url(./img/pause.png)";
    //                             //     $xd('no-down').style.display='none';
    //                             //     $xd('btn-down').style.display='none';
    //                             //     $xd('downing').style.display='block';
    //                             //     $xd('downing2').style.display='block';
    //                             //     //展示进度百分比
    //                             //     var pr1=__progress*0.9;
    //                             //     var pr2=__progress*1.15;
    //                             //     svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //                             //     svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //                             //     $xd('jindu').innerHTML = __progress + '%';
    //                             //     $xd('jindu1').innerHTML = __progress + '%';
    //                             //     $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //                             //     $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //                             // }
    //                         }
    //                     }else {
    //                         clearInterval(xdtime);
    //                         return;
    //                     }
    //                 })
    //             },1000)
    //         }else if (a.status == 4){
    //             open=true;//开关变量
    //             xd=false;
    //         }else {
    //             open=true;//开关变量
    //             xd=false;
    //             svgBg.style.backgroundImage="url(./img/pause.png)";
    //             svgBg1.style.backgroundImage="url(./img/pause.png)";
    //             $xd('no-down').style.display='none';
    //             $xd('btn-down').style.display='none';
    //             $xd('downing').style.display='block';
    //             $xd('downing2').style.display='block';
    //             //展示进度百分比
    //             var pr1=(a.progress||0)*0.9;
    //             var pr2=(a.progress||0)*1.15;
    //             svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //             svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //             $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //             $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //             xdtime=setInterval(function () {
    //                 callAppFunc_dbGet(game_id,function (json) {
    //                     var status=(json == "null" || json == null || json == undefined || json == "");
    //                     if (!status){//下载过才做处理 没有下载过不做处理
    //                         var model=JSON.parse(json);
    //                         if (model){
    //                             var  __progress=model.progress;
    //                             if (model.progress == 100){
    //                                 $xd('no-down').style.display='block';
    //                                 $xd('btn-down').style.display='block'
    //                                 $xd('downing').style.display='none';
    //                                 $xd('downing2').style.display='none';
    //                             }
    //                             if (model.status == 0){
    //                                 $xd('no-down').style.display='none';
    //                                 $xd('btn-down').style.display='none'
    //                                 $xd('downing').style.display='block';
    //                                 $xd('downing2').style.display='block';
    //                                 //展示进度百分比
    //                                 $xd('jd').innerHTML=__progress+'%';
    //                                 $xd('jd2').innerHTML=__progress+'%';
    //                                 var pr1=__progress*0.9;
    //                                 var pr2=__progress*1.15;
    //                                 svgBg.style.backgroundImage="url(./img/pause.png)";
    //                                 svgBg1.style.backgroundImage="url(./img/pause.png)";
    //                                 svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //                                 svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //                                 console.log("我")
    //                             } else if (model.status == 1){
    //                                 $xd('no-down').style.display='block';
    //                                 $xd('btn-down').style.display='block'
    //                                 $xd('downing').style.display='none';
    //                                 $xd('downing2').style.display='none';
    //                                 reportData.eventType = 4;
    //                                 $.post(Global.reportApi,{
    //                                     data:JSON.stringify(reportData)
    //                                 },function (res) {
    //                                     console.log("安装上报成功")
    //                                 })
    //                                 clearInterval(xdtime)
    //                             } else if (model.status == 2){
    //                                 $xd('no-down').style.display='block';
    //                                 $xd('btn-down').style.display='block'
    //                                 $xd('downing').style.display='none';
    //                                 $xd('downing2').style.display='none';
    //                                 clearInterval(timers)
    //                                 //打开上报
    //                                 reportData.eventType = 3;
    //                                 $.post(Global.reportApi,{
    //                                     data:JSON.stringify(reportData)
    //                                 },function (res) {
    //                                     console.log("打开上报成功")
    //                                 })
    //                                 clearInterval(xdtime)
    //                             }
    //                             //判断一下 如果进度是100%的话 那么就不显示进度条而是原本的按钮
    //                             // if (model.status==0 && __progress != 100){
    //                             //     svgBg.style.backgroundImage="url(./img/pause.png)";
    //                             //     svgBg1.style.backgroundImage="url(./img/pause.png)";
    //                             //     $xd('no-down').style.display='none';
    //                             //     $xd('btn-down').style.display='none';
    //                             //     $xd('downing').style.display='block';
    //                             //     $xd('downing2').style.display='block';
    //                             //     //展示进度百分比
    //                             //     var pr1=__progress*0.9;
    //                             //     var pr2=__progress*1.15;
    //                             //     svgDom1.setAttribute('stroke-dasharray',pr1+' 180')
    //                             //     svgDom2.setAttribute('stroke-dasharray',pr2+' 220');
    //                             //     $xd('jindu').innerHTML = __progress + '%';
    //                             //     $xd('jindu1').innerHTML = __progress + '%';
    //                             //     $xd('m').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //                             //     $xd('m2').innerHTML='داۋاملىق چۈشۈرۈش' ;
    //                             // }
    //                         }
    //                     }else {
    //                         clearInterval(xdtime);
    //                         return;
    //                     }
    //                 })
    //             },1000)
    //         }
    //
    //     } else {
    //         return;
    //     }
    // })
}

//弹窗提示
function lay(callback){
    var a='./img/btn.png'
    var dataUrl='./img/centent.png'
    var getWinHtml ='<div style="width: 70%;margin: 0 auto;text-align: center;position: relative;" id="xd"><img width="100%" src="'+dataUrl+'" /><img style="position: absolute;bottom: -10%;left: 50%;transform: translateX(-50%)" width="40%" src="'+a+'"></div>';
    layer.open({
        title:'',
        type: 1,
        shadeClose: false,
        closeBtn:0,
        offset: 'auto',
        content: getWinHtml,
        style:'background-color:transparent;',
        success:function(){//成功回调
            document.querySelector('#xd').onclick=function(){
                if (callback) {
                    callback()
                }
                layer.closeAll()

            }
        },
        end:function () {//销毁回调
            if (callback) {
                callback()

            }

        }
    });
}
//点击按钮
function clickBtn(){
    lay(queryStatus)
}
window.onload = function () {

    // document.onclick=function(){
    //
    // }
    document.addEventListener("DOMContentLoaded", function () {
        var _h = document.body.scrollHeight;
        //让body占满整个屏幕
        document.getElementsByTagName("body")[0].setAttribute("style", "min-height:" + _h + 'px');
        FastClick.attach(document.body);
    }, false);
    typenavigator();
    getInfo();
    inquire();
    if (jump) {
        loopUrl();
    }
    if (agent_id != null) {
        Global.agentId = agent_id;
    }
    if (pageFrom == 'null') {
        pageFrom = '';
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
        $.post(Global.reportApi, {
            data: JSON.stringify(pvData)
        }, function (res) {});
    }
};

//页面图片加载完毕上报
$xd('mid-bg').onload = function () {
    var that = this;
    if (that.getAttribute("src") != "unknown") {
        if (that.complete) {
            console.log("我是上次图");
            if (agent_id != null) {
                Global.agentId = agent_id;
            }
            if (pageFrom == 'null') {
                pageFrom = '';
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
                $.post(Global.reportApi, {
                    data: JSON.stringify(psData)
                }, function (res) {
                    console.log("ps上报成功");
                });
            }
        }
    }
};
// document.addEventListener('click',function () {
//         $xd('audio').play();
// },false);

// window.onblur=function () {
//     $xd('audio').paused();
// }

//# sourceMappingURL=muban2-compile.js.map
