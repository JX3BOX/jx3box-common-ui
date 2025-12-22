<template>
    <div class="w-boxcoin-user" v-if="allowBoxcoin">
        <el-tooltip effect="dark" content="投币" placement="top-start" v-if="canGift">
            <div class="w-boxcoin-block" @click="openBoxcoinPop">
                <img class="u-icon" svg-inline :src="iconPath" />
                <span class="u-count" v-if="boxcoin">{{boxcoin}}</span>
            </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="您当前等级不够，不能够进行投币。" placement="top" v-else>
             <div class="w-boxcoin-block disabled">
                <img class="u-icon" svg-inline :src="iconPath" />
                <span class="u-count" v-if="boxcoin">{{boxcoin}}</span>
            </div>
        </el-tooltip>
        <el-dialog title="投币打赏" :visible.sync="visible" custom-class="w-boxcoin-pop" append-to-body :close-on-click-modal="false">
            <div class="w-boxcoin-user-content">
                <div class="u-left">
                    <em class="u-label">当前拥有盒币</em>
                    <b>{{left}}</b>
                    <!-- <a class="u-charge" :href="chargeLink" target="_blank">[充值]</a> -->
                </div>
                <div class="u-list">
                    <em class="u-label">❤️ 打赏</em>
                    <Contributors v-if="authors && authors.length" :authors="authors" @chosen="handleChosen" />
                    <div class="u-points">
                        <el-radio-group v-model="count">
                            <el-radio :label="item" v-for="item in fitPoints" :key="item" border>
                                <b>{{item}}</b>盒币
                            </el-radio>
                            <el-radio label="custom" border>自定义</el-radio>
                            <el-input v-model="amount" v-show="count === 'custom'" placeholder="输入自定义数量"></el-input>
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
import Contributors from './Contributors.vue';
import _ from "lodash";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "BoxcoinUser",
    props: ["boxcoin", "postType", "postId", "userId", "own", "points", "authors",'client',"category","canGift"],
    components: {
        Contributors
    },
    data: function () {
        return {
            visible: false,

            count: 0,
            remark: "辛苦了，谢谢大大！",
            amount: "",

            left : this.own,

            chargeLink: "/vip/boxcoin?redirect=" + location.href,

            chosen: '', // 被选中的人
        };
    },
    computed: {
        ready: function () {
            const count = this.count === 'custom' ? this.amount : this.count
            return this.isNotSelf && this.isEnough && count && this.remark;
        },
        isNotSelf: function () {
            return this.userId != User.getInfo().uid;
        },
        isEnough: function () {
            const count = this.count === 'custom' ? this.amount : this.count
            return this.left && this.left >= count;
        },
        allowBoxcoin : function (){
            return this.postType && this.postId && (this.userId || (this.authors && this.authors.length))
        },
        hostClient : function (){
            return location.href.includes('origin') ? 'origin' : 'std'
        },
        fitPoints : function (){
            return this.points//.filter(item => item <= this.left)
        },
        isCustom(){
            return this.count === 'custom'
        },
        iconPath() {
            return __cdn + "design/vector/icon/reward.svg"
        },
    },
    watch: {
        own : function (val){
            this.left = val
        }
    },
    methods: {
        openBoxcoinPop: function () {
            if (User.isLogin()) {
                this.likeImg = require("../../assets/img/widget/like4ing.gif");
                this.visible = true;

                _.debounce(() => {
                    this.likeImg = require("../../assets/img/widget/like4.png");
                }, 2800)();
            } else {
                User.toLogin();
            }
        },
        // 选择要打赏的对象
        handleChosen(userId) {
            this.chosen = userId
        },
        submit: function () {
            const count = this.count === 'custom' ? this.amount : this.count;
            let client = this.client || this.hostClient;
            if (!['std', 'origin', 'all'].includes(client)) {
                client = 'std'
            }
            rewardBoxcoin(this.postType, this.postId, this.chosen || this.userId, count, {
                remark: this.remark,
                client: client,
                redirect: this.category ? `/${this.category}/${this.postId}` : undefined
            })
                .then((res) => {
                    this.$message({
                        message: "操作成功",
                        type: "success",
                    });
                    return res.data.data
                })
                .then((data) => {
                    // 1.扣除额度
                    this.left -= this.count;
                    // 2. 将新增emit出去
                    this.$emit('updateRecord', data);
                })
                .finally(() => {
                    this.visible = false;
                });
        },
    },
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
    }
    .u-count {
        color: #888;
        .ml(10px);
        top: 4px;
        .pr;
    }
    .u-charge {
        .underline(@color-link);
        .ml(10px);
    }
}
</style>
