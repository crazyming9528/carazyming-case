var controllerPathPrefix = 'http://ebooking.elong.com/html5';
var api = new HotelTrainingApi(controllerPathPrefix, axios);
var vm = new Vue({
    el: "#app",
    data: {
        rateValue: 3,
        detailData: {},
        commentList: [],
        fileType: '',// mp4  pdf
        allowComment: false,// 允许评论
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
                    var url = res.data.data.url;
                    if (url) {
                        var type = url.substr(url.lastIndexOf("."));
                        _this.fileType = type === '.pdf' ? 'pdf' : 'mp4';
                        if (_this.fileType === 'pdf') {
                            var pdfh5 = new Pdfh5('#pdf-container', {
                                pdfurl: url
                            });
                        }
                    }
                    _this.getComment();
                    setTimeout(function () {
                        _this.allowComment = true;
                    }, 10000)
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

