/**
 * 模板一
 * by:xd
 *
 */

/**
 * 初始化数据
 * */
// var cconsole=new VConsole();
//获取参数部分
var temp_id=1;
var game_id=$xd.queryString('game_id');
var agent_id=$xd.queryString('agent_id');
var pageFrom=$xd.queryString('pageFrom')||'';
var isApp=$xd.queryString('isApp')||'';
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
    status:"",       //游戏状态
    downloadTime:"", //下载时间
    progress:0,     //下载进度(0~100)
   downloadPath:'', //apk下载路径
    packageName:"", //包名
    apkUrl:'',       //下载地址
    size:0,          //apk大小
    downloadId:''
}
//
var timer,timerss,progress,open=true,xd=true,close;//定义使用的变量