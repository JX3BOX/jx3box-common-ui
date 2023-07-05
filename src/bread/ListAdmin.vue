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
            :withHeader="false"
        >
            <div class="c-admin-wrapper" v-loading="loading">
                <el-divider content-position="left">当前主题</el-divider>
                <div class="m-bucket-list">
                    <el-tag v-for="item in upList" :key="item.id" @close="del(item.id)" closable>{{ item.name }}</el-tag>
                </div>
                <el-divider content-position="left">下架主题</el-divider>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { addTopicBucket, deleteTopicBucket, updateTopicBucket, getTopicBucket } from "../../service/admin";
import User from "@jx3box/jx3box-common/js/user";
import { RadioButton, RadioGroup } from "element-ui";
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
        // 上架主题
        upList() {
            return this.list.filter((item) => item.status == 1);
        },
        // 下架主题
        downList() {
            return this.list.filter((item) => item.status == 0);
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
            this.$prompt("请输入主题名称", "提示", {
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
    .m-bucket-list{
        .flex;
        gap: 5px;
        flex-wrap: wrap;
    }
}
</style>
