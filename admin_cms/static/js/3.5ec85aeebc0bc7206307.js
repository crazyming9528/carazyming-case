webpackJsonp([3],{HZYY:function(e,a){},ZBzq:function(e,a){},oRJT:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("RAp7"),s=t("/tHx"),l=t("/6my"),n=t("PJh5"),i=t.n(n),o={name:"DailyStatistical",components:{TableToolsBox:l.a},mixins:[r.a,s.a],props:{},data:function(){return{tableData:[],tableExpandArr:[],tableSort:{sortBy:"",sort:"desc"},searchParameterSource:{status:[],searchBy:[]},searchParameterRes:{status:"",searchBy:"",searchValue:"",dateRange:""},addition:{currentMoney:0,allStatusMoney:[],allMoney:0}}},watch:{},computed:{},methods:{tableRowClickFn:function(e,a,t){-1===this.tableExpandArr.indexOf(e.id)?(this.tableExpandArr=[],this.tableExpandArr.push(e.id)):this.tableExpandArr=[]},tableSortFn:function(e){this.tableSort.sortBy=e.prop,"ascending"===e.order?this.tableSort.sort="asc":this.tableSort.sort="desc",this.getTableDataSource()},getSearchParameters:function(){var e=this;this.globalMixin_request("/_search_parameters","get").then(function(a){var t=a.code,r=a.data;a.message;1e4===t&&(e.searchParameterSource.status=r.status||[],e.searchParameterSource.searchBy=r.searchBy||[],e.searchParameterRes.searchBy=e.searchParameterSource.searchBy[0].value)})},getTableDataSource:function(){var e=this;this.globalMixin_request("/ds_index","get",{startTime:this.searchParameterRes.dateRange[0],endTime:this.searchParameterRes.dateRange[1],sortBy:this.tableSort.sortBy,sort:this.tableSort.sort,currentPage:this.tableMixin_currentPage,pageSize:this.tableMixin_pageSize}).then(function(a){var t=a.code,r=a.data,s=(a.message,a.addition);1e4===t&&(e.tableData=r.data,e.tableMixin_total=r.total,e.addition=s,e.tableData.forEach(function(e){e.date=i()(e.date).format("YYYY-MM-DD")}))})},clearSearchParameterRes:function(){for(var e in this.searchParameterRes)this.searchParameterRes.hasOwnProperty(e)&&(this.searchParameterRes[e]="")},refresh:function(){this.resetPage(),this.clearSearchParameterRes(),this.getTableDataSource()},searchFn:function(){this.resetPage(),this.getTableDataSource()},resetPage:function(){this.tableMixin_currentPage=1,this.tableExpandArr=[]}},created:function(){this.getTableDataSource()},mounted:function(){}},c={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.pageMixin_showPage,expression:"pageMixin_showPage"}],staticClass:"page_wrapper"},[t("el-row",{staticClass:"panel_area"},[t("el-col",{attrs:{span:24}},[t("TableToolsBox",{attrs:{"show-add":!1,"show-chart":!1,"show-down-load":!1},on:{refresh:e.refresh,search:e.searchFn}},[t("template",{slot:"search"},[t("el-date-picker",{staticClass:"search_param",staticStyle:{width:"250px"},attrs:{align:"right","end-placeholder":"结束日期","range-separator":"-","start-placeholder":"开始日期",type:"daterange","unlink-panels":"","value-format":"timestamp"},model:{value:e.searchParameterRes.dateRange,callback:function(a){e.$set(e.searchParameterRes,"dateRange",a)},expression:"searchParameterRes.dateRange"}})],1)],2)],1)],1),e._v(" "),t("el-row",{staticClass:"panel_area",attrs:{gutter:20}},[t("el-col",{attrs:{span:24}},[t("el-card",{staticClass:"box-card padding_none"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"expand-row-keys":e.tableExpandArr,"row-style":{cursor:"pointer"},border:"","row-key":"id",stripe:""},on:{"row-click":e.tableRowClickFn,"sort-change":e.tableSortFn}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-form",{staticClass:"table-expand",attrs:{"label-position":"left"}},[t("el-form-item",{attrs:{label:"ID"}},[t("span",[e._v(e._s(a.row.id))])]),e._v(" "),t("el-form-item",{attrs:{label:"日期"}},[t("span",[e._v(e._s(a.row.date))])]),e._v(" "),t("el-form-item",{attrs:{label:"新增用户"}},[t("span",[e._v(e._s(a.row.new_user))])]),e._v(" "),t("el-form-item",{attrs:{label:"有效注册"}},[t("span",[e._v(e._s(a.row.effective_reg))])]),e._v(" "),t("el-form-item",{attrs:{label:"登录用户"}},[t("span",[e._v(e._s(a.row.login_user))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值人数"}},[t("span",[e._v(e._s(a.row.charge_user))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值次数"}},[t("span",[e._v(e._s(a.row.charge_times))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值总额"}},[t("span",[e._v(e._s(a.row.charge_count))])])],1)]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"#",type:"index",width:"50"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"日期",prop:"date",sortable:"custom",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"新增用户",prop:"new_user"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"登录用户",prop:"login_user"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值人数",prop:"charge_user"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值次数",prop:"charge_times"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值总额",prop:"charge_count"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"统计执行时间",prop:"create_time",width:"180"}})],1)],1)],1)],1),e._v(" "),t("el-row",{staticClass:"panel_area"},[t("el-pagination",{attrs:{"current-page":e.tableMixin_currentPage,"page-size":e.tableMixin_pageSize,"page-sizes":e.tableMixin_pageSizeArr,total:e.tableMixin_total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":e.tableMixin_handleCurrentChange,"size-change":e.tableMixin_handleSizeChange}})],1)],1)},staticRenderFns:[]};var h={name:"DailyStatisticalWrap",components:{DailyStatistical:t("VU/8")(o,c,!1,function(e){t("ZBzq")},"data-v-598c8ea4",null).exports},props:{},data:function(){return{activeName:"first"}},watch:{},computed:{},methods:{handleClick:function(){}},created:function(){},mounted:function(){}},p={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"page_wrapper"},[t("div",{staticClass:"main_body animated  fadeIn"},[t("el-row",{staticClass:"head_area  panel_area"},[t("el-col",{attrs:{span:24}},[t("span",{staticClass:"title"},[e._v("每日汇总统计")]),e._v(" "),t("span",{staticClass:"description"},[e._v("每日汇总统计记录查询")])])],1),e._v(" "),t("el-row",{staticClass:"panel_area"},[t("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"综合汇总统计",name:"first"}},[t("daily-statistical")],1),e._v(" "),t("el-tab-pane",{attrs:{label:"商品销售汇总",name:"second"}},[e._v("商品销售汇总")]),e._v(" "),t("el-tab-pane",{attrs:{label:"用户登录汇总",name:"third"}},[e._v("用户登录汇总")])],1)],1)],1)])},staticRenderFns:[]};var d=t("VU/8")(h,p,!1,function(e){t("HZYY")},"data-v-6a1d400f",null);a.default=d.exports}});
//# sourceMappingURL=3.5ec85aeebc0bc7206307.js.map