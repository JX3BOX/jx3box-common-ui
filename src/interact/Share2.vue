<template>
    <div class="w-share2">
        <el-tooltip class="item" effect="dark" content="转发" placement="top">
            <div>
                <img
                    class="u-icon"
                    svg-inline
                    src="../../assets/img/widget/share2.svg"
                />
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import { postStat, getStat } from "@jx3box/jx3box-common/js/stat";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import _ from "lodash";
export default {
    name: "Share2",
    props: ["postType", "postId"],
    data: function () {
        return {
        };
    },
    computed: {
        ready() {
            return !!(this.postType && this.postId);
        },
    },
    methods: {
        init: function () {
        },
    },
    mounted: function () {
        this.init();
    },
};
</script>

<style lang="less">
@import "../../assets/css/share2.less";
</style>
