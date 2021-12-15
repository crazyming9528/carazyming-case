var controllerPathPrefix = 'http://ebooking.elong.com/html5';
var api = new HotelTrainingApi(controllerPathPrefix, axios);
var vm = new Vue({
    el: "#app",
    data: {
        rateValue: 3,
        detailData: {},
        commentList: [],
    },
    methods: {
        getComment() {
            api.getCommentList({page: 1, pageSize: 10, id: this.detailData.id}).then(
                function (commentRes) {
                    if (commentRes.data.retcode === 0) {
                        this.commentList = res.data.data;
                    }

                }
            )
        },
        getDetailInfo(id) {
            var _this = this;
            api.getArticleDetailInfo({
                id: id,
                tagType: 2
            }).then(function (res) {
                if (res.data.retcode === 0) {
                    _this.detailData = res.data.data;
                    _this.getComment();
                }

            })


        },
    },
    created() {
    },
    mounted() {

        var id = getQueryString("id");
        if (id) {
            this.getDetailInfo(id);
        } else {
            console.log('未传递id')
        }


    }
});

