var controllerPathPrefix = 'http://ebooking.elong.com/html5';

var vm = new Vue({
    el: "#app",
    data: {
        test: "hello world",
        isShowRecentSearchPanel: false,// 是否显示最近搜索面板
        bannerList: [],
        articleList: [],
        articleGrid: [],
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
        getData() {
            const api = new HotelTrainingApi(controllerPathPrefix);
            axios.all([api.getHomeBanner(), api.getHomeArticleList(), api.getHomeArticleGrid()]).then(axios.spread(function (banner, articleList, articleGrid) {
                console.log(banner, articleList, articleGrid);
                if (banner.status === 200) {
                    if (banner.data.retcode === 0) {
                        vm.bannerList = banner.data.data.list;
                        setTimeout(function () {
                            var mySwiper = new Swiper('.swiper', {
                                direction: 'horizontal', // 垂直切换选项
                                loop: true, // 循环模式选项

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

