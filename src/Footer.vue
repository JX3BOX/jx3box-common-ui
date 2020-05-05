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
            <a class="u-doc" href="https://github.com/JX3BOX/apidocs/wiki/%E5%B8%AE%E5%8A%A9%E6%96%87%E6%A1%A3%E4%B8%AD%E5%BF%83" target="_blank">API文档</a>
            <em>|</em>
            <a class="u-log" href="https://github.com/JX3BOX/jx3box.github.io/wiki/v2-%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97" target="_blank">更新日志</a>
            <em>|</em>
            <a class="u-feedback" :href="feedback" target="_blank">帮助反馈</a>
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
@pink: #f39;
.c-footer {
    padding: 10px;
    margin: 10px;
    .fz(13px);
    .clearfix;
    // background-color: @bg-light;
    // border: 1px solid #eee;
    .r(4px);
    color: #999;
    a {
        color: #999;
    }
}
.c-footer-left {
    .fl;
    .u-flag {
        .size(18px);
        .y(-3px);
        .mr(5px);
    }
    .u-beian {
        .italic;
        &:hover {
            color: @pink;
            box-shadow: 0 1px @pink;
        }
    }
}
.c-footer-right {
    .fr;

    em {
        margin: 0 10px;
    }
    a {
        &:hover {
            color: @pink;
            box-shadow: 0 1px @pink;
        }
    }
}
@media screen and (max-width:@phone){
.c-footer-left{.none;}
}
</style>
