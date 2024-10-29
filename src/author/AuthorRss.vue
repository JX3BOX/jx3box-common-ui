<template>
    <div class="c-author-rss">
        <el-button
            class="u-btn"
            size="mini"
            @click="subscribe"
            :loading="loading"
            :disabled="isSelf"
        >
            <img class="u-icon" svg-inline :src="src" />
            {{ btnText }}</el-button
        >
    </div>
</template>

<script>
import { getAuthorRss, subscribeAuthor, unsubscribeAuthor } from "@jx3box/jx3box-common/js/rss";
import User from "@jx3box/jx3box-common/js/user";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "AuthorRss",
    props: {
        uid: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            subscribed: false,
            fansNum: 0,
            loading: false,
        };
    },
    computed: {
        btnText() {
            return this.subscribed ? "已订阅" : "订阅";
        },
        btnType() {
            return !this.subscribed ? "info" : "warning";
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
        src() {
            return __cdn + "design/vector/icon/rss_origin.svg";
        }
    },
    watch: {
        uid: {
            immediate: true,
            handler(val) {
                val && this.loadRss();
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
        subscribe() {
            if (!this.isLogin) {
                User.toLogin();
                return;
            }
            if (this.subscribed) {
                this.unsubscribe({ id: this.uid });
            } else {
                subscribeAuthor({ id: this.uid })
                    .then((res) => {
                        this.subscribed = true;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        // 取消订阅
        unsubscribe() {
            // this.$confirm("是否取消订阅", "提示", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     type: "warning",
            // }).then(() => {
                unsubscribeAuthor({ id: this.uid })
                    .then((res) => {
                        this.$message.success("操作成功");
                        this.subscribed = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            // });
        },
        loadRss() {
            this.loading = true;
            getAuthorRss({ id: this.uid })
                .then((res) => {
                    this.fansNum = res.data.data.total || 0;
                    this.subscribed = res.data.data.subscribed;
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
.c-author-rss {
    .u-btn.el-button {
        cursor: default;
        &:hover {
            cursor: pointer;
            // background-color: @light-pink;
            // color: #fff;
            // border-color: darken(@light-pink, 2%);

            .u-icon {
                filter: invert(30%) sepia(87%) saturate(1486%) hue-rotate(194deg) brightness(87%) contrast(107%);
            }
        }
    }
    .u-icon {
        .size(12px);
    }
}

@media screen and (max-width: @phone) {
    .el-message-box {
        max-width: 60%;
    }
}
</style>
