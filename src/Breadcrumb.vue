<template>
    <div
        class="c-breadcrumb"
        :class="{ isOverlay: overlayEnable && isOverlay,withoutLeft }"
        v-if="!isApp"
    >
        <div class="u-menu" @click.stop="toggleLeftSide" v-if="!withoutLeft">
            <img
                class="u-toggle"
                :class="{ on: isOpen }"
                svg-inline
                src="../assets/img/bread/menu.svg"
            />
        </div>
        <a class="u-channel" :href="root" :class="{on:withoutLeft}">
            <i class="u-channel-logo">
                <slot name="logo"></slot>
            </i>
            <span class="u-title">{{ name }}</span>
        </a>
        <!-- 面包屑内容 -->
        <Crumb :name="slug" v-if="crumbEnable" />
        <slot></slot>
        <div class="u-op">
            <slot name="op-append"></slot>
            <a
                v-if="publishEnable"
                :href="slug | publishLink"
                class="u-publish el-button el-button--primary el-button--medium u-op-public"
            >
                <i class="el-icon-edit-outline"></i>
                <span>发布</span>
            </a>
            <a
                v-if="feedbackEnable"
                v-show="isNotAdmin"
                :href="feedback"
                class="u-feedback el-button el-button--primary el-button--medium u-op-public"
                target="_blank"
            >
                <i class="el-icon-info"></i>
                <span>反馈</span>
            </a>
            <Adminbutton v-if="adminEnable" class="u-admin" />
            <Admin v-if="adminEnable" />
            <slot name="op-prepend"></slot>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import { __Links, feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import Admin from "./bread/Admin";
import Crumb from "./bread/Crumb";
import Adminbutton from "./bread/Adminbutton";

import { isApp } from "../assets/js/app.js";
import Bus from "../service/bus";

export default {
    name: "Breadcrumb",
    props: [
        "name",
        "slug",
        "root",
        "publishEnable",
        "adminEnable",
        "feedbackEnable",
        "overlayEnable",
        "crumbEnable",
        "withoutLeft",
    ],
    data: function () {
        return {
            isOpen: true,
            feedback:
                feedback +
                "&subject=" +
                location.href +
                "?uid=" +
                User.getInfo().uid,
            isNotAdmin: !User.isEditor(),
            isOverlay: false,
            isApp: isApp(),
        };
    },
    computed: {},
    filters: {
        publishLink,
    },
    methods: {
        toggleLeftSide: function () {
            let status = !this.isOpen;
            Bus.$emit("toggleLeftSide", status);
        },
    },
    mounted: function () {
        Bus.$on("toggleLeftSide", (data) => {
            this.isOpen = data;
        });

        if (window.innerWidth < 1024) {
            this.isOpen = false;
        }

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
    components: {
        Admin,
        Crumb,
        Adminbutton,
    },
};
</script>

<style lang="less">
@import "../assets/css/breadcrumb.less";
</style>
