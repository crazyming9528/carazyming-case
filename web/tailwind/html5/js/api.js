;(function (window) {
    function HotelTrainingApi(basePath) {
        this.requestCount = 0;
        this.axiosInstance = axios.create({
            baseURL: basePath,
            timeout: 10000,
            headers: {'content-type': 'application/json'},
        });
        var _this = this;
        // 添加请求拦截器
        this.axiosInstance.interceptors.request.use(function (config) {
            if (_this.requestCount === 0) {
                if (window.vm) {
                    console.log('open loading');
                    window.vm.loading = true;
                }
            }
            _this.requestCount++;
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

// 添加响应拦截器
        this.axiosInstance.interceptors.response.use(function (response) {
            _this.requestCount--;

            if (_this.requestCount <= 0) {
                if (window.vm) {
                    console.log('close loading');
                    setTimeout(function () {
                        window.vm.loading = false;
                    }, 300)
                }
            }
            return response;
        }, function (error) {
            // 对响应错误做点什么
            if (_this.requestCount <= 0) {
                if (window.vm) {
                    console.log('close loading');
                    setTimeout(function () {
                        window.vm.loading = false;
                    }, 300)
                }
            }
            return Promise.reject(error);
        });


    }

    HotelTrainingApi.prototype = {
        // 获取首页banner
        getHomeBanner: function () {
            return this.axiosInstance.post("/hotelTrainBanner/getHotelTrainBannerList");
        },
        // 获取首页文章列表
        getHomeArticleList: function () {
            return this.axiosInstance.post("/hotelTraining/getTopHotelTrainArticleList");
        },
        // 获取首页文章网格
        getHomeArticleGrid: function () {
            return this.axiosInstance.post("/hotelTraining/getTopHotelTrainFileList");
        },
        // 获取列表标签  tagType:1 热门文章  2 商家必学
        getArticleTab: function (tagType) {
            return this.axiosInstance.post("/hotelTraining/getHotelTrainTags", {tagType: tagType});

            // 方便mock 数据使用
            // if (tagType === 1) {
            //     return this.axiosInstance.post("/hotelTraining/getHotelTrainTags1111", {tagType: tagType});
            // } else {
            //     return this.axiosInstance.post("/hotelTraining/getHotelTrainTags2222", {tagType: tagType});
            // }
        },
        // 根据获取文章列表 page pageSize  tag
        getArticleList: function (data) {
            return this.axiosInstance.post("/hotelTraining/getHotelTrainArticleList", data || {});
        },
        // 根据tag获取网格视图列表(商家必学)
        getArticleGridList: function (data) {
            return this.axiosInstance.post("/hotelTraining/getHotelTrainConfigList", data || {});
        },
        // 获取商家必学首页的数据
        getArticleGridHomeData: function (data) {
            return this.axiosInstance.post("/hotelTraining/getHotelTrainConfigIndexPage", data || {});
        },
        // 获取文章详情
        getArticleDetailInfo: function (data) {
            return this.axiosInstance.post("/hotelTraining/getHotelTrainConfigInfo", data || {});
        },
        // 获取评论列表
        getCommentList: function (data) {
            return this.axiosInstance.post("/hotelTrainComment/getComment4HotelTrain", data || {});

        },
        // 保存评论
        saveComment: function (data) {
            return this.axiosInstance.post("/hotelTrainComment/saveHotelTrainComment", data || {});
        },
        searchArticle: function (data) {
            return this.axiosInstance.post("/hotelTraining/searchHotelTrainArticle", data || {});
        },
        searchCourse: function (data) {
            return this.axiosInstance.post("/hotelTraining/searchHotelTrainFile", data || {});
        },
        userInfo: function (data) {
            return this.axiosInstance.post("/authentication/getUserInfo", data || {});
        },
        logout: function () {
            return this.axiosInstance.get('/authentication/logout');
        }
    }


    window.HotelTrainingApi = HotelTrainingApi;

})(window);
