;(function ($) {

    var Tab = function (config) {
        this.config = $.extend({
            triggerType: "click",//触发类型
            effect: 'fade',//切换效果 fade    slide
            invoke: 1,//默认展示第几个
            auto: 5000,//用来定义tab 是否自动切换
            container: '.tab-wrapper',//容器
        }, config);


        this.dom = this.config.container;
        //tab 列表
        this.tabItems = $(this.dom).find('ul.tab-nav>li');
        //tab 内容列表
        this.contentItem = $(this.dom).find('div.content-wrapper>div.content-item');


        var _this = this;
        _this.loop = 0;// 循环计数
        this.tabItems.bind(this.config.triggerType, function () {
            _this.invoke($(this));
        });


        //默认显示
        if (this.config.invoke) {
            _this.invoke(_this.tabItems.eq(_this.config.invoke - 1));
        }
        if (this.config.auto) {

            this.timer = null;

            this.autoPlay();
            $(this.dom).hover(function () {
                clearInterval(_this.timer);
            }, function () {
                _this.autoPlay();
            })


        }


    };

    Tab.prototype = {
        test: function () {
            console.log(this.arguments);
        },

        invoke: function (currentTab) {
            var index = currentTab.index();

            this.loop = index; //同步当前计数 用于自动播放

            currentTab.addClass('active').siblings().removeClass('active');
            var effect = this.config.effect;
            switch (effect) {
                case "fade":
                    this.contentItem.eq(index).fadeIn(500).siblings().fadeOut(500);
                    break;
                case 'slide':
                    this.contentItem.eq(index).show();
                    this.contentItem.eq(index).animate({height: '100%'}).siblings().animate({height: 0});
                    break;
                default:
                    this.contentItem.eq(index).addClass('current').siblings().removeClass('current');
            }
        },
        autoPlay: function () {

            if (!this.config.auto) {
                return;
            }


            var tabLength = this.tabItems.length, _this = this;
            this.timer = setInterval(function () {

                _this.loop++;
                if (_this.loop >= tabLength) {
                    _this.loop = 0;
                }

                _this.tabItems.eq(_this.loop).trigger(_this.config.triggerType);


            }, this.config.auto);


        }


    }
    ;

    window.Tab = Tab;
})($);
