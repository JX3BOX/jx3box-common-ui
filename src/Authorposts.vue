<template>
    <div class="c-authorposts">
        <div class="u-label">
            <i class="el-icon-s-management"></i>
            <span>作者最新作品</span>
            <a :href="author_link" class="u-more">全部 &raquo;</a>
        </div>
        
        <ul v-if="data.length">
            <li v-for="(item, i) in data" :key="i">
                <a
                    class="u-item"
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
            id : 0
        };
    },
    computed : {
        author_link : function (){
            console.log(this.id)
            return __Root + 'author/?uid=' + this.id
        },
    },
    watch : {
        uid : function (newid){
            this.id = newid
            this.init()
        }
    },
    methods: {
        url: function(pid, type) {
            return __Root + type + "/?pid=" + pid;
        },
        init : function (){
            if (!this.id) return;
            getUserPosts(this.id).then((res) => {
                this.data = res.data.data.list.slice(0, 6);
            });
        }
    },
    mounted: function() {
        this.init()
    },
};
</script>

<style lang="less">
@import "../assets/css/authorposts.less";
</style>
