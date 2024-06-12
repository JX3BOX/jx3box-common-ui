<template>
    <div class="c-header-panel c-header-assets">
        <a class="u-asset" href="/dashboard/boxcoin">
            <img class="u-coin" svg-inline src="../../assets/img/header/coin.svg" />
        </a>

        <div class="u-assets u-pop-content">
            <div class="u-detail">
                <span class="u-item">
                    <a class="u-item-primary" href="/about/incentives" :target="target">
                        <span class="u-label"><i class="el-icon-user"></i> 等级</span>
                        <span class="u-value u-level" :style="levelStyle">Lv.{{ level }}</span>
                    </a>
                    <!-- <span class="u-item-extend"><a href="/about/incentives" :target="target">[权益]</a></span> -->
                </span>
                <span class="u-item">
                    <a class="u-item-primary" href="/dashboard/boxcoin" :target="target"
                        ><span class="u-label"><i class="el-icon-coin"></i> 盒币</span>
                        <span class="u-value">{{ asset.box_coin }}</span></a
                    >
                    <span class="u-item-extend"><a href="/dashboard/boxcoin" :target="target">[兑换通宝]</a></span>
                </span>
                <span class="u-item">
                    <a class="u-item-primary" href="/dashboard/cny" :target="target"
                        ><span class="u-label"><i class="el-icon-wallet"></i> 金箔</span
                        ><span class="u-value">{{ asset.cny }}</span></a
                    >
                    <span class="u-item-extend"
                        ><a href="/vip/cny" :target="target">[充值]</a>
                        <a href="/dashboard/cny" :target="target">[提现]</a></span
                    >
                </span>
                <span class="u-item">
                    <a class="u-item-primary" href="/dashboard/points" :target="target"
                        ><span class="u-label"><i class="el-icon-sugar"></i> 银铛</span>
                        <span class="u-value">{{ asset.points }}</span></a
                    >
                    <span class="u-item-extend"
                        ><a href="/vip/mall" :target="target">[兑礼]</a
                        ><a href="/vip/lottery" :target="target">[抽奖]</a></span
                    >
                </span>
                <span class="u-item">
                    <a class="u-item-primary" href="/dashboard/card" :target="target"
                        ><span class="u-label"><i class="el-icon-bank-card"></i> 卡密</span>
                        <span class="u-value">{{ asset.ext_info ? asset.ext_info.keycode : 0 }}</span></a
                    >
                    <span class="u-item-extend"><a href="/dashboard/card" :target="target">[查看]</a></span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { __userLevelColor } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Asset",
    props: ["asset"],
    data() {
        return {
            // VIP
            target: "_self",
        };
    },
    computed: {
        level: function () {
            return User.getLevel(this.asset?.experience);
        },
        levelStyle: function () {
            return {
                background: __userLevelColor[this.level],
                color: "#fff",
                padding: "2px 8px",
                borderRadius: "2px",
            };
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/mixin.less";
// 用户资产
.c-header-assets {
    position: relative;
    height: 100%; 
    .u-asset {
        padding: 0 10px;
        height: 100%;
        .flex;
        align-items: center;
        &:hover {
            .tm(0.7);
        }
    }

    .u-assets {
        .u-delta;
        width: 160px;
        padding: 5px 0;
    }

    .u-detail {
        .u-item {
            .db;
            color: #454545;
            padding: 5px 15px;

            &:hover {
                background-color: @color-link;
                .u-label {
                    color: #fff;
                }
                .u-value {
                    color: #fff;
                }
            }

            .u-item-primary {
                .flex;
                align-items: center;
                justify-content: space-between;
            }

            .u-label {
                color: #454545;
            }

            .u-value {
                font-weight: bold;
                .ml(5px);
                color: @color-link;
                .fz(13px);
            }
            .u-level {
                .fz(12px,14px);
            }
            .u-item-extend {
                .none;
                a {
                    .ml(5px);
                    &:hover {
                        color: @pink;
                    }
                }
            }
        }
    }
}
</style>
