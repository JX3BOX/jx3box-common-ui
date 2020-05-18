<template>
    <div class="c-authorposts">
        <div class="u-label">📋 最新作品</div>
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
import { __server, __v2 } from "@jx3box/jx3box-common/js/jx3box.json";
import axios from "axios";
const API = __server + '/post/list'
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
            // TODO:修改地址
            return __v2 + type + "/" + "?pid=" + id;
        },
    },
    mounted: function() {
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
.c-authorposts {
    ul {
        list-style: none;
        padding: 0 10px;
        margin: 0;
    }
    li {
        padding:2px 10px;
    }
    a {
        .db;
        .nobreak;
        .fz(14px,2);
        color:@color;
        &:hover{
            color:@primary;
        }
    }
    .u-icon {
        .size(16px);
        .y;
        .mr(2px);
    }
    .u-label{
        padding:5px 10px;
        .fz(14px);
        .bold;
        // color:#888;
        
    }
}
</style>
