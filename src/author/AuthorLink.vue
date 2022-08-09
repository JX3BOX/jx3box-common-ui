<template>
    <div class="c-author-link">
        <a v-if="data.weibo_name" class="u-link u-link__weibo" :href="weiboLink(data.weibo_id)" target="_blank">
            <img svg-inline src="../../assets/img/author/weibo.svg" />
            {{ data.weibo_name }}
        </a>
        <a v-if="data.github_name" class="u-link u-link__github" :href="githubLink(data.github_name)" target="_blank">
            <img svg-inline src="../../assets/img/author/github.svg" />
            {{ data.github_name }}
        </a>
        <div v-if="data.tuilan_id" class="u-link u-link__tuilan" title="推栏ID">
            <img src="../../assets/img/author/tuilan.png" />
            {{ data.tuilan_id }}
        </div>
        <a v-if="data.tv_type && data.tv_id" class="u-link u-link__tv" :href="tv_link" target="_blank">
            <img :src="tv_img" />
            {{ data.tv_id }}
        </a>
    </div>
</template>

<script>
export default {
    name: "AuthorLink",
    props: ["data"],
    components: {},
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        weiboLink: function (val) {
            return "https://weibo.com/" + val;
        },
        githubLink: function (val) {
            return "https://github.com/" + val;
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.c-author-link{

}
</style>
