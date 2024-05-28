<template>
    <el-drawer
        class="c-admin c-community-admin"
        title="管理面板"
        :visible.sync="modelValue"
        :before-close="close"
        :append-to-body="true"
        :modal="false"
        :withHeader="false"
    >
        <div class="c-admin-wrapper">
            <el-divider content-position="left">信息设置</el-divider>
            <div class="c-admin-extend">
                <div class="u-condition u-map">
                    <el-input v-model="form.title" placeholder="请输入标题" class="input-author drawer-item-content">
                        <template #prepend>
                            <span class="u-keyword">标题</span>
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="c-admin-extend">
                <div class="u-condition u-map">
                    <span class="u-prepend el-input-group__prepend">分类</span>
                    <el-select v-model="form.category" filterable placeholder="请选择">
                        <el-option v-for="item in categoryList" :value="item.name" :label="item.name" :key="item.name">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="c-admin-extend m-community-tag">
                <div class="u-condition u-map">
                    <span class="u-prepend el-input-group__prepend">标签</span>
                    <el-select
                        v-model="form.tags"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择"
                        clearable
                        @change="onTagChange"
                    >
                        <el-option v-for="item in tags" :value="item.label" :label="item.label" :key="item.label">
                        </el-option>
                    </el-select>
                </div>
                <div  class="m-community-tag__content">
                    <template v-if="finalTags.length">
                        <div class="m-community-tag__list" v-for="item in finalTags" :key="item.uuid">
                            <el-input v-model="item.label"></el-input>
                            <el-color-picker v-model="item.color"
                            :predefine="color_options"></el-color-picker>
                        </div>
                    </template>
                    <el-alert title="暂未设置标签" v-else type="info" show-icon :closable="false"></el-alert>
                </div>
            </div>
            <div class="c-admin-extend">
                <div class="u-condition u-map">
                    <div>
                        <el-input
                            v-model="form.user_id"
                            placeholder="请输入作者ID"
                            class="input-author drawer-item-content"
                        >
                            <template #prepend>
                                <span class="u-keyword">作者ID</span>
                            </template>
                        </el-input>
                    </div>
                </div>
            </div>

            <el-divider content-position="left">高亮置顶</el-divider>

            <p class="c-admin-space">
                <span class="c-admin-label">置顶：</span>
                <el-checkbox-group
                    v-model="topStatus"
                    class="c-admin-status"
                    size="small"
                >
                    <el-checkbox-button label="is_top">全局置顶</el-checkbox-button>
                    <el-checkbox-button label="is_category_top">版内置顶</el-checkbox-button>
                </el-checkbox-group>
            </p>
            <p class="c-admin-space">
                <span class="c-admin-label">精选：</span>
                <el-switch
                    v-model="form.is_star"
                    :active-value="1"
                    :inactive-value="0"
                />
            </p>

            <p class="c-admin-space">
                <span class="c-admin-label">高亮：</span>
                <el-switch
                    v-model="form.is_hight"
                    :active-value="1"
                    :inactive-value="0"
                />
                <span v-show="showColors">
                    <el-color-picker
                        class="c-admin-highlight-block"
                        v-model="form.hight_color"
                        :predefine="color_options"
                        size="mini"
                    ></el-color-picker>
                    <span class="c-admin-highlight-preview" :style="{ color: color }" style="margin-right: 10px">
                        预览高亮效果
                    </span>
                </span>
            </p>

            <el-divider content-position="left">状态变更</el-divider>
            <div>
                <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteTopic">删除帖子</el-button>
                <el-button type="warning" size="small" icon="el-icon-refresh-left" @click="handleCheck"
                    >转为待审核</el-button
                >
            </div>

            <div class="c-admin-buttons">
                <el-button type="primary" @click="submit" :loading="pushing">提交修改</el-button>
                <el-button type="plain" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import {
    auditTopic,
    deleteTopic,
    getCommunityTags,
    getTopicBucket,
    getTopicDetails,
    manageTopic,
    updateTopicItem,
    manageTopicAll
} from "../../service/community";
import {cloneDeep} from "lodash";

export default {
    name: "CommunityAdmin",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        postId: {
            type: Number,
            default: 0,
        },
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    emits: ["update:modelValue"],
    data() {
        return {
            tags: [],
            topStatus: [],
            post: null,
            pushing: false,
            categoryList: [],
            color: "rgb(255,0,1)",
            color_options: [
                "rgb(255,0,1)",
                "rgb(2,209,248)",
                "rgb(147,217,25)",
                "rgb(255,154,2)",
                "rgb(255,44,142)",
                "rgb(142,46,255)",
            ],
            form: {
                category: "",
                tags: [],
                is_top: 0,
                is_star: 0,
                is_hight: 0,
                is_category_top: 0,
                hight_color: "rgb(255,0,1)",
            },

            finalTags: []
        };
    },
    computed: {
        data: function () {
            return {};
        },
        showColors() {
            return this.form.is_hight;
        },
    },
    watch: {
        modelValue: async function(val) {
            if (val) {
                await this.getCategoryList();
                await this.getCommunityTags();
                await this.getTopicDetails();
            }
        },

    },
    methods: {
        handleCheck() {
            const id = this.post.id;
            if (!id) {
                this.$message.error("ID不存在!");
                return;
            }
            this.$confirm(`此操作将该数据转为 待审核 状态, 是否继续?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                auditTopic(id, "wait").then(() => {
                    this.$message({
                        type: "success",
                        message: "操作成功!",
                    });
                    this.$emit("update:modelValue", false);
                    window.location.href = "/community";
                });
            });
        },
        async submit() {
            const id = this.post.id;
            if (!id) {
                this.$message.error("ID不存在!");
                return;
            }

            const promises = [];

            promises.push(updateTopicItem(id, {
                ...this.post,
                user_id: this.form.user_id,
                title: this.form.title,
                category: this.form.category,
            }));

            promises.push(manageTopicAll(id, {
                is_top: this.topStatus.includes("is_top") ? 1 : 0,
                is_category_top: this.topStatus.includes("is_category_top") ? 1 : 0,
                is_star: this.form.is_star,
                is_hight: this.form.is_hight,
                hight_color: this.form.hight_color,
                color_tag: this.finalTags,
            }));


            Promise.all(promises).then(() => {
                this.$message({
                    type: "success",
                    message: "操作成功!",
                });
                this.$emit("update:modelValue", false);
                window.reload();
            });
        },
        getCommunityTags() {
            getCommunityTags().then((tags) => {
                this.tags = tags;
            });
        },
        // 关闭
        close() {
            this.form = {
                category: "",
                tags: [],
                is_top: 0,
                is_star: 0,
                is_hight: 0,
            };
            this.isTopStatus = [];
            this.$nextTick(() => {
                this.$emit("update:modelValue", false);
            });
        },
        getCategoryList() {
            getTopicBucket({ type: "community" }).then((res) => {
                this.categoryList = res.data.data;
            });
        },
        deleteTopic() {
            const id = this.post.id;
            if (!id) {
                this.$message.error("ID不存在!");
                return;
            }
            this.$confirm("此操作将 删除 该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                deleteTopic(id).then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.$emit("update:modelValue", false);
                    window.location.href = "/community";
                });
            });
        },
        getTopicDetails() {
            getTopicDetails(this.postId).then((res) => {
                this.post = res.data.data;
                this.form = {
                    ...this.form,
                    is_hight: this.post.is_hight,
                    category: this.post.category,
                    is_top: this.post.is_top,
                    is_star: this.post.is_star,
                    is_category_top: this.post.is_category_top,
                    user_id: this.post.user_id,
                    title: this.post.title,
                    hight_color: this.post.hight_color,
                    tags: this.post?.color_tag?.map((item) => item.label) || [],
                }

                this.finalTags = this.post.color_tag;
                this.topStatus = [];
                if (this.post.is_top) {
                    this.topStatus.push("is_top");
                }
                if (this.post.is_category_top) {
                    this.topStatus.push("is_category_top");
                }
            });
        },
        onTagChange() {
            const tags = this.form.tags.map((item) => {
                const tag = this.tags.find((tag) => tag.label === item);

                if (tag) {
                    return tag;
                }

                return {
                    label: item,
                    color: "rgb(255,0,1)",
                }
            });
            this.finalTags = tags;
        }
    },
};
</script>

<style lang="less">
@import "../../assets/css/admin.less";
.c-community-admin {
    .c-admin-space {
        .flex;
        align-items: center;
        flex-wrap: wrap;
        height: 28px;
        gap: 4px;
    }
    .c-admin-label {
        font-size: 14px;
        font-weight: 500;
    }
    .c-admin-buttons {
        width: 100%;
        padding-top: 30px;
        // position: absolute;
        // bottom: 50px;
    }
    .c-admin-extend .u-map .u-prepend {
        font-size: 14px;
        min-width: 62px;
    }
    .c-admin-extend .u-map .el-select {
        margin-left: 62px;
    }
    .el-input-group__prepend {
        text-align: center;
        min-width: 62px;
        box-sizing: border-box;
    }

    .m-community-tag {
        .u-prepend {
            border-bottom-left-radius: 0!important;
        }
        .el-input__inner {
            border-bottom-right-radius: 0!important;
        }
    }

    .m-community-tag__content {
        border: 1px solid #dcdfe6;
        border-top: none;
        padding: 10px;
    }

    .m-community-tag__list {
        .flex;
        align-items: center;
        gap: 10px;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
}
</style>
