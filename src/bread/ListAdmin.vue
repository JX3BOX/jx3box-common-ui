<template>
    <div v-if="hasRight" class="u-admin-button">
        <el-button
            type="primary"
            icon="el-icon-setting"
            class="c-admin-button u-admin"
            :size="buttonSize"
            @click="show = true"
            >管理</el-button
        >
        <el-drawer
            class="c-admin"
            title="管理主题"
            :visible.sync="show"
            :before-close="close"
            :append-to-body="true"
            :modal="false"
            :withHeader="false"
        >
            <div class="c-admin-wrapper" v-loading="loading">
                <el-divider content-position="left">主题管理</el-divider>
                <div class="m-bucket-list" v-if="list && list.length">
                    <div v-for="item in list" :key="item.id" class="m-bucket-item">
                        <el-tag size="medium" :type="item.status ? '' : 'info'">{{ item.name }}</el-tag>
                        <div class="m-bucket-op">
                            <el-button :type="item.status ? 'warning' : 'success'" plain size="mini" class="u-op-btn" :icon="item.status ? 'el-icon-download' : 'el-icon-upload2'" @click="update(item.id, item.status)">{{ item.status ? '下架' : '上架' }}</el-button>
                            <el-button @click="edit(item)" plain size="mini" icon="el-icon-edit">修改</el-button>
                            <el-button type="info" plain size="mini" class="u-op-btn" icon="el-icon-delete" @click="del(item.id)">删除</el-button>
                        </div>
                    </div>
                </div>
                <el-empty v-else description="暂无主题"></el-empty>

                <div class="c-admin-buttons">
                    <el-button type="success" @click="add" icon="el-icon-plus">新增</el-button>
                    <!-- <el-button type="plain" @click="close" icon="el-icon-close">关闭</el-button> -->
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { addTopicBucket, deleteTopicBucket, updateTopicBucket, getTopicBucket } from "../../service/admin";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "ListAdmin",
    props: {
        type: {
            type: String,
            default: "bbs",
        },
        buttonSize: {
            type: String,
            default: "medium",
        },
    },
    data() {
        return {
            show: false,
            list: [],
            loading: false,
            currentStatus: "",
        };
    },
    computed: {
        hasRight() {
            return User.isEditor();
        },
    },
    watch: {
        show(val) {
            val && this.loadData();
        },
    },
    methods: {
        close() {
            this.show = false;
        },
        loadData() {
            const params = {
                type: this.type,
            };
            this.loading = true;
            getTopicBucket(params)
                .then((res) => {
                    this.list = res.data.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        del(id) {
            this.$confirm("此操作将删除该主题, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deleteTopicBucket(id).then((res) => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.loadData();
                    });
                })
                .catch(() => {});
        },
        update(id, status) {
            const params = {
                status: status ? 0 : 1,
            };
            updateTopicBucket(id, params).then((res) => {
                this.$message({
                    type: "success",
                    message: "更新成功!",
                });
                this.loadData();
            });
        },
        add() {
            this.$prompt("请输入主题名称", "新增主题", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S+/,
                inputErrorMessage: "主题名称不能为空",
            })
                .then(({ value }) => {
                    const data = {
                        type: this.type,
                        name: value,
                    };
                    addTopicBucket(data).then((res) => {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                        this.loadData();
                    });
                })
                .catch(() => {});
        },
        edit(item) {
            this.$prompt("请输入主题名称", "修改主题", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /\S+/,
                inputErrorMessage: "主题名称不能为空",
                inputValue: item.name,
            })
                .then(({ value }) => {
                    const data = {
                        name: value,
                    };
                    updateTopicBucket(item.id, data).then((res) => {
                        this.$message({
                            type: "success",
                            message: "修改成功!",
                        });
                        this.loadData();
                    });
                })
                .catch(() => {})
        }
    },
};
</script>

<style lang="less">
.u-admin-button {
    padding: 0;
    float: right;
}
.c-admin-wrapper {
    .u-admin-setting {
        .pointer;
    }
    .m-bucket-list {
        max-height: 300px;
        overflow: auto;
        .m-bucket-item {
            .flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
            border-radius: 3px;

            // odd
            &:nth-child(odd) {
                background-color: #f7f7f7;
            }
        }
    }
    .u-bucket-add {
        margin-top: 20px;
        width: 100%;
    }
}
</style>
