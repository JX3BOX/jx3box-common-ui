<template>
    <div class="fans">
        <div class="f-main-box">
            <div class="f-left">
                <div class="f-l-box"><div class="f-l-title">粉丝团</div></div>
            </div>
            <div class="f-right">
                <div class="f-r-box"><div class="f-r-num">共199人</div></div>
                <div class="f-r-line f-r-w-80 f-r-mb"></div>
                <div class="f-r-line f-r-w-70 f-r-mb"></div>
                <div class="f-r-line f-r-w-30 f-r-mb"></div>
                <div class="f-r-line f-r-w-20 f-r-mb"></div>
                <div class="f-r-line f-r-w-30 f-r-mb"></div>
                <div class="f-r-line f-r-w-70 f-r-mb"></div>
                <div class="f-r-line f-r-w-80"></div>
            </div>
        </div>

        <div class="f-avatar">
            <el-row :gutter="10">
                <el-col :span="4" v-for="(item, index) in 6" :key="index">
                    <el-avatar shape="circle" :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" v-if="index < 5"></el-avatar>
                    <el-avatar shape="circle" :size="30" v-else style="background: #D9D9D9;"><span class="f-avatar-num">···</span></el-avatar>
                </el-col>
            </el-row>
        </div>
        <div class="f-bottom">本赛季共199人为TA赠礼</div>
    </div>
</template>

<script>
export default {
    name: 'Fans',
    components: {},
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1680px) {
    .fans {
        width: 250px;
    }
}
@media screen and (max-width: 1440px) {
    .fans {
        width: 230px;
    }
}
.fans {
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff;
    font-family: 'Microsoft YaHei';
    font-style: normal;
    .h(133px);
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
            color: #000000;
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
