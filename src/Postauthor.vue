<template>
    <div class="c-author" v-if="author">
        <a class="u-author" :href="link">
            <img
                class="u-avatar"
                :src="author.avatar | avatar"
                :alt="author.name"
            />
            <span class="u-name">{{ author.name }}</span>
        </a>
        <div class="u-bio">{{ author.bio }}</div>
        <div class="u-link" v-if="author.weibo_name || author.github_name">
            <a v-if="author.weibo_name" class="u-weibo" :href="author.weibo_url"
                ><img svg-inline src="../assets/img/author/weibo.svg" />{{
                    author.weibo_name
                }}</a
            >
            <a
                v-if="author.github_name"
                class="u-github"
                :href="author.github_url"
                ><img svg-inline src="../assets/img/author/github.svg" />{{
                    author.github_name
                }}</a
            >
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Postauthor",
    props: ["author"],
    data: function() {
        return {};
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
    mounted: function() {},
};
</script>

<style lang="less">
.c-author {
    margin: 10px;

    .u-author {
        .clearfix;
        .db;
    }
    .u-avatar {
        .r(4px);
        .fl;
        .mr(10px);
    }
    .u-name {
        .bold;
        .lh(2);
    }
    .u-bio {
        padding: 10px;
        .fz(13px, 2);
        border-bottom: 1px dashed #eee;
        .break(3);
    }
    .u-link {
        border-bottom: 1px solid #eee;
        a {
            .db;
            margin: 10px;
            .fz(13px, 20px);
        }
        svg {
            .size(20px);
            .mr(10px);
            .fl;
        }
    }
}
</style>
