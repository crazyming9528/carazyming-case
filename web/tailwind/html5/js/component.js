Vue.component('ebkh5-article-list-item', {
    props: ['item'],
    data: function () {
        return {
            text: ""
        }
    },
    methods: {
        jumpArticleDetail(item) {
            api.getArticleDetailInfo({id: item.id, tagType: 1}).finally(function () {
                window.location.href = item.url;
            })
        }
    },
    template: '<li class="ebkh5-article-list-item" @click="jumpArticleDetail(item)"> <div class="left"> <div class="title">{{item.title}}</div> <div class="info"><span>{{dayjs(item.publishTime).format(\'YYYY-MM-DD HH:mm:ss\')}}</span><span><i class="fa fa-eye" aria-hidden="true"></i>{{item.views}}</span> </div> </div> <div class="right"> <img :src="item.fileThumb"> </div> </li>'
})

Vue.component('ebkh5-article-grid-item', {
    props: ['item'],
    data: function () {
        return {
            text: ""
        }
    },
    methods: {
        jumpToDetail(item) {
            window.location.href = controllerPathPrefix + "/hotelTraining/detail?param=" + encodeURIParam({
                id: item.id,
                score: item.score,
                views: item.views
            })
        }
    },
    template: `<li class="ebkh5-article-grid-item"  @click="jumpToDetail(item)">
                    <div class="cover"><img :src="item.fileThumb" alt=""></div>
                    <div class="bottom">
                        <div class="title">{{item.title}}</div>
                        <div class="info"><span class="grade">{{item.score}}分</span><span><i class="fa fa-eye"
                                                                                             aria-hidden="true"></i>{{item.views}}</span>
                        </div>
                    </div>
            </li>
`
})
