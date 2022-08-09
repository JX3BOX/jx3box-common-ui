<template>
    <div class="c-author-follow">
        <!-- <template v-if="isLogin">
            <template v-if="isSelf">
                <div class="u-fans-box">
                    <span class="u-fans-label">关注</span>
                    <span class="u-fans">{{ formatFansNum(fansNum) }}</span>
                </div>
            </template>
            <template v-else>

            </template>
        </template>
        <el-button class="u-fans-box" @click="follow" size="mini" v-else>
            <span class="u-fans-label">关注</span>
            <span class="u-fans">{{ formatFansNum(fansNum) }}</span>
        </el-button> -->
        <el-button
            v-if="!isFollow"
            :class="{ 'is-follow': isFollow, 'u-fans-box': isSelf }"
            size="mini"
            :icon="!isSelf && btnIcon"
            @click="follow"
            :type="isSelf ? '' : btnType"
            :loading="loading"
            :disabled="isSelf"
        >
            {{ btnText }}<span class="u-follow-count">{{ formatFansNum(fansNum) }}</span>
        </el-button>
        <el-popover
            v-else
            placement="bottom"
            trigger="hover"
            popper-class="u-follow-popover"
            :visible-arrow="false"
        >
            <div class="u-action-list">
                <div class="u-action-item" v-for="item in actions" :key="item.label" @click.stop="item.action">{{ item.label }}</div>
            </div>
            <el-button class="u-unfollow-btn" size="mini" :type="btnType" slot="reference">{{ btnText }}<span class="u-follow-count">{{ formatFansNum(fansNum) }}</span></el-button>
        </el-popover>
        <el-button size="mini" icon="el-icon-message" disabled title="Lv4+可用">私信</el-button>
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
            loading: false
        };
    },
    computed: {
        btnText() {
            return this.isFollow ? "已关注" : "关注";
        },
        btnIcon() {
            return this.isSelf ? "" : (this.isFollow ? "" : "el-icon-plus");
        },
        btnType() {
            return this.isFollow ? "info" : "warning"
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
        isLogin: function() {
            return User.isLogin();
        },
    },
    watch: {
        uid: {
            immediate: true,
            handler(val) {
                val && this.loadFans();
            },
        }
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
            this.$confirm('确定不再关注此人？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
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
                }).finally(() => {
                    this.loading = false;
                });
        }
    },
};
</script>

<style scoped lang="less">
.u-unfollow-btn {
    &.el-button {
        margin-right: 10px;
    }
}
.u-follow-popover {
    &.el-popover {
        min-width: 100px;
        padding: 0;
        margin: 0;
        .u-action-list {
            .u-action-item {
                text-align: center;
                cursor: pointer;
                padding: 8px 10px;
                &:hover {
                    background: rgb(248,248,251);
                }
            }
        }
    }
}
.u-follow-count{
    margin-left:5px;
}

.u-fans-box {
    cursor: default !important;
    .u-fans-label {
        color: #999;
        margin-right: 5px;
    }
    .u-fans {
        color: #333;
    }
}
</style>
