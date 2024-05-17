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
            <!-- <el-radio-group v-model="tages" class="c-admin-status" size="small">
                <el-radio-button v-for="(option, key) in categoryList" :label="key" :key="key">{{
                    option
                }}</el-radio-button>
            </el-radio-group> -->

            <div class="c-admin-extend">
                <div class="u-condition u-map">
                    <span class="u-prepend el-input-group__prepend">标签</span>
                    <el-select
                        v-model="post.tages"
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
            <el-checkbox class="c-admin-highlight-checkbox" v-model="form.is_top">置顶</el-checkbox>
            <el-checkbox class="c-admin-highlight-checkbox" v-model="form.is_star" :true-label="1" :false-label="0"
                >精选</el-checkbox
            >
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
                <el-button type="warning">转为待审核</el-button>
            </div>

            <el-divider content-position="left">确认操作</el-divider>
            <div>
                <el-button type="primary" @click="submit" :loading="pushing">提交修改</el-button>
                <el-button type="plain" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { deleteTopic, getTopicBucket, updateTopicItem } from "../../service/community";

export default {
    name: "CommunityAdmin",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        post: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    emits: ["update:modelValue"],
    data() {
        return {
            isHighlight: true,
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
                tages: [],
                is_top: false,
                is_star: false,
                is_hight: false,
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
                tages: this.form.tages,
                is_top: this.form.is_top ? 1 : 0,
                is_star: this.form.is_star ? 1 : 0,
                is_hight: this.form.is_hight ? 1 : 0,
                // color: this.color,
            };
        },
    },
    watch: {
        modelValue(val) {
            if (val) {
                if (this.post.is_hight === 1) {
                    this.form.is_hight = true;
                }
                if (this.post.is_star === 1) {
                    this.form.is_star = true;
                }
                if (this.post.is_top === 1) {
                    this.form.is_top = true;
                }
                if (this.post.tages) {
                    this.form.tages = this.post.tages;
                }
                this.form.category = this.post.category;
            }
        },
    },
    created: function () {
        this.getCategoryList();
    },
    methods: {
        submit() {
            const id = this.post.id;
            if (!id) {
                this.$message.error("ID不存在!");
                return;
            }
            // updateTopicItem(id, this.params).then((res) => {
            this.$message.success("修改成功");
            this.$emit("update:modelValue", false);
            // });
        },
        // 关闭
        close() {
            this.form = {
                category: "",
                tages: [],
                is_top: false,
                is_star: false,
                is_hight: false,
            };
            this.$emit("update:modelValue", false);
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
    },
};
</script>

<style lang="less">
@import "../../assets/css/admin.less";
</style>
