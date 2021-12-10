var controllerPathPrefix = 'http://ebooking.elong.com/html5';

var vm = new Vue({
    el: "#app",
    data: {
        isShowRecentSearchPanel: false,// 是否显示最近搜索面板
        tabList: [{tag: -1, text: "全部"}],// 顶部tab集合
        currentTab: -1,// -1表示全部
        indexPageData: [],// 商家必学 首页数据
        articleGrid: [],
        pageData: {
            page: 1,
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
            api.getArticleTab(2).then(function (res) {
                if (res.data.retcode === 0) {
                    var data = res.data.data;
                    Object.keys(data).forEach(function (key) {
                        _this.tabList.push({tag: key, text: data[key]});
                    })
                }

                _this.refreshList();
            })
        },
        refreshList() {
            this.articleList = [];
            this.pageData.page = 1;
            this.pageData.pageSize = 10;
            this.getList();
        },
        getHomeData() {
            var api = new HotelTrainingApi(controllerPathPrefix, axios);
            var _this = this;
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
        getList() {
            if (this.currentTab === -1) {
                return this.getHomeData();
            }
            var api = new HotelTrainingApi(controllerPathPrefix, axios);
            var data = {
                page: this.pageData.page,
                pageSize: this.pageData.pageSize,
                tag: this.currentTab
            }
            var _this = this;
            api.getArticleGridList(data).then(function (res) {
                    if (res.data.retcode === 0) {
                        var data = res.data.data;

                        _this.articleGrid = data.list;
                    }

                }
            )

        },
        jumpUrl(url) {
            window.location.href = url;
        }

    },
    created() {
    },
    mounted() {
        this.getTag();
    }
});

