(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e184ff6"],{"05ac":function(t,e,a){t.exports=a.p+"img/l3.0eb012c6.png"},1062:function(t,e,a){"use strict";var n=a("65d2"),i=a.n(n);i.a},"2bf3":function(t,e,a){t.exports=a.p+"img/l1.d827ff3b.png"},"3bda":function(t,e,a){t.exports=a.p+"img/l6.22e33742.png"},"65d2":function(t,e,a){},"66a6":function(t,e,a){t.exports=a.p+"img/bz2.8c997603.png"},9522:function(t,e,a){t.exports=a.p+"img/l7.62917253.png"},ac80:function(t,e,a){t.exports=a.p+"img/l2.f647132d.png"},aea1:function(t,e,a){"use strict";var n=a("d748"),i=a.n(n);i.a},d748:function(t,e,a){},e1ef:function(t,e,a){t.exports=a.p+"img/l5.23bf6909.png"},e721:function(t,e,a){t.exports=a.p+"img/l4.d762d102.png"},f5bc:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"view-wrapper",style:{minHeight:t.pageMixin_browser.clientHeight}},[a("div",{staticClass:"top"},[a("div",{staticClass:"logo"}),a("div",{staticClass:"vip"},[a("img",{attrs:{src:t.pageParameter.newComerVipBackground,alt:""}})])]),a("div",{staticClass:"form"},[a("p",{staticClass:"label"},[t._v(" 仅好友邀请可得VIP会员 ")]),t.success?a("div",[a("DP_Button",{attrs:{"background-color":"#8e370f"}},[t._v("你已经领取VIP")]),a("p",{staticClass:"account"},[t._v(" 账号："+t._s(t.phone)+" ")]),a("div",{staticClass:"app"},[t._v("请到：熊猫博士识字>登陆>用户中心 查看")])],1):a("div",[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.phone,expression:"phone",modifiers:{trim:!0}}],staticClass:"phone",attrs:{maxlength:"11",type:"text",placeholder:"请输入你的手机号"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("DP_Button",{nativeOn:{click:function(e){return t.getVip(e)}}},[t._v("免费领取")])],1)]),t.success?t._e():a("div",{staticClass:"introduce"},[t._m(0),t._m(1)]),a("div",{staticClass:"download",on:{click:t.down}},[t._m(2),a("div",{staticClass:"down"})])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"part1"},[n("div",{staticClass:"title"}),n("div",{staticClass:"content"},[n("img",{attrs:{src:a("66a6"),alt:""}})])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"part2"},[n("div",{staticClass:"title"},[t._v(" 课程亮点 ")]),n("div",{staticClass:"content"},[n("img",{attrs:{src:a("2bf3"),alt:""}}),n("img",{attrs:{src:a("ac80"),alt:""}}),n("img",{attrs:{src:a("05ac"),alt:""}}),n("img",{attrs:{src:a("e721"),alt:""}}),n("img",{attrs:{src:a("e1ef"),alt:""}}),n("img",{attrs:{src:a("3bda"),alt:""}}),n("img",{attrs:{src:a("9522"),alt:""}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[t._v(" 下载“熊猫博士识字” "),a("br"),t._v(" 登录即可畅玩 ")])}],s=a("5530"),r=a("b775");function o(){return Object(r["a"])({url:"/teee",method:"get"})}var c=a("ff2d"),l=a("2f62"),u=a("fb04"),d=a("6fa2"),p=a("b4f6"),f=a("f586"),m={metaInfo:function(){return{title:this.$route.meta.title||"熊猫博士",meta:[{name:"keywords",content:this.$route.meta.title+",熊猫博士"}]}},name:"index",props:{},components:{DP_Button:c["a"]},mixins:[f["a"]],data:function(){return{phone:"",success:!1,tips:{show:!1,title:"提示",content:""}}},watch:{},computed:Object(s["a"])({},Object(l["b"])({pageParameter:"getPageParameter"})),methods:{down:function(){Object(p["a"])("buttonClick",{tabTitle:document.title,moduleTitle:"Referral",buttonType:"banner",buttonName:"立即下载"});var t=Object(d["d"])("type"),e="http://sensorsdata-2.talbrain.com:8106/r/fd";0==t?e="http://sensorsdata-2.talbrain.com:8106/r/fd":1==t&&(e="http://sensorsdata-2.talbrain.com:8106/r/Jd"),window.location.href=e},test:function(){o()},getVip:function(){var t=this;if(Object(p["a"])("buttonClick",{tabTitle:document.title,moduleTitle:"Referral",buttonType:"普通按钮",buttonName:"领取VIP"}),Object(d["a"])(this.phone)){var e=Object(d["d"])("ref-accountId");e?Object(u["e"])({refAccountId:e,phoneNumber:this.phone,bundleId:"com.drpanda.chineseacademy",tag:"referralV2.0"}).then((function(e){var a=e.data,n=a.code,i=a.data;0===n&&(t.success=!0,i.isNewUser?Object(p["a"])("signUp"):Object(p["a"])("login"))})):this.dp_Tips("提示","参数错误")}else this.dp_Tips("提示","手机号码错误")}},created:function(){},mounted:function(){}},b=m,g=(a("1062"),a("2877")),v=Object(g["a"])(b,n,i,!1,null,"5f56e9c9",null);e["default"]=v.exports},ff2d:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dp_button"},[a("button",{staticClass:"btn",class:{small:"small"===t.size,medium:"medium"===t.size,large:"large"===t.size},style:{backgroundColor:t.backgroundColor?t.backgroundColor:t.buttonType.backgroundColor,color:t.buttonType.color}},[t._t("default")],2)])},i=[],s={primary:{backgroundColor:" #fd601a",color:"white"},success:{backgroundColor:"rgb(103, 194, 58)",color:"white"},danger:{backgroundColor:"rgb(245, 108, 108)",color:"white"}},r={name:"index",data:function(){return{buttonType:s[this.type]}},props:{backgroundColor:{type:String},type:{type:String,default:"primary"},size:{default:"large",type:String}}},o=r,c=(a("aea1"),a("2877")),l=Object(c["a"])(o,n,i,!1,null,"6634ebc0",null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-0e184ff6.e7d93765.js.map