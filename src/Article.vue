<template>
    <div class="c-article-box">
        <div id="c-article" class="c-article" ref="article">
            <div
                class="c-article-chunk"
                v-for="(text, i) in result"
                :key="i"
                v-html="text"
                :class="{ on: i == page - 1 || all == true }"
            ></div>
        </div>
        <el-button
            class="c-article-all"
            type="primary"
            v-if="!all && hasPages"
            @click="showAll"
            >加载全部</el-button
        >
        <el-pagination
            class="c-article-pages"
            v-if="!all"
            background
            :page-size="1"
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import lazyload from "../includes/article/img";
import iframeFilter from "../includes/article/iframe";
import fixXSS from "../includes/article/script";
import formatLink from "../includes/article/a";
import splitPages from "../includes/article/nextpage";
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
            origin: "",
            chunks: [],
            result: [],
            all: false,
            page: 1,
        };
    },
    computed: {
        total: function() {
            return this.chunks.length;
        },
        hasPages: function() {
            return this.chunks.length > 1;
        },
    },
    methods: {
        doReg: function(data) {
            // 过滤内容
            data = lazyload(data);
            data = iframeFilter(data);
            data = fixXSS(data);
            data = formatLink(data);
            return data;
        },
        doDOM: function($root) {
            // DOM操作
            Prism.highlightAllUnder($root);
            fold($root);
            macro(); //旧版
            qixue(); //旧版
        },
        doTask: function($root, data) {
            // 构建目录
            let dir = directory($root, this.directorybox);
            if (dir) this.$emit("directoryRendered");
        },
        changePage: function(i) {
            this.page = i
        },
        showAll: function() {
            this.all = true;
        },
    },
    mounted: function() {
        // 指定根节点
        const $root = this.$refs.article;
        this.origin = this.content;

        // 分页划分
        this.chunks = splitPages(this.origin);
        for (let chunk of this.chunks) {
            // 正则过滤
            let _chunk = this.doReg(chunk);
            this.result.push(_chunk);
            this.$emit("contentLoaded");
        }

        // 统一DOM处理
        this.doDOM($root);
        this.$emit("contentRendered");
    },
};
</script>

<style lang="less">
// @import "../assets/css/article.less";
</style>
