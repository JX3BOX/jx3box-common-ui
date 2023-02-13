<template>
    <div class="c-header-msg" id="c-header-msg">
        <el-tooltip effect="dark" content="消息中心" placement="bottom" popper-class="c-header-tooltip">
            <a class="u-msg" :href="url">
                <i class="u-icon u-icon-msg">
                    <img svg-inline src="../../assets/img/header/bell.svg" />
                </i>
            </a>
        </el-tooltip>
    </div>
</template>

<script>
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "message",
    data: function () {
        return {
            url: __Links.dashboard.msg,
        };
    },
}
</script>


<style lang="less">
//消息面板
.c-header-msg {
    position: relative;
    height: 100%;

    .u-msg {
        .h(100%);
        .flex;
        align-items: center;

        padding: 0 10px;
        &:hover {
            opacity: 0.7;
        }
        cursor: pointer;
    }
    .u-icon-msg {
        // .mt(10px);
        width: 17px;
        height: 17px;
        display: block;
        .pr;
        top: 1px;
        // margin-top: 9px;
        svg {
            width: 100%;
            height: 100%;
        }
        .pr;
    }
}

@media screen and (max-width: @ipad) {
    .c-header-msg {
        display: none;
    }
}
</style>
