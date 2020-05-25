<template>
    <footer class="m-bottom">
        <a :href="homepage" target="_blank">&copy; JX3BOX.COM</a>
        <a class="u-feedback" :href="feedback" target="_blank">❤ Help</a>
    </footer>
</template>

<script>
import { __Root, feedback } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "Bottom",
    data: function() {
        return {
            homepage: __Root,
            feedback: feedback,
        };
    },
};
</script>

<style lang="less">
@import "../assets/css/bottom.less";
</style>
