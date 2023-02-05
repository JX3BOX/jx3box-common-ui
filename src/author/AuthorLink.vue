<template>
    <div class="c-author-link" v-if="isExist">
        <!-- <AuthorMsg :uid="uid"/> -->
        <a
            v-if="data.weibo_name"
            class="u-link u-link__weibo"
            :href="weiboLink(data.weibo_id)"
            target="_blank"
            :title="data.weibo_name"
        >
            <img :src="getIcon('weibo')" />
        </a>
        <a
            v-if="data.github_name"
            class="u-link u-link__github"
            :href="githubLink(data.github_name)"
            target="_blank"
            :title="data.github_name"
        >
            <img :src="getIcon('github')" />
        </a>
        <a
            v-if="data.tv_type && data.tv_id"
            class="u-link u-link__tv"
            :class="'u-link__' + data.tv_type"
            :href="tv_link"
            target="_blank"
            :title="`房间号:${data.tv_id}`"
        >
            <img :src="getIcon(data.tv_type)" />
        </a>
    </div>
</template>

<script>
import { tvLink } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
// import AuthorMsg from "./AuthorMsg.vue";
export default {
    name: "AuthorLink",
    props: ["data"],
    components: {
        // AuthorMsg
    },
    data: function () {
        return {};
    },
    computed: {
        tv_link: function () {
            return tvLink(this.data.tv_type, this.data.tv_id) || "";
        },
        isExist(){
            return this.data.weibo_name || this.data.github_name || (this.data.tv_type && this.data.tv_id)
        }
    },
    watch: {},
    methods: {
        weiboLink: function (val) {
            return "https://weibo.com/" + val;
        },
        githubLink: function (val) {
            return "https://github.com/" + val;
        },
        getIcon: function (val) {
            // return __imgPath + "image/author/" + val + ".svg";
            return require("../../assets/img/author/" + val + ".svg");
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.c-author-link {
    padding: 0 2px;
    .flex;
    align-items: center;
    .u-link {
        .mr(3px);
        .r(50%);
        .flex;
        justify-content: center;
        align-items: center;
        .size(18px);
        box-sizing: border-box;
    }
    img,
    svg {
        .size(18px);
    }
    .u-link__weibo {
        background-color: #ffbf5f;
        padding: 2px;
    }
    .u-link__bilibili {
        padding: 3px;
        background-color: #ff549d;
        svg {
            fill: #fff;
        }
    }
    .u-link__huya{
        padding: 2px;
        background-color: #ffbf5f;
    }
    .u-link__douyu{
    }
}
</style>
