<template>
    <header class="c-header" id="c-header">
        <div class="c-header-inner">
            <!-- logo -->
            <a class="c-header-logo" id="c-header-logo" :href="url.home">
                <img
                    class="u-pic"
                    svg-inline
                    src="../assets/img/header/logo.svg"
                />
                <span class="u-txt">JX3BOX</span>
            </a>

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
                <ul>
                    <li v-for="(item, type) in nav" :key="'nav-' + type">
                        <a :href="item.path" :class="{ on: isFocus(type) }">{{
                            item.name
                        }}</a>
                    </li>
                </ul>
            </nav>

            <slot></slot>

            <!-- user -->
            <div class="c-header-user" id="c-header-user">
                <!-- user msg -->
                <div
                    v-if="logged_in == true"
                    class="c-header-msg"
                    id="c-header-msg"
                    title="我的消息"
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
                </div>

                <!-- user panel -->
                <div
                    v-if="logged_in == true"
                    class="c-header-panel"
                    id="c-header-panel"
                    title="发布中心"
                >
                    <a class="u-post" :href="url.publish"
                        ><img
                            class="u-add"
                            svg-inline
                            src="../assets/img/header/add.svg"
                    /></a>
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
                            :src="avatar(user.avatar)"
                            :alt="user.name"
                        />
                        <span class="u-dropdown"></span>
                        <ul class="u-menu" v-show="!fold">
                            <li>
                                <a :href="url.dashboard"
                                    >个人中心</a
                                >
                            </li>
                            <li>
                                <a :href="url.profile"
                                    >设置</a
                                >
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
    </header>
</template>

<script>

import JX3BOX from '@jx3box/jx3box-common/js/jx3box.json'
import User from '@jx3box/jx3box-common/js/user'
import nav from "../assets/data/nav";
import { __Links, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import { getMsg, doLogout, checkStatus } from "../service/header";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "Header",
    data: function() {
        return {
            isPhone: false,
            // 导航菜单
            JX3BOX,
            nav,
            // 是否有消息
            pop: false,
            // 是否折叠
            fold: true,
            // 登录信息
            logged_in: false,
            user: {},
            // links
            url : {
                home : __Root,
                search : __Links.search,
                msg : __Links.dashboard.msg,
                publish : __Links.dashboard.publish,
                dashboard : __Links.dashboard.home,
                profile : __Links.dashboard.profile
            }
        };
    },
    computed: {
        login_url: function() {
            return __Links.account.login + "?redirect=" + location.href;
        },
        register_url: function() {
            return __Links.account.register + "?redirect=" + location.href;
        },
    },
    methods: {
        // 导航焦点
        isFocus: function(type) {
            return location.pathname.includes(type);
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
            getMsg(this.user.uid).then((res) => {
                if (res.data.data.unread_count) {
                    this.pop = true;
                }
            });
        },
        // 注销
        logout: function() {
            doLogout().then((res) => {
                User.destroy();
                this.logged_in = false;
                this.user = User.getInfo();
                if (location.href.indexOf("dashboard") > 0) {
                    location.href = __Root;
                }
            });
        },
        // 头像
        avatar: function(url) {
            return showAvatar(url);
        },
        // 检查
        init: function() {
            // TODO:统一为一个域名后更改为优先读取localstorage
            window.__userdata = checkStatus()
                .then((res) => {
                    this.user = res.data.data;
                    if (this.user.uid) {
                        this.logged_in = true;
                        this.checkMSG();
                    } else {
                        this.logged_in = false;
                    }
                    return this.user
                })
                .catch((err) => {
                    this.logged_in = false;
                    console.log(err)
                });
        },
    },
    filters: {},
    mounted: function() {
        this.isPhone = window.innerWidth < 720 ? true : false;
        this.closeExpandList();
        this.init()
    },
};
</script>

<style lang="less">
@import "../assets/css/header.less";
</style>
