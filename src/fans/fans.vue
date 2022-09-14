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
.fans{
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff;
    font-family: 'Microsoft YaHei';
    font-style: normal;
    .w(250px);
    .h(133px);
    .f-left {
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        // .h(50px);
        .f-box {
            .w(150px);
            .h(50px);
            background: #ff7cab;
            border-radius: 5px 0px 0px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: none;
            .f-title {
                position: absolute;
                .w(48px);
                .h(21px);
                .fz(16px,21px);
                font-weight: 700;
                color: #ffffff;
            }
        }
    }
    .f-right {
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        .r-box {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: none;
            .h(50px);
            .w(80px);
            z-index: 1994;
            position: absolute;
            // top: 0;
            .r-num {
                font-weight: 700;
                .fz(10px,13px);
                .w(100%);
                color: rgba(0, 0, 0, 0.5);
                padding-left: 30px;
            }
        }
        .r-line {
            .h(5px);
            background: #ff7cab;
            border-radius: 0px 5px 5px 0px;
        }
        .r-margin-bottom {
            .mb(2.5px);
        }
        .r-w-80 {
            .w(80px);
        }
        .r-w-70 {
            .w(70px);
        }
        .r-w-30 {
            .w(30px);
        }
        .r-w-20 {
            .w(20px);
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
        .fz(10px,13px);
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
    }
}
</style>
