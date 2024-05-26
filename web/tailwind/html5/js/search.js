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
        isLegitimateText: false,
        isShowRecentSearchPanel: false,// 是否显示最近搜索面板
        currentTabIndex: 0,// 0 文章  1课程
        articleList: [],// 文章列表
        articleGrid: []// 课程网格
    },
    methods: {
        getArticleList: function () {
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
        onRefreshArticleList: function () {
            this.articleListPage.page = 1;
            this.articleListPage.pageSize = 10;
            this.articleList = [];
            var _this = this;
            this.getArticleList().finally(function () {
                _this.articleListRefreshing = false;
            });

        },
        onLoadArticleList: function () {
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
        getArticleGrid: function () {
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
        onRefreshArticleGrid: function () {
            this.articleGridPage.page = 1;
            this.articleGridPage.pageSize = 10;
            this.articleGrid = [];
            var _this = this;
            this.getArticleGrid().finally(function () {
                _this.articleGridRefreshing = false;
            });

        },
        onLoadArticleGrid: function () {
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
        saveRecentlySearch: function () {
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
        getRecentlySearch: function () {
            if (window.localStorage) {
                var rs = localStorage.getItem('recentlySearch');
                this.recentlySearch = rs ? JSON.parse(rs).reverse() : [];
            }
        },
        toggleTab: function (index) {
            // this.currentTabIndex = index;
            window.location.replace("search.html?q=" + this.searchText + "&tab=" + index);
        },
        search: function (from) {
            this.checkSearchText(this.searchText);
            if (this.isLegitimateText) {

                if (from === 'input') {
                    this.saveRecentlySearch();
                    this.toggleRecentSearchPanel(false);
                }
                if (this.currentTabIndex === 0) {
                    this.onRefreshArticleList();
                } else {
                    this.onRefreshArticleGrid();
                }

            }

        },
        selectRecentlySearch: function (str) {
            vm.searchText = str;
            vm.toggleRecentSearchPanel(false);
            vm.search();
        },
        toggleRecentSearchPanel: function (bool) {
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
        checkSearchText: function (text) {
            // 字母
            var englishRegExp = /^[a-zA-Z]+$/;
            // 中文
            var chineseRegExp = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
            this.isLegitimateText = englishRegExp.test(text) || chineseRegExp.test(text);
        }
    },

    created: function () {

        var query = getQueryString("q");
        this.checkSearchText(query);
        this.searchText = query;
        this.currentTabIndex = Number(getQueryString("tab")) || 0;
    },
    mounted: function () {
        // this.initSearch();

    }
});

