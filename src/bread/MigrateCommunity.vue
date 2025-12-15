<template>
    <el-dialog
        custom-class="w-dialog m-migrate-dialog"
        :width="isPhone ? '95%' : '600px'"
        :visible="modelValue"
        @close="close"
        title="迁回原板块"
        append-to-body
        draggable
    >
        <div class="m-migrate-box" v-if="post">
            <div class="m-item">
                <div class="u-label">标题</div>
                <div class="u-value">{{ post.post_title }}</div>
            </div>
            <div class="m-item">
                <div class="u-label">作者</div>
                <div class="u-value"><a target="_blank" :href="authorLink(post.post_author)">{{ `${post.author}` }}</a></div>
            </div>
            <div class="m-item">
                <div class="u-label">原板块</div>
                <div class="u-value">{{ showType(post.post_type) }}</div>
            </div>
            <div class="m-item">
                <div class="u-label">原链接</div>
                <div class="u-value"><a target="_blank" :href="postLink(post.post_type, post.ID)">查看</a></div>
            </div>
        </div>
        <el-empty v-else></el-empty>
        <template #footer>
            <el-button @click="close" :loading="loading">关闭</el-button>
            <el-button type="primary" @click="submit" :loading="loading">确认</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { getOriginalPost, migrateCommunityPost } from "../../service/community";
import { postLink, authorLink } from "@jx3box/jx3box-common/js/utils";
import {__postType} from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "MigrateCommunity",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        communityId: {
            type: Number,
            default: 5967,
        },
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    emits: ["update:modelValue"],
    data() {
        return {
            post: null,
            isPhone: window.innerWidth < 768,

            loading: false,
        };
    },
    watch: {
        modelValue(val) {
            if (val) {
                if (this.communityId) {
                    this.loadPost();
                }
            }
        },
    },
    methods: {
        postLink,
        authorLink,
        close() {
            this.$emit("update:modelValue", false);
        },
        loadPost() {
            getOriginalPost(this.communityId).then((res) => {
                this.post = res.data.data;
            });
        },
        submit() {
            this.$confirm("确认将该帖子迁回原板块？").then(() => {
                this.loading = true;
                migrateCommunityPost({ community_id: this.communityId }).then((res) => {
                    this.$message.success("迁移成功");
                    this.close();
                }).finally(() => {
                    this.loading = false;
                });
            }).catch(() => {
                // 取消操作
            });
        },
        showType(type) {
            return __postType[type] || type;
        },
    },
};
</script>

<style lang="less">
.m-migrate-dialog {
    .el-dialog__body {
        padding-top: 20px;
    }
}

// 参考 Element UI Descriptions 样式
.m-migrate-box {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #fff;

    .m-item {
        display: flex;
        border-bottom: 1px solid #ebeef5;

        &:last-child {
            border-bottom: none;
        }

        .u-label {
            width: 60px;
            min-width: 60px;
            padding: 12px 16px;
            font-weight: bold;
            color: #303133;
            background-color: #fafafa;
            border-right: 1px solid #ebeef5;
            display: flex;
            align-items: center;
            font-size: 14px;
        }

        .u-value {
            flex: 1;
            padding: 12px 16px;
            color: #606266;
            word-break: break-all;
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 1.6;

            a {
                color: #409eff;
                text-decoration: none;
                transition: color 0.3s;

                &:hover {
                    color: #66b1ff;
                }
            }
        }
    }

    // 响应式处理
    @media screen and (max-width: 768px) {
        .m-item {
            flex-direction: column;

            .u-label {
                width: 100%;
                border-right: none;
                border-bottom: 1px solid #ebeef5;
            }

            .u-value {
                width: 100%;
            }
        }
    }
}
</style>
