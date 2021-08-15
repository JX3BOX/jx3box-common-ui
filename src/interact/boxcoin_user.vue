<template>
    <div class="w-boxcoin-user">
        <el-tooltip effect="dark" content="投币" placement="top-start">
            <div class="w-boxcoin-block">
                <img
                    @click="openBoxcoinPop"
                    class="u-icon"
                    svg-inline
                    src="../../assets/img/widget/heart1.svg"
                />
                <span class="u-count" v-if="boxcoin">{{boxcoin}}</span>
            </div>
        </el-tooltip>
        <!-- POP:规则 -->
        <!-- 投币(带回调redirect)[规则] -->
        <!-- 未登录则登录跳转 -->
    </div>
</template>

<script>
export default {
    name: "BoxcoinAdmin",
    props: ["boxcoin", "postType", "postId"],
    components: {},
    data: function () {
        return {
            visible: false,
        };
    },
    computed: {},
    watch: {},
    methods: {
        openBoxcoinPop: function () {
            this.visible = true;
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.w-boxcoin-user {
    .pointer;
    .dbi;
    .u-icon {
        .size(26px);
        .y;
        .pr;
        top: -2px;
    }
    .u-count {
        color: #888;
        .ml(10px);
    }
}
</style>