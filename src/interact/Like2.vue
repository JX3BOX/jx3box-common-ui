<template>
    <div class="w-like2">
      <img @click="addLike" class="u-icon" svg-inline src="../../assets/img/widget/like.svg" />
      <span>{{ count }}</span>
    </div>
</template>

<script>
import { postStat, getStat } from "@jx3box/jx3box-common/js/stat";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import _ from "lodash";
export default {
    name: "Like2",
    props: [
        "postType",
        "postId",
    ],
    data: function () {
        return {
            status: false,
            count: 0,
        };
    },
    computed: {
        ready() {
            return !!(this.postType && this.postId);
        }
    },
    watch: {
        ready(val) {
            if (val) {
                // 传入 type 和 id 改变时触发
                this.loadStat()
            }
        }
    },
    methods: {
        init: function () {
            this.loadStat();
        },

        loadStat: function (){
            // if (!ready) return
            getStat(this.postType, this.postId).then(res => {
                this.count = res.likes || 0;
            });
        },
        // 点赞
        addLike: function () {
            if (!this.ready) return
            this.count++;
            this.status = !this.status;
            
            this.postType && this.postId && postStat(this.postType, this.postId, "likes")
        },
    },
    mounted: function () {
        this.init()
    },
};
</script>

<style lang="less">
// @import "../../assets/css/like.less";
@import "../../assets/css/like2.less";
</style>
