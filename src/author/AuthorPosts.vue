<template>
    <div class="c-author-posts" v-if="ready">
        <div class="u-label">
            <!-- <i class="el-icon-notebook-2"></i> -->
            <img svg-inline src="../../assets/img/leftsidebar/post.svg" />
            <span>最新作品</span>
            <a :href="uid | authorLink" class="u-more" target="_blank"
                ><img svg-inline src="../../assets/img/leftsidebar/more.svg"
            /></a>
        </div>

        <ul class="u-list" v-if="data && data.length">
            <li v-for="(item, i) in data" :key="i">
                <a class="u-item" :href="url(item.ID, item.post_type)" target="_blank">
                    <span>
                        <img svg-inline src="../../assets/img/leftsidebar/arrow.svg" class="u-icon" />
                        {{ item.post_title || item.post_type + "/无标题" }}
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { authorLink, getLink } from "@jx3box/jx3box-common/js/utils";
import { getUserPosts } from "../../service/author";
export default {
    name: "AuthorPosts",
    props: ["uid"],
    data: function () {
        return {
            data: [],
        };
    },
    computed: {
        ready: function () {
            return this.uid && this.data && this.data.length;
        },
    },
    watch: {
        uid: {
            immediate: true,
            handler: function (val) {
                val && this.init();
            },
        },
    },
    methods: {
        url: function (pid, type) {
            return getLink(type, pid);
        },
        init: function () {
            getUserPosts(this.uid)
                .then((data) => {
                    this.data = data.slice(0, 5);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    filters: {
        authorLink,
    },
};
</script>

<style lang="less">
.c-author-posts {
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li {
        .db;
    }
    .u-item {
        .db;
        padding: 3px 2px;
        .nobreak;
        .fz(12px,2);
        color: #666;
        border-bottom: 1px solid transparent;
        &:hover {
            color: @pink;
            // background-color:#fff;
            // border-bottom: 1px solid @border;
            .u-icon{
                transform: translateX(5px);
            }
        }
    }
    .u-icon {
        .fz(12px);
        .size(12px);
        // .y;
        color: #999;
        // .mr(5px);
        transition: all 0.3s;
    }

    .u-label {
        .pr;
        .u-more {
            .fz(12px);
            .pa;
            .rb(0,10px);
            color: #999;
            &:hover {
                color: @pink;
            }
        }
    }
}
</style>
