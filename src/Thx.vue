<template>
    <div class="w-thx">
        <div class="w-thx-panel">
            <Like :postId="postId" :postType="postType"></Like>
            <fav :postId="postId" :postType="postType"></fav>
            <!-- 
            投币(带回调redirect)[规则]
            评分 >=32[规则]
            -->
            <Share :postId="postId" :postType="postType" />
        </div>
        <div class="w-thx-records">
            <!-- 投币/评分记录-->
        </div>
        <div class="w-thx-copyright">
            <!-- （原创声明）创作版权声明、转载要求 -->
        </div>
    </div>
</template>

<script>
import Like from "./interact/Like2.vue";
import Share from "./interact/Share2.vue";
import Fav from "./interact/Fav2.vue";
export default {
    name: "Thx",
    props: ["postId", "postType"],
    inject: [],
    components: {
        Like,
        Share,
        Fav,
    },
    data: function () {
        return {};
    },
    computed: {},
    provide() {
        return {
            //父组件传递给子组件的全部
        };
    },
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