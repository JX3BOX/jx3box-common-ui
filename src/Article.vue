<template>
    <div id="c-article" class="c-article" ref="article">
        <!-- <div class="c-article-pages" v-if="hasPages"></div> -->
    </div>
</template>

<script>
import lazyload from "../includes/article/img";
import iframeFilter from "../includes/article/iframe";
import fixXSS from "../includes/article/script";
import formatLink from "../includes/article/a";
// import splitPages from '../includes/article/nextpage'
import Prism from "prismjs";
import fold from "../includes/article/fold";
import directory from "../includes/article/directory";
import macro from "../includes/article/macro";
import qixue from "../includes/article/qixue";

export default {
    name: "Article",
    props: ["content", "directorybox"],
    data: function() {
        return {
            data: "",
            dataChunk: [],
        };
    },
    computed: {
        hasPages: function() {
            return this.dataChunk > 1;
        },
    },
    mounted: function() {
        // 指定根节点
        const $root = this.$refs.article;
        if ($root) {
            // 过滤内容
            this.data = lazyload(this.content);
            this.data = iframeFilter(this.data);
            this.data = fixXSS(this.data);
            this.data = formatLink(this.data);
            // this.dataChunk = splitPages(this.data)

            // 渲染内容
            $root.innerHTML = this.data;
            this.$emit("contentLoaded");

            // 绑定DOM操作
            Prism.highlightAllUnder($root);
            fold($root);
            macro();    //旧版
            qixue();    //旧版
            this.$emit("contentRendered");

            // 目录
            let dir = directory($root, this.directorybox);
            if (dir) this.$emit("directoryRendered");
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/article.less";
</style>
