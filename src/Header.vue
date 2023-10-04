<template>
    <header
        class="c-header"
        id="c-header"
        :class="{ isOverlay: overlayEnable && isOverlay }"
        v-if="!isApp"
    >
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
            <header-user :client="client" />
        </div>
        <Box class="c-header-jx3box" :overlayEnable="overlayEnable" :client="client" />
    </header>
</template>

<script>
import _ from "lodash";
// import JX3BOX from "@jx3box/jx3box-common/data/jx3box.json";
import { isApp, KW } from "../assets/js/app.js";

import logo from "./header/logo.vue";
import clientSwitch from "./header/clientSwitch.vue";
import search from "./header/search.vue";
import nav from "./header/nav.vue";
import user from "./header/user.vue";
import Box from "../src/Box.vue";
// import gameSwitch from "./header/gameSwitch.vue";

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
    },
    methods: {
        // webView检测
        checkIsWebView: function () {
            if (window.navigator.userAgent.includes(KW)) {
                document.documentElement.classList.add("env-app");
            }
        },

        // 检查
        init: function () {
            this.checkIsWebView();
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
