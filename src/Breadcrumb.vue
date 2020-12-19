<template>
    <div
        class="c-breadcrumb"
        :class="{ isOverlay: overlayEnable && isOverlay }"
    >
        <div class="u-menu" @click.stop="toggleLeftSide">
            <img
                class="u-toggle"
                :class="{ on: isOpen }"
                svg-inline
                src="../assets/img/bread/menu.svg"
            />
        </div>
        <a class="u-channel" :href="root">
            <i class="u-channel-logo"><slot name="logo"></slot></i>
            <span class="u-title">{{ name }}</span>
        </a>
        <!-- 面包屑内容 -->
        <Crumb :name="slug" />
        <slot></slot>
        <a
            v-if="publishEnable"
            :href="slug | publish_url(slug)"
            class="u-publish el-button el-button--primary el-button--medium"
            ><i class="el-icon-edit-outline"></i><span>发布</span></a
        >
        <a
            v-if="feedbackEnable"
            v-show="isNotAdmin"
            :href="feedback"
            class="u-feedback el-button el-button--primary el-button--medium"
            target="_blank"
            ><i class="el-icon-info"></i><span>反馈</span></a
        >
        <Adminbutton v-if="adminEnable" class="u-admin" />
        <Admin v-if="adminEnable" />
    </div>
</template>

<script>
import Bus from "../service/bus";
import { __Links, feedback } from "@jx3box/jx3box-common/js/jx3box.json";
import Admin from "./Admin";
import Crumb from "./Crumb";
import Adminbutton from "./Adminbutton";
import User from "@jx3box/jx3box-common/js/user";
import _ from "lodash";
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
    ],
    data: function() {
        return {
            isOpen: true,
            feedback: feedback + "&subject=" + location.href,
            isNotAdmin: User.getInfo().group < 60,
            isOverlay: false,
        };
    },
    computed: {},
    filters: {
        publish_url: function(val) {
            return __Links.dashboard.publish + "#/" + val;
        },
    },
    methods: {
        toggleLeftSide: function() {
            let status = !this.isOpen;
            Bus.$emit("toggleLeftSide", status);
        },
    },
    mounted: function() {
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
