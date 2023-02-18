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
        <div class="u-honor" :style="honorStyle" v-if="honor">{{ honor }}</div>
        <div class="u-bio">{{ data.user_bio }}</div>
    </div>
</template>

<script>
import { __server, __imgPath, __userLevel, __userLevelColor } from "@jx3box/jx3box-common/data/jx3box.json";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
import { getUserInfo } from "../../service/author";
import { getDecoration, getDecorationJson } from "../../service/cms";
import Avatar from "./Avatar.vue";
const DECORATION_JSON = "decoration_json";
const DECORATION_KEY = "decoration_me";
const HONOR_KEY = "honor_me";
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
        getHonor() {
            let user_id = this.uid;
            if (!user_id) {
                return;
            }
            let honor_local = sessionStorage.getItem(HONOR_KEY + user_id);
            if (honor_local == "no") return;
            //已有缓存，读取解析
            if (honor_local) {
                this.honor = honor_local;
                this.getHonorStyle();
                return;
            }
            getDecoration({ using: 1, user_id: user_id, type: "honor" }).then((data) => {
                let res = data.data.data;
                if (res.length == 0) {
                    //空 则为无主题，不再加载接口，界面设No
                    sessionStorage.setItem(HONOR_KEY + user_id, "no");
                    return;
                }
                let honor = res[0];
                sessionStorage.setItem(HONOR_KEY + user_id, honor.val);
                this.honor = honor.val;
                this.getHonorStyle();
            });
        },
        //有称号后，获取样式配置
        getHonorStyle() {
            let user_id = this.uid;
            let decoration_local = sessionStorage.getItem(DECORATION_KEY + user_id);
            if (decoration_local) {
                //解析本地缓存
                let decoration_parse = JSON.parse(decoration_local);
                if (!decoration_parse.status) return;

                if (decoration_parse) {
                    this.setHonorStyle(decoration_parse);
                    return;
                }
            }
            getDecoration({ using: 1, user_id: user_id, type: "homebg" }).then((data) => {
                let res = data.data.data;
                if (res.length == 0) {
                    //空 则为无主题，不再加载接口，界面设No
                    sessionStorage.setItem(DECORATION_KEY + user_id, JSON.stringify({ status: false }));
                    return;
                }
                let decoration = res[0];
                let decorationJson = sessionStorage.getItem(DECORATION_JSON);
                if (!decorationJson) {
                    //加载远程json，用于Honor颜色配置
                    getDecorationJson().then((json) => {
                        let decoration_json = json.data;
                        let theme = JSON.parse(JSON.stringify(decoration_json[decoration.val]));
                        theme.status = true;
                        sessionStorage.setItem(DECORATION_KEY + this.uid, JSON.stringify(theme));
                        //缓存远程JSON文件
                        sessionStorage.setItem(DECORATION_JSON, JSON.stringify(decoration_json));
                        this.setHonorStyle(theme);
                    });
                } else {
                    let theme = JSON.parse(decorationJson)[decoration.val];
                    theme.status = true;
                    sessionStorage.setItem(DECORATION_KEY + this.uid, JSON.stringify(theme));
                    this.setHonorStyle(theme);
                }
            });
        },
        setHonorStyle(style) {
            this.honorStyle = {
                "background-color": style.buttoncolor,
                color: style.buttontextcolor,
            };
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
        .mt(10px);
        background-color: #494038;
        color: #ffffff;
        padding: 2px 50px 2px 10px;
        .fz(12px,14px);
        .mb(6px);
        .r(2px);
    }
}
</style>
