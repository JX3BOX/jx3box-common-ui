<template>
    <el-dialog append-to-body :visible.sync="visible" custom-class="c-alternate" width="320px" title="切换马甲">
        <div class="c-alternate__content">
            <div
                class="c-alternate-item"
                :class="{ 'is-active': profile.uid == item.uid, 'is-expired': isExpired(item.created_at) }"
                v-for="item in alternate"
                :key="item.uid"
                @click="onSelectAlternate(item)"
            >
                <div class="m-avatar">
                    <img
                        class="u-active"
                        v-if="profile.uid == item.uid"
                        src="../../assets/img/header/check.svg"
                        alt=""
                    />
                    <img class="u-avatar" :src="showAvatar(item.avatar)" alt="" />
                </div>
                <div class="m-misc">
                    <span class="u-name"><span class="u-label">用户昵称：</span>{{ item.name }}</span>
                    <span class="u-time">
                        <span class="u-label">上次登录：</span>{{ getFormatTime(item.created_at) }}
                        <span class="u-extra" v-if="isExpired(item.created_at)">(已过期)</span>
                    </span>
                </div>

                <div class="u-remove" @click.stop="onRemoveAlternate(item)" v-if="profile.uid != item.uid">
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <div class="c-alternate-btn" :class="{ 'is-disabled': overLength }" @click="onAddAlternate">+</div>
        </div>
    </el-dialog>
</template>

<script>
import Bus from "../../service/bus";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import dayjs from "dayjs";
import User from "@jx3box/jx3box-common/js/user";
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
import { refreshAuth } from "../../service/cms"
export default {
    name: "alternate",
    data() {
        return {
            visible: false,

            alternate: [
                // {
                //     uid: 100,
                //     name: "马甲1",
                //     avatar: "https://avatar.jx3box.com/avatar/1",
                //     created_at: 1620000000000,
                // },
            ],
        };
    },
    computed: {
        profile() {
            return User.getInfo();
        },
        overLength() {
            return this.alternate.length > 5;
        },
    },
    mounted() {
        Bus.$on("showAlternate", () => {
            this.visible = true;
        });
        this.init();
    },
    methods: {
        init() {
            // 获取localStorage中以jx3box-alternate-开头的数据
            try {
                let keys = Object.keys(localStorage);
                let alternate = keys.filter((key) => key.startsWith("jx3box-alternate-"));

                this.alternate = alternate.map((key) => {
                    return JSON.parse(localStorage.getItem(key));
                });

                // 如果当前号码不在马甲列表中，添加到列表中
                if (!this.alternate.find((alt) => alt.uid == this.profile.uid)) {
                    const data = {
                        uid: this.profile.uid,
                        name: this.profile.name,
                        avatar: localStorage.getItem("avatar"),
                        created_at: Number(localStorage.getItem("created_at")),
                        group: ~~this.profile.group,
                        bind_wx: ~~this.profile.bind_wx,
                        token: localStorage.getItem("token"),
                        status: ~~this.profile.status,
                    };
                    this.alternate.unshift(data);

                    localStorage.setItem("jx3box-alternate-" + this.profile.uid, JSON.stringify(data));
                }

                // 当前激活的排在第一
                this.alternate.sort((a, b) => {
                    return a.uid == this.profile.uid ? -1 : 1;
                });
            } catch (error) {
                console.error(error);
            }
        },
        showAvatar(url) {
            return showAvatar(url, "m");
        },
        getFormatTime(time) {
            return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        },
        // 判断是否已过期
        isExpired(time) {
            return User.isExpired(time);
        },
        // 选择马甲
        onSelectAlternate(item) {
            if (this.isExpired(item.created_at)) {
                this.$message.error("该马甲已过期，请重新登录");
                return;
            }
            if (this.profile.uid == item.uid) {
                return;
            }
            this.$confirm("确定要切换到该马甲吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    User.update(item).then(async () => {
                        localStorage.setItem(
                            "jx3box-alternate-" + item.uid,
                            JSON.stringify({
                                ...item,
                                created_at: Number(localStorage.getItem("created_at")),
                            })
                        );
                        await refreshAuth();
                        location.reload();
                        this.visible = false;
                    });
                })
                .catch(() => {});
        },
        // 删除马甲
        onRemoveAlternate(item) {
            this.$confirm("确定要删除该马甲吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    localStorage.removeItem("jx3box-alternate-" + item.uid);

                    this.alternate = this.alternate.filter((alt) => alt.uid != item.uid);
                })
                .catch(() => {});
        },
        // 新增马甲
        onAddAlternate() {
            if (this.overLength) {
                this.$message.error("最多只能添加5个马甲");
                return;
            }
            // 跳转至登录页
            location.href = __Links.account.login + "?alternate=1";
        },
    },
};
</script>

<style lang="less">
.c-alternate {
    .el-dialog__title {
        .fz(12px);
    }
    .el-dialog__body {
        padding: 0;
    }
    .el-dialog__header {
        // padding: 10px;
        border-bottom: #dcdfe6 1px solid;
    }
    .c-alternate__content {
        max-height: 600px;
        overflow-y: auto;
    }
    .c-alternate-item {
        .flex;
        gap: 10px;
        .pointer;
        padding: 10px;
        .pr;
        border-bottom: 1px solid #eee;
        .fz(13px);

        &:hover {
            background-color: @bg-light;

            .u-remove {
                display: block;
            }
        }
    }

    .u-remove {
        .pa;
        right: 10px;
        top: 5px;
        color: #999;
        .pointer;
        font-size: 16px;

        &:hover {
            color: #333;
        }
        .none;
    }

    .m-avatar {
        .pr;
    }
    .u-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .u-active {
        .pa;
        right: -2px;
        top: -6px;
        width: 20px;
        height: 20px;
        fill: #fff;
    }

    .m-misc {
        .flex;
        flex-direction: column;
        gap: 10px;
    }
    .u-label {
        font-size: 12px;
        color: #999;
    }

    .u-extra {
        font-size: 12px;
        color: #999;
    }

    .is-expired {
        .u-time {
            color: #c00;
        }
    }

    .c-alternate-btn {
        // padding: 10px;
        text-align: center;
        .pointer;
        // width: 100%;
        // border-radius: 0;
        .size(100%,74px);
        .fz(40px,74px);
        color: #999;
        &:hover {
            background-color: @bg-light;
            color: #888;
        }
    }
}
</style>
