<template>
    <div class="c-author-fans">
        <div class="u-label">
            <!-- <i class="el-icon-star-off"></i> -->
            <img svg-inline src="../../assets/img/leftsidebar/fans.svg" />
            <span>粉丝榜</span>
        </div>
        <div class="f-avatar">
            <el-tooltip
                class="item"
                effect="dark"
                :content="'累计打赏' + item.summary.toString() + '盒币'"
                placement="top"
                v-for="item in list"
                :key="item.user_id"
            >
                <a class="u-fan" :href="authorLink(item.user_id)"
                    ><el-avatar class="u-avatar" shape="circle" :size="20" :src="showAvatar(item.user_info.avatar)"
                        ><i class="el-icon-s-custom"></i></el-avatar
                ></a>
            </el-tooltip>
        </div>
        <div class="f-bottom">
            粉丝数: <span class="u-count">{{ fans_count }}</span
            >，累计收到盒币打赏: <span class="u-count">{{ boxcoin_count }}</span>
        </div>
    </div>
</template>

<script>
import { getFansList, getSummary } from "../../service/author";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "AuthorFans",
    props: {
        uid: {
            type: Number,
            default: 0,
        },
        fansLimit: {
            type: Number,
            default: 8,
        },
    },
    data() {
        return {
            list: [],
            total: 0,
            MAX_LENGTH: 8,

            fans_count: 0,
            boxcoin_count: 0,
        };
    },
    methods: {
        getData() {
            if (!~~this.uid) return;
            getSummary(this.uid).then((res) => {
                this.fans_count = res.data.data?.fans_count || 0;
                this.boxcoin_count = res.data.data?.boxcoin_count || 0;
            });

            getFansList(this.uid, this.fansLimit).then((res) => {
                this.list = res.data.data.list;
            });
        },
        showAvatar,
        authorLink,
    },
    watch: {
        uid: {
            immediate: true,
            handler: function () {
                this.getData();
            },
        },
    },
};
</script>

<style lang="less">
@import "../../assets//css/mixin.less";
.c-author-fans {
    box-sizing: border-box;
    // padding: 10px;
    // background: #ffffff;
    font-family: "Microsoft YaHei";
    font-style: normal;
    // .h(133px);

    .f-avatar {
        height: 40px;
        .flex;
        align-items: center;
        overflow: auto hidden;
        align-items: center;
        .scrollbar();
        .f-avatar-num {
            .fz(12px);
            color: #888;
            font-weight: 700;
        }
        .u-fan {
            .mr(5px);
        }
    }
    .f-bottom {
        .mt(5px);
        .fz(12px, 14px);
        font-weight: 400;
        color: #888;
    }
}
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
</style>
