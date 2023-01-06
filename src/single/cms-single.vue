<template>
    <div class="m-single-box">
        <!-- 头部 -->
        <PostHeader :post="post" :stat="stat">
            <slot name="single-header"></slot>
        </PostHeader>

        <!-- 文章前 -->
        <div class="m-single-prepend">
            <!-- 联合创作者 -->
            <Creators class="m-single-creators" :postId="id" :postType="post_type" @load-authors="loadAuthors" />
            <!-- 文集小册 -->
            <Collection
                class="m-single-collection"
                :id="collection_id"
                :defaultVisible="collection_collapse"
                @collectionUpdate="updateCollection"
            />
            <slot name="single-prepend"></slot>
        </div>

        <!-- 文章内容 -->
        <div class="m-single-post" v-if="visible">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <slot></slot>
                <ArticleMarkdown v-if="isMarkdown" :content="post_content" @directoryRendered="updateDirectory" />
                <Article v-else :content="post_content" @directoryRendered="updateDirectory" />
            </div>
        </div>
        <div class="m-single-null" v-else>
            <el-alert :title="null_tip" type="warning" show-icon></el-alert>
        </div>

        <!-- 文章后 -->
        <div class="m-single-append">
            <slot name="single-append"></slot>

            <!-- 打赏 -->
            <Thx
                class="m-single-thx"
                :postId="id"
                :postType="post_type"
                :postTitle="post_title"
                :userId="author_id"
                :adminBoxcoinEnable="true"
                :userBoxcoinEnable="true"
                :authors="authors"
                :client="post_client"
            />

            <!-- 评论 -->
            <div ref="commentView" class="m-single-comment">
                <el-divider content-position="left">评论</el-divider>
                <Comment :id="id" category="post" v-if="id && allow_comment" />
                <el-alert title="作者没有开启评论功能" type="warning" show-icon v-else></el-alert>
            </div>
        </div>

        <!-- 底部 -->
        <footer class="m-single-footer">
            <slot name="single-footer"></slot>
        </footer>

        <right-affix
            :postId="id"
            :postType="post_type"
            :postTitle="post_title"
            :showComment="id && allow_comment"
            @toComment="toComment($event)"
        ></right-affix>
    </div>
</template>

<script>
import PostHeader from "./PostHeader.vue";
import Creators from "./Creators.vue";
import Collection from "./Collection.vue";
import Thx from "./Thx.vue";
import RightAffix from "./right-affix.vue";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import ArticleMarkdown from "@jx3box/jx3box-editor/src/ArticleMarkdown.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { __visibleMap } from "@jx3box/jx3box-common/data/jx3box.json";
import { getAppType } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "cms-single",
    components: {
        PostHeader,
        Creators,
        Collection,
        Thx,
        Article,
        ArticleMarkdown,
        Comment,
        RightAffix,
    },
    props: ["post", "stat"],
    data: function () {
        return {
            collection_data: "",
            directory: false,

            // 创作者
            other_authors: [],
            super_author: "",
        };
    },
    computed: {
        id: function () {
            return ~~this.post?.ID || 0;
        },
        app_type: function () {
            return getAppType();
        },
        post_type: function () {
            return this.post?.post_type;
        },
        post_title: function () {
            return this.post?.post_title;
        },
        author_id: function () {
            return this.post?.post_author;
        },
        collection_id: function () {
            return this.post?.post_collection;
        },
        collection_collapse: function () {
            return this.post?.collection_collapse;
        },
        visible: function () {
            return !!this.post?._check;
        },
        null_tip: function () {
            let str = "作者设置了【";
            str += __visibleMap[this.post?.visible];
            str += "】";
            return str;
        },
        post_content: function () {
            return this.post?.post_content || "";
        },
        post_mode: function () {
            return this.post?.post_mode || "tinymce";
        },
        isMarkdown: function () {
            return this.post_mode == "markdown";
        },
        allow_comment: function () {
            return !this.post?.comment;
        },
        extend_data: function () {
            return {
                collection_data: this.collection_data,
                directory: this.directory,
            };
        },
        authors: function () {
            if (this.other_authors && this.other_authors.length) {
                return [this.super_author, ...this.other_authors];
            }
            return [];
        },
        post_client: function () {
            return this.post?.client || "all";
        },
    },
    methods: {
        updateCollection: function (val) {
            this.collection_data = val;
        },
        updateDirectory: function (val) {
            this.directory = val;
        },
        loadAuthors({ super_author, other_authors }) {
            this.super_author = super_author;
            this.other_authors = other_authors;
        },
        toComment() {
            this.$refs.commentView.scrollIntoView({
                block: "center",
                behavior: "auto",
            });
        },
    },
    watch: {
        extend_data: {
            deep: true,
            immediate: true,
            handler: function (val) {
                this.$emit("extendUpdate", val);
            },
        },
        post_type: {
            deep: true,
            immediate: true,
            handler: function (val) {
                if (location.host.includes("localhost")) {
                    return;
                }

                if (val && val !== this.app_type) {
                    location.href = `/${val}/${this.id}`;
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/cms-single.less";
</style>
