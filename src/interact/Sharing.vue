<template>
    <a class="w-sharing" :href="sharelink" target="_blank">
        <img class="u-icon" svg-inline src="../../assets/img/widget/share.svg" />
        <!-- <i class="el-icon-position"></i> -->
        <span class="u-text">分享</span>
    </a>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Sharing",
    props: ["title", "pic", "url"],
    data: function() {
        return {
            api: "https://service.weibo.com/share/share.php?",
        };
    },
    computed: {
        url_: function() {
            return (
                this.url ||
                location.origin + location.pathname + location.search
            );
        },
        title_: function() {
            return this.title || document.title;
        },
        pic_: function() {
            return this.pic || __imgPath + `image/common/logo.png`;
        },
        sharelink: function() {
            return (
                this.api +
                `url=${this.url_}` +
                `&title=${this.title_}` +
                `&pic=${this.pic_}`
            );
        },
    },
    methods: {},
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../../assets/css/sharing.less";
</style>
