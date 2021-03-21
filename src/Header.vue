<template>
    <header
        class="c-header"
        id="c-header"
        :class="{ isOverlay: overlayEnable && isOverlay }"
        v-if="!isApp"
    >
        <div class="c-header-inner">
            <!-- logo -->
            <div
                class="c-header-logo"
                id="c-header-logo"
                @click="toggleBox($event)"
                title="点击展开魔盒矩阵"
            >
                <i class="u-pic"
                    ><img svg-inline src="../assets/img/header/logo.svg"
                /></i>
                <span class="u-txt">魔盒</span>
            </div>

            <!-- origin -->
            <div class="c-header-origin">
                <a class="u-txt" href="https://origin.jx3box.com" target="_blank"><i class="el-icon-s-home"></i> 怀旧服</a>
            </div>

            <!-- search -->
            <div class="c-header-search" id="c-header-search">
                <div class="c-search">
                    <form
                        class="u-form"
                        :action="url.search"
                        :target="isPhone ? '_self' : '_blank'"
                    >
                        <input
                            class="u-text"
                            type="text"
                            autocomplete="off"
                            name="q"
                            placeholder="搜索.."
                        />
                        <i class="u-btn"
                            ><img
                                svg-inline
                                src="../assets/img/header/search-key-slash.svg"
                        /></i>
                    </form>
                </div>
            </div>

            <!-- nav -->
            <nav class="c-header-nav" v-if="nav">
                <div class="u-item-box" v-for="item in nav" :key="item.key">
                    <template v-if="item.children && item.children.length">
                        <template v-if="item.status">
                            <el-dropdown
                                class="u-menu"
                                :show-timeout="0"
                                trigger="hover"
                            >
                                <a
                                    class="u-item el-dropdown-link"
                                    :class="{ on: isFocus(item.link) }"
                                    :href="item.link"
                                    >{{ item.label
                                    }}<i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i
                                ></a>
                                <el-dropdown-menu
                                    slot="dropdown"
                                    class="c-header-menu"
                                    v-if="item.hasChildren"
                                >
                                    <el-dropdown-item
                                        v-for="subitem in item.children"
                                        :key="subitem.key"
                                        class="u-menu-item"
                                    >
                                        <a
                                            :href="subitem.link"
                                            v-if="subitem.status"
                                            >{{ subitem.label }}
                                            <span v-if="subitem.desc">{{
                                                subitem.desc
                                            }}</span></a
                                        ></el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </template>
                    <template v-else>
                        <a
                            class="u-item"
                            :class="{ on: isFocus(item.link) }"
                            :href="item.link"
                            v-if="item.status"
                            >{{ item.label }}</a
                        >
                    </template>
                </div>
            </nav>

            <slot></slot>

            <!-- user -->
            <div class="c-header-user" id="c-header-user">
                <!-- user msg -->
                <div
                    v-if="isLogin == true"
                    class="c-header-msg"
                    id="c-header-msg"
                >
                    <el-tooltip
                        effect="dark"
                        content="我的消息"
                        placement="bottom"
                    >
                        <a class="u-msg" :href="url.msg"
                            ><i class="u-icon u-icon-msg">
                                <i
                                    class="u-pop"
                                    style="display: none;"
                                    v-show="pop"
                                ></i>
                                <img
                                    svg-inline
                                    src="../assets/img/header/msg.svg"/></i
                        ></a>
                    </el-tooltip>
                </div>

                <!-- user panel -->
                <div
                    v-if="isLogin == true"
                    class="c-header-panel"
                    id="c-header-panel"
                >
                    <el-tooltip
                        effect="dark"
                        content="发布中心"
                        placement="bottom"
                    >
                        <a class="u-post" :href="url.publish"
                            ><img
                                class="u-add"
                                svg-inline
                                src="../assets/img/header/add.svg"/></a
                    ></el-tooltip>
                </div>

                <!-- user info -->
                <div class="c-header-info">
                    <div
                        v-show="isLogin == true"
                        class="c-header-profile"
                        id="c-header-profile"
                        @click="showmenu"
                    >
                        <img class="u-avatar" :src="user.avatar" />
                        <span class="u-dropdown"></span>
                        <ul class="u-menu" v-show="!fold">
                            <li>
                                <a class="u-me" :href="url.homepage"
                                    ><b>{{ user.name | showUserName }}</b>
                                    <em>(UID : {{ user.uid }})</em></a
                                >
                            </li>
                            <li>
                                <a
                                    class="u-vip"
                                    href="/vip/premium?from=header_usermenu"
                                    target="_blank"
                                >
                                    <i
                                        class="i-icon-vip"
                                        :class="{ on: isVIP || isPRO }"
                                        >{{ vipType }}</i
                                    >
                                    <span class="u-vip-type"
                                        ><template v-if="isVIP || isPRO"
                                            >{{ vipTypeTxt
                                            }}<span class="u-vip-left"
                                                >({{ vipLeftDays }}天)</span
                                            ></template
                                        ><template v-else
                                            >升级账号类型</template
                                        ></span
                                    >
                                    <!-- <span class="u-expire" v-if="expire_date">(有效期至:{{expire_date}})</span> -->
                                </a>
                            </li>
                            <hr />
                            <li v-for="(item, i) in panel" :key="i">
                                <a :href="item.link">{{ item.label }}</a>
                            </li>
                            <hr />
                            <li>
                                <a :href="url.profile">设置</a>
                            </li>
                            <li>
                                <a @click="logout()">登出</a>
                            </li>
                        </ul>
                    </div>

                    <div v-show="isLogin == false" class="c-header-login">
                        <a class="u-register u-default" :href="register_url"
                            >注册</a
                        >
                        <em>|</em>
                        <a class="u-login u-default" :href="login_url">登录</a>
                    </div>
                </div>
            </div>
        </div>
        <Box class="c-header-jx3box" :overlayEnable="overlayEnable" />
    </header>
</template>

<script>
import JX3BOX from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import nav from "../assets/data/nav";
import panel from "../assets/data/panel";
import { __Links, __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { getMsg, getNav, getPanel } from "../service/header";
import Box from "../src/Box.vue";
import Bus from "../service/bus";
import _ from "lodash";
import { isApp } from "../assets/js/app.js";
import { showDate } from "@jx3box/jx3box-common/js/moment";

export default {
    name: "Header",
    props: ["overlayEnable"],
    data: function() {
        return {
            nav,
            panel,
            isPhone: false,
            // 是否有消息
            pop: false,
            // 是否折叠
            fold: true,
            // 登录信息
            isLogin: false,
            user: {},
            // links
            url: {
                home: __Root,
                search: __Root + "search",
                msg: __Links.dashboard.msg,
                publish: __Links.dashboard.publish,
                dashboard: __Links.dashboard.home,
                profile: __Links.dashboard.profile,
                homepage: __Root + "author/" + User.getInfo().uid,
            },
            isOverlay: false,
            isApp: isApp(),
            // VIP
            asset: {
                expire_date: "2022-03-07T00:00:00+08:00",
                total_day: 395,
                was_vip: 0,

                pro_expire_date: "2022-03-07T00:00:00+08:00",
                pro_total_day: 366,
                was_pro: 0,
            },
        };
    },
    computed: {
        login_url: function() {
            return __Links.account.login + "?redirect=" + location.href;
        },
        register_url: function() {
            return __Links.account.register + "?redirect=" + location.href;
        },
        isVIP: function() {
            return User._isVIP(this.asset) || false;
        },
        isPRO: function() {
            return User._isPRO(this.asset) || false;
        },
        vipType: function() {
            return this.isPRO ? "PRO" : "PRE";
        },
        vipTypeTxt: function() {
            return this.isPRO ? "专业版" : "高级版";
        },
        expire_date: function() {
            if (this.isPRO) {
                return showDate(this.asset.pro_expire_date);
            } else if (this.isVIP) {
                return showDate(this.asset.expire_date);
            } else {
                return "";
            }
        },
        vipLeftDays: function() {
            if (this.isPRO) {
                return parseInt(
                    (new Date(this.asset.pro_expire_date) - new Date()) /
                        86400000
                );
            } else if (this.isVIP) {
                return parseInt(
                    (new Date(this.asset.expire_date) - new Date()) / 86400000
                );
            } else {
                return "";
            }
        },
    },
    methods: {
        // webView检测
        checkIsWebView: function() {
            if (window.navigator.userAgent.includes("jx3boxApp")) {
                document.documentElement.classList.add("env-app");
            }
        },
        // 盒子
        toggleBox: function(e) {
            e.stopPropagation();
            Bus.$emit("toggleBox");
        },
        // 导航
        isFocus: function(type) {
            return location.href.includes(type);
        },
        loadNav: function() {
            getNav().then((res) => {
                this.nav = res.data || nav;
            });
            getPanel().then((res) => {
                this.panel = res.data || panel;
            });
        },
        // 菜单
        showmenu: function(e) {
            e.stopPropagation();
            this.fold = !this.fold;
        },
        closeExpandList: function() {
            const vm = this;
            document.addEventListener("click", function() {
                vm.fold = true;
            });
        },
        // 注销
        logout: function() {
            User.destroy()
                .then((res) => {
                    this.isLogin = false;
                    this.user = User.getInfo();
                    if (location.href.indexOf("dashboard") > 0) {
                        location.href = __Root;
                    }
                })
                .then(() => {
                    this.$notify({
                        title: "成功",
                        message: "登出成功",
                        type: "success",
                        duration:1500,
                    });
                });
        },
        // 消息
        checkMSG: function() {
            getMsg().then((res) => {
                this.pop = !!res.data.data.unread; 
            });
        },
        // 资产
        loadAsset: function() {
            User.getAsset().then((data) => {
                this.asset = data;
            })
        },
        // 检查
        init: function() {
            this.checkIsWebView();
            this.loadNav();
            this.isLogin = User.isLogin();
            this.user = User.getInfo();
            if (this.isLogin) {
                this.checkMSG();
                this.loadAsset();
            }
        },
    },
    filters: {
        showUserName: function(val) {
            if (val) {
                if (val.length < 5) {
                    return val;
                } else {
                    return val.slice(0, 4) + "..";
                }
            } else {
                return "匿名";
            }
        },
    },
    created: function() {
        this.isPhone = window.innerWidth < 720 ? true : false;
        this.closeExpandList();
        this.init();

        if (this.overlayEnable) {
            const vm = this;
            window.addEventListener(
                "scroll",
                _.throttle(() => {
                    vm.isOverlay = window.scrollY > 200 ? true : false;
                }, 200)
            );
        }
    },
    mounted: function() {},
    components: {
        Box,
    },
};
</script>

<style lang="less">
@import "../assets/css/header.less";
</style>
