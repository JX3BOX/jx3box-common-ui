<template>
    <el-drawer
        class="c-admin"
        title="管理面板"
        :visible.sync="modelValue"
        :before-close="close"
        :append-to-body="true"
        :modal="false"
        :withHeader="false"
    >
        <div class="c-admin-wrapper">
            <el-divider content-position="left">标签</el-divider>
            <!-- <el-radio-group v-model="tags" class="c-admin-status" size="small">
                <el-radio-button v-for="(option, key) in categoryList" :label="key" :key="key">{{
                    option
                }}</el-radio-button>
            </el-radio-group> -->

            <div class="c-admin-extend">
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
                    >
                        <!-- <el-option v-for="item in categoryList" :value="item.name" :label="item.name" :key="item.id">
                        </el-option> -->
                    </el-select>
                </div>
                <!-- <div class="u-condition u-map">
                    <span class="u-prepend el-input-group__prepend">分类</span>
                    <el-select v-model="post.category" filterable placeholder="请选择" clearable>
                        <el-option v-for="item in categoryList" :value="item.name" :label="item.name" :key="item.id">
                        </el-option>
                    </el-select>
                </div> -->
            </div>

            <el-divider content-position="left">高亮置顶</el-divider>
            <el-checkbox
                class="c-admin-highlight-checkbox"
                v-model="form.is_top"
                @change="onManageTopic($event, 'top')"
                :true-label="1"
                :false-label="0"
            >
                置顶
            </el-checkbox>
            <el-checkbox
                class="c-admin-highlight-checkbox"
                v-model="form.is_category_top"
                @change="onManageTopic($event, 'category_top')"
                :true-label="1"
                :false-label="0"
            >
                分类置顶
            </el-checkbox>

            <el-checkbox
                class="c-admin-highlight-checkbox"
                v-model="form.is_star"
                @change="onManageTopic($event, 'star')"
                :true-label="1"
                :false-label="0"
            >
                精选
            </el-checkbox>
            <el-checkbox class="c-admin-highlight-checkbox" v-model="form.is_hight">高亮</el-checkbox>
            <span v-show="showColors">
                <el-color-picker
                    class="c-admin-highlight-block"
                    v-model="color"
                    :predefine="color_options"
                    size="mini"
                ></el-color-picker>
                <span class="c-admin-highlight-preview" :style="{ color: color }" style="margin-right: 10px"
                    >预览高亮效果</span
                >
            </span>

            <el-divider content-position="left">状态变更</el-divider>
            <div>
                <el-button type="danger" @click="deleteTopic">删除帖子</el-button>
                <el-button type="warning" @click="handleCheck">转为待审核</el-button>
            </div>

            <el-divider content-position="left"></el-divider>
            <div>
                <!-- <el-button type="primary" @click="submit" :loading="pushing">提交修改</el-button> -->
                <el-button type="primary" @click="close">关闭窗口</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { post } from "jquery";
import {
    auditTopic,
    deleteTopic,
    getTopicBucket,
    getTopicDetails,
    manageTopic,
    updateTopicItem,
} from "../../service/community";

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
            },
        };
    },
    computed: {
        data: function () {
            return {};
        },
        showColors() {
            return this.form.is_hight;
        },
        params() {
            return {
                ...this.post,
                category: this.form.category,
                tags: this.form.tags,
                is_top: this.form.is_top,
                is_star: this.form.is_star,
                is_hight: this.form.is_hight,
                is_category_top: this.form.is_category_top,
                // color: this.color,
            };
        },
    },
    watch: {
        post() {
            this.form = {
                ...this.form,
                is_hight: this.post.is_hight,
                category: this.post.category,
                is_top: this.post.is_top,
                is_star: this.post.is_star,
                tags: this.post.tags,
                is_category_top: this.post.is_category_top,
            };
        },
        modelValue(val) {
            if (val) {
                this.getTopicDetails();
            }
        },
    },
    created: function () {
        this.getCategoryList();
    },
    methods: {
        onManageTopic(e, action) {
            const value = e ? 1 : 0;
            manageTopic(this.post.id, action, value).then(() => {
                this.$message({
                    type: "success",
                    message: "操作成功!",
                });
            });
        },
        handleCheck() {
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
                    this.load();
                });
            });
        },
        submit() {
            const id = this.post.id;
            if (!id) {
                this.$message.error("ID不存在!");
                return;
            }
            updateTopicItem(id, this.params).then((res) => {
                this.$message.success("修改成功");
                this.$emit("update:modelValue", false);
            });
        },
        // 关闭
        close() {
            this.form = {
                category: "",
                tags: [],
                is_top: false,
                is_star: false,
                is_hight: false,
            };
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
            });
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/admin.less";
</style>
