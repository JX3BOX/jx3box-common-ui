<template>
    <header class="m-single-header" v-if="post">
        <!-- 标题 -->
        <div class="m-single-title">
            <span class="u-title u-sub-block" :href="url" :title="title">
                <i class="u-original" v-if="isOriginal">原创</i>
                <i class="u-private" v-if="post.post_status != 'publish'">
                    <i class="el-icon-lock" v-if="post.post_status == 'draft' || post.post_status == 'pending' || ~~post.visible" style="color:#fb9b24"></i>
                    <i class="el-icon-delete" v-if="post.post_status == 'dustbin'" style="color:#c00"></i>
                </i>
                <span class="u-title-text">{{ title }}</span>
            </span>
        </div>

        <!-- 信息 -->
        <div class="m-single-info">
            <!-- 用户名 -->
            <div class="u-author u-sub-block">
                <i class="u-author-icon">
                    <img svg-inline src="../../assets/img/single/author.svg" />
                </i>
                <a class="u-name" :href="author_link">{{ author_name }}</a>
            </div>

            <!-- 自定义字段 -->
            <!-- <template v-if="metas && metas.length">
            <div class="u-meta u-sub-block" v-for="(meta_value,meta_key) in metas" :key="meta_key">
                <em class="u-label">{{meta_key}}</em>
                <span class="u-value">{{meta_value}}</span>
            </div>
            </template> -->
            <slot></slot>

            <!-- 客户端 -->
            <div class="u-meta u-sub-block">
                <em class="u-label">适用客户端</em>
                <span class="u-value u-client" :class="client">{{ showClientLabel(client) }}</span>
            </div>

            <!-- 发布日期 -->
            <span class="u-podate u-sub-block"  :title="'发布日期:' + post_time">
                <i class="u-icon-podate">
                    <img svg-inline src="../../assets/img/single/podate.svg" />
                </i>
                <time>{{ post_date }}</time>
            </span>

            <!-- 最后更新 -->
            <span class="u-modate u-sub-block" :title="'最后更新:' + update_time">
                <i class="u-icon-modate">
                    <img svg-inline src="../../assets/img/single/modate.svg" />
                </i>
                <time>{{ update_date }}</time>
            </span>

            <!-- 查看次数 -->
            <span class="u-views u-sub-block">
                <i class="el-icon-view"></i>
                {{ views }}
            </span>

            <!-- 编辑 -->
            <a class="u-edit u-sub-block" :href="edit_link" v-if="canEdit">
                <i class="u-icon-edit el-icon-edit-outline"></i>
                <span>编辑</span>
            </a>
        </div>
    </header>
</template>

<script>
import { __Root,__clients } from "@jx3box/jx3box-common/data/jx3box.json";
import { showDate, showTime } from "@jx3box/jx3box-common/js/moment";
import { editLink, authorLink } from "@jx3box/jx3box-common/js/utils.js";
import User from "@jx3box/jx3box-common/js/user.js";
export default {
    name: "single-header",
    props: ["post", "stat"],
    data: function() {
        return {};
    },
    computed: {
        url: function() {
            return location.href;
        },
        isOriginal: function() {
            return !!~~this.post?.original;
        },
        title: function() {
            return this.post?.post_title || "无标题";
        },
        author_link: function() {
            return authorLink(this.post?.post_author);
        },
        author_name: function() {
            return this.post?.author_info?.display_name || "匿名";
        },
        post_date: function() {
            return showDate(new Date(this.post?.post_date));
        },
        update_date: function() {
            return showDate(new Date(this.post?.post_modified));
        },
        post_time: function() {
            return showTime(new Date(this.post?.post_date));
        },
        update_time: function() {
            return showTime(new Date(this.post?.post_modified));
        },
        views: function() {
            return this.stat?.views || "-";
        },
        edit_link: function() {
            return editLink(this.post?.post_type, this.post?.ID);
        },
        canEdit: function() {
            return this.post?.post_author == User.getInfo().uid || User.isEditor();
        },
        client: function() {
            return this.post?.client || "std";
        },
    },
    methods: {
        showClientLabel: function(val) {
            return __clients[val];
        },
    },
    mounted: function() {},
};
</script>

<style lang="less">
.m-single-header {
    padding-top: 20px;
    padding-bottom: 20px;
    // padding-right: 280px;
    .pr;
    .u-sub-block {
        .dbi;
        .y(top);
    }
}
@media screen and (max-width: @phone) {
    .m-single-header {
        padding-right: 0;
    }
}
@media print {
    .m-single-header {
        padding-right: 0;
    }
}

.m-single-title {
    .fz(32px);
    padding: 1px 0;

    .u-title {
        color: @color;
        // &:hover {
        //     color: @primary;
        // }
        letter-spacing: 0.5px;
        font-weight: 300;
        .db;
        .nobreak;
    }
    .u-author {
        .pr;
    }

    .u-original {
        background-color: #6f42c1;
        color: #fff;
        .fz(14px, 20px);
        font-style: normal;
        font-weight: normal;
        padding: 2px 5px;
        .mr(5px);
        // .fl;
    }

    .u-private {
        .y(-2px);
        margin-right: 5px;
        color: #111;
    }
}
@media screen and (max-width: @phone) {
    .m-single-title {
        .fz(1rem, 1.8);
        .u-title {
            word-break: break-all;
            white-space: normal;
            font-weight: normal;
        }
    }
}
@media print {
    .m-single-title {
        .x;
    }
}

.m-single-info {
    margin-top: 10px;
    .clearfix;
    .fz(12px, 20px);
    color: #666;

    @origin: #0eb7ce;
    @std: #f0b400;
    @all: #a26ef7;

    .u-client {
        // .fl;
        font-style: normal;
        .fz(12px);
        padding: 0px 5px;
        .r(3px);
        // .mr(10px);

        &.std {
            border: 1px solid @std;
            color: @std;
        }

        &.origin {
            border: 1px solid @origin;
            color: @origin;
        }

        &.all {
            border: 1px solid @all;
            color: @all;
        }
    }

    * {
        .dbi;
    }

    svg {
        fill: #666;
        .size(16px);
        .y;
        .mr(3px);
    }

    .u-sub-block {
        .mr(15px);
        .fl;
    }

    .u-author {
        a:hover {
            box-shadow: 0 1px 0 @color-link;
        }
        i {
            .pr;
            top: -2px;
        }
    }

    .u-label {
        .mr(5px);
        background-color: #eee;
        padding: 0 5px;
        .r(2px);
        font-style: normal;
    }
    .u-value {
    }

    .u-views {
        i {
            .fz(15px);
            .y;
        }
    }

    .u-edit {
        i {
            &:before {
                font-size: 16px;
            }
            .pr;
            top: 2px;
            .mr(3px);
        }
        &:hover {
            box-shadow: 0 1px 0 @color-link;
        }
    }
}
@media screen and (max-width: @ipad) {
    .m-single-info {
        .u-meta {
            .none;
        }
    }
}
@media screen and (max-width: @phone) {
    .m-single-info {
        .u-podate {
            .none;
        }
    }
}
@media print {
    .m-single-info {
        .u-meta,
        .u-views,
        .u-edit {
            .none;
        }
        .x;
        .u-sub-block {
            float: none;
        }
        .u-name {
            color: @color;
        }
    }
}
</style>
