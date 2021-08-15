<template>
    <div class="w-thx">
        <div class="w-thx-panel">
            <boxcoin-admin :postId="postId" :postType="postType" v-if="hasRight"/>
            <Like :postId="postId" :postType="postType"></Like>
            <fav :postId="postId" :postType="postType"></fav>
            <boxcoin-user :postId="postId" :postType="postType" :boxcoin="boxcoin"/>
            <Share :postId="postId" :postType="postType" />
        </div>
        <div class="w-thx-records">
            <boxcoin-records :postId="postId" :postType="postType" />
        </div>
        <div class="w-thx-copyright">
            所有原创作品，著作权归作者所有，所有未经授权的非署名转载或抄袭将有权追究法律责任，所有法律事务由专聘律师代理。<br>
            签约作者独家特约稿件，及所有魔盒官方评分作品用户一经兑现则视为有偿付费稿件，所有商业稿件的转载引用需同时征得魔盒平台授权。
        </div>
    </div>
</template>

<script>
import Like from "./interact/Like2.vue";
import Share from "./interact/Share2.vue";
import Fav from "./interact/Fav2.vue";
import BoxcoinRecords from './interact/boxcoin_records.vue';
import BoxcoinAdmin from './interact/boxcoin_admin.vue';
import BoxcoinUser from './interact/boxcoin_user.vue';
import User from '@jx3box/jx3box-common/js/user'
export default {
    name: "Thx",
    props: ["postId", "postType"],
    components: {
        Like,
        Share,
        Fav,
        'boxcoin-records':BoxcoinRecords,
        'boxcoin-admin':BoxcoinAdmin,
        'boxcoin-user':BoxcoinUser,
    },
    data: function () {
        return {
            boxcoin : 0,
            hasRight : User.getInfo().group >= 32
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/thx.less";
</style>