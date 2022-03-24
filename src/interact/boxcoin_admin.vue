<template>
    <div class="w-boxcoin-admin" v-if="allowBoxcoin">
        <el-tooltip effect="dark" content="品鉴" placement="top-start">
            <div class="w-boxcoin-block">
                <img
                    @click="openBoxcoinPop"
                    class="u-icon"
                    svg-inline
                    src="../../assets/img/widget/like3.svg"
                />
            </div>
        </el-tooltip>
        <el-dialog title="品鉴评分" :visible.sync="visible" custom-class="w-boxcoin-pop" :close-on-click-modal="false">
            <div class="w-boxcoin-admin-content">
                <div class="u-left">
                    <em class="u-label">本月剩余额度</em>
                    <b>{{left}}</b>
                </div>
                <div class="u-list">
                    <em class="u-label">❤️ 品鉴</em>
                    <Contributors v-if="authors && authors.length" :authors="authors" @chosen="handleChosen" />
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
import Contributors from '@/interact/Contributors.vue';
export default {
    name: "BoxcoinAdmin",
    props: ["postType", "postId", "userId", "own", "points", 'authors'],
    components: {
        Contributors
    },
    data: function () {
        return {
            visible: false,

            count: 0,
            remark: "辛苦，感谢！",

            left : this.own,

            chosen: '', // 被选中的人
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
        allowBoxcoin : function (){
            return this.postType && this.postId && this.userId
        },
        client : function (){
            return location.href.includes('origin') ? 'origin' : 'std'
        }
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
        // 选择要打赏的对象
        handleChosen(userId) {
            this.chosen = userId
        },
        submit: function () {
            grantBoxcoin(this.postType, this.postId, this.chosen || this.userId, this.count, {
                remark: this.remark,
                client : this.client
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
                    // 2.将修改emit出去
                    this.$emit('updateRecord', data);
                })
                .finally(() => {
                    this.visible = false;
                });


        },
        init: function () {},
    },
    created: function () {},
    mounted: function () {},
};
</script>
