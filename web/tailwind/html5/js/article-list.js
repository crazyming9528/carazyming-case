var controllerPathPrefix = 'http://ebooking.elong.com/html5';
var api = new HotelTrainingApi(controllerPathPrefix, axios);
var vm = new Vue({
    el: "#app",
    data: {
        isShowRecentSearchPanel: false,// 是否显示最近搜索面板
        tabList: [{tag: -1, text: "全部"}],// 顶部tab集合
        currentTab: -1,// -1表示全部
        articleList: [],
        listLoading: false, // list组件  是否加载中
        listFinished: false,// list组件   是否加载完成
        showList: false,
        pageData: {
            page: 0,
            pageSize: 10,
        }
    },
    methods: {
        toggleTag(newTag) {
            this.currentTab = newTag;
            this.refreshList();
        },
        getTag() {
            var api = new HotelTrainingApi(controllerPathPrefix, axios);
            var _this = this;
            api.getArticleTab(1).then(function (res) {
                if (res.data.retcode === 0) {
                    var data = res.data.data;
                    Object.keys(data).forEach(function (key) {
                        _this.tabList.push({tag: key, text: data[key]});
                    })

                }
            })
        },
        refreshList() {
            this.listLoading = false;
            this.listFinished = false;
            this.articleList = [];
            this.pageData.page = 0;
            this.pageData.pageSize = 10;
            this.onLoadList();
        },
        getList() {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var data = {
                    page: _this.pageData.page,
                    pageSize: _this.pageData.pageSize,
                }
                if (_this.currentTab !== -1) {
                    data.tab = _this.currentTab;
                }
                api.getArticleList(data).then(function (res) {
                        if (res.data.retcode === 0) {
                            var data = res.data.data;
                            var list = res.data.data.list;
                            if (list && list.length > 0) {
                                list.forEach(function (item) {
                                    _this.articleList.push(item);
                                })
                            }
                            resolve(data);
                        } else {
                            reject(res.data.retdesc);
                        }

                    }
                ).catch(function (err) {
                    reject(err);
                })
            })

        },
        onLoadList() {
            this.pageData.page++;
            var _this
                = this;
            this.getList().then(function (data) {
                if (_this.articleList.length >= data.total) {
                    _this.listFinished = true;
                }
            }).catch(function (err) {
                console.log(err);
                _this.listFinished = true;
            }).finally(function () {
                _this.listLoading = false;
            })

        },
        jumpUrl(item) {
            api.getArticleDetailInfo({id: item.id, tagType: 1}).finally(function () {
                window.location.href = item.url;
            })
        }

    },
    created() {
    },
    mounted() {
        this.getTag();
    }
});

