webpackJsonp([11],{Nl00:function(e,a){},knpl:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("RAp7"),s=t("/tHx"),l={name:"ChargeStatistics",components:{TableToolsBox:t("/6my").a},mixins:[r.a,s.a],props:{},data:function(){return{tableData:[],tableExpandArr:[],tableSort:{sortBy:"",sort:"desc"},searchParameterSource:{category:[],searchBy:[],status:[]},searchParameterRes:{category:"",searchBy:"",searchValue:"",dateRange:"",status:""},addition:{currentMoney:0,allStatusMoney:[],allMoney:0}}},watch:{},computed:{},methods:{tableRowClickFn:function(e,a,t){-1===this.tableExpandArr.indexOf(e.order_id)?(this.tableExpandArr=[],this.tableExpandArr.push(e.order_id)):this.tableExpandArr=[]},tableSortFn:function(e){this.tableSort.sortBy=e.prop,"ascending"===e.order?this.tableSort.sort="asc":this.tableSort.sort="desc",this.getTableDataSource()},getSearchParameters:function(){var e=this;this.globalMixin_request("/charge_statistics_search_parameters","get").then(function(a){var t=a.code,r=a.data;a.message;1e4===t&&(e.searchParameterSource.category=r.category||[],e.searchParameterSource.status=r.status||[],e.searchParameterSource.searchBy=r.searchBy||[],e.searchParameterRes.searchBy=e.searchParameterSource.searchBy[0].value)})},getTableDataSource:function(){var e=this;this.globalMixin_request("/charge_statistics","get",{searchBy:this.searchParameterRes.searchBy,category:this.searchParameterRes.category,status:this.searchParameterRes.status,searchValue:this.searchParameterRes.searchValue,startTime:this.searchParameterRes.dateRange[0],endTime:this.searchParameterRes.dateRange[1],sortBy:this.tableSort.sortBy,sort:this.tableSort.sort,currentPage:this.tableMixin_currentPage,pageSize:this.tableMixin_pageSize}).then(function(a){var t=a.code,r=a.data,s=(a.message,a.addition);1e4===t&&(e.tableData=r.data,e.tableMixin_total=r.total,e.addition=s)})},clearSearchParameterRes:function(){for(var e in this.searchParameterRes)this.searchParameterRes.hasOwnProperty(e)&&(this.searchParameterRes[e]="");this.searchParameterRes.searchBy=this.searchParameterSource.searchBy[0].value},refresh:function(){this.resetPage(),this.clearSearchParameterRes(),this.getSearchParameters(),this.getTableDataSource()},searchFn:function(){this.resetPage(),this.getTableDataSource()},downloadFn:function(){var e=this.searchParameterRes.dateRange[0],a=this.searchParameterRes.dateRange[1];e&&a?(this.ele_notify("稍等 表格开始导出"),window.location.href=window.API_server.API_ADDRESS+"/export_csv?type=charge_statistics&startTime="+e+"&endTime="+a+"&token="+encodeURIComponent(this.$store.getters.getOperatorInfo.token)):this.ele_alert("请先选择时间区间再导出","warning")},resetPage:function(){this.tableMixin_currentPage=1,this.tableExpandArr=[]}},created:function(){this.getSearchParameters(),this.getTableDataSource()},mounted:function(){}},o={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.pageMixin_showPage,expression:"pageMixin_showPage"}],staticClass:"page_wrapper"},[t("div",{staticClass:"main_body animated  fadeIn"},[t("el-row",{staticClass:"head_area  panel_area"},[t("el-col",{attrs:{span:24}},[t("span",{staticClass:"title"},[e._v("充值统计")]),e._v(" "),t("span",{staticClass:"description"},[e._v("充值记录查询")])])],1),e._v(" "),t("el-row",{staticClass:"panel_area"},[t("el-col",{attrs:{span:24}},[t("TableToolsBox",{attrs:{"show-add":!1,"show-chart":!1,"show-down-load":!0},on:{refresh:e.refresh,search:e.searchFn,download:function(a){return e.downloadFn()}}},[t("template",{slot:"search"},[t("el-select",{staticClass:"search_param",staticStyle:{width:"150px"},attrs:{placeholder:"请选择状态"},model:{value:e.searchParameterRes.status,callback:function(a){e.$set(e.searchParameterRes,"status",a)},expression:"searchParameterRes.status"}},e._l(this.searchParameterSource.status,function(e,a){return t("el-option",{key:a,attrs:{label:e.text,value:e.value}})}),1),e._v(" "),t("el-select",{staticClass:"search_param",staticStyle:{width:"150px"},attrs:{placeholder:"请选择类目"},model:{value:e.searchParameterRes.category,callback:function(a){e.$set(e.searchParameterRes,"category",a)},expression:"searchParameterRes.category"}},e._l(this.searchParameterSource.category,function(e,a){return t("el-option",{key:a,attrs:{label:e.text,value:e.value}})}),1),e._v(" "),t("el-input",{staticClass:"input-with-select search_param",staticStyle:{width:"250px"},attrs:{clearable:"",placeholder:"请输入内容"},model:{value:e.searchParameterRes.searchValue,callback:function(a){e.$set(e.searchParameterRes,"searchValue","string"==typeof a?a.trim():a)},expression:"searchParameterRes.searchValue"}},[t("el-select",{staticStyle:{width:"120px"},attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.searchParameterRes.searchBy,callback:function(a){e.$set(e.searchParameterRes,"searchBy",a)},expression:"searchParameterRes.searchBy"}},e._l(this.searchParameterSource.searchBy,function(e,a){return t("el-option",{key:a,attrs:{label:e.text,value:e.value}})}),1)],1),e._v(" "),t("el-date-picker",{staticClass:"search_param",staticStyle:{width:"250px"},attrs:{align:"right","end-placeholder":"结束日期","range-separator":"-","start-placeholder":"开始日期",type:"daterange","unlink-panels":"","value-format":"timestamp"},model:{value:e.searchParameterRes.dateRange,callback:function(a){e.$set(e.searchParameterRes,"dateRange",a)},expression:"searchParameterRes.dateRange"}})],1)],2)],1)],1),e._v(" "),t("el-row",{staticClass:"panel_area",attrs:{gutter:20}},[t("el-col",{attrs:{span:24}},[t("el-card",{staticClass:"box-card padding_none"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"expand-row-keys":e.tableExpandArr,"row-style":{cursor:"pointer"},border:"","row-key":"order_id",stripe:""},on:{"row-click":e.tableRowClickFn,"sort-change":e.tableSortFn}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-form",{staticClass:"table-expand",attrs:{"label-position":"left"}},[t("el-form-item",{attrs:{label:"ID"}},[t("span",[e._v(e._s(a.row.order_id))])]),e._v(" "),t("el-form-item",{attrs:{label:"用户ID"}},[t("el-button",{attrs:{plain:"",size:"mini",type:"primary"},on:{click:function(t){return e.globalMixin_jump("PlayerInfo",{user_id:a.row.user_id})}}},[e._v(e._s(a.row.user_id))])],1),e._v(" "),t("el-form-item",{attrs:{label:"用户昵称"}},[t("span",[e._v(e._s(a.row.player_name))])]),e._v(" "),t("el-form-item",{attrs:{label:"商品ID"}},[t("span",[e._v(e._s(a.row.goods_id))])]),e._v(" "),t("el-form-item",{attrs:{label:"商品名称"}},[t("span",[e._v(e._s(a.row.goods_tip_name))])]),e._v(" "),t("el-form-item",{attrs:{label:"商品大类"}},[t("span",[e._v(e._s(a.row.category))])]),e._v(" "),t("el-form-item",{attrs:{label:"用户昵称"}},[t("span",[e._v(e._s(a.row.player_name))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值金额"}},[t("span",[e._v(e._s(a.row.order_amount))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值状态"}},[t("span",[e._v(e._s(a.row.order_status))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值货币"}},[t("span",[e._v(e._s(a.row.money_type))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值渠道"}},[t("span",[e._v(e._s(a.row.pay_channel))])]),e._v(" "),t("el-form-item",{attrs:{label:"获得金币"}},[t("span",[e._v(e._s(a.row.gold))])]),e._v(" "),t("el-form-item",{attrs:{label:"获得钻石"}},[t("span",[e._v(e._s(a.row.diamond))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值时间"}},[t("span",[e._v(e._s(a.row.add_time))])])],1)]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"#",type:"index",width:"50"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"商品名称",prop:"goods_tip_name"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"商品大类",prop:"category",width:"100"}}),e._v(" "),t("el-table-column",{attrs:{label:"用户昵称",prop:"player_name"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值金额",prop:"order_amount",sortable:"custom"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值状态",prop:"order_status"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","column-key":"gold",label:"获得金币",prop:"gold"}}),e._v(" "),t("el-table-column",{attrs:{align:"center","column-key":"gold",label:"获得钻石",prop:"diamond"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值时间",prop:"add_time",sortable:"custom",width:"180"}})],1)],1)],1)],1),e._v(" "),t("el-row",{staticClass:"panel_area"},[t("el-pagination",{attrs:{"current-page":e.tableMixin_currentPage,"page-size":e.tableMixin_pageSize,"page-sizes":e.tableMixin_pageSizeArr,total:e.tableMixin_total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":e.tableMixin_handleCurrentChange,"size-change":e.tableMixin_handleSizeChange}})],1)],1)])},staticRenderFns:[]};var n=t("VU/8")(l,o,!1,function(e){t("Nl00")},"data-v-3e656d96",null);a.default=n.exports}});
//# sourceMappingURL=11.e16bf43d8e1268eca3a9.js.map