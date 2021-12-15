;(function (window) {

    function HotelTrainingApi(basePath, axios) {

        this.axiosInstance = axios.create({
            baseURL: basePath,
            timeout: 10000,
            headers: {'content-type': 'application/json'},
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
            return this.axiosInstance.post(controllerPathPrefix + "/hotelTraining/getHotelTrainConfigList", data || {});
        },
        // 获取商家必学首页的数据
        getArticleGridHomeData: function (data) {
            return this.axiosInstance.post(controllerPathPrefix + "/hotelTraining/getHotelTrainConfigIndexPage", data || {});
        },
        // 获取文章详情
        getArticleDetailInfo: function (data) {
            return this.axiosInstance.post(controllerPathPrefix + "/hotelTraining/getHotelTrainConfigInfo", data || {});
        },
        // 获取评论列表
        getCommentList: function (data) {
            return this.axiosInstance.post(controllerPathPrefix + "/hotelTrainComment/getComment4HotelTrain", data || {});

        },
        // 保存评论
        saveComment: function (data) {
            return this.axiosInstance.post(controllerPathPrefix + "/hotelTrainComment/saveHotelTrainComment", data || {});
        },
        searchArticle: function (data) {
            return this.axiosInstance.post(controllerPathPrefix + "/hotelTraining/searchHotelTrainArticle", data || {});
        },
        searchCourse: function (data) {
            return this.axiosInstance.post(controllerPathPrefix + "/hotelTraining/searchHotelTrainFile", data || {});
        }
    }


    window.HotelTrainingApi = HotelTrainingApi;

})(window);
