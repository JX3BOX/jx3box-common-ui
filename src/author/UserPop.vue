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
            <el-input v-model.trim.lazy="search" placeholder="请输入用户 UID 或者昵称进行搜索" @keydown.enter.native="onSearch">
                <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
            </el-input>
        </div>
        <div class="u-preview">
            <img class="u-avatar" :src="showAvatar(userdata.user_avatar)" />
            <span class="u-name">{{ userdata.display_name || "-" }}</span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
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
            userdata: {
                name: "",
                avatar: "",
            },
            status: false,
        };
    },
    model: {
        prop: "show",
        event: "switchUserPop",
    },
    watch: {
        show: function (newval) {
            this.visible = newval;
        },
        visible: function (newval) {
            this.$emit("switchUserPop", newval);
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
            getUserInfoByUidOrName({ search: this.search }).then((data) => {
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
            });
        }
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
    .u-tip {
        .fz(13px);
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
