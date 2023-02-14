<template>
    <div class="c-header-logo">
        <i class="u-pic" id="c-header-logo" @click="toggleBox($event)" title="点击展开魔盒矩阵"
            ><img svg-inline src="../../assets/img/header/logo.svg"
        /></i>
        <a class="u-txt" :class="{ on: isIndex }" href="/" title="返回首页">魔盒</a>
    </div>
</template>

<script>
import Bus from "../../service/bus";
export default {
    name: "c-header-logo",
    props: [],
    data: function () {
        return {
            isIndex : /\/index\/?/.test(location.pathname)
        };
    },
    computed: {},
    methods: {
        // 盒子
        toggleBox: function (e) {
            e.stopPropagation();
            Bus.$emit("toggleBox");
        },
    },
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
//logo
.c-header-logo {
    .pointer;
    user-select: none;
    display: inline-flex;
    flex-shrink: 0;
    flex-grow: 0;
    height: @header-height;

    @padding: (@header-height - @logo-size)/2;

    .u-pic {
        padding: @padding 10px;
        .db;
        width: @logo-size;
        height: @logo-size;
        float: left;

        svg {
            .size(100%);
            fill: #fff;
        }
        transition: 0.3s ease-in-out;
        &:hover {
            transform: rotate(90deg);
            .mt(-2px);
        }
    }
    .u-txt {
        .db;
        color: #fff;
        font-family: Consolas;
        font-size: 20px;
        line-height: @logo-size;
        padding: @padding 10px;
        transition: 0.15s ease-in-out;
        // &:hover {
        background-color: #3a4248;
        // padding-left:10px;
        margin-right: 10px;
        // }
        &:hover {
            background-color: @color-link;
        }
        &.on {
            .pr;
            &:after {
                content: "";
                .db;
                border-bottom: 3px solid @primary;
                .pa;
                .lb(0);
                .w(100%);
            }
        }
    }
}
@media screen and (max-width: @phone) {
    .c-header-logo {
        padding-right: 0;
        .u-pic {
            margin: 0;
        }
        .u-txt {
            display: none;
        }
        margin-right: 0;
    }
}
</style>
