<template>
    <div class="w-like2" :class="{ disabled:!status }">
        <el-tooltip class="item" effect="dark" content="点赞" placement="top">
            <div>
                <img
                    @click="addLike"
                    class="u-icon"
                    svg-inline
                    src="../../assets/img/widget/like2.svg"
                />
                <span class="u-count" v-if="count">{{ count }}</span>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import { postStat, getStat } from "@jx3box/jx3box-common/js/stat";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import _ from "lodash";
export default {
    name: "Like2",
    props: ["postType", "postId"],
    data: function () {
        return {
            status: true,
            count: 0,
        };
    },
    computed: {
        ready() {
            return !!(this.postType && this.postId);
        },
    },
    methods: {
        init: function () {
            this.loadStat();
        },
        loadStat: function () {
            this.ready &&
                getStat(this.postType, this.postId).then((res) => {
                    this.count = res.data?.likes || 0;
                });
        },
        // 点赞
        addLike: function () {
            if (!this.ready) return;
            this.count++;
            if (this.status) {
                postStat(this.postType, this.postId, "likes");
            }
            this.status = false;
        },
    },
    mounted: function () {
        this.init();
    },
};
</script>

<style lang="less">
@import "../../assets/css/like2.less";
</style>
