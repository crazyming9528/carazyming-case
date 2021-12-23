var vm = new Vue({
    el: "#app",
    data: {
        loading: false,
        rateValue: 3,
        detailData: {},
        score: 0,
        views: 0,
        commentList: [],
        fileType: '',// mp4  pdf
        allowComment: false,// 允许评论
        defaultCommentNum: 0,// 已折叠的评论数量
    },
    methods: {
        getComment() {
            api.getCommentList({page: 1, pageSize: 10, id: this.detailData.id}).then(
                function (commentRes) {
                    if (commentRes.data.retcode === 0) {
                        this.commentList = res.data.list;
                        this.defaultNum = res.data.defaultNum || 0;
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
        autoComment() {
            var data = {
                hotelTrainId: this.detailData.id,
                score: 5,
                content: ''
            }
            api.saveComment(data).then(function (res) {
                // console.log(res);
                // window.history.back();
            }).finally(function () {
                window.history.back();
            })
        }

    },
    created() {
        // this.back();
    },
    mounted() {
        var param = getQueryString('param');
        var paramData = decodeURIParam(param);
        if (paramData.id) {
            this.getDetailInfo(paramData.id);
            this.views = isNaN(paramData.views) ? 0 : paramData.views;
            this.score = isNaN(paramData.score) ? 0 : paramData.score;
        } else {
            console.log('未传递id')
        }

    }
});

window.onpopstate = function () {
    // 由于浏览器限制,需要 用户与页面交互 才可
    if (vm.allowComment) {
        // console.log('允许评论时 默认五星好评');
        vm.autoComment();

    } else {
        window.history.back();
    }
}

window.history.pushState('forward', null, '');
window.history.forward();
