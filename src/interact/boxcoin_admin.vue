<template>
    <div class="w-boxcoin-admin">
        <el-tooltip effect="dark" content="评分" placement="top-start">
            <div>
                <img
                    @click="openBoxcoinPop"
                    class="u-icon"
                    svg-inline
                    src="../../assets/img/widget/like3.svg"
                />
            </div>
        </el-tooltip>
        <!-- POP:规则 -->
    </div>
</template>

<script>
export default {
    name: "BoxcoinAdmin",
    props: ["postType", "postId"],
    components: {},
    data: function () {
        return {
            visible : false
        };
    },
    computed: {},
    watch: {},
    methods: {
        openBoxcoinPop : function (){
            this.visible = true
        }
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.w-boxcoin-admin {
    .pointer;
    .dbi;
    .u-icon {
        .size(26px);
        .y;
        .pr;
        top: -1px;
    }
}
</style>