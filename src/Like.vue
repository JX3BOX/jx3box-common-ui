<template>
    <el-button class="w-like" size="mini" type="primary" @click="doLike">
        <i v-if="!status" class="u-heart"><img svg-inline src="../assets/img/widget/heart.svg" /></i>
        <i v-else class="u-heart"><img svg-inline src="../assets/img/widget/heart2.svg" /></i>
        <span>喜欢</span>
    </el-button>
</template>

<script>
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import { addLike } from "../service/like";
export default {
    name: "Like",
    data: function() {
        return {
            pid: getRewrite("pid"),
            status : false
        };
    },
    computed: {
    },
    methods: {
        doLike: function() {
            this.status = !this.status
            this.status && this.pid && addLike(this.pid)
        },
    },
    mounted: function() {
    },
};
</script>

<style lang="less">
    @import '../assets/css/like.less';
</style>
