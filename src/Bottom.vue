<template>
    <footer class="m-bottom">
        <a :href="homepage" target="_blank">&copy; JX3BOX.COM</a>
        <a class="u-feedback" :href="feedback" target="_blank">❤ Help</a>
    </footer>
</template>

<script>
const { JX3BOX } = require('@jx3box/jx3box-common');
export default {
    name: "Bottom",
    data: function() {
        return {
            homepage: JX3BOX.__Root,
            feedback: JX3BOX.feedback,
        };
    },
};
</script>

<style lang="less">
@import "../assets/css/bottom.less";
</style>
