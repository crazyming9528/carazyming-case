var vm = new Vue({
    el: "#app",
    data: {
        score: 0,
        content: ""
    },
    methods: {
        getRateText: function (value) {
            switch (value) {
                case 0:
                    return '';
                case 1:
                    return '非常差';
                case 2:
                    return '差';
                case 3:
                    return '一般';
                case 4:
                    return '好';
                case 5:
                    return '非常好';
            }
        },
        submitComment: function () {
            var data = {
                hotelTrainId: getQueryString('id'),
                score: this.score,
                content: this.content
            }
            if (!data.hotelTrainId) return;
            var api = new HotelTrainingApi(controllerPathPrefix, axios);
            api.saveComment(data).then(function (res) {
                console.log(res);
                window.history.back();
            })
        }
    },
    created: function () {
    },
    mounted: function () {

    }
});

