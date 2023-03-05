<template>
    <div class="c-author-follow">
        <el-button
            v-if="!isFollow"
            class="u-btn"
            :class="{ 'is-follow': isFollow, 'u-fans-box': isSelf }"
            size="mini"
            plain
            icon="el-icon-plus"
            @click="follow"
            :loading="loading"
            :disabled="isSelf"
            >{{ btnText }}</el-button
        >
        <el-popover
            v-else
            placement="bottom"
            trigger="hover"
            popper-class="c-author-follow-popover"
            :visible-arrow="true"
        >
            <div class="u-action-list">
                <div class="u-action-item" v-for="item in actions" :key="item.label" @click.stop="item.action">
                    {{ item.label }}
                </div>
            </div>
            <el-button class="u-trigger" size="mini" :type="btnType" plain slot="reference" icon="el-icon-check">{{
                btnText
            }}</el-button>
        </el-popover>
    </div>
</template>

<script>
import { follow, unfollow, getFansCount } from "../../service/follow";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "AuthorFollow",
    props: {
        uid: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            isFollow: false,
            fansNum: 0,
            loading: false,
        };
    },
    computed: {
        btnText() {
            return this.isFollow ? "已粉" : "关注";
        },
        btnType() {
            return this.isFollow ? "info" : "warning";
        },
        actions() {
            return [
                {
                    label: "取消关注",
                    action: () => {
                        this.unfollow();
                    },
                },
            ];
        },
        isSelf() {
            return this.uid == this.user.uid;
        },
        user() {
            return User.getInfo();
        },
        isLogin: function () {
            return User.isLogin();
        },
    },
    watch: {
        uid: {
            immediate: true,
            handler(val) {
                val && this.loadFans();
            },
        },
    },
    methods: {
        // 格式化粉丝数
        formatFansNum(num) {
            if (num < 10000) {
                return num === 0 ? "" : num;
            } else {
                return (num / 10000).toFixed(1) + "万";
            }
        },
        // 关注
        follow() {
            if (!this.isLogin) {
                User.toLogin();
                return;
            }
            follow(this.uid)
                .then((res) => {
                    this.$message.success("关注成功");
                    this.isFollow = true;
                    this.loadFans();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 取消关注
        unfollow() {
            this.$confirm("确定不再关注此人？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                unfollow(this.uid)
                    .then((res) => {
                        this.$message.success("取关成功");
                        this.isFollow = false;
                        this.loadFans();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        },
        loadFans() {
            this.loading = true;
            getFansCount(this.uid)
                .then((res) => {
                    this.fansNum = res.data.data.follower_count || 0;
                    this.isFollow = res.data.data.is_followed;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="less">
.c-author-follow {
    .u-btn {
        cursor: default;
        &:hover {
            cursor: pointer;
            background-color: @light-pink;
            color: #fff;
            border-color: darken(@light-pink, 2%);
        }
    }

    .u-fans-box {
        cursor: not-allowed;
        &:hover {
            cursor: not-allowed;
        }
    }
    .u-trigger {
        &:hover {
            cursor: default;
        }
    }
}
.c-author-follow-popover {
    //.u-follow-popover {
    &.el-popover {
        min-width: 100px;
        padding: 0;
        margin-top: 5px;
        .u-action-list {
            .u-action-item {
                text-align: center;
                cursor: pointer;
                padding: 8px 10px;
                &:hover {
                    background: rgb(248, 248, 251);
                }
            }
        }
    }
    //}
    .u-follow-count {
        margin-left: 5px;
    }
}

@media screen and (max-width: @phone) {
    .el-message-box {
        max-width: 60%;
    }
}
</style>
