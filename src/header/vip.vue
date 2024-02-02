<template>
    <div class="c-header-panel c-header-vip" id="c-header-vip">
        <el-tooltip effect="dark" content="会员中心" placement="bottom" popper-class="c-header-tooltip">
            <a class="u-post u-vip" href="/vip/premium">
                <i class="u-icon u-icon-msg">
                    <i class="u-pop" style="display: none" v-show="pop"></i>
                    <img class="u-add" svg-inline src="../../assets/img/header/vip.svg" />
                </i>
            </a>
        </el-tooltip>
    </div>
</template>

<script>
import { getConfig, getUserMeta, setUserMeta } from "../../service/cms";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "vip",
    data: function () {
        return {
            pop: false
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            /**
             * 1. 用户第一次进入页面时，没有记录，则显示，并记录到meta
             * 2. 用户第二次进入页面，此时meta有记录，但是用户并未进入会员中心，则显示
             */
            let meta = null
            meta = User.isLogin() && await getUserMeta({ key: 'vip_pop' });
            let config = await getConfig({ key: "vip" });


            if (meta == null) {
                const val = ~~config.val;

                if (val) {
                    this.pop = true;
                    localStorage.setItem('vip_pop', config.val);
                    setUserMeta("vip_pop", { val: 1 });
                }
            } else {
                if (meta == 1) {
                    this.pop = true;

                    localStorage.setItem('vip_pop', config.val);
                } else {
                    const local = localStorage.getItem('vip_pop');

                    if (~~config.val > ~~local) {
                        this.pop = true;

                        localStorage.setItem('vip_pop', config.val);

                        setUserMeta("vip_pop", { val: 1 });
                    }
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.c-header-vip {
    height: 100%;

    .u-icon-msg {
        width: 17px;
        height: 17px;
        display: block;
        .pr;
        top: 1px;
        svg {
            width: 100%;
            height: 100%;
        }
        .pr;
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
        z-index: 1;
    }
    .u-vip {
        padding: 0 10px;
        height: 100%;
        .flex;
        align-items: center;

        &:hover {
            opacity: 0.7;
        }
        cursor: pointer;
    }
}
</style>
