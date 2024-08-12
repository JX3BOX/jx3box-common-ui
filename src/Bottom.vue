<template>
    <footer class="m-bottom">
        <a :href="homepage" target="_blank">&copy; JX3BOX.COM</a>
        <a class="u-feedback" :href="feedback" target="_blank">❤ Help</a>
    </footer>
</template>

<script>
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Bottom",
    data: function() {
        return {
            homepage: __Root,
            feedback: '/feedback' + '&refer=' + location.href,
        };
    },
};
</script>

<style lang="less">
@import "../assets/css/bottom.less";
</style>
