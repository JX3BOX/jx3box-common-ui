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
        <a class="u-channel" :href="rootLink" :class="{on:withoutLeft}">
            <i class="u-channel-logo">
                <img :src="getAppIcon(icon || slug)" v-if="!$slots.logo"/>
                <slot name="logo"></slot>
            </i>
            <span class="u-title">{{ name }}</span>
        </a>
        <!-- 面包屑内容 -->
        <Crumb :name="slug" v-if="crumbEnable" />
        <slot></slot>
        <div class="c-breadcrumb__title" v-if="show">
            <slot name="title"></slot>
        </div>
        <div class="u-op">
            <slot name="op-append"></slot>
            <a
                v-if="publishEnable"
                :href="publishLink(slug)"
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
            <ListAdmin v-if="topicEnable" />
            <Admin v-if="adminEnable" :marksOptions="adminMarks" :show-extend="true" :app="slug" :subtypeMap="subtypeMap" />
            <slot name="op-prepend"></slot>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import { publishLink,getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { __Links, feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import Admin from "./bread/Admin";
import Crumb from "./bread/Crumb";
import Adminbutton from "./bread/Adminbutton";
import ListAdmin from "./bread/ListAdmin";

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
        "topicEnable",
        "feedbackEnable",
        "overlayEnable",
        "crumbEnable",
        "withoutLeft",
        "adminMarks",
        "icon",
        // "subtypeMap",
        "showExtend"
    ],
    data: function () {
        return {
            isOpen: true,
            feedback: '/feedback?refer=' + encodeURIComponent(window.location.href),
            isNotAdmin: !User.isEditor(),
            isOverlay: false,
            isApp: isApp(),
            show: false,

            subtypeMap: {
                1: "攻略心得",
                2: "萌新指南",
                3: "江湖异闻",
                4: "同人创作"
            }
        };
    },
    computed: {
        rootLink : function (){
            return this.root || `/${this.slug}`
        }
    },
    methods: {
        toggleLeftSide: function () {
            let status = !this.isOpen;
            Bus.$emit("toggleLeftSide", status);
        },
        publishLink,
        getAppIcon,
        onShowTitle(e) {
            // 小屏不显示
            if (window.innerWidth < 1680) {
                return;
            }
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 100) {
                this.show = true;
            } else {
                this.show = false;
            }
        }
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.onShowTitle);
    },
    mounted: function () {
        document.addEventListener("scroll", this.onShowTitle);
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
        ListAdmin,
    },
};
</script>

<style lang="less">
@import "../assets/css/breadcrumb.less";
</style>
