webpackJsonp([5],{I56o:function(e,t){},ThwM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("RAp7"),a=(n("/tHx"),n("/6my")),s=n("vZz+"),r={name:"Permission",components:{TableToolsBox:a.a},mixins:[i.a],props:{},data:function(){return{currentMenu:{title:"",name:""},treeProps:{label:function(e,t){return e.meta.title},children:"children"},tree:null,apiPermission:[]}},watch:{},computed:{},methods:{getRoutes:function(){var e=this;Object(s.c)().then(function(t){var n=t.data,i=n.data,a=n.code;n.message;if(1e4===a){var s=i.map(function(e){return e.menu_key}),r=_.cloneDeep(e.$router.options.routes.find(function(e){return"Frame"===e.name}).children);e.tree=function e(t){return t.filter(function(t){return t.children&&(t.children=e(t.children)),s.includes(t.name)})}(r)}})},handleNodeClick:function(e){var t=this;this.currentMenu={title:e.meta.title,name:e.name},Object(s.b)(e.name).then(function(e){var n=e.data,i=n.code,a=n.data;n.message;1e4===i&&(t.apiPermission=a)})},deleteApiPermission:function(e,t){var n=this;e?Object(s.a)(e).then(function(e){var t=e.data,i=t.code;t.data,t.message;1e4===i&&Object(s.b)(n.currentMenu.name).then(function(e){var t=e.data,i=t.code,a=t.data;t.message;1e4===i&&(n.ele_alert("删除成功","success"),n.apiPermission=a)})}):this.apiPermission.splice(t,1)},addApiPermission:function(){this.apiPermission.push({key:"",route:"",menu_key:this.currentMenu.name,description:""})},saveApiPermission:function(){var e=this;this.apiPermission.every(function(e){return""!==e.key})?Object(s.d)(this.apiPermission).then(function(t){var n=t.data,i=n.code;n.data,n.message;1e4===i&&Object(s.b)(e.currentMenu.name).then(function(t){var n=t.data,i=n.code,a=n.data;n.message;1e4===i&&(e.ele_alert("保存成功","success"),e.apiPermission=a)})}):this.ele_alert("Key不能为空！","warning")},updateRouteFromFrontEnd:function(){var e=this,t=[];!function e(n){n.forEach(function(n){t.push({name:n.name,title:n.meta.title}),n.children&&e(n.children)})}(this.$router.options.routes.find(function(e){return"Frame"===e.name}).children),Object(s.e)(t).then(function(t){var n=t.data,i=(n.data,n.code);n.message;1e4===i&&(e.ele_notify("更新前端路由到服务器成功！","success"),e.getRoutes())})}},created:function(){this.getRoutes()},mounted:function(){}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page_wrapper"},[n("div",{staticClass:"main_body animated  fadeIn"},[n("el-row",{staticClass:"head_area  panel_area"},[n("el-col",{attrs:{span:24}},[n("span",{staticClass:"title"},[e._v("权限配置")]),e._v(" "),n("span",{staticClass:"description"},[e._v(e._s(this.$store.getters.systemInfo.title)+" 权限配置")])])],1),e._v(" "),n("el-row",{staticClass:"panel_area"},[n("el-col",{attrs:{span:24}})],1),e._v(" "),n("el-row",{staticClass:"panel_area",attrs:{gutter:20}},[n("el-col",{attrs:{span:8}},[n("h3",[e._v("前端路由菜单")]),e._v(" "),e.tree?n("div",[n("el-tree",{attrs:{data:e.tree,props:e.treeProps},on:{"node-click":e.handleNodeClick}}),e._v(" "),n("div",{staticStyle:{color:"gray","font-size":"14px","margin-top":"15px"}},[e._v("如果上方树形数据与前端路由表不匹配 请\n            "),n("el-button",{staticStyle:{"margin-left":"5px"},attrs:{plain:"",size:"mini",type:"warning"},nativeOn:{click:function(t){return e.updateRouteFromFrontEnd(t)}}},[e._v("同步前端路由到服务器\n            ")])],1)],1):e._e()]),e._v(" "),this.currentMenu.title?n("el-col",{attrs:{span:16}},[n("h3",[n("span",{staticClass:"currentMenu"},[e._v(e._s(this.currentMenu.title))]),e._v(" 菜单下的 API 权限 ")]),e._v(" "),n("div",{staticClass:"api_permission"},[n("ul",e._l(e.apiPermission,function(t,i){return n("li",{key:i},[e._v("\n              权限key:\n              "),n("el-input",{attrs:{placeholder:"请输入权限key",size:"mini"},model:{value:t.key,callback:function(n){e.$set(t,"key",n)},expression:"p.key"}}),e._v("\n              后端路由:\n              "),n("el-input",{attrs:{placeholder:"请输入后端路由",size:"mini"},model:{value:t.route,callback:function(n){e.$set(t,"route",n)},expression:"p.route"}}),e._v("\n              描述：\n              "),n("el-input",{attrs:{placeholder:"请输入描述",size:"mini"},model:{value:t.description,callback:function(n){e.$set(t,"description",n)},expression:"p.description"}}),e._v(" "),n("el-button",{attrs:{plain:"",size:"mini",type:"danger"},nativeOn:{click:function(n){return e.deleteApiPermission(t.ap_id,i)}}},[e._v("删除\n              ")])],1)}),0),e._v(" "),n("el-button",{directives:[{name:"show",rawName:"v-show",value:this.apiPermission.length>0,expression:"this.apiPermission.length>0"}],staticStyle:{"margin-top":"20px","margin-left":"15px"},attrs:{size:"mini",type:"primary"},nativeOn:{click:function(t){return e.saveApiPermission(t)}}},[e._v("保存\n          ")]),e._v(" "),n("el-button",{staticStyle:{"margin-top":"20px"},attrs:{size:"mini",type:"success"},nativeOn:{click:function(t){return e.addApiPermission(t)}}},[e._v("添加权限\n          ")])],1)]):e._e()],1)],1)])},staticRenderFns:[]};var c=n("VU/8")(r,o,!1,function(e){n("I56o")},"data-v-5e8a8931",null);t.default=c.exports},"vZz+":function(e,t,n){"use strict";t.c=function(){return Object(i.a)({url:"/getMenuPermission",method:"get"})},t.e=function(e){return Object(i.a)({url:"/setMenuPermission",method:"post",data:{data:e}})},t.b=function(e){return Object(i.a)({url:"/getAPIPermissionByMenu",method:"get",params:{menu:e}})},t.d=function(e){return Object(i.a)({url:"/setAPIPermissionByMenu",method:"post",data:{data:e}})},t.a=function(e){return Object(i.a)({url:"/deleteAPIPermissionByMenu",method:"delete",params:{ap_id:e}})};var i=n("vLgD")}});
//# sourceMappingURL=5.2b8d615b42677d557edb.js.map