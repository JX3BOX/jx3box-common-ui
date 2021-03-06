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
            <nav class="c-header-nav">
                <a
                    class="u-item"
                    v-for="(item, i) in nav"
                    :key="i"
                    :class="{ on: isFocus(item.link) }"
                    :href="item.link"
                    >{{ item.label }}</a
                >
                <!-- <el-dropdown class="u-menu" :show-timeout="0" trigger="hover">
                    <span class="u-item el-dropdown-link">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="c-header-menu">
                        <el-dropdown-item
                            v-for="(item, type) in nav_fold"
                            :key="type"
                            ><a class="u-menu-item" :href="item.path">{{
                                item.name
                            }}</a></el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown> -->
            </nav>

            <slot></slot>

            <!-- user -->
            <div class="c-header-user" id="c-header-user">
                <!-- user msg -->
                <div
                    v-if="logged_in == true"
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
                    v-if="logged_in == true"
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
                        v-show="logged_in == true"
                        class="c-header-profile"
                        id="c-header-profile"
                        @click="showmenu"
                    >
                        <img
                            class="u-avatar"
                            :src="user.avatar"
                        />
                        <span class="u-dropdown"></span>
                        <ul class="u-menu" v-show="!fold">
                            <li>
                                <a class="u-me" :href="url.dashboard"
                                    ><b>{{ user.name | showUserName }}</b>
                                    <em>(UID : {{ user.uid }})</em></a
                                >
                            </li>
                            <li><a class="u-vip" href="/vip/premium?from=header_usermenu" target="_blank">
                            <i
                            class="i-icon-vip"
                            :class="{ on: isVIP || isPRO }"
                            >{{vipType}}</i
                        >
                        <span class="u-vip-type"><template v-if="isVIP || isPRO">{{vipTypeTxt}}<span class="u-vip-left">({{vipLeftDays}}天)</span></template><template v-else>升级账号类型</template></span>
                        <!-- <span class="u-expire" v-if="expire_date">(有效期至:{{expire_date}})</span> -->
                        </a></li>
                            <hr />
                            <li v-for="(item,i) in panel" :key="i">
                                <a :href="item.link">{{item.label}}</a>
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

                    <div v-show="logged_in == false" class="c-header-login">
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
import JX3BOX from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import nav from "../assets/data/nav";
import panel from "../assets/data/panel";
import nav_fold from "../assets/data/nav_fold";
import { __Links, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import { getMsg, doLogout, checkStatus, getNav,getPanel } from "../service/header";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import Box from "../src/Box.vue";
import Bus from "../service/bus";
import _ from "lodash";
import {isApp} from '../assets/js/app.js'
import { getAsset, hasPRO, hasVIP } from "@jx3box/jx3box-common/js/pay";
import { showDate } from "@jx3box/jx3box-common/js/moment";

export default {
    name: "Header",
    props: ["overlayEnable"],
    data: function() {
        return {
            nav,
            panel,
            nav_fold,
            isPhone: false,
            // 是否有消息
            pop: false,
            // 是否折叠
            fold: true,
            // 登录信息
            logged_in: false,
            user: {},
            // links
            url: {
                home: __Root,
                search: __Root + "search",
                msg: __Links.dashboard.msg,
                publish: __Links.dashboard.publish,
                dashboard: __Links.dashboard.home,
                profile: __Links.dashboard.profile,
            },
            isOverlay: false,
            isApp : isApp(),
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
        isVIP : function (){
            return hasVIP(this.asset) || false
        },
        isPRO : function (){
            return hasPRO(this.asset) || false
        },
        vipType : function (){
            return this.isPRO ? 'PRO' : 'PRE'
        },
        vipTypeTxt : function (){
            return this.isPRO ? '专业版' : '高级版'
        },
        expire_date: function() {
            if(this.isPRO){
                return showDate(this.asset.pro_expire_date)
            }else if(this.isVIP){
                return showDate(this.asset.expire_date);
            }else{
                return ''
            }
        },
        vipLeftDays : function (){
            if(this.isPRO){
                return parseInt((new Date(this.asset.pro_expire_date) - new Date()) / 86400000)
            }else if(this.isVIP){
                return parseInt((new Date(this.asset.expire_date) - new Date()) / 86400000)
            }else{
                return ''
            }
        }
    },
    methods: {
        // 展开盒子
        toggleBox: function(e) {
            e.stopPropagation();
            Bus.$emit("toggleBox");
        },
        // 导航焦点
        isFocus: function(type) {
            return location.href.includes(type);
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
        // 消息
        checkMSG: function() {
            getMsg().then((res) => {
                if (res.data && res.data.unread) {
                    this.pop = !!res.data.unread;
                }
            });
        },
        // 注销
        logout: function() {
            User.destroy().then((res) => {
                this.logged_in = false;
                this.user = User.getInfo();
                if (location.href.indexOf("dashboard") > 0) {
                    location.href = __Root;
                }
            });
        },
        // webView检测
        checkIsWebView: function() {
            if (window.navigator.userAgent.includes("jx3boxApp")) {
                document.documentElement.classList.add("env-app");
            }
        },
        // 检查
        init: function() {
            this.loadNav();
            this.logged_in = User.isLogin();
            this.user = User.getInfo();
            if (this.logged_in) {
                this.checkMSG();
            }
            this.checkIsWebView();
        },
        // 菜单
        loadNav: function() {
            getNav().then((data) => {
                this.nav = data || nav
            });
            getPanel().then((data) => {
                this.panel = data || panel
            })
        },
        // 资产
        loadAsset: function() {
            getAsset().then((data) => {
                this.asset = data;
            });
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
    mounted: function() {
        this.logged_in && this.loadAsset();
    },
    components: {
        Box,
    },
};
</script>

<style lang="less">
@import "../assets/css/header.less";
</style>
