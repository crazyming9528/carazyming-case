;(function (window) {

        function Tab(options) {
            if (typeof options !== 'object') {
                throw 'Tab参数错误';
            }
            //参数配置
            this.options = Object.assign({
                triggerType: "click",// 触发切换的事件类型  click,mouseover 等事件
                effect: '', //切换动画:slide fade
                show: 1,// 默认展示第几个
                auto: false,//自动播放时间 单位秒  false 关闭自动播放
                container: '.tab-wrapper',// tab容器的class
            }, options);
            //容器
            this.dom = document.querySelector(this.options.container);
            //tab 列表
            this.tabUl = this.dom.querySelector('ul.tab-nav');
            this.tabItems = this.dom.querySelectorAll('ul.tab-nav>li');
            //tab 内容列表
            this.contentItem = this.dom.querySelectorAll('div.content-wrapper>div.content-item');
            // 用于自动轮播的计时器
            this.timer = null;

            var _this = this;


            // 循环计数
            _this.loop = 0;


            //利用事件冒泡 在tab-nav 监听事件
            this.tabUl.addEventListener(_this.options.triggerType, function (e) {
                _this.show([].indexOf.call(_this.tabItems, e.target.parentNode));
            });
            // [].forEach.call(_this.tabItems, function (item) {
            //     item.addEventListener(_this.options.triggerType, function () {
            //
            //         _this.show(this);
            //
            //     })
            //
            // });


            if (!isNaN(_this.options.show)) {
                _this.show(_this.options.show - 1);
            }

            if (_this.options.auto) {
                _this.autoPlay();
                _this.dom.addEventListener("mouseenter", function (e) {
                    clearInterval(_this.timer);
                });

                _this.dom.addEventListener("mouseleave", function (e) {
                    _this.autoPlay();
                });
            }

        }

        Tab.prototype = {

            show: function (tabIndex) {

                this.loop = tabIndex; //同步当前计数 用于自动播放
                var _this = this;
                [].forEach.call(this.tabItems, function (li, index) {
                    if (index === tabIndex) {
                        li.classList.add('active');
                    } else {
                        li.classList.remove("active");
                    }
                });
                [].forEach.call(this.contentItem, function (content, index) {


                    switch (_this.options.effect) {
                        case "fade":
                            content.classList.add('current');//让所有内容块都  display: block;
                            content.style.opacity = "0";
                            if (index === tabIndex) {
                                content.style.opacity = "1";
                            }

                            break;
                        case "slide":
                            content.classList.add('current');
                            if (index === tabIndex) {
                                var pre = _this.contentItem[index - 1] ? _this.contentItem[index - 1] : _this.contentItem[_this.contentItem.length - 1];//当上一项 content 不存在时  定义上一个 content 为 在最后一个content
                                var next = _this.contentItem[index + 1] ? _this.contentItem[index + 1] : _this.contentItem[0];//当下一项 content 不存在时  定义下一个 content 为 第一个content
                                pre.style.left = "-" + content.offsetWidth + "px";
                                next.style.left = content.offsetWidth + "px";
                                content.style.left = "0"
                            }
                            break;
                        default:
                            content.classList.remove('current');
                            if (index === tabIndex) {
                                content.classList.add('current');
                            }

                    }


                })


            },
            autoPlay: function () {
                if (!this.options.auto) return;
                var tabLength = this.tabItems.length, _this = this;
                _this.timer = setInterval(function () {
                    _this.loop++;
                    if (_this.loop >= tabLength) {
                        _this.loop = 0;
                    }
                    _this.show(_this.loop);
                }, _this.options.auto);
            }


        };

        window.Tab = Tab;
    }

)(window);
