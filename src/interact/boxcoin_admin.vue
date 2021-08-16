<template>
    <div class="w-boxcoin-admin">
        <el-tooltip effect="dark" content="评分" placement="top-start">
            <div class="w-boxcoin-block">
                <img
                    @click="openBoxcoinPop"
                    class="u-icon"
                    svg-inline
                    src="../../assets/img/widget/like3.svg"
                />
            </div>
        </el-tooltip>
        <el-dialog title="管理评分" :visible.sync="visible" custom-class="w-boxcoin-pop">
            <div class="w-boxcoin-admin-content">
                <div class="u-left">
                    <em class="u-label">本月剩余额度</em>
                    <b>{{left}}</b>
                </div>
                <div class="u-list">
                    <em class="u-label">❤️ 评分</em>
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
import { grantBoxcoin } from "../../service/thx.js";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "BoxcoinAdmin",
    props: ["postType", "postId", "userId", "own", "points"],
    components: {},
    data: function () {
        return {
            visible: false,

            count: 0,
            remark: "辛苦，感谢！",

            left : this.own
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
    watch: {
        own : function (val){
            this.left = val
        }
    },
    methods: {
        openBoxcoinPop: function () {
            this.visible = true;
        },
        submit: function () {
            grantBoxcoin(this.postType, this.postId, this.userId, this.count, {
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
