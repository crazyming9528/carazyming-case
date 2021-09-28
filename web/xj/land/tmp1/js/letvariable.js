window.$xd=function (idStr) {
    return document.getElementById(idStr)
};
//截取字符串
$xd.queryString=function(name){
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}
$xd.gameUrl="http://m.chekchekoyuni.com:9103/mapi.php/mobile/index/getAppDetailInfo/id";
$xd.info="http://61.138.255.199:9103/api/v7/landpage";
$xd.info_cms="http://ctr.uyqart.com:5451/share_page";
// $xd.info="http://120.205.22.111:8111/api/v7/landpage";
$xd.upInfo="http://stat.koznak.tv:9092/H5GameReportLog";
// $xd.upInfo="http://120.205.22.111:9797/H5GameReportLog";
