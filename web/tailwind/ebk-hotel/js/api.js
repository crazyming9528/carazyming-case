;(function (window) {

    function HotelTrainingApi(basePath) {

        this.basePath = basePath;

    }

    HotelTrainingApi.prototype = {
        // 获取首页banner
        getHomeBanner: function () {
            return axios.post(this.basePath + "/hotelTrainBanner/getHotelTrainBannerList");
        },
        // 获取首页文章列表
        getHomeArticleList: function () {
            return axios.post(this.basePath + "/hotelTraining/getTopHotelTrainArticleList");
        },
        // 获取首页文章网格
        getHomeArticleGrid: function () {
            return axios.post(controllerPathPrefix + "/hotelTraining/getTopHotelTrainFileList");
        },

    }


    window.HotelTrainingApi = HotelTrainingApi;

})(window);
