var vm = new Vue({
    el: "#app",
    data: {
        tabList: [{tag: -1, text: "全部"}],// 顶部tab集合
        currentTab: -1,// -1表示全部
        active: 0,
        indexPageData: [],// 商家必学 首页数据
        articleGrid: [],
        listLoading: false, // list组件  是否加载中
        listFinished: false,// list组件   是否加载完成
        pageData: {
            page: 1,
            pageSize: 10,
        }
    },
    methods: {
        changeTab: function (name) {
            this.currentTab = name;
            if (this.currentTab === -1) {
                this.getHomeData();
            } else {
                this.refreshList();
            }
        },
        getTag: function () {
            var api = new HotelTrainingApi(controllerPathPrefix, axios);
            var _this = this;
            api.getArticleTab(2).then(function (res) {
                if (res.data.retcode === 0) {
                    var data = res.data.data;
                    Object.keys(data).forEach(function (key) {
                        _this.tabList.push({tag: key, text: data[key]});
                    })
                }
                if (_this.currentTab === -1) {
                    _this.getHomeData();
                } else {
                    _this.refreshList();
                }
            })
        },
        refreshList: function () {
            this.articleList = [];
            this.pageData.page = 1;
            this.pageData.pageSize = 10;
            this.onLoadList(true);
        },
        getHomeData: function () {
            var _this = this;
            _this.indexPageData = [];
            api.getArticleGridHomeData({}).then(function (res) {
                if (res.data.retcode === 0) {
                    var data = res.data.data;
                    _this.indexPageData = [];
                    Object.keys(data).forEach(function (key) {
                            _this.tabList.forEach(function (item) {
                                if (item.tag === key) {
                                    _this.indexPageData.push({
                                        tag: item.tag,
                                        text: item.text,
                                        list: data[key],
                                    })
                                }

                            })
                        }
                    )

                }
            })

        },
        getList: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var data = {
                    page: _this.pageData.page,
                    pageSize: _this.pageData.pageSize,
                }
                if (_this.currentTab !== -1) {
                    data.tab = _this.currentTab;
                }
                api.getArticleGridList(data).then(function (res) {
                        if (res.data.retcode === 0) {
                            var data = res.data.data;
                            var list = res.data.data.list;
                            if (list && list.length > 0) {
                                list.forEach(function (item) {
                                    _this.articleGrid.push(item);
                                })
                            }
                            resolve(data)
                        } else {
                            reject(res.data.retdesc);
                        }

                    }
                ).catch(function (err) {
                    reject(err);
                })
            })

        },
        onLoadList: function (first) {
            if (!first) {
                this.pageData.page++;
            }
            var _this
                = this;
            this.getList().then(function (data) {
                if (_this.articleGrid.length >= data.total) {
                    _this.listFinished = true;
                }
            }).catch(function (err) {
                console.log(err);
                _this.listFinished = true;
            }).finally(function () {
                _this.listLoading = false;
            })

        },

        jumpUrl: function (url) {
            window.location.href = url;
        }

    },
    created: function () {
    },
    mounted: function () {
        this.getTag();
    }
});

