<template>
    <header class="c-header" id="c-header" :class="{ isOverlay: overlayEnable && isOverlay }" v-if="!isApp">
        <div class="c-header-inner">
            <!-- logo -->
            <header-logo />

            <!-- origin -->
            <clientSwitch :defaultValue="client" />

            <!-- game -->
            <!-- <gameSwitch /> -->

            <!-- search -->
            <header-search :client="client" />

            <!-- nav -->
            <header-nav :client="client" />

            <slot></slot>

            <!-- user -->
            <header-user ref="user" :client="client" />
        </div>
        <Box class="c-header-jx3box" :overlayEnable="overlayEnable" :client="client" />
    </header>
</template>

<script>
import _ from "lodash";
import { isApp, KW } from "../assets/js/app.js";

import logo from "./header/logo.vue";
import clientSwitch from "./header/clientSwitch.vue";
import search from "./header/search.vue";
import nav from "./header/nav.vue";
import user from "./header/user.vue";
import Box from "../src/Box.vue";
import { isMiniProgram, miniprogramHack } from "@jx3box/jx3box-common/js/utils";
import miniprogram from "@jx3box/jx3box-common/data/miniprogram.json";
import { getGlobalConfig } from "../service/header.js";
import User from "@jx3box/jx3box-common/js/user.js";
import { __Root, __OriginRoot } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "Header",
    props: ["overlayEnable"],
    data: function () {
        return {
            isOverlay: false,
            isApp: isApp(),
        };
    },
    computed: {
        client: function () {
            return location.hostname.includes("origin") ? "origin" : "std";
        },
        siteRoot: function () {
            return location.host.includes("origin") ? __OriginRoot : __Root;
        },
    },
    methods: {
        // webView检测
        checkIsWebView: function () {
            if (window.navigator.userAgent.includes(KW)) {
                document.documentElement.classList.add("env-app");
            }

            if (isMiniProgram()) {
                const urlParams = new URLSearchParams(window.location.search);
                const appid = urlParams.get("appid");
                const item = miniprogram?.find((item) => item.appid === appid);
                const from = urlParams.get("_from");

                document.documentElement.classList.add("v-miniprogram");

                if (from) {
                    document.documentElement.classList.add("from-" + from);
                }

                if (appid && item) {
                    document.documentElement.classList.add("env-miniprogram-" + item.id);

                    window.JX3BOX_ENV = item.id?.toUpperCase() + "_MINIPROGRAM";
                } else {
                    document.documentElement.classList.add("wechat-miniprogram");

                    window.JX3BOX_ENV = "MINIPROGRAM";

                    // 微信小程序hack
                    miniprogramHack();
                }
            }
        },

        // 检查
        init: function () {
            this.checkIsWebView();

            const token = this.getUrlParam("__token");

            token && localStorage.setItem("__token", token);

            // 获取全局配置
            getGlobalConfig().then(async (res) => {
                const global_token_version = res.token_version;
                const token_version = localStorage.getItem("token_version");

                if (User.isLogin()) {
                    if (token_version != global_token_version) {
                        localStorage.setItem("token_version", global_token_version);
                        User.destroy().then((res) => {
                            this.$refs.user?.logout();
                            // 清除马甲所有马甲信息
                            let keys = Object.keys(localStorage);
                            let alternate = keys.filter((key) => key.startsWith("jx3box-alternate-"));

                            alternate.forEach((key) => {
                                localStorage.removeItem(key);
                            });

                            if (
                                location.pathname.startsWith("/dashboard") ||
                                location.pathname.startsWith("/publish")
                            ) {
                                location.href = this.siteRoot;
                            }
                        });
                    }
                }
            });
        },

        getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            return r ? decodeURIComponent(r[2]) : null;
        },
    },
    created: function () {
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
    mounted: function () {},
    components: {
        "header-logo": logo,
        "header-search": search,
        "header-nav": nav,
        "header-user": user,
        Box,
        clientSwitch,
        // gameSwitch,
    },
};
</script>

<style lang="less">
@import "../assets/css/header.less";
</style>
