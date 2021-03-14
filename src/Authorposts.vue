<template>
    <div class="c-authorposts">
        <div class="u-label">
            <i class="el-icon-s-management"></i>
            <span>作者最新作品</span>
            <a :href="id | authorLink" class="u-more" target="_blank">全部 &raquo;</a>
        </div>
        
        <ul v-if="data && data.length">
            <li v-for="(item, i) in data" :key="i">
                <a
                    class="u-item"
                    :href="url(item.post.ID, item.post.post_type)"
                    target="_blank"
                >
                    <span>&raquo; {{ item.post.post_title || item.post.post_type + '/无标题' }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { getUserPosts } from "../service/author";
import {authorLink,getLink} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "Authorposts",
    props: ["uid"],
    data: function() {
        return {
            data: [],
            id : this.uid || 0,
        };
    },
    computed : {
    },
    watch : {
        uid : function (newid){
            this.id = newid
            this.init()
        }
    },
    methods: {
        url: function(pid, type) {
            return getLink(type,pid)
        },
        init : function (){
            if (!this.id) return;
            getUserPosts(this.id).then((res) => {
                this.data = res.data.data.list.slice(0, 6);
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    filters : {
        authorLink
    },
    mounted: function() {
        this.init()
    },
};
</script>

<style lang="less">
@import "../assets/css/authorposts.less";
</style>
