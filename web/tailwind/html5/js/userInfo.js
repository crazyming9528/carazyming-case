var api = new HotelTrainingApi(controllerPathPrefix, axios);
var vm = new Vue({
    el: "#app",
    data: {
        loading: false,
        score: 0,
        content: "",
        userInfo: {}
    },
    methods: {
        getUserInfo: function () {
            var _this = this;
            api.userInfo().then(function (res) {
                if (res.data.retcode === 0) {
                    var data = res.data.data;
                    console.log(data);
                    _this.userInfo = data;
                }
            })

        },
        logout: function () {
            api.logout().finally(
                window.location.href = 'http://ebooking.elong.com:80/html5/authentication/login'
            )
        }
    },
    created: function () {
    },
    mounted: function () {

        this.getUserInfo();

    }
});

