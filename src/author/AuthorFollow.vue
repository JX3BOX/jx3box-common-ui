<template>
    <div class="u-follow">
        <el-button
            :class="{ 'is-follow': isFollow }"
            size="mini"
            :icon="btnIcon"
            @click="follow"
            :type="btnType"
            v-if="!isFollow"
        >
            {{ btnText }} {{ formatFansNum(fansNum) }}
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
            <el-button class="u-unfollow-btn" size="mini" :type="btnType" slot="reference">{{ btnText }} {{ formatFansNum(fansNum) }}</el-button>
        </el-popover>
        <el-button size="mini" icon="el-icon-message" disabled>私信</el-button>
    </div>
</template>

<script>
import { follow, unfollow, getMyFollowList, getFansCount } from "../../service/follow";
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
        };
    },
    computed: {
        btnText() {
            return this.isFollow ? "已关注" : "关注";
        },
        btnIcon() {
            return this.isFollow ? "" : "el-icon-plus";
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
        }
    },
    mounted () {
        this.loadMyFollow();
        this.loadFans();
    },
    methods: {
        // 格式化粉丝数
        formatFansNum(num) {
            if (num < 10000) {
                return num;
            } else {
                return (num / 10000).toFixed(1) + "万";
            }
        },
        // 关注
        follow() {
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
        // 获取是否已关注
        loadMyFollow() {
            const params = {
                pageIndex: 1,
                pageSize: 10,
                user_id: this.uid,
            };
            getMyFollowList(params)
                .then((res) => {
                    if (res.data.data.list.length > 0) {
                        this.isFollow = true;
                    } else {
                        this.isFollow = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        loadFans() {
            getFansCount(this.uid)
                .then((res) => {
                    this.fansNum = res.data.data.follower_count || 0;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
};
</script>

<style lang="less">
.u-follow {
}
.u-unfollow-btn {
    margin-right: 10px;
}
.u-follow-popover {
    min-width: 100px;
    padding: 0;
    margin: 0;
    .u-action-list {
        .u-action-item {
            text-align: center;
            cursor: pointer;
            padding: 12px 15px;
            &:hover {
                background: rgb(248,248,251);
            }
        }
    }
}
</style>
