<template>
    <div class="c-authorposts">
        <el-divider class="u-label" content-position="left">作者最新作品</el-divider>
        <ul v-if="data.length">
            <li v-for="(item, i) in data" :key="i">
                <a :href="url(item.post.ID, item.post.post_type)" target="_blank">
                    <img
                        class="u-icon"
                        svg-inline
                        src="../assets/img/rightsidebar/repo.svg"
                    />
                    <span>{{ item.post.post_title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { __server, __v2 ,__Root} from "@jx3box/jx3box-common/js/jx3box.json";
import axios from "axios";
const API = __server + 'post/list'
// const API = "http://localhost:5160/" + "post/list";
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
        if(!this.uid) return
        axios
            .get(API, {
                params: {
                    author: this.uid,
                },
            })
            .then((res) => {
                this.data = res.data.data.list.slice(0,6);
            });
    },
};
</script>

<style lang="less">
@import "../assets/css/authorposts.less";
</style>
