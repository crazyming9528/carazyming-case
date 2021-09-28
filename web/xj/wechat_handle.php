<?php


header("Cache-Control: no-store, no-cache");


$type = $_GET['type'];
$url = $_GET['url'];
$shade = false;


if (!$type && !$url) {
    die('url 参数错误');
}


switch ($type) {
    case '1':
        if (isWechat()) {
            $shade = true;
        } else {
            justJump();
        }
        break;
    case '2':
        if (isWechat() && !isIos()) {
            jumpOutWechat();
        } else {
            justJump();
        }
        break;
    case '3':
        justJump();
        break;
    default:
        die("type 错误");
}


function jumpOutWechat()
{


    header("Content-type:application/pdf");

    header("Content-Disposition:attachment;filename=/aa.a");


}


function justJump()
{
    header('location:' . $_GET['url']);

}


function isWechat()
{
    return strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false;

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


?>
<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>wechat</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .share img {
            width: 100vw;
        }
    </style>
</head>
<body>

<div class="share">
    <?php
    if ($shade):
        ?>
        <img src="share.png" alt="">
    <?php
    endif;
    ?>
</div>


</body>
</html>
