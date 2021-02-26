<template>
    <aside class="c-sidebar-right c-sidebar" v-if="!isApp">
        <slot></slot>
    </aside>
</template>

<script>
import {isApp} from '../assets/js/app.js'
export default {
    name: "RightSidebar",
    props: [],
    data: function() {
        return {
            isApp : isApp()
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/right-sidebar.less";
</style>
