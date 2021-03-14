<template>
    <footer class="c-footer" id="c-footer" v-if="!isApp">
        <div class="c-footer-left">
            <img
                class="u-flag"
                svg-inline
                src="../assets/img/footer/china.svg"
            />
            <a href="http://beian.miit.gov.cn/" class="u-beian" target="_blank"
                >湘ICP备2021002288号</a
            >
        </div>
        <div class="c-footer-right">
            <a class="u-about" :href="about" target="_blank">关于我们</a>
            <em>|</em>
            <a
                class="u-doc"
                href="https://www.jx3box.com/tool/?subtype=4"
                target="_blank"
                >帮助文档</a
            >
            <em>|</em>
            <a class="u-log" href="https://github.com/JX3BOX" target="_blank"
                >代码仓库</a
            >
            <em>|</em>
            <a class="u-feedback" :href="feedback" target="_blank">反馈建议</a>
        </div>
        <slot></slot>
    </footer>
</template>

<script>
import { __Root, feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import { isApp } from "../assets/js/app.js";
export default {
    name: "Footer",
    data: function() {
        return {
            about: __Root + "about",
            feedback: feedback + "&subject=" + location.href,
            isApp: isApp(),
        };
    },
};
</script>

<style lang="less">
@import "../assets/css/footer.less";
</style>
