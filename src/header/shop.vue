<template>
    <div class="c-header-panel c-header-shop">
        <el-tooltip effect="dark" content="积分商城" placement="bottom" popper-class="c-header-tooltip">
            <a class="u-present" href="/vip/mall">
                <i class="u-icon u-icon-msg">
                    <i class="u-pop" style="display: none" v-show="pop"></i>
                    <img class="u-icon" svg-inline src="../../assets/img/header/gift.svg" />
                </i>
            </a>
        </el-tooltip>
    </div>
</template>

<script>
import { getConfig, getUserMeta, setUserMeta } from "../../service/cms";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "shop",
    data: function () {
        return {
            pop: false,
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
             *
             * meta如果为null，说明用户未登录，不显示
             * meta如果为0，说明用户已经看过，不显示，同时比较config的值，如果config的值大于local，更新local为config的值和meta为1
             * meta如果为1，说明用户未看过，显示
             */
            let meta = null
            if (User.isLogin()) {
                meta = await getUserMeta({ key: "mall_pop" });
            }
            let config = await getConfig({ key: "mall" });

            if (meta == null) {
                const val = ~~config.val;

                if (val) {
                    this.pop = true;
                    localStorage.setItem('mall_pop', config.val);
                    setUserMeta("mall_pop", { val: 1 });
                }
            } else {
                if (meta == 1) {
                    this.pop = true;

                    localStorage.setItem('mall_pop', config.val);
                } else {
                    const local = localStorage.getItem('mall_pop');

                    if (~~config.val > ~~local) {
                        this.pop = true;

                        localStorage.setItem('mall_pop', config.val);

                        setUserMeta("mall_pop", { val: 1 });
                    }
                }
            }
        },
    },
}
</script>

<style lang="less">
.c-header-shop {
    .u-present {
        padding: 0 10px;
        height: 100%;
        .flex;
        align-items: center;
        &:hover {
            .tm(0.7);
        }
    }

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

    .u-icon {
        color: #fff;
        .size(16px);
    }
}
</style>
