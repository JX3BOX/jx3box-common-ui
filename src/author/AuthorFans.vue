<template>
    <div class="c-author-fans">
        <!--       <div class="f-main-box">
            <div class="f-left">
                <div class="f-l-box"><div class="f-l-title">粉丝团</div></div>
            </div>
            <div class="f-right">
                <div class="f-r-box"><div class="f-r-num">共{{list.length}}人</div></div>
                <div class="f-r-line f-r-w-80 f-r-mb"></div>
                <div class="f-r-line f-r-w-70 f-r-mb"></div>
                <div class="f-r-line f-r-w-30 f-r-mb"></div>
                <div class="f-r-line f-r-w-20 f-r-mb"></div>
                <div class="f-r-line f-r-w-30 f-r-mb"></div>
                <div class="f-r-line f-r-w-70 f-r-mb"></div>
                <div class="f-r-line f-r-w-80"></div>
            </div>
        </div> -->
        <div class="u-label">
            <i class="el-icon-star-off"></i>
            <span>粉丝榜</span>
        </div>
        <div class="f-avatar" v-if="list.length > 0">
            <el-row :gutter="10">
                <el-col :span="4" v-for="(item, index) in list" :key="item.pay_user_id">
                    <el-tooltip class="item" effect="dark" :content="item.money.toString()" placement="top" v-if="index < 5">
                        <el-avatar shape="circle" :size="30" style="background: #D9D9D9;"><i class="el-icon-s-custom"></i></el-avatar>
                    </el-tooltip>
                </el-col>
                <el-col :span="4" v-if="list.length>5">
                    <el-avatar shape="circle" :size="30" style="background: #D9D9D9;">
                        <span class="f-avatar-num" v-if="list.length > 99">···</span>
                        <span class="f-avatar-num" v-else>+{{ list.length - 5 }}</span>
                    </el-avatar>
                </el-col>
            </el-row>
        </div>
        <div class="f-bottom">本赛季共 {{ list.length }} 人为TA赠礼</div>
    </div>
</template>

<script>
import User from '@jx3box/jx3box-common/js/user';
import { getFansList } from "../../service/author";
export default {
    name: 'Fans',
    components: {},
    data() {
        return {
            list: []
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            getFansList(User.getInfo().uid).then(res => {
                let data = res.data.data.list;
                if (data) {
                    this.list=data
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>

.c-author-fans {
    box-sizing: border-box;
    // padding: 10px;
    // background: #ffffff;
    font-family: 'Microsoft YaHei';
    font-style: normal;
    // .h(133px);
    .f-main-box {
        display: flex;
        justify-content: center;
        width: 100%;
        .f-left {
            .w(65.3%);
            .f-l-box {
                .w(100%);
                .h(50px);
                background: #ff7cab;
                border-radius: 5px 0px 0px 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex: none;
                .f-l-title {
                    .w(48px);
                    .h(21px);
                    .fz(16px, 21px);
                    font-weight: 700;
                    color: #ffffff;
                }
            }
        }
        .f-right {
            position: relative;
            .w(34.7%);
            .f-r-box {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: none;
                .h(50px);
                .w(100%);
                z-index: 2;
                position: absolute;
                .f-r-num {
                    font-weight: 700;
                    .fz(10px, 13px);
                    .w(100%);
                    color: rgba(0, 0, 0, 0.5);
                    padding-left: 37.5%;
                }
            }
            .f-r-line {
                .h(5px);
                background: #ff7cab;
                border-radius: 0px 5px 5px 0px;
            }
            .f-r-mb {
                .mb(2.5px);
            }
            .f-r-w-80 {
                .w(100%);
            }
            .f-r-w-70 {
                .w(87.5%);
            }
            .f-r-w-30 {
                .w(37.5%);
            }
            .f-r-w-20 {
                .w(25%);
            }
        }
    }
    .f-avatar {
        .mt(10px);
        height: 30px;
        .f-avatar-num {
            .fz(10px);
            color: #434343;
            font-weight: 700;
        }
    }
    .f-bottom {
        .h(13px);
        .mt(10px);
        .fz(10px, 13px);
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
    }
}
</style>
