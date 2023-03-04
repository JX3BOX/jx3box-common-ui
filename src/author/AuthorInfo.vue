<template>
    <div class="c-author-info">
        <div class="u-author">
            <Avatar class="u-avatar" :uid="uid" :url="data.user_avatar" size="s" :frame="data.user_avatar_frame" />
            <div class="u-info">
                <div class="u-name">
                    <el-tooltip class="item" effect="dark" content="签约作者" placement="top" v-if="isSuperAuthor">
                        <a class="u-superauthor" href="/about/superauthor" target="_blank">
                            <img :src="super_author_icon" alt="superauthor" />
                        </a>
                    </el-tooltip>
                    <a class="u-displayname" :href="authorLink(uid)" target="_blank">
                        {{ data.display_name || "未知" }}
                    </a>
                </div>
                <div class="u-extend">
                    <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">
                            <span class="u-tips">经验值：{{ data.experience }}</span>
                        </div>
                        <a
                            class="u-level"
                            :class="'lv-' + level"
                            :style="{ backgroundColor: showLevelColor(level) }"
                            href="/about/incentives"
                            target="_blank"
                            >Lv.{{ level }}</a
                        >
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="vipTypeTitle" placement="top" v-if="isVip">
                        <a class="u-vip" href="/vip/premium?from=sidebar_author" target="_blank">
                            <i class="i-icon-vip on">{{ vipType }}</i>
                        </a>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <div class="u-honor" :style="{ backgroundImage: `url(${imgUrl()})` }" v-if="honor">
            <span :style="{ color: honor.color }">{{ honor.honor }}</span>
        </div>
        <div class="u-bio">{{ data.user_bio }}</div>
    </div>
</template>

<script>
import { __server, __imgPath, __userLevel, __userLevelColor } from "@jx3box/jx3box-common/data/jx3box.json";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
import { getUserInfo } from "../../service/author";
import { getDecoration, getHonorJson } from "../../service/cms";
import Avatar from "./Avatar.vue";
import { cloneDeep, inRange } from "lodash";
const HONOR_IMG_KEY = "honor_img";
export default {
    name: "AuthorInfo",
    props: ["uid"],
    components: {
        Avatar,
    },
    data: function () {
        return {
            data: {},

            isVIP: false,
            super_author_icon: __imgPath + "image/user/" + "superauthor.svg",
            honor: "",
            honorStyle: {},
        };
    },
    computed: {
        // level
        level: function () {
            return User.getLevel(this.data?.experience);
        },

        // vip
        vipType: function () {
            return this.data?.is_pro ? "PRO" : "PRE";
        },
        vipTypeTitle: function () {
            return this.data?.is_pro ? "专业版会员" : "高级版会员";
        },
        isVip: function () {
            return this.data?.is_pro || this.data?.is_pre;
        },

        // sign
        isSuperAuthor: function () {
            return this.data?.sign;
        },
    },
    watch: {
        uid: {
            immediate: true,
            handler: function (val) {
                val && this.loadData() && this.getHonor();
            },
        },
    },
    methods: {
        loadData: function () {
            return getUserInfo(this.uid).then((data) => {
                if (data) {
                    console.log(data);

                    this.data = data;
                    this.$emit("ready", this.data);
                }
            });
        },
        authorLink,
        showLevelColor: function (level) {
            return __userLevelColor[level];
        },
        imgUrl: function () {
            let item = this.honor;
            if (!item) return;
            if (item.isImgIndex) {
                return __imgPath + `decoration/honor/${item.val}/${item.val}_${item.imgIndex}.${item.ext}`;
            }
            return __imgPath + `decoration/honor/${item.val}/${item.val}.${item.ext}`;
        },
        getHonor() {
            let user_id = this.uid;
            if (!user_id) return;
            let honor_local = sessionStorage.getItem(HONOR_IMG_KEY + user_id);
            if (honor_local) {
                //解析本地缓存
                let honor_parse = JSON.parse(honor_local);
                if (!honor_parse == "no") return;
                this.honor = honor_parse;
                return;
            }
            getDecoration({ using: 1, user_id: user_id, type: "honor" }).then((data) => {
                let res = data.data.data;
                if (res.length == 0) {
                    //空 则为无主题，不再加载接口，界面设No
                    sessionStorage.setItem(HONOR_IMG_KEY + user_id, "no");
                    return;
                }
                // res[0].server = "长安城";
                // res[0].ranking = 0;
                // res[0].extra = "备注";
                let honor = res[0];
                this.getHonorStyle(honor);
            });
        },
        //有称号后，获取样式配置
        getHonorStyle(data) {
            getHonorJson().then((res) => {
                let honorList = res.data;
                //过滤称号信息
                let honorConfig = honorList[data.val];
                //正则取出前缀
                let prefix = honorConfig.prefix;
                let regPrefix = honorConfig.prefix.match(/(?<=\{)(.+?)(?=\})/g);
                let ranking = honorConfig.ranking;
                let honorStr = honorConfig.year || "";
                if (regPrefix) {
                    honorStr = honorStr + (data[regPrefix[0]] || "");
                } else {
                    honorStr = honorStr + prefix;
                }
                //排名处理
                if (ranking.length > 0) {
                    data.imgIndex = 0;
                    for (let i = 0; i < ranking.length; i++) {
                        //处在范围内取数组第三个值进行称号拼接
                        if (data.ranking != undefined && inRange(Number(data.ranking), ranking[i][0], ranking[i][1])) {
                            data.imgIndex = i;
                            let str = ranking[i][2];
                            //正则取出需替换值，如果没有则直接拼接
                            let regStr = str.match(/(?<=\{)(.+?)(?=\})/g);
                            if (regStr) {
                                //包含花括号替换
                                honorStr = honorStr + str.replace(/\{(.+?)\}/g, data[regStr[0]]);
                            } else {
                                honorStr = honorStr + str;
                            }
                            break;
                        }
                    }
                }
                data.honor = honorStr + honorConfig.suffix;
                data.color = honorConfig.color;
                data.ext = honorConfig.ext;
                data.isHave = true;
                data.isImgIndex = honorConfig.ranking.length > 0 ? true : false;
                sessionStorage.setItem(HONOR_IMG_KEY + this.uid, JSON.stringify(data));
                this.honor = data;
            });
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
.c-author-info {
    .u-author {
        .clearfix;
        .db;
        .mb(10px);
        .pr;
    }
    .u-avatar {
        .fl;
        .mr(15px);
        .size(68px);
    }
    .u-name {
        .flex;
        align-items: center;
    }
    .u-displayname {
        .lh(2.2);
        .bold;
        color: @darkblue;
        .nobreak;
        &:hover {
            color: #f39;
        }
    }
    .u-superauthor {
        // margin-left: 4px;
        // display: inline-block;
        // vertical-align: -2px;
        .fz(12px);
        flex-shrink: 0;
        img {
            .size(16px);
        }
    }

    .u-info {
        .pr;
        top: -4px;
        .h(68px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .u-bio {
        .fz(12px, 2);
        .break(3);
        color: #888;
        padding: 0 5px;
    }
    .u-extend {
        display: flex;
        align-items: center;
    }
    .u-level {
        padding: 2px 8px;
        .fz(12px, 14px);
        color: #fff;
        background-color: #aaa;
        border-radius: 2px;

        &.lv-1 {
            background-color: #32d3c4;
        }
        &.lv-2 {
            background-color: #86c0fb;
        }
        &.lv-3 {
            background-color: #33d9ff;
        }
        &.lv-4 {
            background-color: #ffdb2a;
        }
        &.lv-5 {
            background-color: #ffa739;
        }
        &.lv-6 {
            background-color: #ff70b2;
        }
        &.lv-7 {
            background-color: #ff3399;
        }
        &.lv-8 {
            background-color: #f93c3c;
        }
    }
    .u-vip {
        .ml(5px);
        .i-icon-vip {
            .db;
            padding: 2px 6px;
            .fz(12px, 14px);
            font-style: normal;
            border-radius: 2px;
            background-color: #ddd;
            color: #fff;
            &.on {
                background-color: #6f42c1;
            }
        }
    }
    .u-honor {
        .dbi;
        text-align: center;
        .mb(10px);
        .size(220px,45px);
        // background-color: #494038;
        color: #ffffff;
        .fz(10px,45px);
        .r(2px);
    }
}
</style>
