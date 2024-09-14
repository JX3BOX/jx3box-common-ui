<template>
    <div class="w-boxcoin-admin">
        <el-dialog
            :title="dialogTitle"
            :visible="modelValue"
            custom-class="w-boxcoin-pop"
            :close-on-click-modal="false"
            append-to-body
            @close="onClose"
        >
            <div class="w-boxcoin-admin-content">
                <div class="u-left" v-if="type == 'grant'">
                    <em class="u-label">本月状态</em>
                    已用<b>{{ this.used }}</b> 剩余<b>{{ this.left }}</b> 总计<b>{{ this.total }}</b>
                    <el-progress
                        :percentage="this.total ? 100 - (this.used * 100) / this.total : 0"
                        :stroke-width="15"
                        :text-inside="true"
                    ></el-progress>
                </div>
                <div class="u-left" v-else>
                    <em class="u-label">当前拥有盒币</em>
                    <b>{{ left }}</b>
                    <!-- <a class="u-charge" :href="chargeLink" target="_blank">[充值]</a> -->
                </div>
                <el-radio-group class="u-homework-type" v-model="type" size="small" v-if="hasPermission">
                    <el-radio-button label="grant">品鉴</el-radio-button>
                    <el-radio-button label="reward">打赏</el-radio-button>
                </el-radio-group>
                <div class="u-list">
                    <em class="u-label">❤️ {{ type == "reward" ? "打赏" : "品鉴" }}</em>
                    <div class="u-points">
                        <el-radio-group v-model="count">
                            <el-radio :label="item" v-for="item in fitPoints" :key="item" border>
                                <b>{{ item }}</b
                                >盒币
                            </el-radio>
                            <el-radio label="custom" border>自定义</el-radio>
                            <el-input
                                v-model="amount"
                                v-show="count === 'custom'"
                                placeholder="输入自定义数量"
                            ></el-input>
                        </el-radio-group>
                    </div>
                </div>
                <div class="u-msg">
                    <em class="u-label">📝 寄语</em>
                    <div class="u-input">
                        <el-input
                            v-model="remark"
                            placeholder="请输入寄语（必填）"
                            :minlength="2"
                            :maxlength="30"
                            show-word-limit
                        ></el-input>
                        <el-button :disabled="fetchingCurrentRelease" @click="insertCurrentRelease"
                            >插入当前版本</el-button
                        >
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" @click="submit" :disabled="!ready || submitting">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { grantBoxcoin, getPostBoxcoinConfig, getBoxcoinStatus, rewardBoxcoin } from "../../service/thx.js";
import User from "@jx3box/jx3box-common/js/user";
import { getBreadcrumb } from "@jx3box/jx3box-common/js/api_misc";
export default {
    name: "Homework",
    props: ["postType", "postId", "userId", "client", "modelValue", "articleId", "category", "title"],
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    data: function () {
        return {
            count: 0,

            remark: "不错，加油！",
            chosen: "", // 被选中的人
            amount: "",

            submitting: false,
            fetchingCurrentRelease: false,

            // 打赏or品鉴
            type: "reward",

            // config
            admin_max: 0,
            admin_min: 0,
            admin_left: 0,
            admin_total: 0,
            admin_points: [100],

            user_left: 0,
            user_points: [100],
            boxcoin_enable: false,
        };
    },
    computed: {
        left() {
            return this.type === "reward" ? this.user_left : this.admin_left;
        },
        hasPermission() {
            return User.hasPermission("manage_bbs_reward");
        },
        total: function () {
            return this.admin_total;
        },
        used: function () {
            return this.total - this.left;
        },
        ready: function () {
            const count = this.count === "custom" ? this.amount : this.count;
            // 不能给自己打赏，打赏目标不能是自己
            // 打赏数量不能超过剩余数量
            // 打赏数量不能为0
            // 打赏寄语不能为空
            return !!(!this.isSelf && !this.targetIsSelf && this.isEnough && count && this.remark);
        },
        isNotSelf: function () {
            return this.userId != User.getInfo().uid;
        },
        targetIsSelf: function () {
            return this.chosen == User.getInfo().uid;
        },
        isEnough: function () {
            const count = this.count === "custom" ? this.amount : this.count;
            return this.left && this.left >= count;
        },
        allowBoxcoin: function () {
            return this.postType && this.postId && (this.userId || (this.authors && this.authors.length));
        },
        hostClient: function () {
            return location.href.includes("origin") ? "origin" : "std";
        },
        points: function () {
            return this.type === "reward" ? this.user_points : this.admin_points;
        },
        fitPoints: function () {
            const points = this.points.filter((item) => item <= this.left);
            if (this.isSignAuthor) {
                // 最大值为1000
                return points.filter((item) => item <= 1000);
            }
            return points;
        },
        isSignAuthor: function () {
            return User.getInfo().group == 32;
        },
        finalClient: function () {
            if (this.client == "wujie") {
                return "std";
            }
            return this.client;
        },
        dialogTitle() {
            return this.title || "批改作业";
        },
    },
    watch: {
        own: function (val) {
            this.left = val;
        },
        modelValue: function (val) {
            if (val) {
                this.loadBoxcoinConfig();

                if (this.hasPermission) {
                    this.type = 'grant'
                }
            }
        },
    },
    methods: {
        // 选择要打赏的对象
        handleChosen(userId) {
            this.chosen = userId;
        },
        submit: function () {
            this.submitting = true;
            const count = this.count === "custom" ? this.amount : this.count;
            let client = this.client || this.hostClient;
            if (!["std", "origin", "all"].includes(client)) {
                client = "std";
            }
            const fn = this.type === "reward" ? rewardBoxcoin : grantBoxcoin;
            fn(this.postType, this.postId, this.userId, count, {
                remark: this.remark,
                client: client,
                redirect: `/${this.category}/${this.articleId}`,
            })
                .then((res) => {
                    this.$message({
                        message: "操作成功",
                        type: "success",
                    });
                    return res.data.data;
                })
                .then((data) => {
                    // 1.扣除额度
                    this.left -= this.count;
                    // 2.将修改emit出去
                    this.$emit("updateRecord", data);
                })
                .finally(() => {
                    this.submitting = false;
                    this.onClose();
                });
        },
        insertCurrentRelease: function () {
            this.fetchingCurrentRelease = true;
            getBreadcrumb(`current-release-${this.hostClient}`)
                .then((res) => {
                    this.remark += res;
                })
                .catch((err) => {
                    this.$message({
                        message: "获取失败",
                        type: "error",
                    });
                })
                .finally(() => {
                    this.fetchingCurrentRelease = false;
                });
        },
        loadBoxcoinConfig: function () {
            User.isLogin() &&
                getPostBoxcoinConfig(this.postType).then((res) => {
                    this.admin_max = res.data.data.limit.admin_max || 0;
                    this.admin_min = res.data.data.limit.admin_min || 0;
                    this.admin_points = res.data.data.limit.admin_points || [10, 1000];
                    this.admin_left = res.data.data.asManagerBoxCoinRemain || 0;
                    this.admin_total = res.data.data.asManagerBoxCoinTotal || 0;

                    this.user_points = res.data.data.limit.user_points || [10, 1000];
                    // 根据多端展示剩余币
                    // 作品是n端，接受n端币+all币
                    if (this.finalClient == "origin") {
                        this.user_left = res.data.data.asUserBoxCoinRemainOrigin + res.data.data.asUserBoxCoinRemainAll;
                    } else if (this.finalClient == "std") {
                        this.user_left = res.data.data.asUserBoxCoinRemainStd + res.data.data.asUserBoxCoinRemainAll;
                    } else {
                        this.user_left =
                            res.data.data.asUserBoxCoinRemainAll +
                            res.data.data.asUserBoxCoinRemainStd +
                            res.data.data.asUserBoxCoinRemainOrigin;
                    }
                });
            getBoxcoinStatus().then((res) => {
                this.boxcoin_enable = !!~~res.data?.data?.val;
            });
        },
        onClose() {
            this.$emit("update:modelValue", false);
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/thx.less";
.u-homework-type {
    margin-top: 10px;
}
</style>
