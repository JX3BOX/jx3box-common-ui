<template>
    <el-dialog
        class="w-userpop"
        :title="title"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <div class="u-tip">
            <slot></slot>
        </div>
        <div class="u-input">
            <el-input
                v-model.trim.lazy="search"
                placeholder="请输入用户 UID 或者昵称进行搜索"
                @keydown.enter.native="onSearch"
            >
                <i slot="prepend" class="el-icon-search"></i>
            </el-input>
            <el-button class="u-search-btn" type="primary" @click="onSearch" :disabled="!search">搜索</el-button>
        </div>
        <div class="u-preview" v-loading="loading">
            <template v-if="searched && status">
                <a class="u-author" :href="'/author/' + userdata.ID" target="_blank">
                    <img class="u-avatar" :src="showAvatar(userdata.user_avatar)" />
                    <span class="u-name">{{ userdata.display_name || "-" }}</span>
                </a>
            </template>
            <template v-else>
                <img class="u-avatar" :src="showAvatar('')" />
                <span class="u-name">-</span>
                <div class="u-empty">
                    <i class="el-icon-warning-outline"></i>{{ searched ? "未找到匹配项" : "请输入搜索条件" }}
                </div>
            </template>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import { getUserInfoByUidOrName } from "../../service/author";
export default {
    name: "userpop",
    props: ["title", "show"],
    data: function () {
        return {
            visible: false,
            search: "",
            searched: false,
            userdata: {
                ID: "",
                name: "",
                avatar: "",
            },
            status: true,
            loading: false,
        };
    },
    model: {
        prop: "show",
        event: "switchUserPop",
    },
    watch: {
        show: function (val) {
            this.visible = val;
        },
        visible: function (val) {
            this.$emit("switchUserPop", val);
        },
    },
    methods: {
        confirm: function () {
            if (this.status) {
                this.visible = false;
                this.$emit("confirm", this.userdata);
            } else {
                this.$alert("用户不存在 或 UID不正确", "提醒", {
                    confirmButtonText: "确定",
                });
            }
        },
        showAvatar: function (val) {
            return showAvatar(val, "l");
        },
        onSearch() {
            if (!this.search) {
                this.userdata = {
                    name: "",
                    avatar: "",
                };
                this.status = true;
                return;
            }
            this.loading = true;
            this.searched = false;
            getUserInfoByUidOrName({ search: this.search })
                .then((data) => {
                    if (data) {
                        this.status = true;
                        this.userdata = data;
                    } else {
                        this.status = false;
                        this.userdata = {
                            name: "",
                            avatar: "",
                        };
                    }
                })
                .finally(() => {
                    this.loading = false;
                    this.searched = true;
                });
        },
        cancel() {
            this.visible = false;
            this.search = "";
            this.userdata = {
                name: "",
                avatar: "",
            };
            this.status = true;
        },
    },
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
.w-userpop {
    .fz(1rem, 2.5);
    .el-dialog {
        min-width: 520px;
    }
    .el-dialog__body {
        padding: 0 20px;
    }
    .u-avatar {
        .mt(20px);
        .size(120px);
        .db;
        .auto(x);
        border: 1px solid #eee;
        padding: 5px;
    }
    .u-name {
        .bold;
        .x;
        .db;
    }
    .u-author {
        .db;
        max-width: 280px;
        .auto(x);
        &:hover {
            .u-avatar {
                border-color: #ff71b8;
            }
            .u-name {
                color: #ff71b8;
            }
        }
    }
    .u-tip {
        .fz(13px);
    }
    .u-input {
        .flex;
        align-items: center;
        gap: 10px;
    }
    .u-empty {
        color: #999;
        .x;
    }
    .dialog-footer {
        text-align: center;
    }
}

@media screen and (max-width: @phone) {
    .w-userpop .el-dialog {
        .w(100%) !important;
        min-width: 0;
        margin-top: 0 !important;
    }
}
</style>
