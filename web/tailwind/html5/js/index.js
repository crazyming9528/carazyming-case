var vm = new Vue({
    el: "#app",
    data: {
        loading: false,
        isShowRecentSearchPanel: false,// 是否显示最近搜索面板
        bannerList: [],
        articleList: [],
        articleGrid: [],
        recentlySearch: [],
        searchText: "",
    },
    methods: {
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
                localStorage.setItem("recentlySearch", JSON.stringify(rsArray));
            }
        },
        getRecentlySearch() {
            if (window.localStorage) {
                var rs = localStorage.getItem('recentlySearch');
                this.recentlySearch = rs ? JSON.parse(rs).reverse() : [];
            }
        },
        search(saveLog) {
            if (saveLog) {
                vm.saveRecentlySearch();
            }

            window.location.href = 'search.html?q=' + vm.searchText;
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
        jumpArticleDetail(item) {
            api.getArticleDetailInfo({id: item.id, tagType: 1}).finally(function () {
                window.location.href = item.url;
            })
        },
        jumpUrl(url) {
            window.location.href = url;
        },
        getData() {
            var _this = this;
            axios.all([api.getHomeBanner(), api.getHomeArticleList(), api.getHomeArticleGrid()]).then(axios.spread(function (banner, articleList, articleGrid) {
                console.log(banner, articleList, articleGrid);
                if (banner.status === 200) {
                    if (banner.data.retcode === 0) {
                        vm.bannerList = banner.data.data.list;
                        setTimeout(function () {
                            var mySwiper = new Swiper('.swiper', {
                                direction: 'horizontal', // 垂直切换选项
                                loop: true, // 循环模式选项
                                autoplay: true,
                                // 如果需要分页器
                                pagination: {
                                    el: '.swiper-pagination',
                                },
                            })
                        }, 50)
                    }
                }

                if (articleList.status === 200) {
                    if (articleList.data.retcode === 0) {
                        vm.articleList = articleList.data.data.list;
                    }
                }

                if (articleGrid.status === 200) {
                    if (articleGrid.data.retcode === 0) {
                        vm.articleGrid = articleGrid.data.data.list;
                    }
                }
                // _this.pageIsOk = true;
                setTimeout(function () {
                    _this.pageIsOk = true;
                }, 1000)


            }));
        }

    },
    created() {
        console.log('hello world');
    },
    mounted() {
        console.log('mount');
        console.log(this);
        this.getData();
    }
});

