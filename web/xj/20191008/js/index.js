/**
 * 模板一js部分
 * by:向东
 * time:2019-3-6
 */

var temp_id=$xd.queryString('temp_id')||'';//截取URL后面的参数
var game_id=$xd.queryString('game_id')||'';//同上
var agent_id=$xd.queryString('agent_id')||'';//同上
var cconsole=new VConsole();
var data=null;//初始化数据
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
var xd='';//
var video1=videojs('my-video',{
    controls:false,
    // "poster":data.retation_backimg,
    controlBar: {
        captionsButton: false,
        chaptersButton: false,
        playbackRateMenuButton: true,
        LiveDisplay: false,
        subtitlesButton: false,
        remainingTimeDisplay: false,//视频时间
        progressControl: false,//进度条
        fullscreenControl:false,
        BigPlayButton:false,
        playToggle:true,//暂停按钮
        muteControl:false,
        VolumePanel:false,//声音按钮
    }
},function () {

})
// 实例化videojs
var params={}//定义配置对象
var timer,timers,timerss,progress,_appstatus,open,timerxd;//定义使用的变量
//初始化函数
function init() {
    //设置占位符
    // video1.poster=data.retation_backimg;

    //修改页面标题
    title.innerHTML=data.gamename;
    $xd('name').innerHTML=data.gamename;
    $xd('name1').innerHTML=data.gamename;
    //修改icon
    icon.src=data.icon;
    iconFooter.src=data.icon;
    //修改body背景颜色
    moduleFooter.setAttribute('style','background-color:rgba('+data.title_backcolor+')');
    moduleIcon.setAttribute('style','background-color:rgba('+data.title_backcolor+')');
    //修改src
    video1.src({
        src:data.video_retation[0],
        type: 'application/x-mpegURL'//在重新添加视频源的时候需要给新的type的值
    })
    // console.log(video1.poster)
    console.log(data.video_retation[0])
    //设置距离顶部的距离
    // moduleTop.style.height=data.top+'px';
    //$px*$multiple*375/$designWidth/20+rem;
    videoMoule.style.top=(data.top*375/720/26)+'rem';
    //设置模块图片
    head_backimg.src=data.head_backimg;
    //模块4图片
    custom_backimg.src=data.custom_backimg;
    //底部按钮
    btnDowm.src=data.download_img;
    btnMid.src=data.download_img;
    //
    //显示大小
    $xd('size').innerHTML=data.desc;
    $xd('size1').innerHTML=data.desc;
    //视频占位图片
    params={
        id:`${game_id}`,
        name:data.gamename||'',
        desc:data.desc||'',
        downloadTime:0,
        progress:0,
        downloadPath:'',
        packageName:'',
        downloadId:'',
    };
    console.log(params)
    getInfoGame();

}
//获取信息
function getInfo(){
        axios.get($xd.info,{
            params:{
                game_id:game_id,
                temp_id:temp_id
            }
        }).then(function(res) {
        if (res.status == 200) {
            data = res.data.data;
            init();

        }
    }).catch(function(err) {
            console.log(err);
            alert("请求错误");
        });

}
//获取游戏信息接口
function getInfoGame(){
    axios.get($xd.gameUrl+'/'+game_id).then(function (res) {
        var a=res.data.game_info;
        console.log(a)
        params.image=a.icon;//

        //判断是否存在 存在 则加上渠道id 不存在 就不加
        if (agent_id){
            params.apkUrl=a.androidurl.replace(/.apk/,"_" +agent_id+ ".apk");
        } else {
            params.apkUrl=a.androidurl
        }
        // params.apkUrl=a.androidurl.replace(/.apk/,"_" +agent_id+ ".apk");
        // params.apkUrl=a.androidurl.replace(/.apk/,"_" +''+ ".apk");
        // params.apkUrl=a.androidurl;
        // params.apkUrl="http://down.chekchekoyuni.com:9108/sdkgame/llbyand_6024/llbyand_6024.apk";
        params.size=a.size;
        params.status=a.status;
        //查询是否下载过
        old()
        //先查询本地是否存在
        open=false;
        // callAppFunc_dbDelete(data.game_id)
        // callAppFunc_dbGet(data.gameid,function (ress) {
        //     console.log("查询本地接口")
        //     console.log(ress);
        //     console.log("--------");
        //     if ( ress ){//如果存在 那么
        //         open=true;
        //         alert(123)
        //     } else{//不存在 正常流程
        //         // callAppFunc_dbSet(data.gameid,params);
        //         open=false;
        //         alert(456)
        //     }
        // })
    }).catch(function (err) {
        console.log(err)
    })
}
// 点击🔇按钮
mute.onclick=function(){
    var now=video1.volume();
    if (now != 0){
        video1.volume(0);
        this.querySelector('img').src='./img/moban1_mute_ico.png';
        console.log(now)
    } else{
        video1.volume(1);
        this.querySelector('img').src='./img/moban1_voice_ico.png'
        console.log(now)
    }
    // video1.volume(0);//设置声音大小（0-1之间）

}
//点击暂停
var xd=true;
document.querySelector('.xd-pa').onclick=function () {
    // video1.播放：myPlayer.play();
    // 暂停：myPlayer.pause();

    if (xd){
        video1.play();
        this.querySelector('button').style.display='none';
        xd=false;
        console.log(xd)
    } else {
        video1.pause();
        this.querySelector('button').style.display='block';
        xd=true;
        console.log(xd)
    }
    // if (document.querySelector('video').paused){
    //     video1.play();
    //     console.log(222);
    //     this.querySelector('button').style.display='none';
    //
    // }  else {
    //     video1.pause();
    //     this.querySelector('button').style.display='block';
    //     console.log(333);
    // }
}
//点击下载按钮
//监听按钮事件


// $xd('btn-down').onclick=downBegin()
// $xd('btn-mid').onclick=downBegin();

$xd('btn-mid').onclick= function () {
        // alert(open);
        //  if (!open){
        //      params=JSON.stringify(params);
        //      callAppFunc_dbSet(data.gameid,params)
        //      //开始下载
        //      callAppFunc_startDown(data.gameid);
        //      //调用方法 定时刷新返回状态
        //      timerss=setInterval(function () {
        //          callAppFunc_dbGet(data.gameid,function (res) {
        //              // console.log(res)
        //              var re=JSON.parse(res);
        //              console.log(re)
        //              //    获取到实时进度
        //              progress=re.progress;
        //              //    获取下载状态
        //              _appstatus=re.status;
        //              // alert(_appstatus)
        //              console.log(_appstatus);
        //              if (progress == 100){
        //                  //显示按钮
        //                  $xd('btn-mid').style.display='block';
        //                  $xd('btn-down').style.display='block';
        //                  $xd('jd').style.display='none';
        //                  $xd('jd2').style.display='none';
        //                  //清除定时器
        //                  clearInterval(timerss);
        //              }
        //              //    判断下载状态 根据状态来走不通的路线
        //              if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
        //                  $xd('btn-mid').style.display='none';
        //                  $xd('btn-down').style.display='none';
        //                  $xd('jd').style.display='block';
        //                  $xd('jd2').style.display='block';
        //                  //展示进度百分比
        //                  $xd('jindu').innerHTML=progress;
        //                  $xd('jindu1').innerHTML=progress;
        //              }else if (_appstatus == 1){//下载完成等待安装
        //                  //    安装游戏
        //                  // callAppFunc_installGame(data.gameid);
        //                  // localStorage.setItem('downing',1);
        //                  // open=true;
        //              } else if ( _appstatus == 2) {//已安装 点击打开APP
        //                  $xd('btn-mid').style.display='block';
        //                  $xd('btn-down').style.display='block';
        //                  $xd('jd').style.display='none';
        //                  $xd('jd2').style.display='none';
        //
        //                  //    判断是否卸载
        //                  callAppFunc_isInstall(data.gameid,function (res) {
        //                      //    判断是否卸载 fasle
        //                      if (res.indexOf('false')) {//已卸载了 需要重新安装
        //                          AgeStateDown();
        //                          open=true;
        //                          //        清除定时器
        //                          clearInterval(timerss);
        //                      }else{ //没有卸载 那么就直接打开
        //                          //    打开app
        //                          callAppFunc_openGame(data.gameid);
        //                          localStorage.setItem('downing',2);
        //                          open=true;
        //                      }
        //                  })
        //              }else if ( _appstatus == 4){//已暂停 点击重新开始下载
        //                  console.log("已暂停");
        //                  //
        //                  AgeStateDown();
        //                  open=true;
        //                  clearInterval(timerss);
        //                  localStorage.setItem('downing',4);
        //              }else if ( _appstatus  == 5){//安装中
        //                  console.log("安装中")
        //              }else if ( _appstatus == 9) {//已卸载
        //                  console.log("已卸载")
        //                  AgeStateDown();
        //                  localStorage.setItem('downing',9);
        //                  open=true;
        //                  clearInterval(timerss)
        //              }else if ( _appstatus ==3 ){//下载失败
        //                  AgeStateDown();
        //                  open=true;
        //                  localStorage.setItem('downing',3);
        //                  clearInterval(timerss)
        //              }
        //          })
        //      },1000)
        //  } else {
        //  //    读取本地缓存
        //      var as=localStorage.getItem('downing');
        //      // alert(as+'as')
        //      // alert(as+'as');
        //      // alert(as);
        //      if (as == 2){//已安装点击打开APP 并且检查是否卸载了
        //          $xd('btn-mid').style.display='block';
        //          $xd('btn-down').style.display='block';
        //          $xd('jd').style.display='none';
        //          $xd('jd2').style.display='none';
        //          //    判断是否卸载
        //          callAppFunc_isInstall(data.gameid,function (res) {
        //              //    判断是否卸载 fasle
        //              if (res.indexOf('false')) {//已卸载了 需要重新安装
        //                  AgeStateDown();
        //                  //        清除定时器
        //                  // clearInterval(timerss)
        //              }else{ //没有卸载 那么就直接打开
        //                  //    打开app
        //                  callAppFunc_openGame(data.gameid);
        //              }
        //          })
        //      } else if (as == 1){//下载完毕没有安装  需要手动安装
        //          callAppFunc_installGame(game_id);
        //      } else if (as == 4){//暂停了
        //          params=JSON.stringify(params);
        //          callAppFunc_dbSet(data.gameid,params)
        //          //开始下载
        //          callAppFunc_startDown(data.gameid);
        //          //调用方法 定时刷新返回状态
        //          timerss=setInterval(function () {
        //              callAppFunc_dbGet(data.gameid,function (res) {
        //                  // console.log(res)
        //                  var re=JSON.parse(res);
        //                  console.log(re)
        //                  //    获取到实时进度
        //                  progress=re.progress;
        //                  //    获取下载状态
        //                  _appstatus=re.status;
        //                  // alert(_appstatus)
        //                  console.log(_appstatus);
        //                  if (progress == 100){
        //                      //显示按钮
        //                      $xd('btn-mid').style.display='block';
        //                      $xd('btn-down').style.display='block';
        //                      $xd('jd').style.display='none';
        //                      $xd('jd2').style.display='none';
        //                      //清除定时器
        //                      clearInterval(timerss);
        //                  }
        //                  //    判断下载状态 根据状态来走不通的路线
        //                  if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
        //                      $xd('btn-mid').style.display='none';
        //                      $xd('btn-down').style.display='none';
        //                      $xd('jd').style.display='block';
        //                      $xd('jd2').style.display='block';
        //                      //展示进度百分比
        //                      $xd('jindu').innerHTML=progress;
        //                      $xd('jindu1').innerHTML=progress;
        //                  }else if (_appstatus == 1){//下载完成等待安装
        //                      //    安装游戏
        //                      // callAppFunc_installGame(data.gameid);
        //                      localStorage.setItem('downing',1);
        //                      open=true;
        //                  } else if ( _appstatus == 2) {//已安装 点击打开APP
        //                      $xd('btn-mid').style.display='block';
        //                      $xd('btn-down').style.display='block';
        //                      $xd('jd').style.display='none';
        //                      $xd('jd2').style.display='none';
        //
        //                      //    判断是否卸载
        //                      callAppFunc_isInstall(data.gameid,function (res) {
        //                          //    判断是否卸载 fasle
        //                          if (res.indexOf('false')) {//已卸载了 需要重新安装
        //                              AgeStateDown();
        //                              open=true;
        //                              //        清除定时器
        //                              clearInterval(timerss);
        //                          }else{ //没有卸载 那么就直接打开
        //                              //    打开app
        //                              callAppFunc_openGame(data.gameid);
        //                              localStorage.setItem('downing',2);
        //                              open=true;
        //                          }
        //                      })
        //                  }else if ( _appstatus == 4){//已暂停 点击重新开始下载
        //                      console.log("已暂停");
        //                      //
        //                      AgeStateDown();
        //                      open=true;
        //                      clearInterval(timerss);
        //                      localStorage.setItem('downing',4);
        //                  }else if ( _appstatus  == 5){//安装中
        //                      console.log("安装中")
        //                  }else if ( _appstatus == 9) {//已卸载
        //                      console.log("已卸载")
        //                      AgeStateDown();
        //                      localStorage.setItem('downing',9);
        //                      open=true;
        //                      clearInterval(timerss)
        //                  }else if ( _appstatus ==3 ){//下载失败
        //                      AgeStateDown();
        //                      open=true;
        //                      localStorage.setItem('downing',3);
        //                      clearInterval(timerss)
        //                  }
        //              })
        //          },1000)
        //      } else if (as == 3){//下载失败
        //          params=JSON.stringify(params);
        //          callAppFunc_dbSet(data.gameid,params)
        //          //开始下载
        //          callAppFunc_startDown(data.gameid);
        //          //调用方法 定时刷新返回状态
        //          timerss=setInterval(function () {
        //              callAppFunc_dbGet(data.gameid,function (res) {
        //                  // console.log(res)
        //                  var re=JSON.parse(res);
        //                  console.log(re)
        //                  //    获取到实时进度
        //                  progress=re.progress;
        //                  //    获取下载状态
        //                  _appstatus=re.status;
        //                  // alert(_appstatus)
        //                  console.log(_appstatus);
        //                  if (progress == 100){
        //                      //显示按钮
        //                      $xd('btn-mid').style.display='block';
        //                      $xd('btn-down').style.display='block';
        //                      $xd('jd').style.display='none';
        //                      $xd('jd2').style.display='none';
        //                      //清除定时器
        //                      clearInterval(timerss);
        //                  }
        //                  //    判断下载状态 根据状态来走不通的路线
        //                  if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
        //                      $xd('btn-mid').style.display='none';
        //                      $xd('btn-down').style.display='none';
        //                      $xd('jd').style.display='block';
        //                      $xd('jd2').style.display='block';
        //                      //展示进度百分比
        //                      $xd('jindu').innerHTML=progress;
        //                      $xd('jindu1').innerHTML=progress;
        //                  }else if (_appstatus == 1){//下载完成等待安装
        //                      //    安装游戏
        //                      // callAppFunc_installGame(data.gameid);
        //                      // localStorage.setItem('downing',1);
        //                      // open=true;
        //                  } else if ( _appstatus == 2) {//已安装 点击打开APP
        //                      $xd('btn-mid').style.display='block';
        //                      $xd('btn-down').style.display='block';
        //                      $xd('jd').style.display='none';
        //                      $xd('jd2').style.display='none';
        //
        //                      //    判断是否卸载
        //                      callAppFunc_isInstall(data.gameid,function (res) {
        //                          //    判断是否卸载 fasle
        //                          if (res.indexOf('false')) {//已卸载了 需要重新安装
        //                              AgeStateDown();
        //                              open=true;
        //                              //        清除定时器
        //                              clearInterval(timerss);
        //                          }else{ //没有卸载 那么就直接打开
        //                              //    打开app
        //                              callAppFunc_openGame(data.gameid);
        //                              localStorage.setItem('downing',2);
        //                              open=true;
        //                          }
        //                      })
        //                  }else if ( _appstatus == 4){//已暂停 点击重新开始下载
        //                      console.log("已暂停");
        //                      //
        //                      AgeStateDown();
        //                      open=true;
        //                      clearInterval(timerss);
        //                      localStorage.setItem('downing',4);
        //                  }else if ( _appstatus  == 5){//安装中
        //                      console.log("安装中")
        //                  }else if ( _appstatus == 9) {//已卸载
        //                      console.log("已卸载")
        //                      AgeStateDown();
        //                      localStorage.setItem('downing',9);
        //                      open=true;
        //                      clearInterval(timerss)
        //                  }else if ( _appstatus ==3 ){//下载失败
        //                      AgeStateDown();
        //                      open=true;
        //                      localStorage.setItem('downing',3);
        //                      clearInterval(timerss)
        //                  }
        //              })
        //          },1000)
        //      }
        //  }
    if (!open){
        // alert(123);
        params=JSON.stringify(params);
        callAppFunc_dbSet(data.gameid,params)
        //开始下载
        callAppFunc_startDown(data.gameid);
        //调用方法 定时刷新返回状态
        timerss=setInterval(function () {
            callAppFunc_dbGet(data.gameid,function (res) {
                // console.log(res)
                var re=JSON.parse(res);
                console.log(re)
                //    获取到实时进度
                progress=re.progress;
                //    获取下载状态
                _appstatus=re.status;
                // alert(_appstatus)
                console.log(_appstatus);
                if (progress == 100){
                    //显示按钮
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';
                    //清除定时器
                    clearInterval(timerss);
                }
                //    判断下载状态 根据状态来走不通的路线
                if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
                    $xd('btn-mid').style.display='none';
                    $xd('btn-down').style.display='none';
                    $xd('jd').style.display='block';
                    $xd('jd2').style.display='block';
                    //展示进度百分比
                    $xd('jindu').innerHTML=progress;
                    $xd('jindu1').innerHTML=progress;
                }else if (_appstatus == 1){//下载完成等待安装
                    //    安装游戏
                    callAppFunc_installGame(data.gameid);
                    // localStorage.setItem('downing',1);
                    // open=true;
                } else if ( _appstatus == 2) {//已安装 点击打开APP
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';

                    //    判断是否卸载
                    callAppFunc_isInstall(data.gameid,function (res) {
                        //    判断是否卸载 fasle
                        if (res == false || res == "false" || res == "0") {//已卸载了 需要重新安装
                            callAppFunc_dbDelete(data.gameid);
                            callAppFunc_dbSet(game_id, params);
                            callAppFunc_startDown(game_id);
                        }else{ //没有卸载 那么就直接打开
                            //    打开app
                            callAppFunc_openGame(data.gameid);

                        }
                    })
                }else if ( _appstatus == 4){//已暂停 点击重新开始下载
                    console.log("已暂停");
                    callAppFunc_startDown(game_id);
                    //
                    // AgeStateDown();
                    // open=true;
                    // clearInterval(timerss);
                    // localStorage.setItem('downing',4);
                }else if ( _appstatus  == 5){//安装中
                    console.log("安装中")
                }else if ( _appstatus == 9) {//已卸载
                    // console.log("已卸载")
                    // AgeStateDown();
                    // localStorage.setItem('downing',9);
                    // open=true;
                    // clearInterval(timerss)
                    callAppFunc_dbDelete(data.gameid);
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                }else if ( _appstatus ==3 ){//下载失败
                    // AgeStateDown();
                    // open=true;
                    // localStorage.setItem('downing',3);
                    // clearInterval(timerss)
                }
            })
        },1000)
    } else {
        //    读取本地缓存
        var as=localStorage.getItem('downing');
        // alert(as+'as')
        // alert(as+'as');
        // alert(as);
        if (as == 2){//已安装点击打开APP 并且检查是否卸载了
            $xd('btn-mid').style.display='block';
            $xd('btn-down').style.display='block';
            $xd('jd').style.display='none';
            $xd('jd2').style.display='none';
            //    判断是否卸载
            callAppFunc_isInstall(data.gameid,function (res) {
                //    判断是否卸载 fasle
                if (res == false || res == "false" || res == "0") {//已卸载了 需要重新安装
                    callAppFunc_dbDelete(data.gameid);
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                }else{ //没有卸载 那么就直接打开
                    //    打开app
                    callAppFunc_openGame(data.gameid);
                    localStorage.setItem('downing',2);
                    open=true;
                }
            })
        } else if (as == 1){//下载完毕没有安装  需要手动安装
            callAppFunc_installGame(game_id);
        } else if (as == 4){//暂停了
            // params=JSON.stringify(params);
            // callAppFunc_dbSet(data.gameid,params)
            // //开始下载
            // callAppFunc_startDown(data.gameid);
            // //调用方法 定时刷新返回状态
            // timerss=setInterval(function () {
            //     callAppFunc_dbGet(data.gameid,function (res) {
            //         // console.log(res)
            //         var re=JSON.parse(res);
            //         console.log(re)
            //         //    获取到实时进度
            //         progress=re.progress;
            //         //    获取下载状态
            //         _appstatus=re.status;
            //         // alert(_appstatus)
            //         console.log(_appstatus);
            //         if (progress == 100){
            //             //显示按钮
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //清除定时器
            //             clearInterval(timerss);
            //         }
            //         //    判断下载状态 根据状态来走不通的路线
            //         if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
            //             $xd('btn-mid').style.display='none';
            //             $xd('btn-down').style.display='none';
            //             $xd('jd').style.display='block';
            //             $xd('jd2').style.display='block';
            //             //展示进度百分比
            //             $xd('jindu').innerHTML=progress;
            //             $xd('jindu1').innerHTML=progress;
            //         }else if (_appstatus == 1){//下载完成等待安装
            //             //    安装游戏
            //             // callAppFunc_installGame(data.gameid);
            //             localStorage.setItem('downing',1);
            //             open=true;
            //         } else if ( _appstatus == 2) {//已安装 点击打开APP
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //
            //             //    判断是否卸载
            //             callAppFunc_isInstall(data.gameid,function (res) {
            //                 //    判断是否卸载 fasle
            //                 if (res.indexOf('false')) {//已卸载了 需要重新安装
            //                     AgeStateDown();
            //                     open=true;
            //                     //        清除定时器
            //                     clearInterval(timerss);
            //                 }else{ //没有卸载 那么就直接打开
            //                     //    打开app
            //                     callAppFunc_openGame(data.gameid);
            //                     localStorage.setItem('downing',2);
            //                     open=true;
            //                 }
            //             })
            //         }else if ( _appstatus == 4){//已暂停 点击重新开始下载
            //             console.log("已暂停");
            //             //
            //             AgeStateDown();
            //             open=true;
            //             clearInterval(timerss);
            //             localStorage.setItem('downing',4);
            //         }else if ( _appstatus  == 5){//安装中
            //             console.log("安装中")
            //         }else if ( _appstatus == 9) {//已卸载
            //             console.log("已卸载")
            //             AgeStateDown();
            //             localStorage.setItem('downing',9);
            //             open=true;
            //             clearInterval(timerss)
            //         }else if ( _appstatus ==3 ){//下载失败
            //             AgeStateDown();
            //             open=true;
            //             localStorage.setItem('downing',3);
            //             clearInterval(timerss)
            //         }
            //     })
            // },1000)
            callAppFunc_startDown(game_id);
        } else if (as == 3){//下载失败
            // params=JSON.stringify(params);
            // callAppFunc_dbSet(data.gameid,params)
            // //开始下载
            // callAppFunc_startDown(data.gameid);
            // //调用方法 定时刷新返回状态
            // timerss=setInterval(function () {
            //     callAppFunc_dbGet(data.gameid,function (res) {
            //         // console.log(res)
            //         var re=JSON.parse(res);
            //         console.log(re)
            //         //    获取到实时进度
            //         progress=re.progress;
            //         //    获取下载状态
            //         _appstatus=re.status;
            //         // alert(_appstatus)
            //         console.log(_appstatus);
            //         if (progress == 100){
            //             //显示按钮
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //清除定时器
            //             clearInterval(timerss);
            //         }
            //         //    判断下载状态 根据状态来走不通的路线
            //         if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
            //             $xd('btn-mid').style.display='none';
            //             $xd('btn-down').style.display='none';
            //             $xd('jd').style.display='block';
            //             $xd('jd2').style.display='block';
            //             //展示进度百分比
            //             $xd('jindu').innerHTML=progress;
            //             $xd('jindu1').innerHTML=progress;
            //         }else if (_appstatus == 1){//下载完成等待安装
            //             //    安装游戏
            //             // callAppFunc_installGame(data.gameid);
            //             // localStorage.setItem('downing',1);
            //             // open=true;
            //         } else if ( _appstatus == 2) {//已安装 点击打开APP
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //
            //             //    判断是否卸载
            //             callAppFunc_isInstall(data.gameid,function (res) {
            //                 //    判断是否卸载 fasle
            //                 if (res.indexOf('false')) {//已卸载了 需要重新安装
            //                     AgeStateDown();
            //                     open=true;
            //                     //        清除定时器
            //                     clearInterval(timerss);
            //                 }else{ //没有卸载 那么就直接打开
            //                     //    打开app
            //                     callAppFunc_openGame(data.gameid);
            //                     localStorage.setItem('downing',2);
            //                     open=true;
            //                 }
            //             })
            //         }else if ( _appstatus == 4){//已暂停 点击重新开始下载
            //             console.log("已暂停");
            //             //
            //             AgeStateDown();
            //             open=true;
            //             clearInterval(timerss);
            //             localStorage.setItem('downing',4);
            //         }else if ( _appstatus  == 5){//安装中
            //             console.log("安装中")
            //         }else if ( _appstatus == 9) {//已卸载
            //             console.log("已卸载")
            //             AgeStateDown();
            //             localStorage.setItem('downing',9);
            //             open=true;
            //             clearInterval(timerss)
            //         }else if ( _appstatus ==3 ){//下载失败
            //             AgeStateDown();
            //             open=true;
            //             localStorage.setItem('downing',3);
            //             clearInterval(timerss)
            //         }
            //     })
            // },1000)
            alert("下载失败")
        }
    }
};
$xd('btn-down').onclick= function () {
    // alert(open);
    //  if (!open){
    //      params=JSON.stringify(params);
    //      callAppFunc_dbSet(data.gameid,params)
    //      //开始下载
    //      callAppFunc_startDown(data.gameid);
    //      //调用方法 定时刷新返回状态
    //      timerss=setInterval(function () {
    //          callAppFunc_dbGet(data.gameid,function (res) {
    //              // console.log(res)
    //              var re=JSON.parse(res);
    //              console.log(re)
    //              //    获取到实时进度
    //              progress=re.progress;
    //              //    获取下载状态
    //              _appstatus=re.status;
    //              // alert(_appstatus)
    //              console.log(_appstatus);
    //              if (progress == 100){
    //                  //显示按钮
    //                  $xd('btn-mid').style.display='block';
    //                  $xd('btn-down').style.display='block';
    //                  $xd('jd').style.display='none';
    //                  $xd('jd2').style.display='none';
    //                  //清除定时器
    //                  clearInterval(timerss);
    //              }
    //              //    判断下载状态 根据状态来走不通的路线
    //              if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
    //                  $xd('btn-mid').style.display='none';
    //                  $xd('btn-down').style.display='none';
    //                  $xd('jd').style.display='block';
    //                  $xd('jd2').style.display='block';
    //                  //展示进度百分比
    //                  $xd('jindu').innerHTML=progress;
    //                  $xd('jindu1').innerHTML=progress;
    //              }else if (_appstatus == 1){//下载完成等待安装
    //                  //    安装游戏
    //                  // callAppFunc_installGame(data.gameid);
    //                  // localStorage.setItem('downing',1);
    //                  // open=true;
    //              } else if ( _appstatus == 2) {//已安装 点击打开APP
    //                  $xd('btn-mid').style.display='block';
    //                  $xd('btn-down').style.display='block';
    //                  $xd('jd').style.display='none';
    //                  $xd('jd2').style.display='none';
    //
    //                  //    判断是否卸载
    //                  callAppFunc_isInstall(data.gameid,function (res) {
    //                      //    判断是否卸载 fasle
    //                      if (res.indexOf('false')) {//已卸载了 需要重新安装
    //                          AgeStateDown();
    //                          open=true;
    //                          //        清除定时器
    //                          clearInterval(timerss);
    //                      }else{ //没有卸载 那么就直接打开
    //                          //    打开app
    //                          callAppFunc_openGame(data.gameid);
    //                          localStorage.setItem('downing',2);
    //                          open=true;
    //                      }
    //                  })
    //              }else if ( _appstatus == 4){//已暂停 点击重新开始下载
    //                  console.log("已暂停");
    //                  //
    //                  AgeStateDown();
    //                  open=true;
    //                  clearInterval(timerss);
    //                  localStorage.setItem('downing',4);
    //              }else if ( _appstatus  == 5){//安装中
    //                  console.log("安装中")
    //              }else if ( _appstatus == 9) {//已卸载
    //                  console.log("已卸载")
    //                  AgeStateDown();
    //                  localStorage.setItem('downing',9);
    //                  open=true;
    //                  clearInterval(timerss)
    //              }else if ( _appstatus ==3 ){//下载失败
    //                  AgeStateDown();
    //                  open=true;
    //                  localStorage.setItem('downing',3);
    //                  clearInterval(timerss)
    //              }
    //          })
    //      },1000)
    //  } else {
    //  //    读取本地缓存
    //      var as=localStorage.getItem('downing');
    //      // alert(as+'as')
    //      // alert(as+'as');
    //      // alert(as);
    //      if (as == 2){//已安装点击打开APP 并且检查是否卸载了
    //          $xd('btn-mid').style.display='block';
    //          $xd('btn-down').style.display='block';
    //          $xd('jd').style.display='none';
    //          $xd('jd2').style.display='none';
    //          //    判断是否卸载
    //          callAppFunc_isInstall(data.gameid,function (res) {
    //              //    判断是否卸载 fasle
    //              if (res.indexOf('false')) {//已卸载了 需要重新安装
    //                  AgeStateDown();
    //                  //        清除定时器
    //                  // clearInterval(timerss)
    //              }else{ //没有卸载 那么就直接打开
    //                  //    打开app
    //                  callAppFunc_openGame(data.gameid);
    //              }
    //          })
    //      } else if (as == 1){//下载完毕没有安装  需要手动安装
    //          callAppFunc_installGame(game_id);
    //      } else if (as == 4){//暂停了
    //          params=JSON.stringify(params);
    //          callAppFunc_dbSet(data.gameid,params)
    //          //开始下载
    //          callAppFunc_startDown(data.gameid);
    //          //调用方法 定时刷新返回状态
    //          timerss=setInterval(function () {
    //              callAppFunc_dbGet(data.gameid,function (res) {
    //                  // console.log(res)
    //                  var re=JSON.parse(res);
    //                  console.log(re)
    //                  //    获取到实时进度
    //                  progress=re.progress;
    //                  //    获取下载状态
    //                  _appstatus=re.status;
    //                  // alert(_appstatus)
    //                  console.log(_appstatus);
    //                  if (progress == 100){
    //                      //显示按钮
    //                      $xd('btn-mid').style.display='block';
    //                      $xd('btn-down').style.display='block';
    //                      $xd('jd').style.display='none';
    //                      $xd('jd2').style.display='none';
    //                      //清除定时器
    //                      clearInterval(timerss);
    //                  }
    //                  //    判断下载状态 根据状态来走不通的路线
    //                  if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
    //                      $xd('btn-mid').style.display='none';
    //                      $xd('btn-down').style.display='none';
    //                      $xd('jd').style.display='block';
    //                      $xd('jd2').style.display='block';
    //                      //展示进度百分比
    //                      $xd('jindu').innerHTML=progress;
    //                      $xd('jindu1').innerHTML=progress;
    //                  }else if (_appstatus == 1){//下载完成等待安装
    //                      //    安装游戏
    //                      // callAppFunc_installGame(data.gameid);
    //                      localStorage.setItem('downing',1);
    //                      open=true;
    //                  } else if ( _appstatus == 2) {//已安装 点击打开APP
    //                      $xd('btn-mid').style.display='block';
    //                      $xd('btn-down').style.display='block';
    //                      $xd('jd').style.display='none';
    //                      $xd('jd2').style.display='none';
    //
    //                      //    判断是否卸载
    //                      callAppFunc_isInstall(data.gameid,function (res) {
    //                          //    判断是否卸载 fasle
    //                          if (res.indexOf('false')) {//已卸载了 需要重新安装
    //                              AgeStateDown();
    //                              open=true;
    //                              //        清除定时器
    //                              clearInterval(timerss);
    //                          }else{ //没有卸载 那么就直接打开
    //                              //    打开app
    //                              callAppFunc_openGame(data.gameid);
    //                              localStorage.setItem('downing',2);
    //                              open=true;
    //                          }
    //                      })
    //                  }else if ( _appstatus == 4){//已暂停 点击重新开始下载
    //                      console.log("已暂停");
    //                      //
    //                      AgeStateDown();
    //                      open=true;
    //                      clearInterval(timerss);
    //                      localStorage.setItem('downing',4);
    //                  }else if ( _appstatus  == 5){//安装中
    //                      console.log("安装中")
    //                  }else if ( _appstatus == 9) {//已卸载
    //                      console.log("已卸载")
    //                      AgeStateDown();
    //                      localStorage.setItem('downing',9);
    //                      open=true;
    //                      clearInterval(timerss)
    //                  }else if ( _appstatus ==3 ){//下载失败
    //                      AgeStateDown();
    //                      open=true;
    //                      localStorage.setItem('downing',3);
    //                      clearInterval(timerss)
    //                  }
    //              })
    //          },1000)
    //      } else if (as == 3){//下载失败
    //          params=JSON.stringify(params);
    //          callAppFunc_dbSet(data.gameid,params)
    //          //开始下载
    //          callAppFunc_startDown(data.gameid);
    //          //调用方法 定时刷新返回状态
    //          timerss=setInterval(function () {
    //              callAppFunc_dbGet(data.gameid,function (res) {
    //                  // console.log(res)
    //                  var re=JSON.parse(res);
    //                  console.log(re)
    //                  //    获取到实时进度
    //                  progress=re.progress;
    //                  //    获取下载状态
    //                  _appstatus=re.status;
    //                  // alert(_appstatus)
    //                  console.log(_appstatus);
    //                  if (progress == 100){
    //                      //显示按钮
    //                      $xd('btn-mid').style.display='block';
    //                      $xd('btn-down').style.display='block';
    //                      $xd('jd').style.display='none';
    //                      $xd('jd2').style.display='none';
    //                      //清除定时器
    //                      clearInterval(timerss);
    //                  }
    //                  //    判断下载状态 根据状态来走不通的路线
    //                  if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
    //                      $xd('btn-mid').style.display='none';
    //                      $xd('btn-down').style.display='none';
    //                      $xd('jd').style.display='block';
    //                      $xd('jd2').style.display='block';
    //                      //展示进度百分比
    //                      $xd('jindu').innerHTML=progress;
    //                      $xd('jindu1').innerHTML=progress;
    //                  }else if (_appstatus == 1){//下载完成等待安装
    //                      //    安装游戏
    //                      // callAppFunc_installGame(data.gameid);
    //                      // localStorage.setItem('downing',1);
    //                      // open=true;
    //                  } else if ( _appstatus == 2) {//已安装 点击打开APP
    //                      $xd('btn-mid').style.display='block';
    //                      $xd('btn-down').style.display='block';
    //                      $xd('jd').style.display='none';
    //                      $xd('jd2').style.display='none';
    //
    //                      //    判断是否卸载
    //                      callAppFunc_isInstall(data.gameid,function (res) {
    //                          //    判断是否卸载 fasle
    //                          if (res.indexOf('false')) {//已卸载了 需要重新安装
    //                              AgeStateDown();
    //                              open=true;
    //                              //        清除定时器
    //                              clearInterval(timerss);
    //                          }else{ //没有卸载 那么就直接打开
    //                              //    打开app
    //                              callAppFunc_openGame(data.gameid);
    //                              localStorage.setItem('downing',2);
    //                              open=true;
    //                          }
    //                      })
    //                  }else if ( _appstatus == 4){//已暂停 点击重新开始下载
    //                      console.log("已暂停");
    //                      //
    //                      AgeStateDown();
    //                      open=true;
    //                      clearInterval(timerss);
    //                      localStorage.setItem('downing',4);
    //                  }else if ( _appstatus  == 5){//安装中
    //                      console.log("安装中")
    //                  }else if ( _appstatus == 9) {//已卸载
    //                      console.log("已卸载")
    //                      AgeStateDown();
    //                      localStorage.setItem('downing',9);
    //                      open=true;
    //                      clearInterval(timerss)
    //                  }else if ( _appstatus ==3 ){//下载失败
    //                      AgeStateDown();
    //                      open=true;
    //                      localStorage.setItem('downing',3);
    //                      clearInterval(timerss)
    //                  }
    //              })
    //          },1000)
    //      }
    //  }
    if (!open){
        // alert(123);
        params=JSON.stringify(params);
        callAppFunc_dbSet(data.gameid,params)
        //开始下载
        callAppFunc_startDown(data.gameid);
        //调用方法 定时刷新返回状态
        timerss=setInterval(function () {
            callAppFunc_dbGet(data.gameid,function (res) {
                // console.log(res)
                var re=JSON.parse(res);
                console.log(re)
                //    获取到实时进度
                progress=re.progress;
                //    获取下载状态
                _appstatus=re.status;
                // alert(_appstatus)
                console.log(_appstatus);
                if (progress == 100){
                    //显示按钮
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';
                    //清除定时器
                    clearInterval(timerss);
                }
                //    判断下载状态 根据状态来走不通的路线
                if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
                    $xd('btn-mid').style.display='none';
                    $xd('btn-down').style.display='none';
                    $xd('jd').style.display='block';
                    $xd('jd2').style.display='block';
                    //展示进度百分比
                    $xd('jindu').innerHTML=progress;
                    $xd('jindu1').innerHTML=progress;
                }else if (_appstatus == 1){//下载完成等待安装
                    //    安装游戏
                    callAppFunc_installGame(data.gameid);
                    // localStorage.setItem('downing',1);
                    // open=true;
                } else if ( _appstatus == 2) {//已安装 点击打开APP
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';

                    //    判断是否卸载
                    callAppFunc_isInstall(data.gameid,function (res) {
                        //    判断是否卸载 fasle
                        if (res == false || res == "false" || res == "0") {//已卸载了 需要重新安装
                            callAppFunc_dbDelete(data.gameid);
                            callAppFunc_dbSet(game_id, params);
                            callAppFunc_startDown(game_id);
                        }else{ //没有卸载 那么就直接打开
                            //    打开app
                            callAppFunc_openGame(data.gameid);

                        }
                    })
                }else if ( _appstatus == 4){//已暂停 点击重新开始下载
                    console.log("已暂停");
                    callAppFunc_startDown(game_id);
                    //
                    // AgeStateDown();
                    // open=true;
                    // clearInterval(timerss);
                    // localStorage.setItem('downing',4);
                }else if ( _appstatus  == 5){//安装中
                    console.log("安装中")
                }else if ( _appstatus == 9) {//已卸载
                    // console.log("已卸载")
                    // AgeStateDown();
                    // localStorage.setItem('downing',9);
                    // open=true;
                    // clearInterval(timerss)
                    callAppFunc_dbDelete(data.gameid);
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                }else if ( _appstatus ==3 ){//下载失败
                    // AgeStateDown();
                    // open=true;
                    // localStorage.setItem('downing',3);
                    // clearInterval(timerss)
                }
            })
        },1000)
    } else {
        //    读取本地缓存
        var as=localStorage.getItem('downing');
        // alert(as+'as')
        // alert(as+'as');
        // alert(as);
        if (as == 2){//已安装点击打开APP 并且检查是否卸载了
            $xd('btn-mid').style.display='block';
            $xd('btn-down').style.display='block';
            $xd('jd').style.display='none';
            $xd('jd2').style.display='none';
            //    判断是否卸载
            callAppFunc_isInstall(data.gameid,function (res) {
                //    判断是否卸载 fasle
                if (res == false || res == "false" || res == "0") {//已卸载了 需要重新安装
                    callAppFunc_dbDelete(data.gameid);
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                }else{ //没有卸载 那么就直接打开
                    //    打开app
                    callAppFunc_openGame(data.gameid);
                    localStorage.setItem('downing',2);
                    open=true;
                }
            })
        } else if (as == 1){//下载完毕没有安装  需要手动安装
            callAppFunc_installGame(game_id);
        } else if (as == 4){//暂停了
            // params=JSON.stringify(params);
            // callAppFunc_dbSet(data.gameid,params)
            // //开始下载
            // callAppFunc_startDown(data.gameid);
            // //调用方法 定时刷新返回状态
            // timerss=setInterval(function () {
            //     callAppFunc_dbGet(data.gameid,function (res) {
            //         // console.log(res)
            //         var re=JSON.parse(res);
            //         console.log(re)
            //         //    获取到实时进度
            //         progress=re.progress;
            //         //    获取下载状态
            //         _appstatus=re.status;
            //         // alert(_appstatus)
            //         console.log(_appstatus);
            //         if (progress == 100){
            //             //显示按钮
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //清除定时器
            //             clearInterval(timerss);
            //         }
            //         //    判断下载状态 根据状态来走不通的路线
            //         if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
            //             $xd('btn-mid').style.display='none';
            //             $xd('btn-down').style.display='none';
            //             $xd('jd').style.display='block';
            //             $xd('jd2').style.display='block';
            //             //展示进度百分比
            //             $xd('jindu').innerHTML=progress;
            //             $xd('jindu1').innerHTML=progress;
            //         }else if (_appstatus == 1){//下载完成等待安装
            //             //    安装游戏
            //             // callAppFunc_installGame(data.gameid);
            //             localStorage.setItem('downing',1);
            //             open=true;
            //         } else if ( _appstatus == 2) {//已安装 点击打开APP
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //
            //             //    判断是否卸载
            //             callAppFunc_isInstall(data.gameid,function (res) {
            //                 //    判断是否卸载 fasle
            //                 if (res.indexOf('false')) {//已卸载了 需要重新安装
            //                     AgeStateDown();
            //                     open=true;
            //                     //        清除定时器
            //                     clearInterval(timerss);
            //                 }else{ //没有卸载 那么就直接打开
            //                     //    打开app
            //                     callAppFunc_openGame(data.gameid);
            //                     localStorage.setItem('downing',2);
            //                     open=true;
            //                 }
            //             })
            //         }else if ( _appstatus == 4){//已暂停 点击重新开始下载
            //             console.log("已暂停");
            //             //
            //             AgeStateDown();
            //             open=true;
            //             clearInterval(timerss);
            //             localStorage.setItem('downing',4);
            //         }else if ( _appstatus  == 5){//安装中
            //             console.log("安装中")
            //         }else if ( _appstatus == 9) {//已卸载
            //             console.log("已卸载")
            //             AgeStateDown();
            //             localStorage.setItem('downing',9);
            //             open=true;
            //             clearInterval(timerss)
            //         }else if ( _appstatus ==3 ){//下载失败
            //             AgeStateDown();
            //             open=true;
            //             localStorage.setItem('downing',3);
            //             clearInterval(timerss)
            //         }
            //     })
            // },1000)
            callAppFunc_startDown(game_id);
        } else if (as == 3){//下载失败
            // params=JSON.stringify(params);
            // callAppFunc_dbSet(data.gameid,params)
            // //开始下载
            // callAppFunc_startDown(data.gameid);
            // //调用方法 定时刷新返回状态
            // timerss=setInterval(function () {
            //     callAppFunc_dbGet(data.gameid,function (res) {
            //         // console.log(res)
            //         var re=JSON.parse(res);
            //         console.log(re)
            //         //    获取到实时进度
            //         progress=re.progress;
            //         //    获取下载状态
            //         _appstatus=re.status;
            //         // alert(_appstatus)
            //         console.log(_appstatus);
            //         if (progress == 100){
            //             //显示按钮
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //清除定时器
            //             clearInterval(timerss);
            //         }
            //         //    判断下载状态 根据状态来走不通的路线
            //         if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
            //             $xd('btn-mid').style.display='none';
            //             $xd('btn-down').style.display='none';
            //             $xd('jd').style.display='block';
            //             $xd('jd2').style.display='block';
            //             //展示进度百分比
            //             $xd('jindu').innerHTML=progress;
            //             $xd('jindu1').innerHTML=progress;
            //         }else if (_appstatus == 1){//下载完成等待安装
            //             //    安装游戏
            //             // callAppFunc_installGame(data.gameid);
            //             // localStorage.setItem('downing',1);
            //             // open=true;
            //         } else if ( _appstatus == 2) {//已安装 点击打开APP
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //
            //             //    判断是否卸载
            //             callAppFunc_isInstall(data.gameid,function (res) {
            //                 //    判断是否卸载 fasle
            //                 if (res.indexOf('false')) {//已卸载了 需要重新安装
            //                     AgeStateDown();
            //                     open=true;
            //                     //        清除定时器
            //                     clearInterval(timerss);
            //                 }else{ //没有卸载 那么就直接打开
            //                     //    打开app
            //                     callAppFunc_openGame(data.gameid);
            //                     localStorage.setItem('downing',2);
            //                     open=true;
            //                 }
            //             })
            //         }else if ( _appstatus == 4){//已暂停 点击重新开始下载
            //             console.log("已暂停");
            //             //
            //             AgeStateDown();
            //             open=true;
            //             clearInterval(timerss);
            //             localStorage.setItem('downing',4);
            //         }else if ( _appstatus  == 5){//安装中
            //             console.log("安装中")
            //         }else if ( _appstatus == 9) {//已卸载
            //             console.log("已卸载")
            //             AgeStateDown();
            //             localStorage.setItem('downing',9);
            //             open=true;
            //             clearInterval(timerss)
            //         }else if ( _appstatus ==3 ){//下载失败
            //             AgeStateDown();
            //             open=true;
            //             localStorage.setItem('downing',3);
            //             clearInterval(timerss)
            //         }
            //     })
            // },1000)
            alert("下载失败")
        }
    }
};

// 事件
function downBegin() {
    if (!open){
        // alert(123);
        params=JSON.stringify(params);
        callAppFunc_dbSet(data.gameid,params)
        //开始下载
        callAppFunc_startDown(data.gameid);
        //调用方法 定时刷新返回状态
        timerss=setInterval(function () {
            callAppFunc_dbGet(data.gameid,function (res) {
                // console.log(res)
                var re=JSON.parse(res);
                console.log(re)
                //    获取到实时进度
                progress=re.progress;
                //    获取下载状态
                _appstatus=re.status;
                // alert(_appstatus)
                console.log(_appstatus);
                if (progress == 100){
                    //显示按钮
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';
                    //清除定时器
                    clearInterval(timerss);
                }
                //    判断下载状态 根据状态来走不通的路线
                if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
                    $xd('btn-mid').style.display='none';
                    $xd('btn-down').style.display='none';
                    $xd('jd').style.display='block';
                    $xd('jd2').style.display='block';
                    //展示进度百分比
                    $xd('jindu').innerHTML=progress;
                    $xd('jindu1').innerHTML=progress;
                }else if (_appstatus == 1){//下载完成等待安装
                    //    安装游戏
                    callAppFunc_installGame(data.gameid);
                    // localStorage.setItem('downing',1);
                    // open=true;
                } else if ( _appstatus == 2) {//已安装 点击打开APP
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';

                    //    判断是否卸载
                    callAppFunc_isInstall(data.gameid,function (res) {
                        //    判断是否卸载 fasle
                        if (res == false || res == "false" || res == "0") {//已卸载了 需要重新安装
                            callAppFunc_dbDelete(data.gameid);
                            callAppFunc_dbSet(game_id, params);
                            callAppFunc_startDown(game_id);
                        }else{ //没有卸载 那么就直接打开
                            //    打开app
                            callAppFunc_openGame(data.gameid);

                        }
                    })
                }else if ( _appstatus == 4){//已暂停 点击重新开始下载
                    console.log("已暂停");
                    callAppFunc_startDown(game_id);
                    //
                    // AgeStateDown();
                    // open=true;
                    // clearInterval(timerss);
                    // localStorage.setItem('downing',4);
                }else if ( _appstatus  == 5){//安装中
                    console.log("安装中")
                }else if ( _appstatus == 9) {//已卸载
                    // console.log("已卸载")
                    // AgeStateDown();
                    // localStorage.setItem('downing',9);
                    // open=true;
                    // clearInterval(timerss)
                    callAppFunc_dbDelete(data.gameid);
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                }else if ( _appstatus ==3 ){//下载失败
                    // AgeStateDown();
                    // open=true;
                    // localStorage.setItem('downing',3);
                    // clearInterval(timerss)
                }
            })
        },1000)
    } else {
        //    读取本地缓存
        var as=localStorage.getItem('downing');
        // alert(as+'as')
        // alert(as+'as');
        // alert(as);
        if (as == 2){//已安装点击打开APP 并且检查是否卸载了
            $xd('btn-mid').style.display='block';
            $xd('btn-down').style.display='block';
            $xd('jd').style.display='none';
            $xd('jd2').style.display='none';
            //    判断是否卸载
            callAppFunc_isInstall(data.gameid,function (res) {
                //    判断是否卸载 fasle
                if (res == false || res == "false" || res == "0") {//已卸载了 需要重新安装
                    callAppFunc_dbDelete(data.gameid);
                    callAppFunc_dbSet(game_id, params);
                    callAppFunc_startDown(game_id);
                }else{ //没有卸载 那么就直接打开
                    //    打开app
                    callAppFunc_openGame(data.gameid);
                    localStorage.setItem('downing',2);
                    open=true;
                }
            })
        } else if (as == 1){//下载完毕没有安装  需要手动安装
            callAppFunc_installGame(game_id);
        } else if (as == 4){//暂停了
            // params=JSON.stringify(params);
            // callAppFunc_dbSet(data.gameid,params)
            // //开始下载
            // callAppFunc_startDown(data.gameid);
            // //调用方法 定时刷新返回状态
            // timerss=setInterval(function () {
            //     callAppFunc_dbGet(data.gameid,function (res) {
            //         // console.log(res)
            //         var re=JSON.parse(res);
            //         console.log(re)
            //         //    获取到实时进度
            //         progress=re.progress;
            //         //    获取下载状态
            //         _appstatus=re.status;
            //         // alert(_appstatus)
            //         console.log(_appstatus);
            //         if (progress == 100){
            //             //显示按钮
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //清除定时器
            //             clearInterval(timerss);
            //         }
            //         //    判断下载状态 根据状态来走不通的路线
            //         if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
            //             $xd('btn-mid').style.display='none';
            //             $xd('btn-down').style.display='none';
            //             $xd('jd').style.display='block';
            //             $xd('jd2').style.display='block';
            //             //展示进度百分比
            //             $xd('jindu').innerHTML=progress;
            //             $xd('jindu1').innerHTML=progress;
            //         }else if (_appstatus == 1){//下载完成等待安装
            //             //    安装游戏
            //             // callAppFunc_installGame(data.gameid);
            //             localStorage.setItem('downing',1);
            //             open=true;
            //         } else if ( _appstatus == 2) {//已安装 点击打开APP
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //
            //             //    判断是否卸载
            //             callAppFunc_isInstall(data.gameid,function (res) {
            //                 //    判断是否卸载 fasle
            //                 if (res.indexOf('false')) {//已卸载了 需要重新安装
            //                     AgeStateDown();
            //                     open=true;
            //                     //        清除定时器
            //                     clearInterval(timerss);
            //                 }else{ //没有卸载 那么就直接打开
            //                     //    打开app
            //                     callAppFunc_openGame(data.gameid);
            //                     localStorage.setItem('downing',2);
            //                     open=true;
            //                 }
            //             })
            //         }else if ( _appstatus == 4){//已暂停 点击重新开始下载
            //             console.log("已暂停");
            //             //
            //             AgeStateDown();
            //             open=true;
            //             clearInterval(timerss);
            //             localStorage.setItem('downing',4);
            //         }else if ( _appstatus  == 5){//安装中
            //             console.log("安装中")
            //         }else if ( _appstatus == 9) {//已卸载
            //             console.log("已卸载")
            //             AgeStateDown();
            //             localStorage.setItem('downing',9);
            //             open=true;
            //             clearInterval(timerss)
            //         }else if ( _appstatus ==3 ){//下载失败
            //             AgeStateDown();
            //             open=true;
            //             localStorage.setItem('downing',3);
            //             clearInterval(timerss)
            //         }
            //     })
            // },1000)
            callAppFunc_startDown(game_id);
        } else if (as == 3){//下载失败
            // params=JSON.stringify(params);
            // callAppFunc_dbSet(data.gameid,params)
            // //开始下载
            // callAppFunc_startDown(data.gameid);
            // //调用方法 定时刷新返回状态
            // timerss=setInterval(function () {
            //     callAppFunc_dbGet(data.gameid,function (res) {
            //         // console.log(res)
            //         var re=JSON.parse(res);
            //         console.log(re)
            //         //    获取到实时进度
            //         progress=re.progress;
            //         //    获取下载状态
            //         _appstatus=re.status;
            //         // alert(_appstatus)
            //         console.log(_appstatus);
            //         if (progress == 100){
            //             //显示按钮
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //清除定时器
            //             clearInterval(timerss);
            //         }
            //         //    判断下载状态 根据状态来走不通的路线
            //         if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
            //             $xd('btn-mid').style.display='none';
            //             $xd('btn-down').style.display='none';
            //             $xd('jd').style.display='block';
            //             $xd('jd2').style.display='block';
            //             //展示进度百分比
            //             $xd('jindu').innerHTML=progress;
            //             $xd('jindu1').innerHTML=progress;
            //         }else if (_appstatus == 1){//下载完成等待安装
            //             //    安装游戏
            //             // callAppFunc_installGame(data.gameid);
            //             // localStorage.setItem('downing',1);
            //             // open=true;
            //         } else if ( _appstatus == 2) {//已安装 点击打开APP
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //
            //             //    判断是否卸载
            //             callAppFunc_isInstall(data.gameid,function (res) {
            //                 //    判断是否卸载 fasle
            //                 if (res.indexOf('false')) {//已卸载了 需要重新安装
            //                     AgeStateDown();
            //                     open=true;
            //                     //        清除定时器
            //                     clearInterval(timerss);
            //                 }else{ //没有卸载 那么就直接打开
            //                     //    打开app
            //                     callAppFunc_openGame(data.gameid);
            //                     localStorage.setItem('downing',2);
            //                     open=true;
            //                 }
            //             })
            //         }else if ( _appstatus == 4){//已暂停 点击重新开始下载
            //             console.log("已暂停");
            //             //
            //             AgeStateDown();
            //             open=true;
            //             clearInterval(timerss);
            //             localStorage.setItem('downing',4);
            //         }else if ( _appstatus  == 5){//安装中
            //             console.log("安装中")
            //         }else if ( _appstatus == 9) {//已卸载
            //             console.log("已卸载")
            //             AgeStateDown();
            //             localStorage.setItem('downing',9);
            //             open=true;
            //             clearInterval(timerss)
            //         }else if ( _appstatus ==3 ){//下载失败
            //             AgeStateDown();
            //             open=true;
            //             localStorage.setItem('downing',3);
            //             clearInterval(timerss)
            //         }
            //     })
            // },1000)
            alert("下载失败")
        }
    }
}

//卸载以后调用 重新安装
function AgeStateDown() {
        params=JSON.stringify(params);
        callAppFunc_dbSet(data.gameid,params)
        //开始下载
        callAppFunc_startDown(data.gameid);
        //调用方法 定时刷新返回状态
        timerss=setInterval(function () {
            callAppFunc_dbGet(data.gameid,function (res) {
                // console.log(res)
                var re=JSON.parse(res);
                console.log(re)
                //    获取到实时进度
               var  __progress=re.progress;
                //    获取下载状态
               var  __appstatus=re.status;
                // alert(__appstatus)
                console.log(__appstatus+'第二次下载');
                if (__progress == 100){
                    //显示按钮
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';
                    //清除定时器
                    clearInterval(timerss);
                }
                //    判断下载状态 根据状态来走不通的路线
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
                    callAppFunc_installGame(data.gameid);
                    // localStorage.setItem('downing',1);
                    // open=true;
                } else if ( __appstatus == 2) {//已安装 点击打开APP
                    $xd('btn-mid').style.display='block';
                    $xd('btn-down').style.display='block';
                    $xd('jd').style.display='none';
                    $xd('jd2').style.display='none';

                    //    判断是否卸载
                    callAppFunc_isInstall(data.gameid,function (res) {
                        //    判断是否卸载 fasle
                        if (res.indexOf('false')) {//已卸载了 需要重新安装
                            // AgeStateDown();
                            // open=true;
                            AgeStateDown()
                            //        清除定时器
                            clearInterval(timerss);
                        }else{ //没有卸载 那么就直接打开
                            //    打开app
                            callAppFunc_openGame(data.gameid);
                            // localStorage.setItem('downing',2);
                            // open=true;
                        }
                    })
                }else if ( __appstatus == 4){//已暂停 点击重新开始下载
                    console.log("已暂停");
                    //
                    // AgeStateDown();
                    // open=true;
                    // clearInterval(timerss);
                    // localStorage.setItem('downing',4);
                }else if ( __appstatus  == 5){//安装中
                    console.log("安装中")
                }else if ( __appstatus == 9) {//已卸载
                    console.log("已卸载")
                    // AgeStateDown();
                    // localStorage.setItem('downing',9);
                    // open=true;
                    clearInterval(timerss)
                }else if ( __appstatus ==3 ){//下载失败
                    // AgeStateDown();
                    // open=true;
                    // localStorage.setItem('downing',3);
                    alert("下载失败")
                    clearInterval(timerss)
                }
            })
        },1000)

//     console.log("重新下载");
//     //
//     callAppFunc_dbSet(data.gameid,params)
//     //开始下载
//     callAppFunc_startDown(data.gameid);
//     //调用方法 定时刷新返回状态
//     timers=setInterval(function () {
//         callAppFunc_dbGet(data.gameid,function (res) {
//             // console.log(res)
//             var re=JSON.parse(res);
//             console.log(re)
//             //    获取到实时进度
//             progress=re.progress;
//             //    获取下载状态
//             _appstatus=re.status;
//             console.log(_appstatus);
//             if (progress == 100){
//                 //显示按钮
//                 $xd('btn-mid').style.display='block';
//                 $xd('btn-down').style.display='block';
//                 $xd('jd').style.display='none';
//                 $xd('jd2').style.display='none';
//                 //清除定时器
//                 clearInterval(timers);
//             }
//             //    判断下载状态 根据状态来走不通的路线
//             if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
//                 $xd('btn-mid').style.display='none';
//                 $xd('btn-down').style.display='none';
//                 $xd('jd').style.display='block';
//                 $xd('jd2').style.display='block';
//                 //展示进度百分比
//                 $xd('jindu').innerHTML=progress;
//                 $xd('jindu1').innerHTML=progress;
//                 //设置进度条
//
//             }else if (_appstatus == 1){//下载完成等待安装
//                 //    安装游戏
//                 callAppFunc_installGame(data.gameid);
//             } else if ( _appstatus == 2) {//已安装 点击打开APP
//                 $xd('btn-mid').style.display='block';
//                 $xd('btn-down').style.display='block';
//                 $xd('jd').style.display='none';
//                 $xd('jd2').style.display='none';
//                 //        打开app
//                 callAppFunc_openGame(data.gameid)
//             }else if ( _appstatus == 4){//已暂停 点击重新开始下载
//                 console.log("已暂停");
//                 //
//                 callAppFunc_startDown(data.gameid)
//             }else if ( _appstatus  == 5){//安装中
//                 console.log("安装中")
//             }else if ( _appstatus == 9) {//已卸载
//                 console.log("已卸载")
//             }else if (_appstatus == 3){//下载失败
//                 alert("下载失败");
//                 callAppFunc_dbDelete(data.gameid);
//                 clearInterval(timers)    ;
// ;            }
//         })
//     },1000)
//     if (open){
//         params=JSON.stringify(params);
//         callAppFunc_dbSet(data.gameid,params)
//         //开始下载
//         callAppFunc_startDown(data.gameid);
//         //调用方法 定时刷新返回状态
//         timerss=setInterval(function () {
//             callAppFunc_dbGet(data.gameid,function (res) {
//                 // console.log(res)
//                 var re=JSON.parse(res);
//                 console.log(re)
//                 //    获取到实时进度
//                 progress=re.progress;
//                 //    获取下载状态
//                 _appstatus=re.status;
//                 alert(_appstatus)
//                 console.log(_appstatus);
//                 if (progress == 100){
//                     //显示按钮
//                     $xd('btn-mid').style.display='block';
//                     $xd('btn-down').style.display='block';
//                     $xd('jd').style.display='none';
//                     $xd('jd2').style.display='none';
//                     //清除定时器
//                     clearInterval(timerss);
//                 }
//                 //    判断下载状态 根据状态来走不通的路线
//                 if ( _appstatus == 0){//下载中  隐藏下载按钮  显示进度条
//                     $xd('btn-mid').style.display='none';
//                     $xd('btn-down').style.display='none';
//                     $xd('jd').style.display='block';
//                     $xd('jd2').style.display='block';
//                     //展示进度百分比
//                     $xd('jindu').innerHTML=progress;
//                     $xd('jindu1').innerHTML=progress;
//                 }else if (_appstatus == 1){//下载完成等待安装
//                     //    安装游戏
//                     callAppFunc_installGame(data.gameid);
//                     localStorage.setItem('downing',1);
//                     open=true;
//                 } else if ( _appstatus == 2) {//已安装 点击打开APP
//                     $xd('btn-mid').style.display='block';
//                     $xd('btn-down').style.display='block';
//                     $xd('jd').style.display='none';
//                     $xd('jd2').style.display='none';
//
//                     //    判断是否卸载
//                     callAppFunc_isInstall(data.gameid,function (res) {
//                         //    判断是否卸载 fasle
//                         if (res.indexOf('false')) {//已卸载了 需要重新安装
//                             AgeStateDown();
//                             open=true;
//                             //        清除定时器
//                             clearInterval(timerss);
//                         }else{ //没有卸载 那么就直接打开
//                             //    打开app
//                             callAppFunc_openGame(data.gameid);
//                             localStorage.setItem('downing',2);
//                             open=true;
//                         }
//                     })
//                 }else if ( _appstatus == 4){//已暂停 点击重新开始下载
//                     console.log("已暂停");
//                     //
//                     AgeStateDown();
//                     open=true;
//                     clearInterval(timerss);
//                     localStorage.setItem('downing',4);
//                 }else if ( _appstatus  == 5){//安装中
//                     console.log("安装中")
//                 }else if ( _appstatus == 9) {//已卸载
//                     console.log("已卸载")
//                     AgeStateDown();
//                     localStorage.setItem('downing',9);
//                     open=true;
//                     clearInterval(timerss)
//                 }else if ( _appstatus ==3 ){//下载失败
//                     AgeStateDown();
//                     open=true;
//                     localStorage.setItem('downing',3);
//                     clearInterval(timerss)
//                 }
//             })
//         },1000)
//
//     } else {
//         //    读取本地缓存
//         var as=localStorage.getItem('downing');
//         alert(as+'as');
//         switch (as) {
//             case 2:
//                 $xd('btn-mid').style.display='block';
//                 $xd('btn-down').style.display='block';
//                 $xd('jd').style.display='none';
//                 $xd('jd2').style.display='none';
//                 //    判断是否卸载
//                 callAppFunc_isInstall(data.gameid,function (res) {
//                     //    判断是否卸载 fasle
//                     if (res.indexOf('false')) {//已卸载了 需要重新安装
//                         AgeStateDown();
//                         //        清除定时器
//                         clearInterval(timerss)
//                     }else{ //没有卸载 那么就直接打开
//                         //    打开app
//                         callAppFunc_openGame(data.gameid);
//                     }
//                 })
//                 break;
//             case 4:
//                 AgeStateDown();
//                 localStorage.setItem('downing',4)
//                 break;
//             case 1:
//                 callAppFunc_installGame(game_id);
//                 localStorage.setItem('downing',1)
//                 break;
//             default:
//                 alert("其他情况");
//
//         }
//     }
}
//查询状态
function old(){
    callAppFunc_dbGet(game_id,function (res) {

        var xx=(res == "null" || res == null || res == undefined || res == "")
        alert(xx)
        // var model = JSON.parse(res);
        // console.warn(model)
        // alert(model.size)
        // console.log(res)
        // console.warn(JSON.parse(res).size);
        // var xxxxx=JSON.parse(res)
        // alert(xxxxx.status)
        if (!xx){ //存在的
            open=true;
            //
            var model = JSON.parse(res);
            console.warn(model)
            //取出当前的状态 并且存入本地
            localStorage.setItem('downing',JSON.parse(res).status);
            alert(model)
            alert(JSON.parse(res).status);
            //然后根据状态进行条件判断
            var _x=JSON.parse(res).status;
            if ( _x == 1 ){//下载完成没有安装
            //    安装游戏
                callAppFunc_installGame(game_id)
            } else if ( _x == 2){ //已经安装了游戏 打开APP
            //    调用方法 查看是否卸载掉 如果卸载掉了 那么就需要重新下载
                callAppFunc_isInstall(game_id,function (res) {
                    var t=res.indexOf('false');
                    if (t){//卸载掉了 重新下载
                        callAppFunc_dbDelete(game_id);
                        callAppFunc_dbSet(game_id, JSON.parse(params));
                        callAppFunc_startDown(game_id);
                    } else {//没有卸载掉 打开APP
                        callAppFunc_openGame(game_id);
                    }
                })} else if ( _x == 3) {
               alert("下载失败")
            }else if ( _x == 4){
                callAppFunc_startDown(game_id);
            }
            // } else if ( _x == 4){//暂停状态 需要重新下载
            //     AgeStateDown()
            // } else if ( _x == 9) {//已经卸载掉 需要重新下载
            //     AgeStateDown()
            // } else if ( _x == 3) { //下载失败
            //     alert("下载失败")
            // }
            // timerxd=setInterval(function () {
            //     callAppFunc_dbGet(game_id,function (ress) {
            //         var re=JSON.parse(ress);
            //         console.log(re)
            //         //    获取到实时进度
            //         var _progress=re.progress;
            //         //    获取下载状态
            //         var __appstatus=re.status;
            //         //存入本地缓存
            //         localStorage.setItem('downing',__appstatus);
            //         alert(__appstatus+'123')
            //         console.log(__appstatus);
            //         if (_progress == 100){
            //             //显示按钮
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //清除定时器
            //             clearInterval(timerxd);
            //         }
            //         //    判断下载状态 根据状态来走不通的路线
            //         if ( __appstatus == 0){//下载中  隐藏下载按钮  显示进度条
            //             $xd('btn-mid').style.display='none';
            //             $xd('btn-down').style.display='none';
            //             $xd('jd').style.display='block';
            //             $xd('jd2').style.display='block';
            //             //展示进度百分比
            //             $xd('jindu').innerHTML=progress;
            //             $xd('jindu1').innerHTML=progress;
            //         }else if (__appstatus == 1){//下载完成等待安装
            //             //    安装游戏
            //             callAppFunc_installGame(data.gameid);
            //             open=true;
            //             localStorage.setItem('downing',1);
            //         } else if ( __appstatus == 2) {//已安装 点击打开APP
            //             $xd('btn-mid').style.display='block';
            //             $xd('btn-down').style.display='block';
            //             $xd('jd').style.display='none';
            //             $xd('jd2').style.display='none';
            //             //    判断是否卸载
            //             callAppFunc_isInstall(data.gameid,function (res) {
            //                 //    判断是否卸载 fasle
            //                 if (res.indexOf('false')) {//已卸载了 需要重新安装
            //                     AgeStateDown();
            //                     //        清除定时器
            //                     clearInterval(timerxd)
            //                 }else{ //没有卸载 那么就直接打开
            //                     //    打开app
            //                     callAppFunc_openGame(data.gameid);
            //                 }
            //             })
            //         }else if ( __appstatus == 4){//已暂停 点击重新开始下载
            //             console.log("已暂停");
            //             //
            //             AgeStateDown();
            //
            //             clearInterval(timerxd)
            //         }else if ( __appstatus  == 5){//安装中
            //             console.log("安装中")
            //         }else if ( __appstatus == 9) {//已卸载
            //             console.log("已卸载")
            //             AgeStateDown();
            //             clearInterval(timerxd)
            //         }else if ( __appstatus ==3 ){//下载失败
            //             AgeStateDown();
            //             clearInterval(timerxd)
            //         }
            //     })
            // },1000)
        } else {//不存在 只有第一次进入页面才能进入点击按钮下载 否则其他的都是走对应的事件
            // alert('没有下载过')
            open=false;
        }
    })
}
window.onload=function(){
    document.addEventListener("DOMContentLoaded", function() {
        var _h = document.body.scrollHeight;
        //让body占满整个屏幕
        document.getElementsByTagName("body")[0].setAttribute("style","min-height:"+ _h+'px');
    }, false);
    getInfo();

    // callAppFunc_dbGet(6024,function (res) {
    //     console.warn(res)
    //     console.log(typeof res);
    // })

}