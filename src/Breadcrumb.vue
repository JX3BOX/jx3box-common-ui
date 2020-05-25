<template>
    <div class="c-breadcrumb">
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
        <slot></slot>
        <a
            v-if="publishEnable"
            :href="slug | publish_url(slug)"
            class="u-publish el-button el-button--primary el-button--medium"
            ><i class="el-icon-edit-outline"></i><span>发布</span></a
        >
        <Adminbutton v-if="adminEnable == undefined || adminEnable" class="u-admin"/>
        <Admin v-if="adminEnable == undefined || adminEnable" />
    </div>
</template>

<script>
import Bus from "../service/bus";
import {__Links} from '@jx3box/jx3box-common/js/jx3box.json'
import Admin from './Admin'
import Adminbutton from './Adminbutton'
export default {
    name: "Breadcrumb",
    props: ["name", "slug", "root", "publishEnable", "adminEnable"],
    data: function() {
        return {
            isOpen: true,
        };
    },
    computed: {
    },
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
    },
    components : {
        Admin,
        Adminbutton
    }
};
</script>

<style lang="less">
@import "../assets/css/breadcrumb.less";
</style>
