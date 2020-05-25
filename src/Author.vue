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
            <a v-if="data.weibo_name" class="u-weibo" :href="data.weibo_url"
                ><img svg-inline src="../assets/img/author/weibo.svg" />{{
                    data.weibo_name
                }}</a
            >
            <a v-if="data.github_name" class="u-github" :href="data.github_url"
                ><img svg-inline src="../assets/img/author/github.svg" />{{
                    data.github_name
                }}</a
            >
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
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
        link: function() {
            return "/author/?uid=" + this.author.uid;
        },
    },
    methods: {},
    filters: {
        avatar: function(val) {
            return showAvatar(val);
        },
    },
    mounted: function() {
        if (!this.uid) {
            this.data = this.author;
        } else {
            getUserInfo(this.uid).then((res) => {
                this.data = res.data.data;
            });
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
