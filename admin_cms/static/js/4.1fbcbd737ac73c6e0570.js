webpackJsonp([4],{GZxY:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e("mvHQ"),r=e.n(l),i=e("RAp7"),n=e("/tHx"),s=e("/6my"),o=e("PJh5"),c=e.n(o),p={name:"DailyStatistical",components:{TableToolsBox:s.a},mixins:[i.a,n.a],props:{},data:function(){return{dialogVisible:!1,dialogData:"",tableData:[],tableExpandArr:[],tableSort:{sortBy:"",sort:"desc"},searchParameterSource:{status:[],searchBy:[]},searchParameterRes:{status:"",searchBy:"",searchValue:"",dateRange:""},addition:{currentMoney:0,allStatusMoney:[],allMoney:0}}},watch:{},computed:{},methods:{tableRowClickFn:function(a,t,e){var l=this;this.tableData.forEach(function(t,e){if(a.id===t.id)for(var i in l.dialogData=JSON.parse(r()(t)),l.dialogData)l.dialogData.hasOwnProperty(i)&&-1!==i.indexOf("_child")&&(l.dialogData[i]=JSON.parse(l.dialogData[i]))}),this.dialogVisible=!0,console.log(this.dialogData)},tableSortFn:function(a){this.tableSort.sortBy=a.prop,"ascending"===a.order?this.tableSort.sort="asc":this.tableSort.sort="desc",this.getTableDataSource()},getSearchParameters:function(){var a=this;this.globalMixin_request("/_search_parameters","get").then(function(t){var e=t.code,l=t.data;t.message;1e4===e&&(a.searchParameterSource.status=l.status||[],a.searchParameterSource.searchBy=l.searchBy||[],a.searchParameterRes.searchBy=a.searchParameterSource.searchBy[0].value)})},getTableDataSource:function(){var a=this;this.globalMixin_request("/ts_index","get",{startTime:this.searchParameterRes.dateRange[0],endTime:this.searchParameterRes.dateRange[1],sortBy:this.tableSort.sortBy,sort:this.tableSort.sort,currentPage:this.tableMixin_currentPage,pageSize:this.tableMixin_pageSize}).then(function(t){var e=t.code,l=t.data,r=(t.message,t.addition);1e4===e&&(a.tableData=l.data,a.tableMixin_total=l.total,a.addition=r,a.tableData.forEach(function(a){a.date=c()(a.date).format("YYYY-MM-DD")}))})},clearSearchParameterRes:function(){for(var a in this.searchParameterRes)this.searchParameterRes.hasOwnProperty(a)&&(this.searchParameterRes[a]="")},refresh:function(){this.resetPage(),this.clearSearchParameterRes(),this.getTableDataSource()},searchFn:function(){this.resetPage(),this.getTableDataSource()},resetPage:function(){this.tableMixin_currentPage=1,this.tableExpandArr=[]}},created:function(){this.getTableDataSource()},mounted:function(){}},d={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{directives:[{name:"show",rawName:"v-show",value:a.pageMixin_showPage,expression:"pageMixin_showPage"}],staticClass:"page_wrapper"},[e("div",{staticClass:"main_body animated  fadeIn"},[e("el-row",{staticClass:"head_area  panel_area"},[e("el-col",{attrs:{span:18}},[e("span",{staticClass:"title"},[a._v("任务汇总")]),a._v(" "),e("span",{staticClass:"description"},[a._v("任务汇总记录查询")])]),a._v(" "),e("el-col",{attrs:{span:6}},[e("el-button",{attrs:{icon:"el-icon-refresh",size:"mini",type:"primary"},on:{click:a.getTableDataSource}},[a._v("刷新")]),a._v(" "),e("el-button",{attrs:{icon:"el-icon-s-opportunity",size:"mini",type:"primary"},on:{click:a.getTaskByUserId}},[a._v("查询单个用户\n          ")])],1)],1),a._v(" "),e("el-row",{staticClass:"panel_area"},[e("el-col",{attrs:{span:24}},[e("TableToolsBox",{attrs:{"show-add":!1,"show-chart":!1,"show-down-load":!1},on:{refresh:a.refresh,search:a.searchFn}},[e("template",{slot:"search"},[e("el-date-picker",{staticClass:"search_param",staticStyle:{width:"250px"},attrs:{align:"right","end-placeholder":"结束日期","range-separator":"-","start-placeholder":"开始日期",type:"daterange","unlink-panels":"","value-format":"timestamp"},model:{value:a.searchParameterRes.dateRange,callback:function(t){a.$set(a.searchParameterRes,"dateRange",t)},expression:"searchParameterRes.dateRange"}})],1)],2)],1)],1),a._v(" "),e("el-row",{staticClass:"panel_area",attrs:{gutter:20}},[e("el-col",{attrs:{span:24}},[e("el-card",{staticClass:"box-card padding_none"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.tableData,"row-style":{cursor:"pointer"},border:"","row-key":"id",stripe:""},on:{"row-click":a.tableRowClickFn,"sort-change":a.tableSortFn}},[e("el-table-column",{attrs:{align:"center",label:"#",type:"index",width:"50"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"日期",prop:"date",sortable:"custom",width:"180"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"投放金币",prop:"goldcoin"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"投放钻石",prop:"diamond"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"投放奖杯",prop:"wincup"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"投放记牌器总时",prop:"record_time"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"登录游戏",prop:"loginGame"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"分享游戏",prop:"shareGame"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"在金币场玩",prop:"goldWin"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"在钻石场玩",prop:"diamondPlay"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"打出春天",prop:"playSpring"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"连胜",prop:"winStreak"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"统计执行时间",prop:"create_time",width:"180"}})],1)],1)],1)],1),a._v(" "),e("el-row",{staticClass:"panel_area"},[e("el-pagination",{attrs:{"current-page":a.tableMixin_currentPage,"page-size":a.tableMixin_pageSize,"page-sizes":a.tableMixin_pageSizeArr,total:a.tableMixin_total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":a.tableMixin_handleCurrentChange,"size-change":a.tableMixin_handleSizeChange}})],1),a._v(" "),e("el-dialog",{attrs:{"append-to-body":!0,"close-on-click-modal":!1,visible:a.dialogVisible,title:"查看详情",width:"30%"},on:{"update:visible":function(t){a.dialogVisible=t}}},[e("h3",{staticStyle:{"padding-left":"5px","margin-left":"5px","margin-bottom":"5px"}},[a._v("登录游戏任务")]),a._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.dialogData.loginGame_child}},[e("el-table-column",{attrs:{align:"center",label:"描述",property:"name"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"计数",property:"count"}})],1),a._v(" "),e("h3",{staticStyle:{"padding-left":"5px","margin-left":"5px","margin-top":"15px","margin-bottom":"5px"}},[a._v("分享游戏任务")]),a._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.dialogData.shareGame_child}},[e("el-table-column",{attrs:{align:"center",label:"描述",property:"name"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"计数",property:"count"}})],1),a._v(" "),e("h3",{staticStyle:{"padding-left":"5px","margin-left":"5px","margin-top":"15px","margin-bottom":"5px"}},[a._v("在金币场玩")]),a._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.dialogData.goldWin_child}},[e("el-table-column",{attrs:{align:"center",label:"描述",property:"name"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"计数",property:"count"}})],1),a._v(" "),e("h3",{staticStyle:{"padding-left":"5px","margin-left":"5px","margin-top":"15px","margin-bottom":"5px"}},[a._v("在钻石场玩")]),a._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.dialogData.diamondPlay_child}},[e("el-table-column",{attrs:{align:"center",label:"描述",property:"name"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"计数",property:"count"}})],1),a._v(" "),e("h3",{staticStyle:{"padding-left":"5px","margin-left":"5px","margin-top":"15px","margin-bottom":"5px"}},[a._v("打出春天")]),a._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.dialogData.playSpring_child}},[e("el-table-column",{attrs:{align:"center",label:"描述",property:"name"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"计数",property:"count"}})],1),a._v(" "),e("h3",{staticStyle:{"padding-left":"5px","margin-left":"5px","margin-top":"15px","margin-bottom":"5px"}},[a._v("连胜")]),a._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.dialogData.winStreak_child}},[e("el-table-column",{attrs:{align:"center",label:"描述",property:"name"}}),a._v(" "),e("el-table-column",{attrs:{align:"center",label:"计数",property:"count"}})],1),a._v(" "),e("ul"),a._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(t){a.dialogVisible=!1}}},[a._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var g=e("VU/8")(p,d,!1,function(a){e("tG6p")},"data-v-9895aa14",null);t.default=g.exports},tG6p:function(a,t){}});
//# sourceMappingURL=4.1fbcbd737ac73c6e0570.js.map