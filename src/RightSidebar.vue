<template>
    <aside class="c-sidebar-right c-sidebar" v-if="!isApp" :class="isOpen ? 'is-open' : 'is-close'">
        <div class="c-sidebar-right-inner">
            <slot></slot>
        </div>
        <span
            class="c-sidebar-right-toggle"
            :class="!isOpen && 'close-sidebar-right'"
            @click="toggleRightSide"
            :title="isOpen ? '收起侧边栏' : '打开侧边栏'"
        >
            <span v-show="!isOpen"><i class="el-icon-arrow-left"></i></span>
            <span v-show="isOpen"><i class="el-icon-arrow-right"></i></span>
        </span>
    </aside>
</template>

<script>
import Bus from "../service/bus";
import { isApp } from "../assets/js/app.js";
export default {
    name: "RightSidebar",
    props: [],
    data: function() {
        return {
            isApp: isApp(),
            isOpen: true,
        };
    },
    computed: {},
    methods: {
        toggleRightSide: function () {
            Bus.$emit("toggleRightSide", !this.isOpen);
        },
    },
    mounted: function() {
        Bus.$on("toggleRightSide", (data) => {
            this.isOpen = data;
        });

        if (window.innerWidth < 1024) {
            this.isOpen = false;

            document.addEventListener("click", function () {
                Bus.$emit("toggleRightSide", false);
            });
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/right-sidebar.less";
</style>
