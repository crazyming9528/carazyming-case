/**
 * Created by yangyanxiang on 16/1/19.
 */
// window.localStorage.clear();
function testSet(k,v){
    window.localStorage.setItem(k,JSON.stringify(v));
    
}

function testGet(k,processFunc){
    processFunc(window.localStorage.getItem(k));
}

function testDelete(k){
    window.localStorage.removeItem(k);
}

//##################init WebViewJavascriptBridge############
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge);}, false
        );
    }
}

connectWebViewJavascriptBridge(function(bridge) {
    bridge.init(function(message, responseCallback) {
    })
});


/**
 * app跳转到其他方法，会调用app中注册的'appFunc_go2OtherPage'方法
 * @param {[String]} jsonString [对象转成的字符串]
 */
function callAppFunc_Jump2OtherPage(jsonString){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_go2OtherPage', jsonString);
    });
}

/**
 * 主动获取token
 * @param  {[Function]} processFunc [进程回调函数]
 */
function callAppFunc_CacheToken(processFunc){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_CacheToken', processFunc);
    });
}

/**
 * 设置导航颜色
 * @param {[String]} color_hex  [16进制颜色 #FFFFFF]
 */
function callAppFunc_changeNavColor(color_hex){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_setNavColor', color_hex);
    });
}

/**
 * 设置返回键风格 
 * @param  {[String]} style [red: 红色 white: 白色]
 */
function callAppFunc_changeNavBackBtnStyle(style){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_setNavBackBtnStyle', style);
    });
}

/**
 * 设置导航title
 * @param  {[String]} txt [导航栏文字]
 */
function callAppFunc_changeNavTitle(txt){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_UpdateNavTitle', txt);
    });
}

/**
 * 是否允许下拉刷新
 * @param  {[Boolean]} isEnable [true: 是， false: 否]
 */
function callAppFunc_isEnableRefresh(isEnable){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_canPullToReload', isEnable);
    });
}

/**
 * 设置导航文字颜色
 * @param  {[String]} color_hex [颜色的十六进制值]
 */
function callAppFunc_changeNavTitleColor(color_hex){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_setTitleFontColor', color_hex);
    });
}


/**
 * 调用app执行网络请求
 * @param  { String } url [url]      
 * @param  { String } type [POST or GET]
 * @param  { Object } params [包装的参数]
 * @param  { Function } responseProcess [进度回调函数]
 */
function callAppFunc_httpRequest(url,type,params,responseProcess){
    connectWebViewJavascriptBridge(function(bridge) {
        var sendObj = {
            url: url,
            type: type,
            params: params,
        };
        var sendJson = JSON.stringify(sendObj);
        bridge.callHandler('appFunc_httpRequest', sendJson, responseProcess);
    });
}

/**
 * app跳转到商品详情，会调用app中注册的'appFunc_Jump2GoodsDetail'方法
 * @param {[goodsID]} goodsID [商品ID]
 */
function callAppFunc_Jump2GoodsDetail(goodsID){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Jump2GoodsDetail', goodsID);
    });
}

/**
 * 是否影藏app的导航栏,会调用app中的'appFunc_IsHideNavBar'方法
 * @param {[Boolean]} isHidden [是否隐藏bool值] 
 */
function callAppFunc_IsHiddenNavagationBar(isHidden){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_IsHideNavBar', isHidden);
    });
}

/*
 * App导航栏的返回按钮点击事件，会调用app中注册的'appFunc_Back'方法
 **/
function callAppFunc_BackBtnCallback(){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Back', 'back');
    });
}

/**
* 跳转到分类, 会调用app中注册的'appFunc_Jump2Classify'
* @param {[String]} classifyID [三级分类ID]
*/
function callAppFunc_Jump2Classify(classifyID){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Jump2Classify', classifyID);
    });
}

/**
 * 跳转到商品列表, 会调用app中注册的'appFunc_Jump2GoodsList'
 * @param {[String]} goodsListID [商品列表ID]
 */
function callAppFunc_Jump2GoodsList(goodsListID){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Jump2GoodsList', goodsListID);
    });
}


/**
 * 跳转到专题，会调用app中注册的'appFunc_Jump2Special'
 * @param {[String]} specialID [专题ID]
 */
function callAppfunc_Jump2Special(specialID){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Jump2Special', specialID);
    });
}

/**
 * 跳转到登陆页面,会调用app中注册的'appFunc_Jump2Login'
 */
function callAppFunc_Jump2Login(classifyID){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Jump2Login', classifyID);
    });
}

/**
 * 传给appweb页面导航高度，会调用app中注册的'appFunc_ChangeWebNavHeight'方法
 */
function callAppFunc_ChangeWebNavHeight(navHeight){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_ChangeWebNavHeight', navHeight);
    });
}

/**
 * 隐藏键盘
 */
function callAppFunc_HiddenKeyboard(){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_HiddenKeyboard');
    });
}

/**
 * 跳转到购物车
 */
function callAppFunc_Jump2BuyCart(){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Jump2BuyCart');
    });
}

/**
 * 开始加载动画
 */
function callAppFunc_StartLoadingAnimation(){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_StartLoadingAnimation',  function(response) {
            //alert("收到App的响应:"+response);
        });
    });
}

/**
 * 结束加载动画
 */
function callAppFunc_StopLoadingAnimation(){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_StopLoadingAnimation');
    });
}

/**
 * javascript注册了方法 'jsFunc_ReceiveParam' 供app调用
 * javascript的方法，app会传入data，processJsFunc用来接收这个data去处理
 * app中传入参数data：目前只有两种(标准json格式)
 * 第一种：传入tocken,data={"type":"tocken","value":"实际的tocken"};
 * 第二种：传入id,data={"type":"id","value":"传入的groupBuyID"}；
 * 第三种: 传页面状态，data={"type":"viewStatus","value":"viewWillAppear"}；data={"type":"viewStatus","value":"viewWillDisappear"}；
 * 在app中传入jsFunc_ReceiveParam的参数必须使用以上格式。
 * @param {[Function]} processJsFunc [进度回调函数]
 */
function receiveJsFunc_processOfAppSendedParam(processJsFunc){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler('jsFunc_ReceiveParam', function(data, responseCallback) {
            //处理app传来的data
            processJsFunc(data);
            var responseData = { 'state':'sucess' }
            responseCallback(responseData)
        })
    })
}

/**
 * 调用app原生的网络请求（POST）
 * @param {[String]} data [字符串中所有参数]
 * @param {[Function]} responseFunc [执行回调函数]
 */
function callAppFunc_HttpPOST(data,responseFunc){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_HttpPOST', data, responseFunc);
    });
}

/**
 * js掉OC方法，向App要一些参数信息
 * @param {[Function]} responseFunc [回调函数（接受一个返回参数）]
 */
function callAppFunc_getSomeParams(responseFunc) {
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_getSomeParams', '', responseFunc)
    })
}

/**
 * 跳转到登陆页面,会调用app中注册的'appFunc_Jump2Act'
 * @param {[String]} num [传 '1' 代表登录]
 **/
function callAppFunc_Jump2Act(num){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_Jump2Act', num);
    });
}

/**
 * 通知App开始下载
 * @param {[String]} url 下载的地址
 */
function callAppFunc_start2Download(url) {
    console.log(url)
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_startToDownload', url);
    });
}
/**
 * 接受App传过来的下载进度
 * @param {[Function]} processJsFunc 处理下载进度
 */
function receiveJsFunc_downloadingProgress(processJsFunc) {
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.registerHandler('jsFunc_receivedCurrentSize', processJsFunc)
    })
}


/**
 * 调用原生数据库GET
 * @param  { String } key [key]
 */
function callAppFunc_dbGet(key,responseProcess){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_dbGet', key, responseProcess);
        // console.log("callAppFunc_dbGet:" + responseProcess);
    });

    // test
    // testGet(key,responseProcess);
}

/**
 * 调用原生数据库Set
 * @param  { String } key [key]
 */
function callAppFunc_dbSet(key,val){
    connectWebViewJavascriptBridge(function(bridge) {
        var sendObj = {
            'key': key,
            'value': val,
        };
        console.log(sendObj)
        var sendJson = JSON.stringify(sendObj);
        bridge.callHandler('appFunc_dbSet', sendJson);
        // console.log("appFunc_dbSet:" + sendJson);
    });
    //test
    // testSet(key,val);
}


/**
 * 调用原生数据库Delete
 * @param  { String } key [key]
 */
function callAppFunc_dbDelete(key){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_dbDelete', key);
    });

    //test
    // testDelete(key);
}

/**
 * 开始下载
 * @param {*} id 
 */
function callAppFunc_startDown(id){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_startDown', id);
        // console.log(bridge);
    });
}

/**
 * 暂停下载
 * @param {*} id 
 */
function callAppFunc_pauseDown(id){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_pauseDown', id);
    });
}

/**
 * 判断是否安装
 * @param {*} id 
 * @param {*} processFunc 
 */
function callAppFunc_isInstall(id,processFunc){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_isInstall', id, processFunc);
    });
}

/**
 * 打开游戏
 * @param {*} id 
 */
function callAppFunc_openGame(id){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_openGame', id);
    });
}

/**
 * 安装游戏
 * @param {*} id 
 */
function callAppFunc_installGame(id){
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler('appFunc_installGame', id);
    });
}




