<template>
    <header class="c-header" id="c-header">
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
                <span class="u-txt">JX3BOX</span>
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
                <a class="u-item" href="/">首页</a>
                <a class="u-item" href="/macro">宏库</a>
                <a class="u-item" href="/jx3dat">插件</a>
                <a class="u-item" href="/fb">副本</a>
                <a class="u-item" href="/bps">职业</a>
                <a class="u-item" href="/cj">成就</a>
                <a class="u-item" href="/house">家园</a>
                <a class="u-item" href="/share">捏脸</a>
                <a class="u-item" href="/tool">工具</a>
                <a class="u-item" href="/bbs">茶馆</a>
                <!-- <el-dropdown class="u-menu" :show-timeout="0" trigger="hover">
                    <span class="u-item el-dropdown-link">
                        干货<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="c-header-menu">
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/macro"
                                >云端宏库</a
                            ></el-dropdown-item
                        >
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/jx3dat"
                                >插件数据</a
                            ></el-dropdown-item
                        >
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/fb"
                                >副本专栏</a
                            ></el-dropdown-item
                        >
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/bps"
                                >职业专栏</a
                            ></el-dropdown-item
                        >
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/tool"
                                >工具教程</a
                            ></el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="u-menu" :show-timeout="0" trigger="hover">
                    <span class="u-item el-dropdown-link">
                        休闲<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="c-header-menu">
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/cj"
                                >成就百科</a
                            ></el-dropdown-item
                        >
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/house"
                                >家园分享</a
                            ></el-dropdown-item
                        >
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/share"
                                >捏脸分享</a
                            ></el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown class="u-menu" :show-timeout="0" trigger="hover">
                    <span class="u-item el-dropdown-link">
                        哔哔<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="c-header-menu">
                        <el-dropdown-item
                            ><a class="u-menu-item" href="/bbs"
                                >茶馆碎话</a
                            ></el-dropdown-item
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
                            :src="user.avatar"
                            :alt="user.name"
                        />
                        <span class="u-dropdown"></span>
                        <ul class="u-menu" v-show="!fold">
                            <li>
                                <a :href="url.dashboard">个人中心</a>
                            </li>
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
        <Box class="c-header-jx3box" />
    </header>
</template>

<script>
import JX3BOX from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
// import nav from "../assets/data/nav";
import { __Links, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import { getMsg, doLogout, checkStatus } from "../service/header";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import Box from "../src/Box.vue";
import Bus from "../service/bus";

export default {
    name: "Header",
    data: function() {
        return {
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
                search: __Links.search,
                msg: __Links.dashboard.msg,
                publish: __Links.dashboard.publish,
                dashboard: __Links.dashboard.home,
                profile: __Links.dashboard.profile,
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
    },
    methods: {
        // 展开盒子
        toggleBox: function(e) {
            e.stopPropagation();
            Bus.$emit("toggleBox");
        },
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
        // // 头像
        // avatar: function(url) {
        //     return showAvatar(url);
        // },
        // 检查
        init: function() {
            // window.__userdata = checkStatus()
            //     .then((res) => {
            //         this.user = res.data.data;
            
            this.logged_in = User.isLogin()
            this.user = User.getInfo()
            if(this.logged_in){
                this.checkMSG();
            }
            
            // if (this.user.uid) {
            //     this.logged_in = true;
            //     this.checkMSG();
            // } else {
            //     this.logged_in = false;
            // }
            //     return this.user;
            // })
            // .catch((err) => {
            //     this.logged_in = false;
            //     console.log(err);
            // });
        },
    },
    filters: {},
    created: function() {
        this.isPhone = window.innerWidth < 720 ? true : false;
        this.closeExpandList();
        this.init();
    },
    components: {
        Box,
    },
};
</script>

<style lang="less">
@import "../assets/css/header.less";
</style>
