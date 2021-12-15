var controllerPathPrefix = 'http://ebooking.elong.com/html5';

var vm = new Vue({
    el: "#app",
    data: {
        isShowRecentSearchPanel: false,// 是否显示最近搜索面板
        tabList: [{tag: -1, text: "全部"}],// 顶部tab集合
        currentTab: -1,// -1表示全部
        articleList: [],
        articleGrid: [],
        pageData: {
            page: 1,
            pageSize: 10,
        }
    },
    methods: {
        toggleRecentSearchPanel(bool) {
            if (typeof bool == "boolean") {
                vm.isShowRecentSearchPanel = bool;
            } else {
                vm.isShowRecentSearchPanel = !vm.isShowRecentSearchPanel;
            }
            console.log('显示最近搜索:', vm.isShowRecentSearchPanel)
        },
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

                _this.refreshList();
            })
        },
        refreshList() {
            this.articleList = [];
            this.pageData.page = 1;
            this.pageData.pageSize = 10;
            this.getList();
        },
        getList() {
            var api = new HotelTrainingApi(controllerPathPrefix, axios);
            var data = {
                page: this.pageData.page,
                pageSize: this.pageData.pageSize,
            }
            if (this.currentTab !== -1) {
                data.tab = this.currentTab;
            }
            var _this = this;
            api.getArticleList(data).then(function (res) {
                    if (res.data.retcode === 0) {
                        var data = res.data.data;
                        _this.articleList = data.list;
                    }

                }
            )

        },
        jumpUrl(item) {
            var api = new HotelTrainingApi(controllerPathPrefix, axios);
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

