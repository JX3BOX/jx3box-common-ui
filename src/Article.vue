<template>
    <div class="c-article-box">
        <div id="c-article" class="c-article" ref="article">
            <div
                class="c-article-chunk"
                v-for="(text, i) in data"
                :key="i"
                v-html="text" 
                :class="{ on: i == page - 1 || all == true }"
                :id="'c-article-part' + ~~(i + 1) "
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
import '@jx3box/jx3box-article-ui/dist/css/article.css'

export default {
    name: "Article",
    props: ["content", "directorybox"],
    data: function() {
        return {
            all: false,
            page: 1,
            data: []
        };
    },
    computed: {
        total: function() {
            return this.chunks.length;
        },
        hasPages: function() {
            return this.chunks.length > 1;
        },
        origin : function (){
            return this.content
        },
        chunks : function (){
            return splitPages(this.origin);
        },
    },
    methods: {
        doReg: function(data) {
            if(data){
                // 过滤内容
                data = lazyload(data);
                data = iframeFilter(data);
                data = fixXSS(data);
                data = formatLink(data);
                return data;
            }else{
                return ''
            }
        },
        doDOM: function($root) {
            // DOM操作
            $root && Prism.highlightAllUnder($root);
            fold($root);
            macro(); //旧版
            qixue(); //旧版
        },
        doDir: function() {
            // 显示局部
            let target= ''
            if(this.hasPages && !this.all){
                target = '#c-article-part' + this.page
            // 全部
            }else{
                target = '#c-article'
            }
            let dir = directory(target, this.directorybox);
            if (dir) this.$emit("directoryRendered");
        },
        changePage: function(i) {
            this.page = i
            window.scrollTo(0,0)
            this.$nextTick(() => {
                this.doDir()
            })
        },
        showAll: function() {
            this.all = true;
            this.$nextTick(() => {
                this.doDir()
            })
        },
        render : function (){
            let result = []
            for (let chunk of this.chunks) {
                let _chunk = this.doReg(chunk);
                result.push(_chunk);
            }
            this.data = result
        },
        run : function (){
            this.render()
            // 等待html加载完毕后
            this.$nextTick(() => {
                this.$emit("contentLoaded");
                // 统一DOM处理
                const $root = this.$refs.article
                this.doDOM($root);
                this.$emit("contentRendered");
                // 目录处理
                this.doDir()
            })
        }
    },
    watch : {
        content : function (){
            this.run()
        }
    },
    mounted: function() {
        this.run()
    },
};
</script>

<style lang="less">
</style>
