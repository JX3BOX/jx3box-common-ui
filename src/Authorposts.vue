<template>
    <div class="c-authorposts">
        <div class="u-label"><i class="el-icon-s-management"></i><span>作者最新作品</span></div>
        
        <ul v-if="data.length">
            <li v-for="(item, i) in data" :key="i">
                <a
                    :href="url(item.post.ID, item.post.post_type)"
                    target="_blank"
                >
                    <!-- <img
                        class="u-icon"
                        svg-inline
                        src="../assets/img/rightsidebar/repo.svg"
                    /> -->
                    <span>&raquo; {{ item.post.post_title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import { getUserPosts } from "../service/author";
export default {
    name: "Authorposts",
    props: ["uid"],
    data: function() {
        return {
            data: [],
        };
    },
    methods: {
        url: function(id, type) {
            return __Root + type + "/" + id;
        },
    },
    mounted: function() {
        if (!this.uid) return;
        getUserPosts(this.uid).then((res) => {
            this.data = res.data.data.list.slice(0, 6);
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/authorposts.less";
</style>
