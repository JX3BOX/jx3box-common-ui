<template>
    <footer class="c-footer" id="c-footer">
        <div class="c-footer-left">
            <img
                class="u-flag"
                svg-inline
                src="../assets/img/footer/china.svg"
            />
            <a href="http://beian.miit.gov.cn/" class="u-beian" target="_blank"
                >湘ICP备13012123号</a
            >
        </div>
        <div class="c-footer-right">
            <a class="u-about" :href="about" target="_blank">关于我们</a>
            <em>|</em>
            <a class="u-doc" href="https://www.jx3box.com/help" target="_blank">帮助文档</a>
            <em>|</em>
            <a class="u-log" href="https://www.jx3box.com/system" target="_blank">更新日志</a>
            <em>|</em>
            <a class="u-feedback" :href="feedback" target="_blank">反馈建议</a>
        </div>
        <slot></slot>
    </footer>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Footer",
    data: function () {
        return {
            about: JX3BOX.__Links.about,
            feedback: JX3BOX.feedback,
        };
    },
};
</script>

<style lang="less">
@import "../assets/css/footer.less";
</style>
