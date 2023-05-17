<!--
 * @Author: iRuxu
 * @Date: 2022-04-29 22:34:07
 * @LastEditTime: 2022-07-24 16:51:43
 * @Description:
-->
<template>
    <div class="w-like2" :class="{ disabled:!status }" @click="addLike" v-if="ready">
        <el-tooltip effect="dark" content="点赞" placement="top-start">
            <div>
                <img
                    class="u-icon"
                    svg-inline
                    :src="likeImg"
                />
                <span class="u-count" v-if="count">{{ count }}</span>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import { postStat, getStat } from "@jx3box/jx3box-common/js/stat";
import _ from "lodash";
export default {
    name: "Like2",
    props: ["postType", "postId"],
    data: function () {
        return {
            status: true,
            count: 0,

            likeImg: require("../../assets/img/widget/like4.png"),
        };
    },
    computed: {
        ready() {
            return this.postType && this.postId;
        },
    },
    methods: {
        init: function () {
            this.loadStat();
        },
        loadStat: function () {
            getStat(this.postType, this.postId).then((res) => {
                this.count = res.data.likes || 0;
            });
        },
        // 点赞
        addLike: function () {
            if (!this.ready) return;
            this.likeImg = require("../../assets/img/widget/like4ing.gif");
            this.count++;
            if (this.status) {
                postStat(this.postType, this.postId, "likes");
            }
            this.status = false;
            _.debounce(() => {
                this.likeImg = require("../../assets/img/widget/like4.png");
            }, 2800)();
        },
    },
    watch : {
        postId: {
            handler: function (val) {
                val && this.init();
            },
            immediate: true,
        },
    }
};
</script>

<style lang="less">
@import "../../assets/css/like2.less";
</style>
