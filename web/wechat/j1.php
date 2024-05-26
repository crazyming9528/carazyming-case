<?php





//var_dump(base64_encode("http://www.baidu.com"));

//var_dump(base64_decode(base64_encode("http://www.baidu.com")));

header("Cache-Control: no-store, no-cache");

if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false) {

    if (!isIos()) {

        header("Content-type:application/pdf");

        header("Content-Disposition:attachment;filename=/aa.a");

    }

} else {

    if (isset($_GET['url'])) {

        header('location:' . $_GET['url']);

    } else {

        die('url 参数错误');

    };



}





function isIos()

{

    $agent = strtolower($_SERVER['HTTP_USER_AGENT']);

    $is_iphone = (strpos($agent, 'iphone')) ? true : false;

    $is_ipad = (strpos($agent, 'ipad')) ? true : false;

    $is_pc = (strpos($agent, 'windows nt')) ? true : false;

    $is_android = (strpos($agent, 'android')) ? true : false;

    return $is_iphone || $is_ipad ? true : false;

}