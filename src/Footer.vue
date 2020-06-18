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
            <a class="u-doc" href="https://www.jx3box.com/tool/?subtype=5" target="_blank">帮助文档</a>
            <em>|</em>
            <a class="u-log" href="https://github.com/JX3BOX" target="_blank">代码仓库</a>
            <em>|</em>
            <a class="u-feedback" :href="feedback" target="_blank">反馈建议</a>
        </div>
        <slot></slot>
    </footer>
</template>

<script>
import { __Links, feedback } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "Footer",
    data: function () {
        return {
            about: __Links.about,
            feedback: feedback + '&subject=' + location.href,
        };
    },
};
</script>

<style lang="less">
@import "../assets/css/footer.less";
</style>
