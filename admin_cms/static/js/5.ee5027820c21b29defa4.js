webpackJsonp([5],{SzBC:function(e,t){},d0QE:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=o("RAp7"),n=o("/tHx"),a={name:"PlayInfo",components:{TableToolsBox:o("/6my").a},mixins:[l.a,n.a],props:{},data:function(){return{user_id:0,showPopover:{aiScenes:!1,gold:!1,diamond:!1,trophy:!1,trophyCoefficient:!1,luckyValue:!1},popoverInput:{aiScenes:"",gold:"",diamond:"",trophy:"",trophyCoefficient:"",luckyValue:""},lockLuckValue:!1,putGold:"",userInfo:{user_id:0,player_name:"",player_portrait:"",player_sex:"",player_sign:"",goldcoin:0,diamond:0,wincup:"",play_times:0,win_times:0,tel:null,reg_time:"",openid:"",is_ai:0,all_charge:"",login_time:"",is_ban:"",lotteryCupTimes:0,lotteryCupSum:0,loginDayTotal:0,winRate:0,convertToDiamondCupSum:0,convertToGoldCupSum:0,winGoldSum:0,lostGoldSum:0,winDiamondSum:0,lostDiamondSum:0,goldBalance:0,diamondBalance:0,totalBalance:0,lottery_buff:null,lucky_lock:0,lucky_value:0},form:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""}}},watch:{},computed:{player_type:function(){return 0===this.userInfo.is_ai?"用户":"AI"}},methods:{getUserInfo:function(){var e=this;this.globalMixin_request("/player/read","get",{user_id:this.user_id}).then(function(t){var o=t.code,l=t.data;t.message;1e4===o&&(e.userInfo=l[0],e.popoverInput.trophyCoefficient=e.userInfo.lottery_buff,e.popoverInput.luckyValue=e.userInfo.lucky_value,1===e.userInfo.lucky_lock?e.lockLuckValue=!0:e.lockLuckValue=!1,e.popoverInput.aiScenes=e.userInfo.is_ai.toString())})},refreshCache:function(){var e=this;this.globalMixin_request("/player_refresh?user_id="+this.user_id).then(function(t){var o=t.code;t.data,t.message;1e4===o&&e.ele_notify("更新缓存成功","success")})},putDataFn:function(e){var t=this;this.showPopover[e]=!1;var o=this.popoverInput[e];if("deblock"===e||"block"===e){var l="";"deblock"===e?l="确定解封该用户吗？":"block"===e&&(l="确定封禁该用户吗？"),this.$confirm(l,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.globalMixin_request("/player/update","put",{id:t.user_id,operation_type:e,value:o}).then(function(o){t.$message({type:"success",message:o.message}),t.popoverInput[e]="",t.getUserInfo()})}).catch(function(){t.$message({type:"info",message:"已取消"})})}else this.globalMixin_request("/player/update","put",{id:this.user_id,operation_type:e,lockLuckValue:this.lockLuckValue?1:0,value:o}).then(function(e){var o=e.code,l=(e.data,e.message);1e4===o&&(t.ele_notify(l,"success"),t.refreshCache()),t.getUserInfo()})}},created:function(){var e=this;this.user_id=this.$route.query.user_id||0,this.user_id?this.user_id&&this.getUserInfo():this.$alert("参数有误","错误",{confirmButtonText:"确定",callback:function(t){e.globalMixin_goBack()}})},mounted:function(){}},s={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{directives:[{name:"show",rawName:"v-show",value:e.pageMixin_showPage,expression:"pageMixin_showPage"}],staticClass:"page_wrapper"},[o("div",{staticClass:"main_body animated  fadeIn"},[o("el-row",{staticClass:"head_area  panel_area"},[o("el-col",{attrs:{span:18}},[o("span",{staticClass:"title"},[e._v(e._s(e.player_type)+"信息")]),e._v(" "),o("span",{staticClass:"description"},[e._v("游戏"+e._s(e.player_type)+"信息")])]),e._v(" "),o("el-col",{attrs:{span:6}},[o("el-button",{attrs:{icon:"el-icon-refresh",size:"mini",type:"primary"},on:{click:e.getUserInfo}},[e._v("刷新")]),e._v(" "),o("el-button",{attrs:{icon:"el-icon-s-opportunity",size:"mini",type:"primary"},on:{click:e.refreshCache}},[e._v("更新服务器缓存\n        ")])],1)],1),e._v(" "),o("el-row",{staticClass:"panel_area",attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-form",{ref:"form",attrs:{model:e.userInfo,"label-width":"180px"}},[o("el-form-item",{attrs:{label:e.player_type+"ID"}},[e._v("\n            "+e._s(e.userInfo.user_id)+" "),o("span",{class:{"font-color-red":"封号状态"===e.userInfo.is_ban,"font-color-green":"未封号"===e.userInfo.is_ban}},[e._v("("+e._s(e.userInfo.is_ban)+")")])]),e._v(" "),o("el-form-item",{attrs:{label:e.player_type+"昵称"}},[e._v("\n            "+e._s(e.userInfo.player_name)+" ")]),e._v(" "),o("el-form-item",{attrs:{label:"绑定手机"}},[e._v("\n            "+e._s(e.userInfo.tel)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"登录微信"}},[e._v("\n            "+e._s(e.userInfo.openid)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"性别"}},[e._v("\n            "+e._s(e.userInfo.player_sex)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"Vip等级"}},[e._v("\n            "+e._s(e.userInfo.vip_lv)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"个性签名"}},[e._v("\n            "+e._s(e.userInfo.player_sign)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"注册时间"}},[e._v("\n            "+e._s(e.userInfo.reg_time)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"最近一次登录时间"}},[e._v("\n            "+e._s(e.userInfo.login_time)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"登录天数"}},[e._v("\n            "+e._s(e.userInfo.loginDayTotal)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"金币余额"}},[e._v("\n            "+e._s(e.userInfo.goldcoin)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"钻石余额"}},[e._v("\n            "+e._s(e.userInfo.diamond)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"奖杯余额"}},[e._v("\n            "+e._s(e.userInfo.wincup)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"抽奖杯次数"}},[e._v("\n            "+e._s(e.userInfo.lotteryCupTimes)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"抽奖获得的奖杯总额"}},[e._v("\n            "+e._s(e.userInfo.all_lottery)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"胜率"}},[e._v("\n            "+e._s(e.userInfo.winRate)+"\n\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"充值总额"}},[e._v("\n            "+e._s(e.userInfo.all_charge)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"兑换金豆花费奖杯总额"}},[e._v("\n            "+e._s(e.userInfo.convertToGoldCupSum)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"兑换钻石花费奖杯总额"}},[e._v("\n            "+e._s(e.userInfo.convertToDiamondCupSum)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"赢得金币"}},[e._v("\n            "+e._s(e.userInfo.winGoldSum)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"赢得钻石"}},[e._v("\n            "+e._s(e.userInfo.winDiamondSum)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"输掉金币"}},[e._v("\n            "+e._s(e.userInfo.lostGoldSum)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"输掉钻石"}},[e._v("\n            "+e._s(e.userInfo.lostDiamondSum)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"金币Balance"}},[e._v("\n            "+e._s(e.userInfo.goldBalance)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"钻石Balance"}},[e._v("\n            "+e._s(e.userInfo.diamondBalance)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"总Balance"}},[e._v("\n            "+e._s(e.userInfo.totalBalance)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"幸运值"}},[e._v("\n            "+e._s(e.userInfo.lucky_value)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"锁定幸运值"}},[1===e.userInfo.lucky_lock?o("p",[e._v("已锁定")]):o("p",[e._v("未锁定")])]),e._v(" "),o("el-form-item",{attrs:{label:"奖杯加成系数"}},[e._v("\n            "+e._s(e.userInfo.lottery_buff)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"开启奖杯宝箱消耗钻石总和"}},[e._v("\n            "+e._s(e.userInfo.sum_cost)+"\n          ")]),e._v(" "),o("el-form-item",{attrs:{label:"开启奖杯宝箱获得奖杯总和"}},[e._v("\n            "+e._s(e.userInfo.sum_win)+"\n          ")])],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-card",{staticClass:"options"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("span",[e._v("操作")])]),e._v(" "),o("div",{staticClass:"options_wrapper"},[o("el-button",{staticClass:"options_item",attrs:{plain:"",size:"small",type:"primary"},on:{click:e.globalMixin_goBack}},[o("i",{staticClass:"el-icon-back"})]),e._v(" "),o("el-button",{staticClass:"options_item",attrs:{plain:"",size:"small",type:"primary"},on:{click:e.getUserInfo}},[o("i",{staticClass:"el-icon-refresh"})]),e._v(" "),0!=e.userInfo.is_ai?o("el-popover",{staticClass:"options_item",attrs:{placement:"top",trigger:"click",width:"150"},model:{value:e.showPopover.aiScenes,callback:function(t){e.$set(e.showPopover,"aiScenes","string"==typeof t?t.trim():t)},expression:"showPopover.aiScenes"}},[o("el-select",{staticStyle:{"margin-bottom":"15px"},attrs:{placeholder:"请选择AI场次"},model:{value:e.popoverInput.aiScenes,callback:function(t){e.$set(e.popoverInput,"aiScenes",t)},expression:"popoverInput.aiScenes"}},[o("el-option",{attrs:{label:"封禁AI",value:"100"}}),e._v(" "),o("el-option",{attrs:{label:"金币初级场",value:"1"}}),e._v(" "),o("el-option",{attrs:{label:"金币中级场",value:"2"}}),e._v(" "),o("el-option",{attrs:{label:"金币高级场",value:"3"}}),e._v(" "),o("el-option",{attrs:{label:"钻石初级场",value:"11"}}),e._v(" "),o("el-option",{attrs:{label:"钻石中级场",value:"12"}}),e._v(" "),o("el-option",{attrs:{label:"钻石高级场",value:"13"}})],1),e._v(" "),o("el-button",{nativeOn:{click:function(t){return e.putDataFn("aiScenes")}}},[e._v("确定")]),e._v(" "),o("el-button",{attrs:{slot:"reference",size:"small"},slot:"reference"},[e._v("修改AI场景")])],1):e._e(),e._v(" "),o("el-button",{attrs:{plain:"",size:"small",type:"primary"},on:{click:function(t){return e.globalMixin_jump("RoomHistoryList",{user_id:e.userInfo.user_id})}}},[e._v("查看该"+e._s(e.player_type)+"游戏记录\n            ")]),e._v(" "),0==e.userInfo.is_ai?["封号状态"===e.userInfo.is_ban?o("el-button",{staticClass:"options_item",attrs:{size:"small",type:"success"},on:{click:function(t){return e.putDataFn("deblock")}}},[e._v("解封"+e._s(e.player_type)+"\n              ")]):o("el-button",{staticClass:"options_item",attrs:{size:"small",type:"danger"},on:{click:function(t){return e.putDataFn("block")}}},[e._v("\n                封禁"+e._s(e.player_type)+"\n              ")])]:e._e(),e._v(" "),o("el-popover",{staticClass:"options_item",attrs:{placement:"top",trigger:"click",width:"150"},model:{value:e.showPopover.gold,callback:function(t){e.$set(e.showPopover,"gold","string"==typeof t?t.trim():t)},expression:"showPopover.gold"}},[o("el-input",{staticStyle:{"margin-bottom":"15px"},attrs:{clearable:"",placeholder:"请输入金币数量"},model:{value:e.popoverInput.gold,callback:function(t){e.$set(e.popoverInput,"gold","string"==typeof t?t.trim():t)},expression:"popoverInput.gold"}}),e._v(" "),o("el-button",{nativeOn:{click:function(t){return e.putDataFn("gold")}}},[e._v("确定")]),e._v(" "),o("el-button",{attrs:{slot:"reference",size:"small"},slot:"reference"},[e._v("发放金币")])],1),e._v(" "),o("el-popover",{staticClass:"options_item",attrs:{placement:"top",trigger:"click",width:"150"},model:{value:e.showPopover.diamond,callback:function(t){e.$set(e.showPopover,"diamond","string"==typeof t?t.trim():t)},expression:"showPopover.diamond"}},[o("el-input",{staticStyle:{"margin-bottom":"15px"},attrs:{clearable:"",placeholder:"请输入钻石数量"},model:{value:e.popoverInput.diamond,callback:function(t){e.$set(e.popoverInput,"diamond","string"==typeof t?t.trim():t)},expression:"popoverInput.diamond"}}),e._v(" "),o("el-button",{nativeOn:{click:function(t){return e.putDataFn("diamond")}}},[e._v("确定")]),e._v(" "),o("el-button",{attrs:{slot:"reference",size:"small"},slot:"reference"},[e._v("发放钻石")])],1),e._v(" "),o("el-popover",{staticClass:"options_item",attrs:{placement:"top",trigger:"click",width:"150"},model:{value:e.showPopover.trophy,callback:function(t){e.$set(e.showPopover,"trophy","string"==typeof t?t.trim():t)},expression:"showPopover.trophy"}},[o("el-input",{staticStyle:{"margin-bottom":"15px"},attrs:{clearable:"",placeholder:"请输入奖杯数量"},model:{value:e.popoverInput.trophy,callback:function(t){e.$set(e.popoverInput,"trophy","string"==typeof t?t.trim():t)},expression:"popoverInput.trophy"}}),e._v(" "),o("el-button",{nativeOn:{click:function(t){return e.putDataFn("trophy")}}},[e._v("确定")]),e._v(" "),o("el-button",{attrs:{slot:"reference",size:"small"},slot:"reference"},[e._v("发放奖杯")])],1),e._v(" "),o("el-popover",{staticClass:"options_item",attrs:{placement:"top",trigger:"click",width:"150"},model:{value:e.showPopover.trophyCoefficient,callback:function(t){e.$set(e.showPopover,"trophyCoefficient","string"==typeof t?t.trim():t)},expression:"showPopover.trophyCoefficient"}},[o("el-input",{staticStyle:{"margin-bottom":"15px"},attrs:{clearable:"",placeholder:"范围:0.01-100"},model:{value:e.popoverInput.trophyCoefficient,callback:function(t){e.$set(e.popoverInput,"trophyCoefficient","string"==typeof t?t.trim():t)},expression:"popoverInput.trophyCoefficient"}}),e._v(" "),o("el-button",{nativeOn:{click:function(t){return e.putDataFn("trophyCoefficient")}}},[e._v("确定")]),e._v(" "),o("el-button",{attrs:{slot:"reference",size:"small"},slot:"reference"},[e._v("修改奖杯加成系数")])],1),e._v(" "),o("el-popover",{staticClass:"options_item",attrs:{placement:"top",trigger:"click",width:"150"},model:{value:e.showPopover.luckyValue,callback:function(t){e.$set(e.showPopover,"luckyValue","string"==typeof t?t.trim():t)},expression:"showPopover.luckyValue"}},[o("el-input",{staticStyle:{"margin-bottom":"15px"},attrs:{clearable:"",placeholder:"范围:0-10"},model:{value:e.popoverInput.luckyValue,callback:function(t){e.$set(e.popoverInput,"luckyValue","string"==typeof t?t.trim():t)},expression:"popoverInput.luckyValue"}}),e._v(" "),o("el-switch",{staticStyle:{"margin-bottom":"5px"},attrs:{"active-text":"锁定","inactive-text":"未锁定"},model:{value:e.lockLuckValue,callback:function(t){e.lockLuckValue=t},expression:"lockLuckValue"}}),e._v(" "),o("el-button",{nativeOn:{click:function(t){return e.putDataFn("luckyValue")}}},[e._v("确定")]),e._v(" "),o("el-button",{attrs:{slot:"reference",size:"small"},slot:"reference"},[e._v("修改"+e._s(e.player_type)+"幸运值"),e.lockLuckValue?o("i",{staticClass:"el-icon-lock font-color-red"}):o("i",{staticClass:"el-icon-unlock font-color-green"})])],1)],2)])],1)],1)],1)])},staticRenderFns:[]};var r=o("VU/8")(a,s,!1,function(e){o("SzBC")},"data-v-7feb10b5",null);t.default=r.exports}});
//# sourceMappingURL=5.ee5027820c21b29defa4.js.map