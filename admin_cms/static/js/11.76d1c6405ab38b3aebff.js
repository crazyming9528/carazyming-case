webpackJsonp([11],{Gfjq:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("RAp7"),_=t("/tHx"),s=t("/6my"),l=t("PJh5"),o=t.n(l),i={name:"DailyStatistical",components:{TableToolsBox:s.a},mixins:[r.a,_.a],props:{},data:function(){return{tableData:[],tableExpandArr:[],tableSort:{sortBy:"",sort:"desc"},searchParameterSource:{status:[],searchBy:[]},searchParameterRes:{status:"",searchBy:"",searchValue:"",dateRange:""},addition:{currentMoney:0,allStatusMoney:[],allMoney:0}}},watch:{},computed:{},methods:{tableRowClickFn:function(e,a,t){-1===this.tableExpandArr.indexOf(e.id)?(this.tableExpandArr=[],this.tableExpandArr.push(e.id)):this.tableExpandArr=[]},tableSortFn:function(e){this.tableSort.sortBy=e.prop,"ascending"===e.order?this.tableSort.sort="asc":this.tableSort.sort="desc",this.getTableDataSource()},getSearchParameters:function(){var e=this;this.globalMixin_request("/_search_parameters","get").then(function(a){var t=a.code,r=a.data;a.message;1e4===t&&(e.searchParameterSource.status=r.status||[],e.searchParameterSource.searchBy=r.searchBy||[],e.searchParameterRes.searchBy=e.searchParameterSource.searchBy[0].value)})},getTableDataSource:function(){var e=this;this.globalMixin_request("/ds_index","get",{startTime:this.searchParameterRes.dateRange[0],endTime:this.searchParameterRes.dateRange[1],sortBy:this.tableSort.sortBy,sort:this.tableSort.sort,currentPage:this.tableMixin_currentPage,pageSize:this.tableMixin_pageSize}).then(function(a){var t=a.code,r=a.data,_=(a.message,a.addition);1e4===t&&(e.tableData=r.data,e.tableMixin_total=r.total,e.addition=_,e.tableData.forEach(function(e){e.date=o()(e.date).format("YYYY-MM-DD")}))})},clearSearchParameterRes:function(){for(var e in this.searchParameterRes)this.searchParameterRes.hasOwnProperty(e)&&(this.searchParameterRes[e]="")},refresh:function(){this.resetPage(),this.clearSearchParameterRes(),this.getTableDataSource()},searchFn:function(){this.resetPage(),this.getTableDataSource()},resetPage:function(){this.tableMixin_currentPage=1,this.tableExpandArr=[]}},created:function(){this.getTableDataSource()},mounted:function(){}},m={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.pageMixin_showPage,expression:"pageMixin_showPage"}],staticClass:"page_wrapper"},[t("el-row",{staticClass:"panel_area"},[t("el-col",{attrs:{span:24}},[t("TableToolsBox",{attrs:{"show-add":!1,"show-chart":!1,"show-down-load":!1},on:{refresh:e.refresh,search:e.searchFn}},[t("template",{slot:"search"},[t("el-date-picker",{staticClass:"search_param",staticStyle:{width:"250px"},attrs:{align:"right","end-placeholder":"结束日期","range-separator":"-","start-placeholder":"开始日期",type:"daterange","unlink-panels":"","value-format":"timestamp"},model:{value:e.searchParameterRes.dateRange,callback:function(a){e.$set(e.searchParameterRes,"dateRange",a)},expression:"searchParameterRes.dateRange"}})],1)],2)],1)],1),e._v(" "),t("el-row",{staticClass:"panel_area",attrs:{gutter:20}},[t("el-col",{attrs:{span:24}},[t("el-card",{staticClass:"box-card padding_none"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"expand-row-keys":e.tableExpandArr,"row-style":{cursor:"pointer"},border:"","row-key":"id",stripe:""},on:{"row-click":e.tableRowClickFn,"sort-change":e.tableSortFn}},[t("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-form",{staticClass:"table-expand",attrs:{"label-position":"left"}},[t("el-form-item",{attrs:{label:"ID"}},[t("span",[e._v(e._s(a.row.id))])]),e._v(" "),t("el-form-item",{attrs:{label:"日期"}},[t("span",[e._v(e._s(a.row.date))])]),e._v(" "),t("el-form-item",{attrs:{label:"新增用户"}},[t("span",[e._v(e._s(a.row.new_user))])]),e._v(" "),t("el-form-item",{attrs:{label:"有效注册"}},[t("span",[e._v(e._s(a.row.effective_reg))])]),e._v(" "),t("el-form-item",{attrs:{label:"登录用户"}},[t("span",[e._v(e._s(a.row.login_user))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值人数"}},[t("span",[e._v(e._s(a.row.charge_user))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值次数"}},[t("span",[e._v(e._s(a.row.charge_times))])]),e._v(" "),t("el-form-item",{attrs:{label:"充值总额"}},[t("span",[e._v(e._s(a.row.charge_count))])]),e._v(" "),t("el-form-item",{attrs:{label:"企业红包开支"}},[t("span",[e._v(e._s(a.row.ep_pay))])]),e._v(" "),t("el-form-item",{attrs:{label:"发放奖杯"}},[t("span",[e._v(e._s(a.row.sent_wincup))])]),e._v(" "),t("el-form-item",{attrs:{label:"投放奖杯总和"}},[t("span",[e._v(e._s(a.row.lottery_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"新手引导发放奖杯"}},[t("span",[e._v(e._s(a.row.lottery_new))])]),e._v(" "),t("el-form-item",{attrs:{label:"限次红包开支"}},[t("span",[e._v(e._s(a.row.red_envelope_limit))])]),e._v(" "),t("el-form-item",{attrs:{label:"红包利润"}},[t("span",[e._v(e._s(a.row.red_envelope_profit))])]),e._v(" "),t("el-form-item",{attrs:{label:"红包总支出"}},[t("span",[e._v(e._s(a.row.red_envelope_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"奖杯兑换实物"}},[t("span",[e._v(e._s(a.row.convert_entity))])]),e._v(" "),t("el-form-item",{attrs:{label:"奖杯兑换金币"}},[t("span",[e._v(e._s(a.row.convert_gold))])]),e._v(" "),t("el-form-item",{attrs:{label:"奖杯兑换钻石"}},[t("span",[e._v(e._s(a.row.convert_diamond))])]),e._v(" "),t("el-form-item",{attrs:{label:"用户奖杯库存总额"}},[t("span",[e._v(e._s(a.row.user_wincup))])]),e._v(" "),t("el-form-item",{attrs:{label:"用户金币库存总额"}},[t("span",[e._v(e._s(a.row.user_gold))])]),e._v(" "),t("el-form-item",{attrs:{label:"用户钻石库存总额"}},[t("span",[e._v(e._s(a.row.user_diamond))])]),e._v(" "),t("el-form-item",{attrs:{label:"统计执行时间"}},[t("span",[e._v(e._s(a.row.create_time))])]),e._v(" "),t("el-form-item",{attrs:{label:"购买金币充值"}},[t("span",[e._v(e._s(a.row.buy_gold))])]),e._v(" "),t("el-form-item",{attrs:{label:"购买钻石充值"}},[t("span",[e._v(e._s(a.row.buy_diamond))])]),e._v(" "),t("el-form-item",{attrs:{label:"购买记牌器充值"}},[t("span",[e._v(e._s(a.row.buy_props))])]),e._v(" "),t("el-form-item",{attrs:{label:"话费兑换利润"}},[t("span",[e._v(e._s(a.row.cv_charge_card_profit))])]),e._v(" "),t("el-form-item",{attrs:{label:"话费兑换总和"}},[t("span",[e._v(e._s(a.row.cv_charge_card_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币兑换奖牌数"}},[t("span",[e._v(e._s(a.row.cv_gold))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石兑换奖牌数"}},[t("span",[e._v(e._s(a.row.cv_diamond))])]),e._v(" "),t("el-form-item",{attrs:{label:"兑换记牌器奖牌数"}},[t("span",[e._v(e._s(a.row.cv_props))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级游戏场次"}},[t("span",[e._v(e._s(a.row.gold_p_play))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级游戏场次"}},[t("span",[e._v(e._s(a.row.gold_m_play))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级游戏场次"}},[t("span",[e._v(e._s(a.row.gold_s_play))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级游戏场次"}},[t("span",[e._v(e._s(a.row.diam_p_play))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级游戏场次"}},[t("span",[e._v(e._s(a.row.diam_m_play))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级游戏场次"}},[t("span",[e._v(e._s(a.row.diam_s_play))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级抽奖次数"}},[t("span",[e._v(e._s(a.row.gold_p_count))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级抽奖次数"}},[t("span",[e._v(e._s(a.row.gold_m_count))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级抽奖次数"}},[t("span",[e._v(e._s(a.row.gold_s_count))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级抽奖次数"}},[t("span",[e._v(e._s(a.row.diam_p_count))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级抽奖次数"}},[t("span",[e._v(e._s(a.row.diam_m_count))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级抽奖次数"}},[t("span",[e._v(e._s(a.row.diam_s_count))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级抽奖人数"}},[t("span",[e._v(e._s(a.row.gold_p_people))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级抽奖人数"}},[t("span",[e._v(e._s(a.row.gold_m_people))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级抽奖人数"}},[t("span",[e._v(e._s(a.row.gold_s_people))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级抽奖人数"}},[t("span",[e._v(e._s(a.row.diam_p_people))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级抽奖人数"}},[t("span",[e._v(e._s(a.row.diam_m_people))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级抽奖人数"}},[t("span",[e._v(e._s(a.row.diam_s_people))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级抽奖金额"}},[t("span",[e._v(e._s(a.row.gold_p_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级抽奖金额"}},[t("span",[e._v(e._s(a.row.gold_m_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级抽奖金额"}},[t("span",[e._v(e._s(a.row.gold_s_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级抽奖金额"}},[t("span",[e._v(e._s(a.row.diam_p_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级抽奖金额"}},[t("span",[e._v(e._s(a.row.diam_m_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级抽奖金额"}},[t("span",[e._v(e._s(a.row.diam_s_total))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级台费"}},[t("span",[e._v(e._s(a.row.gold_p_table_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级台费"}},[t("span",[e._v(e._s(a.row.gold_m_table_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级台费"}},[t("span",[e._v(e._s(a.row.gold_s_table_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级台费"}},[t("span",[e._v(e._s(a.row.diam_p_table_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级台费"}},[t("span",[e._v(e._s(a.row.diam_m_table_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级台费"}},[t("span",[e._v(e._s(a.row.diam_s_table_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级抽水总和"}},[t("span",[e._v(e._s(a.row.gold_p_system_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级抽水总和"}},[t("span",[e._v(e._s(a.row.gold_m_system_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级抽水总和"}},[t("span",[e._v(e._s(a.row.gold_s_system_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级抽水总和"}},[t("span",[e._v(e._s(a.row.diam_p_system_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级抽水总和"}},[t("span",[e._v(e._s(a.row.diam_m_system_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级抽水总和"}},[t("span",[e._v(e._s(a.row.diam_s_system_fee))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级游戏地主胜率"}},[t("span",[e._v(e._s(a.row.gold_p_win))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级游戏地主胜率"}},[t("span",[e._v(e._s(a.row.gold_m_win))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级游戏地主胜率"}},[t("span",[e._v(e._s(a.row.gold_s_win))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级游戏地主胜率"}},[t("span",[e._v(e._s(a.row.diam_p_win))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级游戏地主胜率"}},[t("span",[e._v(e._s(a.row.diam_m_win))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级游戏地主胜率"}},[t("span",[e._v(e._s(a.row.diam_s_win))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级基础ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_p_ai_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级基础ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_m_ai_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级基础ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_s_ai_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级基础ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_p_ai_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级基础ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_m_ai_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级基础ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_s_ai_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级安抚ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_p_ai_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级安抚ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_m_ai_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级安抚ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_s_ai_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级安抚ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_p_ai_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级安抚ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_m_ai_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级安抚ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_s_ai_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级收割ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_p_ai_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级收割ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_m_ai_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级收割ai盈亏"}},[t("span",[e._v(e._s(a.row.gold_s_ai_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级收割ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_p_ai_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级收割ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_m_ai_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级收割ai盈亏"}},[t("span",[e._v(e._s(a.row.diam_s_ai_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级基础ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_p_trigger_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级基础ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_m_trigger_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级基础ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_s_trigger_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级基础ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_p_trigger_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级基础ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_m_trigger_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级基础ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_s_trigger_1))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级安抚ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_p_trigger_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级安抚ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_m_trigger_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级安抚ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_s_trigger_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级安抚ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_p_trigger_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级安抚ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_m_trigger_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级安抚ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_s_trigger_2))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币初级收割ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_p_trigger_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币中级收割ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_m_trigger_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"金币高级收割ai触发次数"}},[t("span",[e._v(e._s(a.row.gold_s_trigger_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石初级收割ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_p_trigger_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石中级收割ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_m_trigger_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"钻石高级收割ai触发次数"}},[t("span",[e._v(e._s(a.row.diam_s_trigger_3))])]),e._v(" "),t("el-form-item",{attrs:{label:"消耗钻石总和"}},[t("span",[e._v(e._s(a.row.sum_cost))])]),e._v(" "),t("el-form-item",{attrs:{label:"产出奖杯总和"}},[t("span",[e._v(e._s(a.row.sum_win))])]),e._v(" "),t("el-form-item",{attrs:{label:"重置次数"}},[t("span",[e._v(e._s(a.row.sum_reset))])]),e._v(" "),t("el-form-item",{attrs:{label:"夺宝道具消耗奖杯"}},[t("span",[e._v(e._s(a.row.duobao_wincup))])]),e._v(" "),t("el-form-item",{attrs:{label:"夺宝发货商品奖杯"}},[t("span",[e._v(e._s(a.row.duobao_goods_wincup))])]),e._v(" "),t("el-form-item",{attrs:{label:"夺宝发货商品作弊奖杯"}},[t("span",[e._v(e._s(a.row.duobao_cheat_wincup))])])],1)]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"#",type:"index",width:"50"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"日期",prop:"date",sortable:"custom",width:"180"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"新增用户",prop:"new_user"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"登录用户",prop:"login_user"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值人数",prop:"charge_user"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值次数",prop:"charge_times"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"充值总额",prop:"charge_count"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"统计执行时间",prop:"create_time",width:"180"}})],1)],1)],1)],1),e._v(" "),t("el-row",{staticClass:"panel_area"},[t("el-pagination",{attrs:{"current-page":e.tableMixin_currentPage,"page-size":e.tableMixin_pageSize,"page-sizes":e.tableMixin_pageSizeArr,total:e.tableMixin_total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":e.tableMixin_handleCurrentChange,"size-change":e.tableMixin_handleSizeChange}})],1)],1)},staticRenderFns:[]};var n=t("VU/8")(i,m,!1,function(e){t("dwkd")},"data-v-2574c82c",null);a.default=n.exports},dwkd:function(e,a){}});
//# sourceMappingURL=11.76d1c6405ab38b3aebff.js.map