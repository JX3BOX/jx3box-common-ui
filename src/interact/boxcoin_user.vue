<template>
    <div class="w-boxcoin-user">
        <el-tooltip effect="dark" content="投币" placement="top-start">
            <div class="w-boxcoin-block" @click="openBoxcoinPop">
                <img class="u-icon" svg-inline src="../../assets/img/widget/heart1.svg" />
                <span class="u-count" v-if="boxcoin">{{boxcoin}}</span>
            </div>
        </el-tooltip>
        <el-dialog title="投币打赏" :visible.sync="visible" custom-class="w-boxcoin-pop">
            <div class="w-boxcoin-user-content">
                <div class="u-left">
                    <em class="u-label">当前拥有盒币</em>
                    <b>{{left}}</b>
                    <a class="u-charge" :href="chargeLink" target="_blank">[充值]</a>
                </div>
                <div class="u-list">
                    <em class="u-label">❤️ 打赏</em>
                    <div class="u-points">
                        <el-radio-group v-model="count">
                            <el-radio :label="item" v-for="item in points" :key="item" border>
                                <b>{{item}}</b>盒币
                            </el-radio>
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
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit" :disabled="!ready">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { rewardBoxcoin } from "../../service/thx.js";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "BoxcoinUser",
    props: ["boxcoin", "postType", "postId", "userId", "left", "points"],
    components: {},
    data: function () {
        return {
            visible: false,

            count: 0,
            remark: "辛苦了，谢谢大大！",

            chargeLink: "/vip/boxcoin?redirect=" + location.href,
        };
    },
    computed: {
        ready: function () {
            return this.isNotSelf && this.isEnough && this.count && this.remark;
        },
        isNotSelf: function () {
            return this.userId != User.getInfo().uid;
        },
        isEnough: function () {
            return this.left && this.left >= this.count;
        },
    },
    watch: {},
    methods: {
        openBoxcoinPop: function () {
            if (User.isLogin()) {
                this.visible = true;
            } else {
                User.toLogin();
            }
        },
        submit: function () {
            rewardBoxcoin(this.postType, this.postId, this.userId, this.count, {
                remark: this.remark,
            })
                .then((res) => {
                    this.$message({
                        message: "操作成功",
                        type: "success",
                    });
                })
                .then(() => {
                    // 1.扣除额度
                    this.left -= this.count;
                    // 2. 将新增emit出去
                    this.$emit('updateRecord', { count: this.count, remark: this.remark });
                })
                .finally(() => {
                    this.visible = false;
                });
        },
        init: function () {},
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.w-boxcoin-user {
    .dbi;
    .x(left);
    .u-icon {
        .size(26px);
        .y;
        .pr;
        top: -2px;
    }
    .u-count {
        color: #888;
        .ml(10px);
    }
    .u-charge {
        .underline(@color-link);
        .ml(10px);
    }
}
</style>