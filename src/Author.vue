<template>
    <div class="c-author" v-if="data">
        <div class="u-author">
            <a :href="link"
                ><img
                    class="u-avatar"
                    :src="data.avatar | avatar"
                    :alt="data.name"
            /></a>
            <a class="u-name" :href="link"
                ><span>{{ data.name }}</span></a
            >
        </div>
        <div class="u-bio">{{ data.bio }}</div>
        <div class="u-link" v-if="data.weibo_name || data.github_name">
            <a
                v-if="data.weibo_name"
                class="u-weibo"
                :href="data.weibo_url"
                target="_blank"
                ><img svg-inline src="../assets/img/author/weibo.svg" />{{
                    data.weibo_name
                }}</a
            >
            <a
                v-if="data.github_name"
                class="u-github"
                :href="data.github_url"
                target="_blank"
                ><img svg-inline src="../assets/img/author/github.svg" />{{
                    data.github_name
                }}</a
            >
            <span v-if="data.tuilan_id" class="u-tuilan" title="推栏ID">
                <img src="../assets/img/author/tuilan.png" />{{
                    data.tuilan_id
                }}
            </span>
            <a
                v-if="data.tv_type && data.tv_id"
                class="u-tv"
                :href="tv_link"
                target="_blank"
                ><img :src="tv_img" />{{ data.tv_id }}</a
            >
        </div>
        <div class="u-trophy">
            <div class="u-label">
                <i class="el-icon-trophy"></i><span>作者荣誉</span>
            </div>
        </div>

        <slot></slot>
    </div>
</template>

<script>
import {
    showAvatar,
    authorLink,
    getTVlink,
} from "@jx3box/jx3box-common/js/utils";
import { __server,__imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import { getUserInfo } from "../service/author";
export default {
    name: "Author",
    props: ["author", "uid"],
    data: function() {
        return {
            data: "",
        };
    },
    computed: {
        id: function() {
            return this.uid || this.author.uid;
        },
        link: function() {
            return authorLink(this.id);
        },
        tv_link: function() {
            return getTVlink(this.data.tv_type, this.data.tv_id) || "";
        },
        tv_img: function() {
            return __imgPath + 'image/tv/' + this.data.tv_type + ".png";
        },
    },
    filters: {
        avatar: function(val) {
            return showAvatar(val);
        },
    },
    methods: {
        loadData: function() {
            getUserInfo(this.id).then((res) => {
                this.data = res.data.data;
            });
        },
    },
    watch: {
        author: function(newdata) {
            this.data = newdata;
            this.$forceUpdate();
        },
        uid: function() {
            this.loadData();
        },
    },
    mounted: function() {
        if (this.author) {
            this.data = this.author;
        } else if (this.uid) {
            this.loadData();
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
