<template>
    <div class="c-header-msg" id="c-header-msg">
        <el-tooltip effect="dark" content="消息中心" placement="bottom" popper-class="c-header-tooltip">
            <a class="u-msg" :href="url">
                <i class="u-icon u-icon-msg">
                    <i class="u-pop" style="display: none" v-show="pop"></i>
                    <img svg-inline src="../../assets/img/header/bell.svg" />
                </i>
            </a>
        </el-tooltip>
    </div>
</template>

<script>
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
import { getLetter, getMsg } from "../../service/header";
export default {
    name: "message",
    data: function () {
        return {
            url: __Links.dashboard.msg,
            pop: false,
        };
    },
    mounted() {
        this.checkMSG();
    },
    methods: {
        // 消息
        checkMSG: async function () {
            const letterRes = await getLetter();
            const msgRes = await getMsg();
            this.pop = !!(Math.max(~~letterRes.data.data.letter, 0) || Math.max(~~msgRes.data.data.unread_count, 0));
        },
    },
};
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
        cursor: pointer;
    }
    .u-icon-msg {
        .pr;
        .size(18px)
    }
    .u-pop {
        width: 10px;
        height: 10px;
        color: #fff;
        background-image: linear-gradient(#54a3ff, #006eed);
        background-clip: padding-box;
        border: 2px solid #24292e;
        border-radius: 50%;
        position: absolute;
        right: -5px;
        top: -6px;
        .z(1);
    }
}

@media screen and (max-width: @ipad) {
    .c-header-msg {
        display: none;
    }
}
</style>
