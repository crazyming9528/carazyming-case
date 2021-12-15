var controllerPathPrefix = 'http://ebooking.elong.com/html5';
var api = new HotelTrainingApi(controllerPathPrefix, axios);
var vm = new Vue({
    el: "#app",
    data: {
        articleListLoading: false, // list组件  是否加载中
        articleListFinished: false,// list组件   是否加载完成
        articleListRefreshing: false,// 下拉刷新: 是否在加载中
        articleListPage: {
            page: 0,
            pageSize: 10
        },

        articleGridLoading: false, // list组件  是否加载中
        articleGridFinished: false,// list组件   是否加载完成
        articleGridRefreshing: false,// 下拉刷新: 是否在加载中
        articleGridPage: {
            page: 0,
            pageSize: 10
        },
        recentlySearch: [],
        searchText: '',
        isShowRecentSearchPanel: false,// 是否显示最近搜索面板
        currentTabIndex: 0,// 0 文章  1课程
        articleList: [],// 文章列表
        articleGrid: []// 课程网格
    },
    methods: {
        getArticleList() {
            var _this = this;
            return new Promise(function (resolve, reject) {
                api.searchArticle({
                    title: _this.searchText,
                    page: _this.articleListPage.page,
                    pageSize: _this.articleListPage.pageSize,
                }).then(function (res) {
                    if (res.data.retcode === 0) {
                        var list = res.data.data.list;
                        if (list && list.length > 0) {
                            list.forEach(function (item) {
                                _this.articleList.push(item);
                            })
                        }
                        resolve(res.data.data);

                    } else {
                        reject(res.data.retdesc);
                    }
                });


            })

        },
        onRefreshArticleList() {
            this.articleListPage.page = 1;
            this.articleListPage.pageSize = 10;
            this.articleList = [];
            var _this = this;
            this.getArticleList().finally(function () {
                _this.articleListRefreshing = false;
            });

        },
        onLoadArticleList() {
            this.articleListPage.page++;
            var _this = this;
            this.getArticleList().then(function (data) {
                if (_this.articleList.length >= data.total) {
                    _this.articleListFinished = true;
                }
            }).catch(function (err) {
                console.log(err);
                _this.articleListFinished = true;
            }).finally(function () {
                _this.articleListLoading = false;
            })

        },
        getArticleGrid() {
            var _this = this;
            return new Promise(function (resolve, reject) {
                api.searchCourse({
                    title: _this.searchText,
                    page: _this.articleGridPage.page,
                    pageSize: _this.articleGridPage.pageSize,
                }).then(function (res) {
                    if (res.data.retcode === 0) {
                        var list = res.data.data.list;
                        if (list && list.length > 0) {
                            list.forEach(function (item) {
                                _this.articleGrid.push(item);
                            })
                        }
                        resolve(res.data.data);

                    } else {
                        reject(res.data.retdesc);
                    }
                });


            })

        },
        onRefreshArticleGrid() {
            this.articleGridPage.page = 1;
            this.articleGridPage.pageSize = 10;
            this.articleGrid = [];
            var _this = this;
            this.getArticleGrid().finally(function () {
                _this.articleGridRefreshing = false;
            });

        },
        onLoadArticleGrid() {
            this.articleGridPage.page++;
            var _this = this;
            this.getArticleGrid().then(function (data) {
                if (_this.articleGrid.length >= data.total) {
                    _this.articleGridFinished = true;
                }
            }).catch(function (err) {
                console.log(err);
                _this.articleGridFinished = true;
            }).finally(function () {
                _this.articleGridLoading = false;

            })

        },

        // 保存最近搜索
        saveRecentlySearch() {
            var str = this.searchText;
            if (window.localStorage) {
                var rs = localStorage.getItem('recentlySearch');
                var rsArray;
                if (rs) {
                    rsArray = JSON.parse(rs);
                    rsArray.push(str);
                } else {
                    rsArray = [str]
                }
                var temp = {};
                var res = [];
                //去重
                for (var i = 0; i < rsArray.length; i++) {
                    if (!temp[rsArray[i]]) {
                        temp[rsArray[i]] = "unique";
                        res.push(rsArray[i]);
                    }
                }
                localStorage.setItem("recentlySearch", JSON.stringify(res));
            }
        },
        getRecentlySearch() {
            if (window.localStorage) {
                var rs = localStorage.getItem('recentlySearch');
                this.recentlySearch = rs ? JSON.parse(rs).reverse() : [];
            }
        },
        toggleTab(index) {
            // this.currentTabIndex = index;
            window.location.replace("search.html?q=" + this.searchText + "&tab=" + index);
        },
        search(from) {
            if (from === 'input') {
                this.saveRecentlySearch();
                this.toggleRecentSearchPanel(false);
            }
            if (this.currentTabIndex === 0) {
                this.onRefreshArticleList();
            } else {
                this.onRefreshArticleGrid();
            }
        },
        selectRecentlySearch(str) {
            vm.searchText = str;
            vm.toggleRecentSearchPanel(false);
            vm.search();
        },
        toggleRecentSearchPanel(bool) {
            if (typeof bool == "boolean") {
                vm.isShowRecentSearchPanel = bool;
            } else {
                vm.isShowRecentSearchPanel = !vm.isShowRecentSearchPanel;
            }
            if (vm.isShowRecentSearchPanel) {
                vm.getRecentlySearch();
            }
            console.log('显示最近搜索:', vm.isShowRecentSearchPanel)
        },
    },
    created() {
        this.searchText = getQueryString("q");
        this.currentTabIndex = Number(getQueryString("tab")) || 0;
    },
    mounted() {
        // this.initSearch();

    }
});

