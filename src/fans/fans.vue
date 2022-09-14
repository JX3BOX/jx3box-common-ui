<template>
    <div class="fans">
        <div class="f-left">
            <div class="f-box"><div class="f-title">粉丝团</div></div>
        </div>
        <div class="f-right">
            <div class="r-box"><div class="r-num">共1999人</div></div>
            <div class="r-line r-w-80 r-margin-bottom"></div>
            <div class="r-line r-w-70 r-margin-bottom"></div>
            <div class="r-line r-w-30 r-margin-bottom"></div>
            <div class="r-line r-w-20 r-margin-bottom"></div>
            <div class="r-line r-w-30 r-margin-bottom"></div>
            <div class="r-line r-w-70 r-margin-bottom"></div>
            <div class="r-line r-w-80"></div>
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
.fans {
    box-sizing: border-box;
    padding: 10px 8px;
    // position: relative;
    width: 250px;
    height: 133px;
    background: #ffffff;
    // border: 1px solid rgba(63, 68, 72, 0.2);
    // border-radius: 5px;
    // margin-bottom: 10px;
    .f-left {
        display: inline-block;
        height: 50px;
        position: relative;
        .f-box {
            width: 150px;
            height: 50px;
            background: #ff7cab;
            border-radius: 5px 0px 0px 5px;
            // padding: 14px 32px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex: none;
            order: 0;
            flex-grow: 0;
            .f-title {
                font-family: 'Microsoft YaHei';
                position: absolute;
                width: 48px;
                height: 21px;
                font-family: 'Microsoft YaHei';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 21px;
                color: #ffffff;
            }
        }
    }
    .f-right {
        display: inline-block;
        height: 50px;
        position: relative;
        .r-box {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex: none;
            order: 0;
            flex-grow: 0;
            width: 80px;
            height: 50px;
            z-index: 1994;
            position: absolute;
            top: 0;
            .r-num {
                font-weight: 700;
                font-size: 10px;
                line-height: 13px;
                color: rgba(0, 0, 0, 0.5);
                padding-right: 5px;
                width: 100%;
                text-align: right;
            }
        }
        .r-line {
            height: 5px;
            background: #ff7cab;
            border-radius: 0px 5px 5px 0px;
        }
        .r-margin-bottom {
            margin-bottom: 2.5px;
        }
        .r-w-80 {
            width: 80px;
        }
        .r-w-70 {
            width: 70px;
        }
        .r-w-30 {
            width: 30px;
        }
        .r-w-20 {
            width: 20px;
        }
    }
    .f-avatar {
        padding-top: 10px;
        height: 30px;
        .f-avatar-num {
            font-family: 'Microsoft YaHei';
            font-weight: 700;
            font-size: 10px;
            color: #000000;
        }
    }
    .f-bottom {
        font-family: 'Microsoft YaHei';
        // width: 111px;
        height: 13px;
        font-family: 'Microsoft YaHei';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 13px;
        color: rgba(0, 0, 0, 0.5);
        padding-top: 10px;
    }
}
</style>
