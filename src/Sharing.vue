<template>
    <a class="w-sharing" :href="sharelink" target="_blank">
        <img class="u-icon" svg-inline src="../assets/img/widget/share.svg" />
        <!-- <i class="el-icon-position"></i> -->
        <span class="u-text">分享</span>
    </a>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "Sharing",
    props: ["title", "pic"],
    data: function() {
        return {
            api: "https://service.weibo.com/share/share.php?",
            url: location.href,
            til: this.title || document.title,
            img: this.pic || __imgPath + `image/common/logo.png`,
        };
    },
    computed: {
        sharelink: function() {
            return (
                this.api +
                `url=${this.url}` +
                `&title=${this.til}` +
                `&pic=${this.img}`
            );
        },
    },
    methods: {},
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/sharing.less";
</style>
